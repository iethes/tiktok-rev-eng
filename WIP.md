# TikTok RPC Hijack - Session Summary

## CSV Input

`magpie-direct.py` now prefers the first `input/*.csv` file when running CSV mode. The CSV only needs a `product_id` column; extra columns are ignored.

```bash
python magpie-direct.py --csv input/tiktok_rio.csv --limit 10
# or omit --csv to auto-pick input/*.csv
```

Duplicate `product_id` rows are skipped once the matching `output/<product_id>.json` exists, so `Success` counts unique fetched products, not input rows.


## Setup Progress

### Environment
- Device: Android (connected via ADB TCPIP at 192.168.68.111:55555)
- Host: macOS (Apple Silicon)
- Frida versions now aligned: **17.9.1** (both host and device)

### Issues Resolved
1. **Frida version mismatch**: Upgraded host frida from 17.4.0 to 17.9.1
2. **Broken venv**: Recreated `.venv` after pip was pointing to anaconda instead of venv
3. **Frida-server restart**: Killed stale process on port 27042 and restarted frida-server

### Resolved
- **Root cause**: frida-server was bound to `127.0.0.1:27042` (loopback only), unreachable over WiFi
- **Fix**: ADB port forward + update defaults in script
  - `adb -s 192.168.68.111:55555 forward tcp:27042 tcp:27042` (run before each session)
  - `DEFAULT_REMOTE = "127.0.0.1:27042"`
  - `--process` default changed from `Gadget` → `TikTok`
- Port 9993 on device is **ZeroTier** peer comms, not frida

### Run
```bash
# One-time per session: forward frida port
adb -s 192.168.68.111:55555 forward tcp:27042 tcp:27042

# Run scraper
python magpie-direct.py --limit 10
```
