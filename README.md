# Página de Pedidos — Revenda Licenciada 3FIT

Página criada para disponibilizar um formulário de pedidos para a revenda licenciada 3FIT.

## Mapa de Responsabilidades (Fonte de Verdade)

- `catalog.js`: cardápio base (linhas, pratos, ids, nomes, preços, estrutura comercial).
- `stock.json`: disponibilidade dinâmica (estoque e `ativo` por prato).
- `features.json`: regras comerciais dinâmicas (desconto, frete, thresholds, URL pública do proxy e configuração da reposição personalizada).
- `cloudflare-worker.js`: validação server-side e anti-tampering (recalcula totais e valida estoque).

Nota: o arquivo de catálogo é `catalog.js` (não `catalog.json`).

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
Orquestração em produção: **`CRON - Fluxos com agendamento`** dispara esse fluxo.

Política operacional:
- execução a cada 30 minutos;
- montar/validar `stock.json` a partir da planilha;
- falhar execução em caso de `key` duplicada;
- commitar no GitHub somente quando houver diff real em `items` (ignorar `version`/`updatedAt`);
- não alterar outros fluxos em produção.
- fluxo atual não cria `stock.json`; ele edita o arquivo existente (se faltar no repo, a execução falha).

## Reposição Personalizada (Nova Feature)

- Configuração data-driven em `features.json.reposicaoPersonalizada`.
- Exibição no frontend: aviso com link clicável abaixo da montagem do pedido.
- Ao clicar, abre modal compacto com todos os itens do `catalog.js` e quantidade livre.
- Envio usa o mesmo endpoint público de `features.json.webhookUrl`.
- Diferenciação no backend por `payload.tipo`: `"pedido"` ou `"encomenda"`.

## Notas Críticas para Futuras Mudanças

- `catalog.js` é fonte estável de cardápio/preço/estrutura; disponibilidade dinâmica pertence ao `stock.json`.
- `ativo` por prato deve ser operado no `stock.json` (junto com `estoque`).
- Worker é a barreira anti-manipulação: pedido acima do estoque deve retornar `422 item_stock_exceeded`.

## Cadeia de Modificação (O Que Muda em Cada Cenário)

1. Mudança de estoque/ativo (operação diária):
- planilha -> `ATUALIZA SITE CONFORME ESTOQUE` -> commit de `stock.json` (apenas com diff em `items`) -> frontend/worker passam a usar novo snapshot.
- não exige sync manual de bloco estático no Worker.

2. Mudança de catálogo (renomear prato, adicionar/remover prato, adicionar/remover linha):
- editar `catalog.js`;
- atualizar planilha para refletir as novas chaves `LINHA - NOME DO PRATO`;
- sincronizar bloco `CATALOG` no `cloudflare-worker.js`;
- deploy manual do Worker na Cloudflare;
- validar execução do fluxo de estoque (ele falha se houver mismatch entre planilha e catálogo, por segurança).

3. Mudança de regra comercial (desconto/frete/thresholds/proxy):
- editar `features.json`;
- sincronizar bloco `FEATURES` no `cloudflare-worker.js`;
- deploy manual do Worker na Cloudflare;
- validar pedido real (cálculo de desconto/frete).

4. Mudança de contrato de payload/UI:
- alterar `index.html` + `cloudflare-worker.js` no mesmo change set;
- validar anti-tampering e compatibilidade de payload ponta a ponta.
