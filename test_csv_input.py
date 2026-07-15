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


if __name__ == "__main__":
    test_default_csv_prefers_input_folder()
    print("ok")
