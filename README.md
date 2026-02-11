
# Starfleet Civilian Access — LCARS Guest Portal

Upload the folder contents to your GitHub repo root. Ensure GitHub Pages is enabled (Settings → Pages → Deploy from a branch → main / root).

UniFi: set Guest SSID → Hotspot → External Portal → `https://<user>.github.io/starfleet-civilian-access/`

To show Mission Briefing: create `data/mission-briefing.json` with:
```
{
  "updated": "2026-02-10T23:15:00Z",
  "items": [ {"title":"Notice","body":"Message."} ]
}
```
