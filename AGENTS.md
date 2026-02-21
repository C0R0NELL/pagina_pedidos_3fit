# Repository Guidelines

## Project Structure & Module Organization
This is a static front-end repository for the 3Fit ordering page.

- `index.html`: Main application file (layout, styles, and client-side logic).
- `catalog.js`: Product catalog and line metadata consumed by the UI.
- `features.json`: Runtime business configuration (discount tiers, shipping rules, webhook URL).
- `images/`: Brand and product assets used by cards and banners.
- `README.md`, `CNAME`, `LICENSE`: Project metadata and deployment/domain info.

There is no `src/` split yet; keep related changes grouped and readable inside `index.html`.

## Build, Test, and Development Commands
No build step is required.

- `python3 -m http.server 3000`
  - Run locally at `http://127.0.0.1:3000/index.html`.
- `rg "pattern" index.html`
  - Fast code search (selectors, strings, logic blocks).
- `git diff -- index.html`
  - Review UI and business-logic edits before commit.

## Coding Style & Naming Conventions
- Use 2-space indentation in HTML, CSS, and JS blocks.
- Prefer data-driven values in `features.json` and CSS tokens in `:root`.
- JavaScript naming: `camelCase` for variables/functions; descriptive names (`getOrderSnapshot`, `buildPayload`).
- CSS naming follows existing component conventions (`block__element`, `block--modifier`).
- Keep user-facing copy in pt-BR unless technical wording requires otherwise.

## Testing Guidelines
There is currently no automated test framework in this repository. Use manual validation:

1. Verify desktop and mobile layouts.
2. Validate discount/freight scenarios (no discount, first tier, max tier).
3. Confirm payload fields in review/send flow and webhook request behavior.

For pricing or payload changes, test at least one case per discount tier.

## Commit & Pull Request Guidelines
Git history currently mixes styles (e.g., short backup commits and descriptive messages). Prefer clear, scoped commits going forward.

- Commit format example: `mobile-dock: show 10% OFF active note`
- PR checklist:
  - Summary of what changed and why.
  - Screenshots for UI updates (desktop + mobile).
  - Payload/schema notes when webhook fields change.
  - Manual test steps and outcomes.

## Security & Configuration Tips
- Do not commit real webhook secrets/endpoints.
- Keep `features.json` safe for public versioning (use placeholders when needed).

## Checklist de Release
Antes de publicar, execute esta conferência mínima:

1. Layout em desktop e mobile sem quebras visuais (cards, modal, dock e botões principais).
2. Fluxos de desconto validados: sem desconto, primeira faixa (ex.: 10%) e desconto máximo.
3. Fluxo de frete validado: não elegível e elegível para frete grátis.
4. Modal de conferência com textos/valores corretos e estados de progresso consistentes.
5. Payload do pedido revisado no envio (campos de desconto, frete, totais e itens).
6. `features.json` revisado (sem endpoints secretos e com regras comerciais corretas).
7. Último `git diff` revisado para evitar mudanças acidentais.
