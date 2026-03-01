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
- Dynamic stock availability (`estoque` + per-item `ativo`):
  - `stock.json`
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
- `stock.json`: dynamic stock snapshot published by n8n.
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

## Dynamic Stock Guardrails (Critical)
- `catalog.js` is stable source for structure/pricing; dynamic availability must come from `stock.json` only.
- Stock key contract: `LINHA - NOME DO PRATO` with exact match after `trim` + whitespace collapse.
- n8n diff decision must compare only `items`; do not use `version`/`updatedAt` to decide update.
- Current production flow updates existing `stock.json` (no create step); missing `stock.json` must fail execution.
- Worker must keep server-side enforcement for stock (`422 stock_unavailable` and `422 item_stock_exceeded`).

## Stock Update Chain (Critical)
- Production orchestration: `CRON - Fluxos com agendamento` triggers `ATUALIZA SITE CONFORME ESTOQUE`.
- Stock-only changes: spreadsheet -> `stock.json` commit (no Worker static block sync required).
- Catalog changes (`catalog.js`): spreadsheet keys must be updated to match; Worker `CATALOG` block must be manually synced and deployed.
- Commercial changes (`features.json`): Worker `FEATURES` block must be manually synced and deployed.

## Security Boundaries
- Never commit real secret endpoints.
- Public repo is fine; secrets must stay server-side (Cloudflare Worker secret).
- If an endpoint is exposed, rotate it immediately.

## Commit & PR Expectations
- Use scoped, descriptive commits (e.g., `mobile-dock: improve max discount status`).
- PR should include: what changed, why, screenshots (desktop/mobile), and manual test notes.
- If payload shape changes in `index.html`, mirror and validate the same contract in `cloudflare-worker.js` within the same change set.
