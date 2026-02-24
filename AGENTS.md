# Repository Guidelines

## Intentions (What Must Be Preserved)
- Keep the ordering experience clear, fast, and mobile-first.
- Keep business rules data-driven (`features.json`), not hardcoded in UI text.
- Keep commercial thresholds/gates data-driven (`features.json`), never hardcoded in UI logic.
- Preserve visual consistency through CSS tokens in `:root`.
- Treat integration/security as first-class: public frontend, protected backend proxy.

## Change Mapping (Where to Edit)
- Product catalog, lines, dish names, per-line pricing:
  - `catalog.js`
- Commercial rules (discount tiers, shipping thresholds, public proxy URL):
  - `features.json`
- UX/UI behavior, copy, modal/dock logic, payload shape:
  - `index.html`
- Worker-side payload normalization and anti-tampering recalculation:
  - `cloudflare-worker.js`
- Images and branding assets:
  - `images/`

## Project Structure
- `index.html`: main app (markup + CSS + JS).
- `catalog.js`: product/line source data.
- `features.json`: runtime commercial config.
- `images/`: visual assets.

## Local Development
- `python3 -m http.server 3000` -> run at `http://127.0.0.1:3000/index.html`
- `rg "pattern" index.html` -> fast search
- `git diff -- index.html` -> review behavior/UI changes

## Validation Checklist (Before Merge/Deploy)
1. Desktop + mobile layout sanity (cards, dock, modals, buttons).
2. Discount states: none, first tier, max tier.
3. Shipping states: not eligible and eligible.
4. Payload review: totals, discount, shipping, items.
5. `features.json` reviewed for correct business values.

## Production Pipeline (Current)
- Cloudflare Worker deploy is currently manual (copy/paste in Cloudflare dashboard).
- If `catalog.js` or `features.json` changes, the Worker data blocks (`CATALOG` and `FEATURES`) must be manually synced before production is considered updated.
- Agents must explicitly remind this dependency in the final handoff whenever catalog/rules are changed.
- Keep local Worker source in repo for maintenance (`cloudflare-worker.js`), but do not assume auto CI/CD deploy.

## Security Boundaries
- Never commit real secret endpoints.
- Public repo is fine; secrets must stay server-side (Cloudflare Worker secret).
- If an endpoint is exposed, rotate it immediately.

## Commit & PR Expectations
- Use scoped, descriptive commits (e.g., `mobile-dock: improve max discount status`).
- PR should include: what changed, why, screenshots (desktop/mobile), and manual test notes.
- If payload shape changes in `index.html`, mirror and validate the same contract in `cloudflare-worker.js` within the same change set.
