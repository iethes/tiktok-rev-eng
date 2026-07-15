#!/usr/bin/env python3
"""
Fetch PDP data for TikTok products via direct Retrofit RPC.

Supports two modes:
1. CSV mode: Process products from products_tiktok.csv
2. Queue mode: Consume tasks from RabbitMQ queue

Usage:
    # CSV mode
    python magpie-direct.py
    python magpie-direct.py --limit 10
    python magpie-direct.py --context my_batch_001
    
    # Queue mode
    python magpie-direct.py --queue
"""

import logging
import random
import csv
import json
import os
import sys
import threading
import time
from datetime import datetime
from pathlib import Path

import subprocess

import frida
import pika
from google.cloud import storage
from dotenv import load_dotenv
import captcha as captcha_mod

SCRIPT_DIR = Path(__file__).resolve().parent
load_dotenv(SCRIPT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(SCRIPT_DIR / 'magpie-direct.log')
    ]
)
logging.getLogger("pika").setLevel(logging.WARNING)
logging.getLogger("google").setLevel(logging.WARNING)
logging.getLogger("google.auth").setLevel(logging.WARNING)
logging.getLogger("google.cloud").setLevel(logging.WARNING)
logger = logging.getLogger("MagpieDirect")

AGENT_PATH         = SCRIPT_DIR / "_agent_rpc.js"
CAPTCHA_AGENT_PATH = SCRIPT_DIR / "_agent_captcha.js"
CSV_PATH           = SCRIPT_DIR / "products_tiktok.csv"

MAX_ATTEMPTS = int(os.getenv("MAX_ATTEMPTS", "3"))
MIN_RESPONSE_LEN = int(os.getenv("MIN_RESPONSE_LEN", "10000"))
DEFAULT_REMOTE = os.getenv("FRIDA_REMOTE", "127.0.0.1:27042")
DEFAULT_PROCESS = os.getenv("FRIDA_PROCESS", "TikTok")
DEFAULT_DELAY = float(os.getenv("DEFAULT_DELAY", "0.5"))
DEFAULT_TIMEOUT = float(os.getenv("TIMEOUT", "30.0"))

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "")
QUEUE_NAME = os.getenv("QUEUE_NAME", "inhouse-tiktok-pdpapi-id")
QUEUE_MAX_PRIORITY = int(os.getenv("QUEUE_MAX_PRIORITY", "20"))
MAX_RETRY = int(os.getenv("MAX_RETRY", "10"))

GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "magpie_dev")
GCS_BASE_PATH = os.getenv("GCS_BASE_PATH", "tiktok_mobile/pdp")
GCS_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "gcs-service-account.json")

ADB_DEVICE = os.getenv("ADB_DEVICE", "localhost:9102")
FRIDA_SERVER_PATH = os.getenv("FRIDA_SERVER_PATH", "/data/local/tmp/frida-server-17.9.1")
FRIDA_PORT = os.getenv("FRIDA_PORT", "27042")
TIKTOK_PACKAGE    = os.getenv("TIKTOK_PACKAGE", "com.zhiliaoapp.musically")
CAPSOLVER_API_KEY = os.getenv("CAPSOLVER_API_KEY", "")

BURST_PAUSE_MIN_REQUESTS = int(os.getenv("BURST_PAUSE_MIN_REQUESTS", "30"))
BURST_PAUSE_MAX_REQUESTS = int(os.getenv("BURST_PAUSE_MAX_REQUESTS", "32"))
BURST_PAUSE_MIN_SECONDS  = int(os.getenv("BURST_PAUSE_MIN_SECONDS", str(5 * 60)))
BURST_PAUSE_MAX_SECONDS  = int(os.getenv("BURST_PAUSE_MAX_SECONDS", str(7 * 60)))
SCREEN_WAKE_INTERVAL     = int(os.getenv("SCREEN_WAKE_INTERVAL", "45"))
SWIPE_MIN_REQUESTS       = int(os.getenv("SWIPE_MIN_REQUESTS", "2"))
SWIPE_MAX_REQUESTS       = int(os.getenv("SWIPE_MAX_REQUESTS", "5"))


def stop_tiktok_app(device: str = ADB_DEVICE) -> None:
    """Force-stop the TikTok app on the device."""
    try:
        subprocess.run(
            ["adb", "-s", device, "shell", f"am force-stop {TIKTOK_PACKAGE}"],
            capture_output=True, text=True, check=False, timeout=15,
        )
        logger.info(f"Stopped {TIKTOK_PACKAGE} on {device}")
    except Exception as e:
        logger.warning(f"stop_tiktok_app failed: {e}")


def wake_device(device: str = ADB_DEVICE) -> None:
    """Wake the screen (KEYCODE_WAKEUP) and swipe up to dismiss the lockscreen."""
    try:
        subprocess.run(
            ["adb", "-s", device, "shell", "input keyevent KEYCODE_WAKEUP"],
            capture_output=True, text=True, check=False, timeout=10,
        )
        time.sleep(0.3)
        subprocess.run(
            ["adb", "-s", device, "shell", "input swipe 500 1500 500 500 300"],
            capture_output=True, text=True, check=False, timeout=10,
        )
    except Exception as e:
        logger.debug(f"wake_device failed: {e}")


def swipe_screen_down(device: str = ADB_DEVICE) -> None:
    """Simulate a swipe-up finger gesture (scrolls the view content down)."""
    try:
        subprocess.run(
            ["adb", "-s", device, "shell", "input swipe 500 1500 500 500 300"],
            capture_output=True, text=True, check=False, timeout=10,
        )
        logger.debug("Performed scroll-down (swipe-up) on %s", device)
    except Exception as e:
        logger.debug(f"swipe_screen_down failed: {e}")


def start_tiktok_app(device: str = ADB_DEVICE, wait_secs: int = 5) -> None:
    """Launch the TikTok app on the device and wait for it to come up."""
    try:
        subprocess.run(
            ["adb", "-s", device, "shell", f"monkey -p {TIKTOK_PACKAGE} 1"],
            capture_output=True, text=True, check=False, timeout=15,
        )
        logger.info(f"Started {TIKTOK_PACKAGE} on {device}, waiting {wait_secs}s...")
        time.sleep(wait_secs)
    except Exception as e:
        logger.warning(f"start_tiktok_app failed: {e}")


def setup_device(device: str = ADB_DEVICE) -> bool:
    """
    Setup frida-server and TikTok app on the Android device.
    1. Restart frida-server
    2. Setup port forwarding
    3. Verify frida-server is running
    4. Start TikTok app
    """
    logger.info(f"Setting up device: {device}")
    
    def run_adb(args: list[str], check: bool = True) -> subprocess.CompletedProcess:
        cmd = ["adb", "-s", device] + args
        logger.debug(f"Running: {' '.join(cmd)}")
        return subprocess.run(cmd, capture_output=True, text=True, check=check)
    
    try:
        # 0. Connect to device if it's a network device (contains ':')
        if ":" in device:
            logger.info(f"Connecting to device {device}...")
            connect_result = subprocess.run(
                ["adb", "connect", device],
                capture_output=True, text=True, check=False
            )
            logger.info(f"adb connect: {connect_result.stdout.strip()}")
            if "connected" not in connect_result.stdout.lower() and "already" not in connect_result.stdout.lower():
                logger.error(f"Failed to connect: {connect_result.stderr}")
                return False
            time.sleep(1)
        
        # 1. Restart frida-server
        logger.info("Restarting frida-server...")
        # Kill existing frida-server
        run_adb(["shell", "su -c 'killall -9 frida-server 2>/dev/null || true'"], check=False)
        time.sleep(1)
        
        # Start frida-server with nohup and redirect to /dev/null to prevent blocking
        run_adb([
            "shell", 
            f"su -c 'nohup {FRIDA_SERVER_PATH} -l 127.0.0.1:{FRIDA_PORT} >/dev/null 2>&1 &'"
        ], check=False)
        time.sleep(2)  # Wait for frida-server to start
        
        # 2. Setup port forwarding
        logger.info(f"Setting up port forwarding tcp:{FRIDA_PORT}...")
        run_adb(["forward", f"tcp:{FRIDA_PORT}", f"tcp:{FRIDA_PORT}"])
        
        # 3. Verify frida-server is running
        logger.info("Verifying frida-server...")
        result = run_adb(["shell", "su -c 'ps -A | grep frida'"], check=False)
        if "frida-server" not in result.stdout:
            logger.error("frida-server not running!")
            logger.error(f"stdout: {result.stdout}")
            logger.error(f"stderr: {result.stderr}")
            return False
        logger.info(f"frida-server running: {result.stdout.strip()}")
        
        # 4. Start TikTok app
        logger.info(f"Starting {TIKTOK_PACKAGE}...")
        run_adb(["shell", f"monkey -p {TIKTOK_PACKAGE} 1"], check=False)
        time.sleep(3)  # Wait for app to start
        
        logger.info("Device setup complete!")
        return True
        
    except subprocess.CalledProcessError as e:
        logger.error(f"ADB command failed: {e}")
        logger.error(f"stdout: {e.stdout}")
        logger.error(f"stderr: {e.stderr}")
        return False
    except FileNotFoundError:
        logger.error("adb not found in PATH")
        return False


class GCSUploader:
    """Google Cloud Storage uploader for PDP results."""
    
    def __init__(self, bucket_name: str, base_path: str, credentials_path: str | None = None):
        self.logger = logging.getLogger("GCSUploader")
        self.bucket_name = bucket_name
        self.base_path = base_path.rstrip("/")
        
        try:
            if credentials_path and os.path.exists(credentials_path):
                self.client = storage.Client.from_service_account_json(credentials_path)
            else:
                self.client = storage.Client()
            
            self.bucket = self.client.bucket(self.bucket_name)
            self.logger.info(f"Initialized GCS Client for bucket: {bucket_name}")
        except Exception as e:
            self.logger.error(f"Failed to initialize GCS Client: {e}")
            raise e
    
    def upload(self, blob_path: str, content: str) -> bool:
        """Upload content to GCS."""
        try:
            blob = self.bucket.blob(blob_path)
            blob.upload_from_string(content, content_type='application/json')
            self.logger.debug(f"Uploaded: gs://{self.bucket_name}/{blob_path}")
            return True
        except Exception as e:
            self.logger.error(f"Failed uploading {blob_path}: {e}")
            return False
    
    def format_path(self, date: str, context: str, product_id: str) -> str:
        """
        Format GCS path: <base_path>/<date>/<context>/results/<product_id>.json
        Example: tiktok_mobile/pdp/2026-04-14/batch_001/results/1234567890.json
        """
        return f"{self.base_path}/{date}/{context}/results/{product_id}.json"
    
    def format_not_exists_path(self, date: str, context: str, product_id: str) -> str:
        """
        Format GCS path for not_exists: <base_path>/<date>/<context>/not_exists/<product_id>.json
        """
        return f"{self.base_path}/{date}/{context}/not_exists/{product_id}.json"

    def format_failed_path(self, date: str, context: str, product_id: str) -> str:
        """
        Format GCS path for failed: <base_path>/<date>/<context>/failed/<product_id>.json
        """
        return f"{self.base_path}/{date}/{context}/failed/{product_id}.json"


class DirectPdpClient:
    def __init__(self, remote: str | None, process: str):
        self._remote = remote
        self._process = process
        self._session: frida.core.Session | None = None
        self._script: frida.core.Script | None = None
        self._captcha_script: frida.core.Script | None = None
        self._lock = threading.Lock()
        self._connect_lock = threading.Lock()
        self._pending: dict[str, threading.Event] = {}
        self._results: dict[str, dict] = {}
        self.captcha_state = captcha_mod.CaptchaState()

    def connect(self) -> None:
        if self._remote:
            dev = frida.get_device_manager().add_remote_device(self._remote)
            print(f"[*] Remote device: {self._remote}")
        else:
            dev = frida.get_usb_device()
            print("[*] USB device")

        self._session = dev.attach(self._process)
        print(f"[*] Attached to {self._process}")

        code = AGENT_PATH.read_text(encoding="utf-8")
        self._script = self._session.create_script(code)
        self._script.on("message", self._on_message)
        self._script.load()

        status = self._script.exports_sync.ping()
        print(f"[*] Ping: {status}")
        if "error" in status.lower():
            raise RuntimeError(f"Agent not ready: {status}")

        if CAPTCHA_AGENT_PATH.exists():
            captcha_code = CAPTCHA_AGENT_PATH.read_text(encoding="utf-8")
            self._captcha_script = self._session.create_script(captcha_code)
            self._captcha_script.on("message", self._on_captcha_message)
            self._captcha_script.load()
            result = self._captcha_script.exports_sync.install_hooks()
            print(f"[*] Captcha agent: {result}")

    def _on_captcha_message(self, message: dict, _data: bytes | None) -> None:
        if message["type"] != "send":
            return
        payload = message["payload"]
        if not isinstance(payload, dict):
            return
        msg_type = payload.get("type")
        if msg_type == "captcha_challenge_raw":
            self.captcha_state.on_challenge_raw(payload.get("url", ""), payload.get("body", ""))
        elif msg_type == "captcha_image_url":
            self.captcha_state.on_image_url(payload.get("url", ""))
        elif msg_type in ("captcha_log", "captcha_webview", "captcha_verify_raw"):
            logger.debug("[captcha-agent] %s", payload.get("msg") or payload.get("url", "") or payload.get("body", "")[:120])

    def _on_message(self, message: dict, _data: bytes | None) -> None:
        if message["type"] == "send":
            payload = message["payload"]
            if isinstance(payload, dict) and payload.get("type") in ("rpc_result", "rpc_error"):
                with self._lock:
                    for req_id, evt in list(self._pending.items()):
                        if not evt.is_set():
                            self._results[req_id] = payload
                            evt.set()
                            break
        elif message["type"] == "error":
            desc = message.get("description", "")
            if "getContext" in desc and "CoroutineContext" in desc:
                return
            print(f"[agent-error] {desc or message}", file=sys.stderr)

    def call_pdp(self, product_id: str, timeout: float = 30.0) -> str | None:
        """Returns raw JSON string or None on failure."""
        def _call_once() -> str | None:
            assert self._script is not None

            req_id = f"{product_id}_{time.monotonic_ns()}"
            evt = threading.Event()
            with self._lock:
                self._pending[req_id] = evt

            try:
                raw = self._script.exports_sync.call_pdp_api(
                    json.dumps({"product_id": product_id}),
                    json.dumps({"biz_type": "0"}),
                )
                parsed = json.loads(raw)

                if "error" in parsed:
                    return None

                if parsed.get("status") != "suspended":
                    data = parsed.get("data") or raw
                    return data if isinstance(data, str) else json.dumps(data)

                if evt.wait(timeout=timeout):
                    result = self._results.get(req_id, {})
                    if result.get("type") == "rpc_result" and result.get("data"):
                        return result["data"]
                    if result.get("type") == "rpc_error":
                        print(f"    RPC error: {result.get('error', '?')}", file=sys.stderr)
                return None
            finally:
                with self._lock:
                    self._pending.pop(req_id, None)
                    self._results.pop(req_id, None)

        for rpc_attempt in range(2):
            try:
                if self._script is None:
                    self._reconnect()
                return _call_once()
            except Exception as e:
                err = str(e).lower()
                should_reconnect = (
                    "script has been destroyed" in err
                    or "session is detached" in err
                    or "connection is closed" in err
                )
                if should_reconnect and rpc_attempt == 0:
                    logger.warning("Frida script/session lost, reconnecting and retrying once...")
                    try:
                        self._reconnect()
                        continue
                    except Exception as reconnect_error:
                        logger.error(f"Reconnect failed: {reconnect_error}")
                        return None
                raise

        return None

    def _reconnect(self) -> None:
        with self._connect_lock:
            for script in (self._captcha_script, self._script):
                if script:
                    try:
                        script.unload()
                    except Exception:
                        pass
            try:
                if self._session:
                    self._session.detach()
            except Exception:
                pass
            self._script = None
            self._captcha_script = None
            self._session = None
            self.captcha_state.clear()
            self.connect()

    def close(self) -> None:
        for script in (self._captcha_script, self._script):
            if script:
                try:
                    script.unload()
                except Exception:
                    pass
        if self._session:
            try:
                self._session.detach()
            except Exception:
                pass
        print("[*] Detached")


def default_csv_path(base_dir: Path = SCRIPT_DIR) -> Path:
    input_csvs = sorted((base_dir / "input").glob("*.csv"))
    return input_csvs[0] if input_csvs else base_dir / "products_tiktok.csv"


def load_products(csv_path: Path) -> list[dict]:
    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    if rows and "product_id" not in rows[0]:
        raise ValueError(f"{csv_path} must have a product_id column")
    return [row for row in rows[::-1] if row.get("product_id")]


BG_DROP_WAIT = 15

def _is_not_exist_error(body: str | None) -> bool:
    if not body:
        return False
    try:
        data = json.loads(body)
        msg = str(data.get("message", "")).lower()
        return "not exist" in msg
    except Exception:
        return "not exist" in body.lower()


def _is_background_drop(body: str | None) -> bool:
    if not body or len(body) > 1000:
        return False
    return "drop background requests" in body.lower()


def _extract_error_message(body: str | None) -> str:
    if not body:
        return ""
    try:
        data = json.loads(body)
        if isinstance(data, dict):
            message = data.get("message")
            if message:
                return str(message)
            nested = data.get("data")
            if isinstance(nested, dict) and nested.get("message"):
                return str(nested.get("message"))
        return ""
    except Exception:
        return ""


def _is_non_retryable_error(body: str | None) -> bool:
    msg = _extract_error_message(body).lower()
    if not msg:
        return False
    non_retryable_markers = (
        "not exist",
        "not found",
        "invalid",
        "illegal",
        "removed",
        "unavailable",
    )
    return any(marker in msg for marker in non_retryable_markers)


def _truncate_for_log(text: str | None, limit: int = 240) -> str:
    if not text:
        return ""
    return text if len(text) <= limit else f"{text[:limit]}..."


def fetch_one(
    idx: int,
    total: int,
    product_id: str,
    *,
    output_dir: Path,
    not_exists_dir: Path,
    client: DirectPdpClient,
    delay: float,
    gcs_uploader: GCSUploader | None = None,
    gcs_date: str | None = None,
    gcs_context: str | None = None,
) -> str:
    """Returns 'success', 'failed', 'skip', or 'not_exists'."""
    out_file = output_dir / f"{product_id}.json"
    ne_file = not_exists_dir / f"{product_id}.json"

    print(f"[{idx + 1}/{total}] {product_id}", end="")

    if out_file.exists() and out_file.stat().st_size >= MIN_RESPONSE_LEN:
        print(f"  SKIP ({out_file.stat().st_size:,} bytes)")
        return "skip"

    if ne_file.exists():
        print("  SKIP (not_exists)")
        return "skip"

    for attempt in range(1, MAX_ATTEMPTS + 1):
        body = client.call_pdp(product_id)
        blen = len(body) if body else 0
        print(f"  [{attempt}/{MAX_ATTEMPTS}] {blen:,} bytes", end="")

        if _is_background_drop(body):
            print(f"\n  [!] App went background — bring TikTok to foreground! Waiting {BG_DROP_WAIT}s...", end="")
            time.sleep(BG_DROP_WAIT)
            if attempt < MAX_ATTEMPTS:
                print(f"  retrying...", end="")
            continue

        if _is_not_exist_error(body):
            ne_content = json.dumps({"not_exists": True, "product_id": product_id})
            ne_file.write_text(ne_content)
            
            # Upload not_exists to GCS
            if gcs_uploader and gcs_date and gcs_context:
                gcs_path = gcs_uploader.format_not_exists_path(gcs_date, gcs_context, product_id)
                gcs_uploader.upload(gcs_path, ne_content)
            
            print("  NOT_EXISTS")
            return "not_exists"

        if body and blen > MIN_RESPONSE_LEN:
            try:
                data = json.loads(body)
                content = json.dumps(data, indent=4, ensure_ascii=False)
            except (json.JSONDecodeError, TypeError):
                content = body
            
            # Save locally
            out_file.write_text(content)
            
            # Upload to GCS
            if gcs_uploader and gcs_date and gcs_context:
                gcs_path = gcs_uploader.format_path(gcs_date, gcs_context, product_id)
                if gcs_uploader.upload(gcs_path, content):
                    print(f"  -> gs://{gcs_uploader.bucket_name}/{gcs_path}")
                else:
                    print(f"  -> {out_file.name} (GCS upload failed)")
            else:
                print(f"  -> {out_file.name}")
            return "success"

        if attempt < MAX_ATTEMPTS:
            print(f"  retry in {delay}s...", end="")
            if delay > 0:
                time.sleep(delay)

    if body:
        try:
            err_data = json.loads(body)
            print(f"  FAILED  ({err_data.get('message', body[:100])})")
        except Exception:
            print(f"  FAILED  ({body[:100]})")
    else:
        print("  FAILED  (no response)")
    return "failed"


def fetch_single_product(
    product_id: str,
    client: DirectPdpClient,
    gcs_uploader: GCSUploader | None,
    gcs_date: str,
    gcs_context: str,
    delay: float = DEFAULT_DELAY,
) -> tuple[str, str | None]:
    """
    Fetch a single product and upload to GCS.
    Returns (status, content) where status can be:
    - 'success'
    - 'not_exists'
    - 'failed_non_retryable'
    - 'failed'
    """
    for attempt in range(1, MAX_ATTEMPTS + 1):
        body = client.call_pdp(product_id)
        blen = len(body) if body else 0
        logger.info(f"Product {product_id} attempt {attempt}/{MAX_ATTEMPTS}: {blen:,} bytes")

        if _is_background_drop(body):
            logger.warning(f"App went background, waiting {BG_DROP_WAIT}s...")
            time.sleep(BG_DROP_WAIT)
            continue

        if CAPSOLVER_API_KEY and (not body or blen <= MIN_RESPONSE_LEN):
            if captcha_mod.detect_captcha(ADB_DEVICE):
                logger.warning(
                    "Captcha detected for %s (attempt %d/%d)",
                    product_id, attempt, MAX_ATTEMPTS,
                )
                solved = captcha_mod.handle_captcha(
                    client.captcha_state, ADB_DEVICE, CAPSOLVER_API_KEY
                )
                if solved:
                    logger.info("Captcha resolved — retrying %s", product_id)
                    continue
                logger.warning("Captcha solve failed — waiting %ds", BG_DROP_WAIT)
                time.sleep(BG_DROP_WAIT)
                continue

        if _is_not_exist_error(body):
            ne_content = json.dumps({"not_exists": True, "product_id": product_id})
            if gcs_uploader:
                gcs_path = gcs_uploader.format_not_exists_path(gcs_date, gcs_context, product_id)
                gcs_uploader.upload(gcs_path, ne_content)
            return "not_exists", ne_content

        if body and blen <= MIN_RESPONSE_LEN:
            msg = _extract_error_message(body)
            if msg:
                logger.warning(
                    "Small API response for %s: %s",
                    product_id,
                    _truncate_for_log(msg),
                )
            else:
                logger.warning(
                    "Small API response for %s body=%s",
                    product_id,
                    _truncate_for_log(body),
                )

            if _is_non_retryable_error(body):
                return "failed_non_retryable", body

        if body and blen > MIN_RESPONSE_LEN:
            try:
                data = json.loads(body)
                content = json.dumps(data, indent=2, ensure_ascii=False)
            except (json.JSONDecodeError, TypeError):
                content = body
            
            if gcs_uploader:
                gcs_path = gcs_uploader.format_path(gcs_date, gcs_context, product_id)
                if gcs_uploader.upload(gcs_path, content):
                    logger.info(f"Uploaded gs://{gcs_uploader.bucket_name}/{gcs_path}")
            return "success", content

        if attempt < MAX_ATTEMPTS and delay > 0:
            time.sleep(delay)

    return "failed", body


def sleep_with_device_wake(pause_secs: int) -> None:
    """Sleep while periodically waking the device so ADB stays reachable."""
    wake_device(ADB_DEVICE)
    for remaining in range(pause_secs, 0, -1):
        m, s = divmod(remaining, 60)
        print(f"\r    Resume in {m}m {s:02d}s...    ", end="", flush=True)
        time.sleep(1)
        if SCREEN_WAKE_INTERVAL > 0 and remaining % SCREEN_WAKE_INTERVAL == 0:
            wake_device(ADB_DEVICE)
    print()


def reattach_frida_with_retry(client: DirectPdpClient, log: logging.Logger = logger, max_attempts: int = 5) -> None:
    """Reattach Frida with exponential backoff. Kill+relaunch TikTok on persistent failure."""
    for attempt in range(1, max_attempts + 1):
        log.info("Reattaching Frida to TikTok (attempt %d/%d)...", attempt, max_attempts)
        try:
            client.connect()
            log.info("Frida reattached successfully")
            return
        except Exception as e:
            log.warning("Frida reattach attempt %d failed: %s", attempt, e)
            try:
                client.close()
            except Exception:
                pass
            if attempt == max_attempts:
                raise
            if attempt % 2 == 0:
                log.info("Restarting TikTok before next reattach...")
                stop_tiktok_app(ADB_DEVICE)
                time.sleep(2)
                wake_device(ADB_DEVICE)
                start_tiktok_app(ADB_DEVICE, wait_secs=10)
            else:
                backoff = 5 * attempt
                log.info("Waiting %ds before retry...", backoff)
                time.sleep(backoff)


def run_csv_burst_pause(client: DirectPdpClient, request_count: int) -> int:
    """Queue-mode-style burst pause for CSV mode. Returns next pause threshold."""
    pause_secs = random.randint(BURST_PAUSE_MIN_SECONDS, BURST_PAUSE_MAX_SECONDS)
    pause_mins = pause_secs / 60
    print(
        f"\n[*] Burst pause after {request_count} requests — "
        f"closing TikTok + sleeping {pause_mins:.1f} min ({pause_secs}s)..."
    )
    try:
        client.close()
    except Exception as e:
        logger.warning("client.close failed: %s", e)
    stop_tiktok_app(ADB_DEVICE)
    sleep_with_device_wake(pause_secs)
    wake_device(ADB_DEVICE)
    time.sleep(1)
    start_tiktok_app(ADB_DEVICE, wait_secs=10)
    reattach_frida_with_retry(client, logger, max_attempts=5)
    next_pause_at = random.randint(BURST_PAUSE_MIN_REQUESTS, BURST_PAUSE_MAX_REQUESTS)
    print(f"[*] Next burst pause after {next_pause_at} more requests\n")
    return next_pause_at


class QueueConsumer:
    """RabbitMQ queue consumer for TikTok PDP tasks."""
    
    def __init__(self, client: DirectPdpClient, gcs_uploader: GCSUploader | None):
        self.logger = logging.getLogger("QueueConsumer")
        self.client = client
        self.gcs_uploader = gcs_uploader
        self.connection = None
        self.channel = None
        self.success_count = 0
        self.failed_count = 0
        self.not_exists_count = 0
        self.request_count = 0
        self.next_pause_at = random.randint(BURST_PAUSE_MIN_REQUESTS, BURST_PAUSE_MAX_REQUESTS)
        self._pending_pause = False
        self.swipe_count = 0
        self.next_swipe_at = random.randint(SWIPE_MIN_REQUESTS, SWIPE_MAX_REQUESTS)

    def _maybe_swipe(self) -> None:
        """Swipe down on the screen every SWIPE_MIN_REQUESTS..SWIPE_MAX_REQUESTS calls."""
        self.swipe_count += 1
        if self.swipe_count >= self.next_swipe_at:
            self.logger.info("Swipe down on device (after %d requests)", self.swipe_count)
            swipe_screen_down(ADB_DEVICE)
            self.swipe_count = 0
            self.next_swipe_at = random.randint(SWIPE_MIN_REQUESTS, SWIPE_MAX_REQUESTS)

    def _maybe_burst_pause(self) -> None:
        """Flag a burst pause; actual sleep happens in start_consuming loop
        (so we can disconnect first and avoid RabbitMQ consumer_timeout).
        """
        self._maybe_swipe()
        self.request_count += 1
        if self.request_count >= self.next_pause_at:
            self._pending_pause = True
            self.logger.info(
                "Burst pause threshold reached (%d requests) — stopping consumer",
                self.request_count,
            )
            try:
                self.channel.stop_consuming()
            except Exception as e:
                self.logger.warning("stop_consuming failed: %s", e)

    def _run_burst_pause(self) -> None:
        """Detach Frida, kill TikTok, disconnect RabbitMQ, sleep 30-35 min,
        then relaunch TikTok, reattach Frida, and reconnect RabbitMQ."""
        pause_secs = random.randint(BURST_PAUSE_MIN_SECONDS, BURST_PAUSE_MAX_SECONDS)
        pause_mins = pause_secs / 60
        self.logger.info(
            "Burst pause starting — closing TikTok + disconnecting, sleeping %.1f min (%ds)...",
            pause_mins, pause_secs,
        )

        # 1. Detach Frida from TikTok
        try:
            self.client.close()
        except Exception as e:
            self.logger.warning("client.close failed: %s", e)

        # 2. Force-stop TikTok app
        stop_tiktok_app(ADB_DEVICE)

        # 3. Disconnect RabbitMQ
        try:
            if self.connection and not self.connection.is_closed:
                self.connection.close()
        except Exception as e:
            self.logger.warning("connection.close failed: %s", e)
        self.connection = None
        self.channel = None

        # 4. Sleep — periodically wake the screen so the device stays reachable
        sleep_with_device_wake(pause_secs)

        self.request_count = 0
        self.next_pause_at = random.randint(BURST_PAUSE_MIN_REQUESTS, BURST_PAUSE_MAX_REQUESTS)
        self._pending_pause = False

        # 5. Wake screen + relaunch TikTok (longer settle for cold start)
        wake_device(ADB_DEVICE)
        time.sleep(1)
        start_tiktok_app(ADB_DEVICE, wait_secs=10)

        # 6. Reattach Frida, with retry for transient TransportError / ProcessNotFound
        self._reattach_frida_with_retry(max_attempts=5)

        # 7. Reconnect RabbitMQ
        self.logger.info("Reconnecting to RabbitMQ; next burst pause after %d more requests", self.next_pause_at)
        self.connect()

    def _reattach_frida_with_retry(self, max_attempts: int = 5) -> None:
        reattach_frida_with_retry(self.client, self.logger, max_attempts)

    def _upload_failed_payload(
        self,
        *,
        product_id: str,
        context: str,
        gcs_date: str,
        reason: str,
        retry_attempt: int,
        task: dict | None,
        response_body: str | None,
    ) -> None:
        if not self.gcs_uploader:
            return

        payload = {
            "product_id": product_id,
            "context": context,
            "reason": reason,
            "retry_attempt": retry_attempt,
            "max_retry": MAX_RETRY,
            "task": task,
            "response_body": response_body,
            "timestamp": datetime.now().isoformat(),
        }
        failed_content = json.dumps(payload, ensure_ascii=False)
        failed_path = self.gcs_uploader.format_failed_path(gcs_date, context, product_id)
        if self.gcs_uploader.upload(failed_path, failed_content):
            self.logger.info(
                "Uploaded failed item to gs://%s/%s",
                self.gcs_uploader.bucket_name,
                failed_path,
            )
    
    def connect(self) -> None:
        """Connect to RabbitMQ."""
        if not RABBITMQ_URL:
            raise ValueError("RABBITMQ_URL not configured in .env")
        
        params = pika.URLParameters(RABBITMQ_URL)
        params.socket_timeout = 10
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()
        
        self.channel.queue_declare(
            queue=QUEUE_NAME,
            durable=True,
            arguments={"x-max-priority": QUEUE_MAX_PRIORITY}
        )
        self.channel.basic_qos(prefetch_count=1)
        self.logger.info(f"Connected to RabbitMQ, queue: {QUEUE_NAME}")
    
    def _handle_message(self, ch, method, properties, body) -> None:
        """Process a single message from the queue."""
        task = None
        content = None
        api_called = False
        try:
            task = json.loads(body.decode("utf-8"))
            product_id = task.get("product_id")
            retry_attempt = int(task.get("retry_attempt", 0))
            context = task.get("context", "default") or "default"
            gcs_date = datetime.now().strftime("%Y-%m-%d")
            
            if not product_id:
                self.logger.error("Message missing product_id, rejecting")
                ch.basic_reject(delivery_tag=method.delivery_tag, requeue=False)
                return
            
            self.logger.info(f"Processing product_id={product_id}, attempt={retry_attempt}, context={context}")
            
            status, content = fetch_single_product(
                product_id=product_id,
                client=self.client,
                gcs_uploader=self.gcs_uploader,
                gcs_date=gcs_date,
                gcs_context=context,
            )
            api_called = True
            
            if status == "success":
                self.success_count += 1
                self.logger.info(f"SUCCESS: {product_id} (total: {self.success_count})")
                ch.basic_ack(delivery_tag=method.delivery_tag)
            elif status == "not_exists":
                self.not_exists_count += 1
                self.logger.info(f"NOT_EXISTS: {product_id}")
                ch.basic_ack(delivery_tag=method.delivery_tag)
            elif status == "failed_non_retryable":
                self.failed_count += 1
                self.logger.error(
                    "NON_RETRYABLE for %s: %s",
                    product_id,
                    _truncate_for_log(content),
                )
                self._upload_failed_payload(
                    product_id=product_id,
                    context=context,
                    gcs_date=gcs_date,
                    reason="non_retryable",
                    retry_attempt=retry_attempt,
                    task=task,
                    response_body=content,
                )
                ch.basic_ack(delivery_tag=method.delivery_tag)
            else:
                raise RuntimeError(f"PDP fetch failed for {product_id}")

            self._maybe_burst_pause()

        except Exception as e:
            self.logger.error(f"Error processing message: {e}")
            retry_attempt = int(task.get("retry_attempt", 0)) if task else 0
            
            if retry_attempt < MAX_RETRY and task:
                # Requeue with incremented retry_attempt
                task["retry_attempt"] = retry_attempt + 1
                priority = min(getattr(properties, "priority", 0) or 0, QUEUE_MAX_PRIORITY)
                
                ch.basic_publish(
                    exchange="",
                    routing_key=QUEUE_NAME,
                    body=json.dumps(task).encode("utf-8"),
                    properties=pika.BasicProperties(
                        delivery_mode=2,
                        priority=priority,
                        content_type="application/json",
                    ),
                )
                ch.basic_ack(delivery_tag=method.delivery_tag)
                self.logger.info(f"Requeued with retry_attempt={retry_attempt + 1}")
            else:
                self.failed_count += 1
                self._upload_failed_payload(
                    product_id=str(task.get("product_id", "unknown")) if task else "unknown",
                    context=str(task.get("context", "default")) if task else "default",
                    gcs_date=datetime.now().strftime("%Y-%m-%d"),
                    reason="max_retry_exceeded",
                    retry_attempt=retry_attempt,
                    task=task,
                    response_body=content,
                )
                ch.basic_reject(delivery_tag=method.delivery_tag, requeue=False)
                self.logger.error(f"FAILED after {MAX_RETRY} retries, rejected")

            if api_called:
                self._maybe_burst_pause()
    
    def start_consuming(self) -> None:
        """Consume messages, pausing+reconnecting when burst threshold is hit."""
        try:
            while True:
                self._pending_pause = False
                self.logger.info("Starting to consume messages...")
                self.channel.basic_consume(
                    queue=QUEUE_NAME,
                    on_message_callback=self._handle_message,
                )
                try:
                    self.channel.start_consuming()
                except KeyboardInterrupt:
                    self.logger.info("Interrupted, stopping...")
                    try:
                        self.channel.stop_consuming()
                    except Exception:
                        pass
                    break

                if not self._pending_pause:
                    break
                self._run_burst_pause()
        finally:
            if self.connection and not self.connection.is_closed:
                try:
                    self.connection.close()
                except Exception:
                    pass
            self.logger.info(f"Done. Success: {self.success_count}, Not exists: {self.not_exists_count}, Failed: {self.failed_count}")


def init_gcs_uploader(no_gcs: bool = False) -> GCSUploader | None:
    """Initialize GCS uploader from .env config."""
    if no_gcs:
        logger.info("GCS upload disabled")
        return None
    
    try:
        credentials_path = GCS_CREDENTIALS
        if not os.path.isabs(credentials_path):
            credentials_path = str(SCRIPT_DIR / credentials_path)
        
        uploader = GCSUploader(
            bucket_name=GCS_BUCKET_NAME,
            base_path=GCS_BASE_PATH,
            credentials_path=credentials_path,
        )
        return uploader
    except Exception as e:
        logger.error(f"Failed to initialize GCS uploader: {e}")
        return None


def run_queue_mode(args) -> None:
    """Run in queue consumer mode."""
    logger.info("Starting queue consumer mode...")
    
    gcs_uploader = init_gcs_uploader(args.no_gcs)
    
    remote = None if args.usb else args.remote
    client = DirectPdpClient(remote=remote, process=args.process)
    
    try:
        client.connect()
        consumer = QueueConsumer(client=client, gcs_uploader=gcs_uploader)
        consumer.connect()
        consumer.start_consuming()
    finally:
        client.close()


def run_csv_mode(args) -> None:
    """Run in CSV processing mode."""
    csv_path = args.csv or default_csv_path()
    products = load_products(csv_path)
    if args.offset:
        products = products[args.offset:]

    total = len(products)
    output_dir = SCRIPT_DIR / args.output
    output_dir.mkdir(exist_ok=True)
    not_exists_dir = output_dir / "not_exists"
    not_exists_dir.mkdir(exist_ok=True)

    gcs_uploader = init_gcs_uploader(args.no_gcs)
    gcs_date = args.date or datetime.now().strftime("%Y-%m-%d")
    gcs_context = args.context

    if gcs_uploader:
        print(f"[*] GCS upload enabled: gs://{GCS_BUCKET_NAME}/{GCS_BASE_PATH}/{gcs_date}/{gcs_context}/results/")

    remote = None if args.usb else args.remote
    client = DirectPdpClient(remote=remote, process=args.process)

    success = failed = not_exists = 0
    target_success = args.limit if args.limit else total
    request_count = 0
    next_pause_at = random.randint(BURST_PAUSE_MIN_REQUESTS, BURST_PAUSE_MAX_REQUESTS)
    try:
        client.connect()
        print(f"[*] CSV: {csv_path}")
        print(f"[*] {len(products)} products to check, output -> {output_dir}\n")

        for i, row in enumerate(products):
            if args.limit and success >= target_success:
                print(f"[*] Reached {target_success} successful results, stopping")
                break

            result = fetch_one(
                i, total, row["product_id"],
                output_dir=output_dir,
                not_exists_dir=not_exists_dir,
                client=client,
                delay=args.delay,
                gcs_uploader=gcs_uploader,
                gcs_date=gcs_date,
                gcs_context=gcs_context,
            )
            if result == "success":
                success += 1
            elif result == "skip":
                pass
            elif result == "not_exists":
                not_exists += 1
            else:
                failed += 1

            if result == "success" and args.delay > 0:
                wait_time = random.randint(int(args.delay), int(args.delay*2))
                print(f"    Waiting {wait_time}s...", end="", flush=True)
                for remaining in range(wait_time, 0, -1):
                    print(f"\r    Waiting {remaining}s...", end="", flush=True)
                    time.sleep(1)
                print()

            if result != "skip":
                request_count += 1
                if request_count >= next_pause_at:
                    next_pause_at = run_csv_burst_pause(client, request_count)
                    request_count = 0

    except KeyboardInterrupt:
        print("\n\n[!] Interrupted")
    finally:
        client.close()
        print(f"\n[*] Done. Success: {success}, Not exists: {not_exists}, Failed: {failed}, Total: {total}")


def main() -> None:
    import argparse

    p = argparse.ArgumentParser(description="Fetch PDP via direct Retrofit RPC")
    p.add_argument("--queue", action="store_true", help="Run in queue consumer mode")
    p.add_argument("--setup", action="store_true", help="Setup device (frida-server, port forwarding, start app)")
    p.add_argument("--no-setup", action="store_true", help="Skip device setup")
    p.add_argument("--device", default=ADB_DEVICE, help="ADB device serial (default: from .env)")
    p.add_argument("--limit", type=int, default=0)
    p.add_argument("--offset", type=int, default=0)
    p.add_argument("--delay", type=float, default=DEFAULT_DELAY)
    p.add_argument("--csv", type=Path, default=None, help="Input CSV (default: input/*.csv, then products_tiktok.csv)")
    p.add_argument("--output", default="output")
    p.add_argument("-H", "--remote", default=DEFAULT_REMOTE)
    p.add_argument("--usb", action="store_true")
    p.add_argument("-n", "--process", default=DEFAULT_PROCESS)
    p.add_argument("--timeout", type=float, default=DEFAULT_TIMEOUT)
    p.add_argument("--context", default="default", help="Context/batch name for GCS path")
    p.add_argument("--date", default=None, help="Date for GCS path (default: today)")
    p.add_argument("--no-gcs", action="store_true", help="Disable GCS upload")
    args = p.parse_args()

    if not AGENT_PATH.exists():
        print(f"[!] Agent not found: {AGENT_PATH}", file=sys.stderr)
        print("[!] Run: npm run build:rpc", file=sys.stderr)
        sys.exit(1)

    # Setup device if --setup flag or if not --no-setup (default: setup)
    if args.setup or (not args.no_setup and not args.usb):
        if not setup_device(args.device):
            print("[!] Device setup failed. Use --no-setup to skip.", file=sys.stderr)
            sys.exit(1)

    if args.queue:
        run_queue_mode(args)
    else:
        run_csv_mode(args)


if __name__ == "__main__":
    main()
