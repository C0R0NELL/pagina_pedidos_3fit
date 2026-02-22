# Página de Pedidos — Revenda Licenciada 3FIT

Página criada para disponibilizar um formulário de pedidos para a revenda licenciada 3FIT.

## Sincronização Manual do Worker (Cloudflare)

IMPORTANTE: qualquer alteração em `catalog.js` ou `features.json` precisa ser replicada em `cloudflare-worker.js` e depois manualmente no Worker no site da Cloudflare.

Checklist rápido após mudanças comerciais:
- atualizar `catalog.js` e/ou `features.json`;
- copiar as mudanças para o Worker (blocos `CATALOG` e `FEATURES`);
- publicar/deploy do Worker;
- validar um envio real do pedido.
