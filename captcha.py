"""
captcha.py — TikTok / Tokopedia captcha detection, image-URL collection,
CapSolver solving, and ADB swipe submission.

The /captcha/get response body is a WASM-encrypted blob — we do NOT try to
decrypt it.  Instead we rely on the Frida WebViewClient.shouldInterceptRequest
hook in _agent_captcha.js to capture the slide-captcha image URLs that the
WebView loads *after* the secsdk WASM module decrypts the challenge.

Flow:
  1. OkHttp hook fires  → captcha_challenge_raw  → marks challenge active
  2. WebView loads images → captcha_image_url     → collects bg + puzzle URLs
  3. Python detects captcha via ADB dumpsys
  4. Python calls handle_captcha() which waits for 2 image URLs, then solves
"""

import base64
import json
import logging
import os
import subprocess
import threading
import time
from dataclasses import dataclass
from typing import Optional

logger = logging.getLogger("Captcha")


@dataclass
class ChallengeInfo:
    """Parsed fields from TikTok's /captcha/get JSON response."""

    challenge_id: str
    mode: str
    bg_url: str
    piece_url: str

# ─── ADB detection ────────────────────────────────────────────────────────────

_FOCUS_SIGNALS = ["captcha", "verify", "secsdk", "CaptchaActivity"]


def detect_captcha(device: str) -> bool:
    """
    Check if a captcha overlay is on screen using dumpsys window focus.
    Fast (~10 ms).
    """
    try:
        out = subprocess.check_output(
            ["adb", "-s", device, "shell", "dumpsys", "window", "windows"],
            timeout=5,
            stderr=subprocess.DEVNULL,
        ).decode(errors="ignore")
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError):
        return False

    focus_lines = [
        ln for ln in out.splitlines()
        if "mCurrentFocus" in ln or "mFocusedApp" in ln
    ]
    return any(
        sig.lower() in ln.lower()
        for sig in _FOCUS_SIGNALS
        for ln in focus_lines
    )


def wait_for_captcha_clear(device: str, timeout: float = 60.0) -> bool:
    """Poll every 1.5 s until the captcha overlay disappears."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        if not detect_captcha(device):
            return True
        time.sleep(1.5)
    return False


# ─── Thread-safe captcha state ────────────────────────────────────────────────

class CaptchaState:
    """
    Buffers events forwarded from the Frida agent.

    The Frida message thread calls on_challenge_raw() / on_image_url().
    The Python retry loop calls wait_for_images() to block until solvable.
    """

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._raw: Optional[dict] = None          # raw /captcha/get payload
        self._images: list[str] = []              # image URLs (from challenge JSON or WebView)
        self._images_ready = threading.Event()
        self._challenge_info: Optional[ChallengeInfo] = None

    # ── called from Frida message thread ──────────────────────────────────────

    def on_challenge_raw(self, url: str, body: str) -> None:
        """
        Raw /captcha/get response body.

        When the body is a decrypted JSON (mode=slide), url1/url2 are extracted
        immediately so we don't need to wait for WebView resource interception.
        """
        with self._lock:
            self._raw = {"url": url, "body": body}
        logger.info("Captcha challenge received from %s", url)

        # Try to parse direct image URLs from the challenge JSON.
        # If parsing fails we fall back to the WebView collection path.
        try:
            data = json.loads(body)
            mode = data.get("mode", "")
            question = data.get("question", {})
            url1 = question.get("url1")
            url2 = question.get("url2")
            challenge_id = data.get("id", "")

            if url1 and url2:
                info = ChallengeInfo(
                    challenge_id=challenge_id,
                    mode=mode,
                    bg_url=url1,
                    piece_url=url2,
                )
                with self._lock:
                    self._challenge_info = info
                # Call on_image_url outside the lock (it acquires its own lock).
                self.on_image_url(url1)
                self.on_image_url(url2)
                logger.info(
                    "Challenge parsed: mode=%s id=%s  bg=%s  piece=%s",
                    mode, challenge_id, url1, url2,
                )
        except (json.JSONDecodeError, AttributeError, TypeError) as exc:
            logger.debug("Could not parse challenge body as JSON (%s) — will wait for WebView URLs", exc)

    def on_image_url(self, url: str) -> None:
        """Image URL captured by the WebView resource hook."""
        with self._lock:
            if url not in self._images:
                self._images.append(url)
                logger.debug("Captcha image URL #%d: %s", len(self._images), url)
                if len(self._images) >= 2:
                    self._images_ready.set()

    # ── called from retry loop ────────────────────────────────────────────────

    def wait_for_images(self, min_count: int = 2, timeout: float = 15.0) -> list[str]:
        """
        Block until at least *min_count* image URLs have arrived, or timeout.
        Returns whatever has been collected (may be fewer than min_count).
        """
        self._images_ready.wait(timeout=timeout)
        with self._lock:
            return list(self._images)

    def raw_challenge(self) -> Optional[dict]:
        with self._lock:
            return self._raw

    def challenge_info(self) -> Optional[ChallengeInfo]:
        """Return parsed ChallengeInfo if the challenge body was valid JSON, else None."""
        with self._lock:
            return self._challenge_info

    def clear(self) -> None:
        with self._lock:
            self._raw = None
            self._images = []
            self._challenge_info = None
            self._images_ready.clear()


# ─── CapSolver ────────────────────────────────────────────────────────────────

_CREATE_URL = "https://api.capsolver.com/createTask"
_RESULT_URL = "https://api.capsolver.com/getTaskResult"


def solve_with_capsolver(bg_url: str, puzzle_url: str, api_key: str) -> Optional[int]:
    """
    Submit background + puzzle images to CapSolver (ImageIntersectionTask).
    Returns the pixel x_offset to slide, or None on failure.

    `requests` is imported lazily so this module loads even without it.
    """
    if not api_key:
        logger.error("CAPSOLVER_API_KEY is not set")
        return None

    try:
        import requests  # lazy — only needed for actual solving
    except ImportError:
        logger.error("'requests' package not installed — run: pip install requests")
        return None

    def _to_b64(url: str) -> str:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return base64.b64encode(resp.content).decode()

    try:
        payload = {
            "clientKey": api_key,
            "task": {
                "type":       "ImageIntersectionTask",
                "background": _to_b64(bg_url),
                "puzzle":     _to_b64(puzzle_url),
            },
        }
        create = requests.post(_CREATE_URL, json=payload, timeout=15).json()
        task_id = create.get("taskId")
        if not task_id:
            logger.error("CapSolver task creation failed: %s", create)
            return None

        for _ in range(30):
            time.sleep(1)
            result = requests.post(
                _RESULT_URL,
                json={"clientKey": api_key, "taskId": task_id},
                timeout=10,
            ).json()
            if result.get("status") == "ready":
                x = result.get("solution", {}).get("x_offset")
                logger.info("CapSolver solved: x_offset=%s", x)
                return int(x) if x is not None else None

        logger.error("CapSolver timed out on task %s", task_id)
        return None

    except Exception as exc:
        logger.error("CapSolver error: %s", exc)
        return None


# ─── ADB swipe ────────────────────────────────────────────────────────────────

def submit_swipe(
    device: str,
    x_offset: int,
    slider_start_x: int = 60,
    slider_y: int = 1350,
    duration_ms: int = 1200,
) -> None:
    """
    Simulate an ADB swipe to solve a slide captcha.

    Tune slider_start_x / slider_y to match the device resolution and the
    position of the drag handle on screen.
    """
    end_x = slider_start_x + x_offset
    subprocess.run(
        [
            "adb", "-s", device, "shell", "input", "swipe",
            str(slider_start_x), str(slider_y),
            str(end_x),          str(slider_y),
            str(duration_ms),
        ],
        timeout=10,
        check=False,
    )
    logger.info("Swipe: x %d → %d (y=%d, %d ms)", slider_start_x, end_x, slider_y, duration_ms)


# ─── Screenshot helper ────────────────────────────────────────────────────────

def take_screenshot(device: str) -> Optional[bytes]:
    """Capture a full-screen PNG from the device. Returns raw bytes or None."""
    try:
        result = subprocess.run(
            ["adb", "-s", device, "exec-out", "screencap", "-p"],
            capture_output=True,
            timeout=10,
        )
        if result.returncode == 0 and len(result.stdout) > 1000:
            return result.stdout
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return None


# ─── Orchestrator ─────────────────────────────────────────────────────────────

def handle_captcha(
    state: CaptchaState,
    device: str,
    sadcaptcha_key: str,
    image_wait: float = 15.0,
) -> bool:
    """
    Full pipeline:
      1. Wait for image URLs (populated instantly when challenge JSON is parsed,
         or after WebView resource interception as fallback)
      2. Send to SadCaptcha /puzzle for slide x-proportion
      3. Submit via ADB swipe
      4. Wait for overlay to clear

    Returns True if solved and cleared.
    """
    from captcha_solver import CaptchaSolver, SadCaptchaError  # lazy import

    images = state.wait_for_images(min_count=2, timeout=image_wait)

    if len(images) < 2:
        logger.warning(
            "Only %d captcha image URL(s) available after %.0f s "
            "(need 2 for background + puzzle).",
            len(images), image_wait,
        )
        return False

    bg_url  = images[0]
    pz_url  = images[1]
    logger.info("Solving: bg=%s  puzzle=%s", bg_url, pz_url)

    try:
        solver   = CaptchaSolver(license_key=sadcaptcha_key)
        solution = solver.solve_puzzle(puzzle_image=bg_url, piece_image=pz_url)
    except SadCaptchaError as exc:
        logger.error("SadCaptcha API error: %s", exc)
        return False
    except Exception as exc:
        logger.error("Unexpected solver error: %s", exc)
        return False

    if solution.pixel_offset is None:
        logger.warning(
            "SadCaptcha returned proportion=%.4f but pixel_offset could not be computed "
            "(puzzle image width unknown). Cannot swipe.",
            solution.slide_x_proportion,
        )
        return False

    logger.info(
        "SadCaptcha solution: proportion=%.4f → pixel_offset=%d",
        solution.slide_x_proportion, solution.pixel_offset,
    )
    submit_swipe(device, solution.pixel_offset)
    time.sleep(2)

    cleared = wait_for_captcha_clear(device, timeout=15.0)
    if cleared:
        logger.info("Captcha cleared")
        state.clear()
    else:
        logger.warning("Captcha did not clear after swipe")
    return cleared
