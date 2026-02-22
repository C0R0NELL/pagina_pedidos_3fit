/*
  Catalogo de produtos 3Fit
  - Edite precoCentavos em CENTAVOS (inteiro) no nivel da linha
  - Edite pisoPrecoCentavos (preco minimo unitario no desconto maximo) no nivel da linha
  - Para desativar temporariamente um prato, use ativo: false no item
  - Para gramatura por prato, use gramatura: "180g" no item
  - Mantenha ids estaveis (linha e item) para evitar quebrar payloads/historico
  - Regras de desconto/frete ficam no features.json (nao neste arquivo)
  - IMPORTANTE: alterou este arquivo ou o features.json?
    Atualize cloudflare-worker.js e tbm atualize **manualmente** o Worker lá na Cloudflare (blocos CATALOG/FEATURES),
    publique o Worker e valide um envio real, isso é segurança anti manipulação de valores no front-end no envio do pedido no formulário
  - Exemplos:
    - R$ 36,00 => precoCentavos: 3600
    - R$ 19,57 => precoCentavos: 1957
  - Para adicionar nova linha: copie um bloco em "linhas"
  - Para adicionar nova marmita: adicione um item em "itens"
*/


// QUALQUER ALTERAÇÃO AQUI (catalog.js) OU EM features.json, TEM QUE SER REPETIDA MANUALMENTE NO WORKER NO SITE CLOUDFLARE (e não somente em cloudflare-worker.js) ISSO É PARA GARANTIR A INTEGRIDADE DOS DADOS NO ENVIO DO PEDIDO
window.CATALOG = { 
  version: "2026-02-20",
  moeda: "BRL",
  linhas: [
    {
      id: "CUTTING",
      nome: "CUTTING",
      gramatura: "180 a 280g",
      capa: "images/cutting.png",
      precoCentavos: 3100,
      pisoPrecoCentavos: 2197,
      itens: [
        { id: "cutting-001", nome: "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada", gramatura: "", ativo: true },
        { id: "cutting-002", nome: "Macarrão a Bolonhesa", gramatura: "", ativo: true },
        { id: "cutting-003", nome: "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos", gramatura: "180g", ativo: true },
        { id: "cutting-004", nome: "Macarrão c/ Frango ao Molho Branco", gramatura: "", ativo: true }
      ]
    },
    {
      id: "BULKING",
      nome: "BULKING",
      gramatura: "380 a 500g",
      capa: "images/bulking.png",
      precoCentavos: 3500,
      pisoPrecoCentavos: 2597,
      itens: [
        { id: "bulking-001", nome: "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada", gramatura: "", ativo: true },
        { id: "bulking-002", nome: "Macarrão a Bolonhesa", gramatura: "", ativo: true },
        { id: "bulking-003", nome: "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos", gramatura: "", ativo: true },
        { id: "bulking-004", nome: "Macarrão c/ Frango ao Molho Branco", gramatura: "", ativo: true }
      ]
    },
    {
      id: "DIA_A_DIA",
      nome: "DIA A DIA",
      gramatura: "300g",
      capa: "images/dia_a_dia.png",
      precoCentavos: 2797,
      pisoPrecoCentavos: 1997,
      itens: [
        { id: "diaadia-001", nome: "Espaguete a bolonhesa", gramatura: "", ativo: true },
        { id: "diaadia-002", nome: "Pernil suíno desfiado ao molho de laranja e mel, arroz branco e purê de abóbora", gramatura: "", ativo: true },
        { id: "diaadia-003", nome: "Panqueca de frango ao molho branco de queijo parmesão", gramatura: "", ativo: true },
        { id: "diaadia-004", nome: "Strogonoff de frango com arroz branco e batata rústica assada", gramatura: "", ativo: true },
        { id: "diaadia-005", nome: "Carne moída com cenoura e batata, arroz branco e feijão carioca", gramatura: "", ativo: true },
        { id: "diaadia-006", nome: "Picadinho de carne com legumes, arroz branco, feijão carioca e farofa de cenoura", gramatura: "", ativo: true }
      ]
    },
    {
      id: "SARDINHA",
      nome: "F. SARDINHA",
      gramatura: "300 a 350g",
      capa: "images/sardinha.png",
      precoCentavos: 3500,
      pisoPrecoCentavos: 2597,
      itens: [
        { id: "sardinha-001", nome: "Picadinho de frango c/ batata, cenoura e arroz branco", gramatura: "", ativo: true },
        { id: "sardinha-002", nome: "Iscas de frango refogada aceboladas e batata inglesa no vapor", gramatura: "", ativo: true },
        { id: "sardinha-003", nome: "Iscas de frango c/ mix de legumes", gramatura: "", ativo: true },
        { id: "sardinha-004", nome: "Escondidinho de carne moída c/ batata doce", gramatura: "", ativo: true },
        { id: "sardinha-005", nome: "Carne moída c/ arroz branco e cenoura refogada", gramatura: "", ativo: true }
      ]
    },
    {
      id: "REEDUC",
      nome: "REEDUCAÇÃO",
      gramatura: "200g",
      capa: "images/reeducacao.png",
      precoCentavos: 1957,
      pisoPrecoCentavos: 1497,
      itens: [
        { id: "reeduc-001", nome: "Pernil Suíno ao Molho de Laranja e Mel com arroz integral e purê de abóbora", gramatura: "", ativo: true },
        { id: "reeduc-002", nome: "Macarrão Integral à Bolonhesa", gramatura: "", ativo: true },
        { id: "reeduc-003", nome: "Almôndegas de Frango ao Molho de Tomate com arroz integral e cenoura ralada", gramatura: "", ativo: true },
        { id: "reeduc-004", nome: "Panqueca Red Integral de Frango ao Molho de Tomate e Cenoura", gramatura: "", ativo: true },
        { id: "reeduc-005", nome: "Carne Moída com Purê de Batata Doce", gramatura: "", ativo: true }
      ]
    },
    {
      id: "LOW_CARB",
      nome: "LOW CARB",
      gramatura: "200g",
      capa: "images/low_carb.png",
      precoCentavos: 1957,
      pisoPrecoCentavos: 1497,
      itens: [
        { id: "lowcarb-001", nome: "Frango à Pizzaiolo com Legumes", gramatura: "", ativo: true },
        { id: "lowcarb-002", nome: "Carne Moída com Mix de Legumes", gramatura: "", ativo: true },
        { id: "lowcarb-003", nome: "Espaguete de Cenoura à Bolonhesa", gramatura: "", ativo: true },
        { id: "lowcarb-004", nome: "Ragú com Abóbora em Cubos", gramatura: "", ativo: true },
        { id: "lowcarb-005", nome: "Iscas de Frango Refogado com Pimentões Coloridos e Cenoura no Vapor", gramatura: "", ativo: true }
      ]
    },
    {
      id: "BASA",
      nome: "BASA",
      gramatura: "350 a 400g",
      capa: "images/basa.png",
      precoCentavos: 3600,
      pisoPrecoCentavos: 2597,
      itens: [
        { id: "basa-001", nome: "Carne desfiada c/ abóbora", gramatura: "", ativo: true },
        { id: "basa-002", nome: "Escondidinho de carne c/ Batata inglesa", gramatura: "", ativo: true },
        { id: "basa-003", nome: "Espaguete à Bolonhesa", gramatura: "", ativo: true },
        { id: "basa-004", nome: "Almôndegas de Frango ao molho de Tomate c/ Arroz & Cenoura", gramatura: "", ativo: true },
        { id: "basa-005", nome: "Panqueca de Frango ao Molho Branco", gramatura: "", ativo: true }
      ]
    }
  ]
};
