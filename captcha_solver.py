"""
captcha_solver.py — SadCaptcha integration for TikTok slide puzzle captcha.

Usage:
    from captcha_solver import CaptchaSolver, PuzzleSolution

    solver = CaptchaSolver(license_key=os.getenv("SADCAPTCHA_LICENSE_KEY"))

    # Both URLs and file paths are accepted for either image argument.
    solution = solver.solve_puzzle(
        puzzle_image="https://example.com/bg.png",   # or "/tmp/bg.png"
        piece_image="https://example.com/piece.png", # or "/tmp/piece.png"
    )

    print(solution.slide_x_proportion)  # raw ratio  (0.0 – 1.0)
    print(solution.pixel_offset)        # pixels from slider origin, or None if width unknown
"""

from __future__ import annotations

import base64
import logging
import os
from dataclasses import dataclass
from io import BytesIO
from typing import Optional

import requests
from PIL import Image

logger = logging.getLogger(__name__)

SADCAPTCHA_BASE_URL = "https://www.sadcaptcha.com/api/v1"


@dataclass
class PuzzleSolution:
    """Result from the SadCaptcha /puzzle endpoint."""

    slide_x_proportion: float
    """Raw ratio returned by the API (0.0 – 1.0).
    Represents the fraction of puzzle_width where the piece must be slid to."""

    pixel_offset: Optional[int]
    """Absolute pixel distance from the slider origin.
    Computed as round(slide_x_proportion * puzzle_width).
    None when puzzle image width could not be determined."""

    puzzle_width: Optional[int]
    """Width of the background puzzle image in pixels."""


class SadCaptchaError(Exception):
    """Raised when the SadCaptcha API returns an error."""


class CaptchaSolver:
    """
    Sends TikTok slide puzzle captcha images to SadCaptcha and returns a solution.

    Accepts both image URLs (downloaded automatically) and local file paths.
    """

    def __init__(self, license_key: str, timeout: float = 30.0) -> None:
        if not license_key:
            raise ValueError("SADCAPTCHA_LICENSE_KEY is not set")
        self._license_key = license_key
        self._timeout = timeout
        self._session = requests.Session()

    # ─── Public API ──────────────────────────────────────────────────────────

    def solve_puzzle(
        self,
        puzzle_image: str,
        piece_image: str,
    ) -> PuzzleSolution:
        """
        Solve a TikTok slide puzzle captcha.

        Args:
            puzzle_image: URL or local file path of the background image (with hole).
            piece_image:  URL or local file path of the puzzle piece image.

        Returns:
            PuzzleSolution containing the raw proportion and computed pixel offset.

        Raises:
            SadCaptchaError: If the API returns a non-200 status or an unexpected body.
            requests.RequestException: On network-level failures.
        """
        puzzle_b64, puzzle_width = self._load_image(puzzle_image)
        piece_b64, _ = self._load_image(piece_image)

        url = f"{SADCAPTCHA_BASE_URL}/puzzle?licenseKey={self._license_key}"
        payload = {
            "puzzleImageB64": puzzle_b64,
            "pieceImageB64": piece_b64,
        }

        logger.debug("Sending puzzle captcha to SadCaptcha (puzzle_width=%s px)", puzzle_width)
        resp = self._session.post(url, json=payload, timeout=self._timeout)

        if resp.status_code != 200:
            raise SadCaptchaError(
                f"SadCaptcha /puzzle returned HTTP {resp.status_code}: {resp.text[:300]}"
            )

        data = resp.json()
        proportion = data.get("slideXProportion")
        if proportion is None:
            raise SadCaptchaError(f"Unexpected SadCaptcha response: {data}")

        pixel_offset = round(proportion * puzzle_width) if puzzle_width is not None else None

        logger.info(
            "SadCaptcha solution: proportion=%.4f, pixel_offset=%s (puzzle_width=%s)",
            proportion, pixel_offset, puzzle_width,
        )
        return PuzzleSolution(
            slide_x_proportion=proportion,
            pixel_offset=pixel_offset,
            puzzle_width=puzzle_width,
        )

    def check_credits(self) -> int:
        """Return remaining SadCaptcha credits for the configured license key."""
        url = f"{SADCAPTCHA_BASE_URL}/license/credits?licenseKey={self._license_key}"
        resp = self._session.get(url, timeout=self._timeout)
        if resp.status_code != 200:
            raise SadCaptchaError(
                f"SadCaptcha /license/credits returned HTTP {resp.status_code}: {resp.text[:200]}"
            )
        return resp.json().get("credits", 0)

    # ─── Helpers ─────────────────────────────────────────────────────────────

    def _load_image(self, source: str) -> tuple[str, Optional[int]]:
        """
        Load an image from a URL or local file path and return
        (base64_string, width_in_pixels).

        Width is None if PIL cannot decode the image (e.g. unsupported format).
        """
        if source.startswith(("http://", "https://")):
            logger.debug("Downloading captcha image from %s", source)
            response = self._session.get(source, timeout=self._timeout)
            response.raise_for_status()
            raw_bytes = response.content
        else:
            with open(source, "rb") as fh:
                raw_bytes = fh.read()

        b64 = base64.b64encode(raw_bytes).decode("utf-8")

        width: Optional[int] = None
        try:
            img = Image.open(BytesIO(raw_bytes))
            width = img.width
        except Exception as exc:
            logger.warning("Could not determine image width from %s: %s", source, exc)

        return b64, width


# ─── Module-level factory ─────────────────────────────────────────────────────

def make_solver_from_env() -> CaptchaSolver:
    """Convenience factory that reads SADCAPTCHA_LICENSE_KEY from the environment."""
    key = os.getenv("SADCAPTCHA_LICENSE_KEY", "")
    return CaptchaSolver(license_key=key)
