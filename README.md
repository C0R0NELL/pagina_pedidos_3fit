# Página de Pedidos — Revenda Licenciada 3FIT

Página criada para disponibilizar um formulário de pedidos para a revenda licenciada 3FIT.

## Sincronização Manual do Worker (Cloudflare)

IMPORTANTE: qualquer alteração em `catalog.js` ou `features.json` precisa ser replicada em `cloudflare-worker.js` e depois manualmente no Worker no site da Cloudflare.

Checklist rápido após mudanças comerciais:
- atualizar `catalog.js` e/ou `features.json`;
- copiar as mudanças para o Worker (blocos `CATALOG` e `FEATURES`);
- publicar/deploy do Worker;
- validar um envio real do pedido.

## Estoque Dinâmico (`stock.json`)

O estoque operacional agora é separado do catálogo e publicado no arquivo público `stock.json`.

Contrato:

```json
{
  "version": "2026-03-01T12:00:00Z",
  "updatedAt": "2026-03-01T12:00:00Z",
  "items": [
    { "key": "CUTTING - Carne Moída c/ Cuscuz de Milho e Cenoura Refogada", "estoque": 12, "ativo": true }
  ]
}
```

Regras:
- `key` usa o formato `LINHA - NOME DO PRATO`;
- matching é exato após `trim` + colapso de espaços;
- `estoque` inválido/negativo é tratado como `0`.
- `ativo` por prato é opcional; quando ausente, assume `true`.
- disponibilidade final do prato: `ativo !== false` e `estoque > 0`.

## Fluxo n8n de Estoque (produção)

Fluxo alvo: **`ATUALIZA SITE CONFORME ESTOQUE`**.

Política operacional:
- execução a cada 30 minutos;
- montar/validar `stock.json` a partir da planilha;
- falhar execução em caso de `key` duplicada;
- commitar no GitHub somente quando houver diff real no conteúdo;
- não alterar outros fluxos em produção.
