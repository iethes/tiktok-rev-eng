#!/usr/bin/env python3
"""
Fetch PDP data for every product in products_tiktok.csv via direct Retrofit RPC.

Calls refreshPdpGodaV2SDUI directly through the app's Retrofit client,
which handles auth, signing, cookies, and interceptors automatically.
Only product_id is needed — no body template required.

Usage:
    uv run python magpie-direct.py
    uv run python magpie-direct.py --limit 10
    uv run python magpie-direct.py --delay 0.5
    uv run python magpie-direct.py -H 192.168.1.5:27042 -n Gadget
    uv run python magpie-direct.py --output results
"""

import random
import csv
import json
import os
import sys
import threading
import time
from pathlib import Path

import frida

SCRIPT_DIR = Path(__file__).resolve().parent
AGENT_PATH = SCRIPT_DIR / "_agent_rpc.js"
CSV_PATH = SCRIPT_DIR / "products_tiktok.csv"

MAX_ATTEMPTS = 3
MIN_RESPONSE_LEN = 10_000
DEFAULT_REMOTE = "127.0.0.1:27042"


class DirectPdpClient:
    def __init__(self, remote: str | None, process: str):
        self._remote = remote
        self._process = process
        self._session: frida.core.Session | None = None
        self._script: frida.core.Script | None = None
        self._lock = threading.Lock()
        self._pending: dict[str, threading.Event] = {}
        self._results: dict[str, dict] = {}

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

    def close(self) -> None:
        if self._script:
            try:
                self._script.unload()
            except Exception:
                pass
        if self._session:
            try:
                self._session.detach()
            except Exception:
                pass
        print("[*] Detached")


def load_products(csv_path: Path) -> list[dict]:
    with open(csv_path, newline="") as f:
        return list(csv.DictReader(f))[::-1]


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


def fetch_one(
    idx: int,
    total: int,
    product_id: str,
    *,
    output_dir: Path,
    not_exists_dir: Path,
    client: DirectPdpClient,
    delay: float,
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
            ne_file.write_text(json.dumps({"not_exists": True}))
            print("  NOT_EXISTS")
            return "not_exists"

        if body and blen > MIN_RESPONSE_LEN:
            try:
                data = json.loads(body)
                out_file.write_text(json.dumps(data, indent=4, ensure_ascii=False))
            except (json.JSONDecodeError, TypeError):
                out_file.write_text(body)
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


def main() -> None:
    import argparse

    p = argparse.ArgumentParser(description="Fetch PDP via direct Retrofit RPC")
    p.add_argument("--limit", type=int, default=0)
    p.add_argument("--offset", type=int, default=0)
    p.add_argument("--delay", type=float, default=0.5)
    p.add_argument("--output", default="output")
    p.add_argument("-H", "--remote", default=DEFAULT_REMOTE)
    p.add_argument("--usb", action="store_true")
    p.add_argument("-n", "--process", default="TikTok")
    p.add_argument("--timeout", type=float, default=30.0)
    args = p.parse_args()

    if not AGENT_PATH.exists():
        print(f"[!] Agent not found: {AGENT_PATH}", file=sys.stderr)
        print("[!] Run: npm run build:rpc", file=sys.stderr)
        sys.exit(1)

    products = load_products(CSV_PATH)
    if args.offset:
        products = products[args.offset:]

    total = len(products)
    output_dir = SCRIPT_DIR / args.output
    output_dir.mkdir(exist_ok=True)
    not_exists_dir = output_dir / "not_exists"
    not_exists_dir.mkdir(exist_ok=True)

    remote = None if args.usb else args.remote
    client = DirectPdpClient(remote=remote, process=args.process)

    success = failed = not_exists = 0
    target_success = args.limit if args.limit else total
    try:
        client.connect()
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

    except KeyboardInterrupt:
        print("\n\n[!] Interrupted")
    finally:
        client.close()
        print(f"\n[*] Done. Success: {success}, Not exists: {not_exists}, Failed: {failed}, Total: {total}")


if __name__ == "__main__":
    main()
