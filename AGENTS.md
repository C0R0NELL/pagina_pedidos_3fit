# Repository Guidelines

## Intentions (What Must Be Preserved)
- Keep the ordering experience clear, fast, and mobile-first.
- Keep business rules data-driven (`features.json`), not hardcoded in UI text.
- Preserve visual consistency through CSS tokens in `:root`.
- Treat integration/security as first-class: public frontend, protected backend proxy.

## Change Mapping (Where to Edit)
- Product catalog, lines, dish names, per-line pricing:
  - `catalog.js`
- Commercial rules (discount tiers, shipping thresholds, public proxy URL):
  - `features.json`
- UX/UI behavior, copy, modal/dock logic, payload shape:
  - `index.html`
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

## Security Boundaries
- Never commit real secret endpoints.
- Public repo is fine; secrets must stay server-side (Cloudflare Worker secret).
- If an endpoint is exposed, rotate it immediately.

## Commit & PR Expectations
- Use scoped, descriptive commits (e.g., `mobile-dock: improve max discount status`).
- PR should include: what changed, why, screenshots (desktop/mobile), and manual test notes.
