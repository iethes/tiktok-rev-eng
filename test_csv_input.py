import importlib.util
import tempfile
from pathlib import Path

spec = importlib.util.spec_from_file_location("magpie_direct", "magpie-direct.py")
magpie_direct = importlib.util.module_from_spec(spec)
spec.loader.exec_module(magpie_direct)


def test_default_csv_prefers_input_folder():
    with tempfile.TemporaryDirectory() as d:
        root = Path(d)
        (root / "products_tiktok.csv").write_text("product_id\nold\n")
        input_dir = root / "input"
        input_dir.mkdir()
        csv_path = input_dir / "tiktok_rio.csv"
        csv_path.write_text("date,region,merchant_id,product_id\n2026-07-15,id,m,173\n")

        assert magpie_direct.default_csv_path(root) == csv_path


def test_fetch_one_recovers_when_app_goes_background():
    calls = []

    class Client:
        bodies = iter([
            '{"message":"drop background requests"}',
            '{"ok":true,"data":"' + ('x' * 10020) + '"}',
        ])
        def call_pdp(self, _product_id):
            return next(self.bodies)

    old = magpie_direct.restart_tiktok_session
    try:
        magpie_direct.restart_tiktok_session = lambda _client, reason="": calls.append(reason)
        with tempfile.TemporaryDirectory() as d:
            out = Path(d) / "out"
            ne = out / "not_exists"
            out.mkdir(); ne.mkdir()
            assert magpie_direct.fetch_one(
                0, 1, "173",
                output_dir=out,
                not_exists_dir=ne,
                client=Client(),
                delay=0,
            ) == "success"
        assert calls == ["app went background"]
    finally:
        magpie_direct.restart_tiktok_session = old


def test_csv_burst_pause_closes_app_and_reattaches():
    calls = []

    class Client:
        def close(self): calls.append("close")
        def connect(self): calls.append("connect")

    old = {
        "randint": magpie_direct.random.randint,
        "sleep": magpie_direct.time.sleep,
        "wake": magpie_direct.wake_device,
        "stop": magpie_direct.stop_tiktok_app,
        "start": magpie_direct.start_tiktok_app,
    }
    values = iter([0, 31])
    try:
        magpie_direct.random.randint = lambda *_: next(values)
        magpie_direct.time.sleep = lambda *_: None
        magpie_direct.wake_device = lambda *_: calls.append("wake")
        magpie_direct.stop_tiktok_app = lambda *_: calls.append("stop")
        magpie_direct.start_tiktok_app = lambda *_args, **_kw: calls.append("start")

        assert magpie_direct.run_csv_burst_pause(Client(), 30) == 31
        assert calls == ["close", "stop", "wake", "wake", "start", "connect"]
    finally:
        magpie_direct.random.randint = old["randint"]
        magpie_direct.time.sleep = old["sleep"]
        magpie_direct.wake_device = old["wake"]
        magpie_direct.stop_tiktok_app = old["stop"]
        magpie_direct.start_tiktok_app = old["start"]


if __name__ == "__main__":
    test_default_csv_prefers_input_folder()
    test_fetch_one_recovers_when_app_goes_background()
    test_csv_burst_pause_closes_app_and_reattaches()
    print("ok")
