/**
 * Cloudflare Worker (copy/paste target)
 *
 * Maintenance pattern:
 * - CATALOG mirrors catalog.js
 * - FEATURES mirrors features.json
 *
 * Security scope (pragmatic):
 * - origin check + basic rate limit
 * - payload shape validation
 * - whatsapp format validation
 * - server-side recalculation of totals/discount/shipping
 * - reject simple tampering with 422 calc_mismatch
 * - send only normalized payload to n8n
 *
 * Required env secret:
 * - WEBHOOK_URL
 * 
 * IMPORTANTE:
 * As alterações aqui, não estão sendo refletidas automaticamente na Cloudflare, então é necessário também acessar o site deles e atualizar manualmente.
 */

const CATALOG = {
  "version": "2026-02-20",
  "moeda": "BRL",
  "linhas": [
    {
      "id": "CUTTING",
      "nome": "CUTTING",
      "gramatura": "180 a 280g",
      "capa": "images/cutting.png",
      "precoCentavos": 3100,
      "pisoPrecoCentavos": 2197,
      "itens": [
        {
          "id": "cutting-001",
          "nome": "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada",
          "gramatura": "250g",
          "ativo": true
        },
        {
          "id": "cutting-002",
          "nome": "Macarrão a Bolonhesa",
          "gramatura": "280g",
          "ativo": true
        },
        {
          "id": "cutting-003",
          "nome": "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos",
          "gramatura": "180g",
          "ativo": true
        },
        {
          "id": "cutting-004",
          "nome": "Macarrão c/ Frango ao Molho Branco",
          "gramatura": "",
          "ativo": true
        }
      ]
    },
    {
      "id": "BULKING",
      "nome": "BULKING",
      "gramatura": "380 a 500g",
      "capa": "images/bulking.png",
      "precoCentavos": 3500,
      "pisoPrecoCentavos": 2597,
      "itens": [
        {
          "id": "bulking-001",
          "nome": "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "bulking-002",
          "nome": "Macarrão a Bolonhesa",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "bulking-003",
          "nome": "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "bulking-004",
          "nome": "Macarrão c/ Frango ao Molho Branco",
          "gramatura": "",
          "ativo": true
        }
      ]
    },
    {
      "id": "DIA_A_DIA",
      "nome": "DIA A DIA",
      "gramatura": "300g",
      "capa": "images/dia_a_dia.png",
      "precoCentavos": 2797,
      "pisoPrecoCentavos": 1997,
      "itens": [
        {
          "id": "diaadia-001",
          "nome": "Espaguete a bolonhesa",
          "gramatura": "300g",
          "ativo": true
        },
        {
          "id": "diaadia-002",
          "nome": "Pernil suíno desfiado ao molho de laranja e mel, arroz branco e purê de abóbora",
          "gramatura": "300g",
          "ativo": true
        },
        {
          "id": "diaadia-003",
          "nome": "Panqueca de frango ao molho branco de queijo parmesão",
          "gramatura": "300g",
          "ativo": true
        },
        {
          "id": "diaadia-004",
          "nome": "Strogonoff de frango com arroz branco e batata rústica assada",
          "gramatura": "300g",
          "ativo": true
        },
        {
          "id": "diaadia-005",
          "nome": "Carne moída com cenoura e batata, arroz branco e feijão carioca",
          "gramatura": "300g",
          "ativo": true
        },
        {
          "id": "diaadia-006",
          "nome": "Picadinho de carne com legumes, arroz branco, feijão carioca e farofa de cenoura",
          "gramatura": "300g",
          "ativo": true
        }
      ]
    },
    {
      "id": "SARDINHA",
      "nome": "F. SARDINHA",
      "gramatura": "300 a 350g",
      "capa": "images/sardinha.png",
      "precoCentavos": 3500,
      "pisoPrecoCentavos": 2597,
      "itens": [
        {
          "id": "sardinha-001",
          "nome": "Picadinho de frango c/ batata, cenoura e arroz branco",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "sardinha-002",
          "nome": "Iscas de frango refogada aceboladas e batata inglesa no vapor",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "sardinha-003",
          "nome": "Iscas de frango c/ mix de legumes",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "sardinha-004",
          "nome": "Escondidinho de carne moída c/ batata doce",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "sardinha-005",
          "nome": "Carne moída c/ arroz branco e cenoura refogada",
          "gramatura": "",
          "ativo": true
        }
      ]
    },
    {
      "id": "REEDUC",
      "nome": "REEDUCAÇÃO",
      "gramatura": "200g",
      "capa": "images/reeducacao.png",
      "precoCentavos": 1957,
      "pisoPrecoCentavos": 1497,
      "itens": [
        {
          "id": "reeduc-001",
          "nome": "Pernil Suíno ao Molho de Laranja e Mel com arroz integral e purê de abóbora",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "reeduc-002",
          "nome": "Macarrão Integral à Bolonhesa",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "reeduc-003",
          "nome": "Almôndegas de Frango ao Molho de Tomate com arroz integral e cenoura ralada",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "reeduc-004",
          "nome": "Panqueca Red Integral de Frango ao Molho de Tomate e Cenoura",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "reeduc-005",
          "nome": "Carne Moída com Purê de Batata Doce",
          "gramatura": "200g",
          "ativo": true
        }
      ]
    },
    {
      "id": "LOW_CARB",
      "nome": "LOW CARB",
      "gramatura": "200g",
      "capa": "images/low_carb.png",
      "precoCentavos": 1957,
      "pisoPrecoCentavos": 1497,
      "itens": [
        {
          "id": "lowcarb-001",
          "nome": "Frango à Pizzaiolo com Legumes",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "lowcarb-002",
          "nome": "Carne Moída com Mix de Legumes",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "lowcarb-003",
          "nome": "Espaguete de Cenoura à Bolonhesa",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "lowcarb-004",
          "nome": "Ragú com Abóbora em Cubos",
          "gramatura": "200g",
          "ativo": true
        },
        {
          "id": "lowcarb-005",
          "nome": "Iscas de Frango Refogado com Pimentões Coloridos e Cenoura no Vapor",
          "gramatura": "200g",
          "ativo": true
        }
      ]
    },
    {
      "id": "BASA",
      "nome": "BASA",
      "gramatura": "350 a 400g",
      "capa": "images/basa.png",
      "precoCentavos": 3600,
      "pisoPrecoCentavos": 2597,
      "itens": [
        {
          "id": "basa-001",
          "nome": "Carne desfiada c/ abóbora",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "basa-002",
          "nome": "Escondidinho de carne c/ Batata inglesa",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "basa-003",
          "nome": "Espaguete à Bolonhesa",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "basa-004",
          "nome": "Almôndegas de Frango ao molho de Tomate c/ Arroz & Cenoura",
          "gramatura": "",
          "ativo": true
        },
        {
          "id": "basa-005",
          "nome": "Panqueca de Frango ao Molho Branco",
          "gramatura": "",
          "ativo": true
        }
      ]
    }
  ]
};

const FEATURES = {
  "webhookUrl": "https://api-webhook-privado-pagina-pedidos-3fit.yurih-gomes10.workers.dev",
  "pedidoMinimo": 7,
  "descontoProgressivo": [
    {
      "minUnidades": 14,
      "maxUnidades": 20,
      "percentual": 10
    },
    {
      "minUnidades": 21,
      "maxUnidades": null,
      "percentual": 30
    }
  ],
  "freteGratis": {
    "valorMinimoCentavos": 35000,
    "valorFreteCentavos": 2000
  }
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQ = 5;
const TIMEOUT_MS = 8_000;

const PHONE_RE = /^55\d{2}9\d{8}$/;
const OBS_MAX_LEN = 500;
const MAX_ITEMS = 120;
const MAX_QTY_PER_ITEM = 200;

const ipHits = new Map();
let serverConfigCache = null;

class ValidationError extends Error {
  constructor(code, details = null) {
    super(code);
    this.code = code;
    this.details = details;
  }
}

function fail(code, details = null) {
  throw new ValidationError(code, details);
}

function assert(cond, code, details = null) {
  if (!cond) fail(code, details);
}

function sanitizeText(value, maxLen = 140) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function sanitizeObservation(value) {
  return sanitizeText(value, OBS_MAX_LEN);
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQ;
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin"
  };
}

function json(origin, status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin)
    }
  });
}

function normalizePricingRules(raw) {
  if (!Array.isArray(raw?.descontoProgressivo)) return null;

  const descontoProgressivo = raw.descontoProgressivo
    .map((item) => ({
      minUnidades: Number(item?.minUnidades),
      maxUnidades: item?.maxUnidades === null ? null : Number(item?.maxUnidades),
      percentual: Number(item?.percentual)
    }))
    .filter((item) =>
      Number.isInteger(item.minUnidades)
      && item.minUnidades > 0
      && (item.maxUnidades === null || (Number.isInteger(item.maxUnidades) && item.maxUnidades >= item.minUnidades))
      && Number.isFinite(item.percentual)
      && item.percentual >= 0
    )
    .sort((a, b) => b.minUnidades - a.minUnidades);

  if (!descontoProgressivo.length) return null;

  const valorMinimoCentavos = Number(raw?.freteGratis?.valorMinimoCentavos);
  const valorFreteCentavos = Number(raw?.freteGratis?.valorFreteCentavos);
  if (!Number.isInteger(valorMinimoCentavos) || valorMinimoCentavos < 0) return null;
  if (!Number.isInteger(valorFreteCentavos) || valorFreteCentavos < 0) return null;

  return {
    descontoProgressivo,
    freteGratis: { valorMinimoCentavos, valorFreteCentavos }
  };
}

function getServerConfig() {
  if (serverConfigCache) return serverConfigCache;

  const lines = (CATALOG.linhas || []).map((line) => ({
    id: line.id,
    nome: line.nome || line.id,
    gramatura: line.gramatura || "",
    precoCentavos: Number.isInteger(line.precoCentavos) ? line.precoCentavos : null,
    pisoPrecoCentavos: Number.isInteger(line.pisoPrecoCentavos) ? line.pisoPrecoCentavos : null,
    itens: (line.itens || []).filter((item) => item.ativo !== false)
  }));

  const products = lines.flatMap((line) =>
    line.itens.map((item, idx) => ({
      id: item.id || (line.id.toLowerCase() + "-" + String(idx + 1)),
      lineId: line.id,
      lineName: line.nome,
      lineGramatura: line.gramatura || "",
      name: item.nome,
      precoCentavos: Number.isInteger(item.precoCentavos) ? item.precoCentavos : line.precoCentavos,
      pisoPrecoCentavos: Number.isInteger(item.pisoPrecoCentavos) ? item.pisoPrecoCentavos : line.pisoPrecoCentavos
    }))
  );

  const pricingRules = normalizePricingRules(FEATURES);
  if (!pricingRules) {
    throw new Error("server_config_pricing_invalid");
  }

  const productById = new Map();
  for (const product of products) {
    if (!product.id) throw new Error("server_config_product_id_invalid");
    if (!Number.isInteger(product.precoCentavos) || product.precoCentavos < 0) {
      throw new Error("server_config_product_price_invalid:" + String(product.id));
    }
    productById.set(product.id, product);
  }

  if (!productById.size) {
    throw new Error("server_config_empty_catalog");
  }

  serverConfigCache = {
    catalogVersion: String(CATALOG.version || "sem-versao"),
    currency: String(CATALOG.moeda || "BRL"),
    pricingRules,
    productById
  };

  return serverConfigCache;
}

function getEffectiveUnitPriceCentavos(item, percentual) {
  if (!Number.isInteger(item?.precoCentavos)) return null;
  if (!(percentual > 0)) return item.precoCentavos;
  const fatorDesconto = Math.max(0, 1 - (percentual / 100));
  const precoComDesconto = Math.round(item.precoCentavos * fatorDesconto);
  return Number.isInteger(item.pisoPrecoCentavos)
    ? Math.max(precoComDesconto, item.pisoPrecoCentavos)
    : precoComDesconto;
}

function getDiscountInfo(selectedItems, totalUnidades, totalBrutoCentavos, pricingRules) {
  const rule = pricingRules.descontoProgressivo.find((item) =>
    totalUnidades >= item.minUnidades
    && (item.maxUnidades === null || totalUnidades <= item.maxUnidades)
  ) || null;

  const percentual = rule?.percentual || 0;
  const totalLiquidoCentavos = selectedItems.reduce((acc, item) => {
    const precoUnitarioEfetivoCentavos = getEffectiveUnitPriceCentavos(item, percentual);
    const subtotalEfetivoCentavos = Number.isInteger(precoUnitarioEfetivoCentavos)
      ? precoUnitarioEfetivoCentavos * item.quantidade
      : 0;
    return acc + subtotalEfetivoCentavos;
  }, 0);

  const descontoCentavos = Math.max(0, totalBrutoCentavos - totalLiquidoCentavos);
  return { percentual, descontoCentavos, totalLiquidoCentavos };
}

function getShippingInfo(totalLiquidoCentavos, pricingRules) {
  const valorMinimoCentavos = pricingRules.freteGratis.valorMinimoCentavos;
  const valorFreteCentavos = pricingRules.freteGratis.valorFreteCentavos;
  const elegivel = totalLiquidoCentavos >= valorMinimoCentavos;
  const faltamCentavos = elegivel ? 0 : Math.max(0, valorMinimoCentavos - totalLiquidoCentavos);
  const valorCobradoCentavos = elegivel ? 0 : valorFreteCentavos;

  return { valorMinimoCentavos, valorFreteCentavos, valorCobradoCentavos, elegivel, faltamCentavos };
}

function compareClientTotals(clientPedido, serverPedido) {
  const fields = [
    "totalUnidades",
    "totalBrutoCentavos",
    "descontoPercentual",
    "descontoCentavos",
    "totalCentavos",
    "totalComFreteCentavos",
    "freteValorCentavos",
    "freteCobradoCentavos",
    "freteGratisElegivel",
    "freteGratisFaltamCentavos"
  ];

  const mismatches = [];
  for (const field of fields) {
    if (clientPedido?.[field] !== serverPedido?.[field]) {
      mismatches.push({
        field,
        client: clientPedido?.[field] ?? null,
        server: serverPedido?.[field] ?? null
      });
    }
  }

  return mismatches;
}

function validateAndNormalizePayload(payload, config) {
  assert(payload && typeof payload === "object", "payload_invalid");

  const contatoWhatsapp = sanitizeText(payload?.metadata?.contatoWhatsapp, 20);
  assert(PHONE_RE.test(contatoWhatsapp), "whatsapp_invalid");

  const incomingItems = payload?.pedido?.itens;
  assert(Array.isArray(incomingItems) && incomingItems.length > 0, "items_missing");
  assert(incomingItems.length <= MAX_ITEMS, "items_too_many");

  const selectedItems = incomingItems.map((item) => {
    assert(item && typeof item === "object", "item_invalid");
    assert(typeof item.id === "string" && item.id.length > 0, "item_id_invalid");
    assert(Number.isInteger(item.quantidade) && item.quantidade > 0 && item.quantidade <= MAX_QTY_PER_ITEM, "item_qty_invalid", {
      id: item.id,
      quantidade: item.quantidade
    });

    const product = config.productById.get(item.id);
    assert(product, "item_not_found", { id: item.id });

    return {
      ...product,
      quantidade: item.quantidade,
      clientLineGramatura: sanitizeText(item.linhaGramatura || "", 40)
    };
  });

  const totalUnidades = selectedItems.reduce((acc, item) => acc + item.quantidade, 0);
  const totalBrutoCentavos = selectedItems.reduce((acc, item) => acc + (item.precoCentavos * item.quantidade), 0);

  const discountInfo = getDiscountInfo(selectedItems, totalUnidades, totalBrutoCentavos, config.pricingRules);
  const shippingInfo = getShippingInfo(discountInfo.totalLiquidoCentavos, config.pricingRules);
  const totalComFreteCentavos = discountInfo.totalLiquidoCentavos + shippingInfo.valorCobradoCentavos;

  const serverPedido = {
    totalUnidades,
    totalBrutoCentavos,
    descontoPercentual: discountInfo.percentual,
    descontoCentavos: discountInfo.descontoCentavos,
    totalCentavos: discountInfo.totalLiquidoCentavos,
    totalComFreteCentavos,
    freteValorCentavos: shippingInfo.valorFreteCentavos,
    freteCobradoCentavos: shippingInfo.valorCobradoCentavos,
    freteGratisElegivel: shippingInfo.elegivel,
    freteGratisFaltamCentavos: shippingInfo.faltamCentavos
  };

  const mismatches = compareClientTotals(payload?.pedido, serverPedido);
  if (mismatches.length > 0) {
    fail("calc_mismatch", mismatches);
  }

  const itens = selectedItems.map((item) => {
    const precoUnitarioEfetivoCentavos = getEffectiveUnitPriceCentavos(item, discountInfo.percentual);
    return {
      id: item.id,
      linhaId: item.lineId,
      linha: item.lineName,
      linhaGramatura: item.lineGramatura || item.clientLineGramatura,
      produto: item.name,
      quantidade: item.quantidade,
      precoUnitarioCentavos: item.precoCentavos,
      subtotalCentavos: item.precoCentavos * item.quantidade,
      precoUnitarioEfetivoCentavos: Number.isInteger(precoUnitarioEfetivoCentavos)
        ? precoUnitarioEfetivoCentavos
        : item.precoCentavos,
      subtotalEfetivoCentavos: Number.isInteger(precoUnitarioEfetivoCentavos)
        ? precoUnitarioEfetivoCentavos * item.quantidade
        : item.precoCentavos * item.quantidade
    };
  });

  return {
    metadata: {
      origem: sanitizeText(payload?.metadata?.origem || "landing-page-revenda-3fit", 80),
      geradoEm: new Date().toISOString(),
      revendedor: sanitizeText(payload?.metadata?.revendedor || "Revendedor autorizado 3Fit", 120),
      canalAtendimento: sanitizeText(payload?.metadata?.canalAtendimento || "whatsapp-agente-ia", 80),
      contatoWhatsapp,
      catalogVersion: sanitizeText(payload?.metadata?.catalogVersion || config.catalogVersion, 40),
      moeda: config.currency
    },
    observacoesPedido: sanitizeObservation(payload?.observacoesPedido),
    pedido: {
      parametrosComerciais: {
        regrasDescontoProgressivo: config.pricingRules.descontoProgressivo.map((rule) => ({
          minUnidades: rule.minUnidades,
          maxUnidades: rule.maxUnidades,
          percentual: rule.percentual
        })),
        freteGratisValorMinimoCentavos: config.pricingRules.freteGratis.valorMinimoCentavos,
        freteValorCentavos: config.pricingRules.freteGratis.valorFreteCentavos
      },
      totalUnidades: serverPedido.totalUnidades,
      totalBrutoCentavos: serverPedido.totalBrutoCentavos,
      descontoPercentual: serverPedido.descontoPercentual,
      descontoCentavos: serverPedido.descontoCentavos,
      totalCentavos: serverPedido.totalCentavos,
      totalComFreteCentavos: serverPedido.totalComFreteCentavos,
      freteValorCentavos: serverPedido.freteValorCentavos,
      freteCobradoCentavos: serverPedido.freteCobradoCentavos,
      freteGratisElegivel: serverPedido.freteGratisElegivel,
      freteGratisFaltamCentavos: serverPedido.freteGratisFaltamCentavos,
      precoPendente: false,
      itens
    }
  };
}

export default {
  async fetch(req, env) {
    const allowedOrigins = [
      // DEV LOCAL: keep enabled while testing
      //"http://127.0.0.1:3000",

      // PRODUCTION
      "https://3fit.sollucion.com",
      "https://www.3fit.sollucion.com"
    ];

    const fallbackOrigin = allowedOrigins[0];
    const origin = req.headers.get("Origin") || "";
    const originAllowed = allowedOrigins.includes(origin);

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": originAllowed ? origin : fallbackOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          Vary: "Origin"
        }
      });
    }

    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    if (!originAllowed) return new Response("Forbidden", { status: 403 });
    if (!env.WEBHOOK_URL) return json(origin, 500, { ok: false, error: "webhook_not_configured" });

    const ip = req.headers.get("CF-Connecting-IP") || "unknown";
    if (isRateLimited(ip)) {
      return new Response("Too Many Requests", {
        status: 429,
        headers: { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      });
    }

    let config;
    try {
      config = getServerConfig();
    } catch (err) {
      return json(origin, 500, { ok: false, error: String(err?.message || "server_config_invalid") });
    }

    let payload;
    try {
      payload = await req.json();
    } catch {
      return json(origin, 400, { ok: false, error: "invalid_json" });
    }

    let normalizedPayload;
    try {
      normalizedPayload = validateAndNormalizePayload(payload, config);
    } catch (err) {
      if (err instanceof ValidationError) {
        return json(origin, 422, {
          ok: false,
          error: err.code,
          details: err.details || null
        });
      }
      return json(origin, 422, { ok: false, error: "invalid_payload" });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort("timeout"), TIMEOUT_MS);

    try {
      const upstream = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedPayload),
        signal: controller.signal
      });

      return new Response(await upstream.text(), {
        status: upstream.status,
        headers: { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      });
    } catch (err) {
      const isTimeout = String(err).includes("timeout") || err?.name === "AbortError";
      return new Response(isTimeout ? "Gateway Timeout" : "Bad Gateway", {
        status: isTimeout ? 504 : 502,
        headers: { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }
};
