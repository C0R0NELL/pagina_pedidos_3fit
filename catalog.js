/*
  Catalogo de produtos 3Fit
  - Edite precoCentavos em CENTAVOS (inteiro) no nivel da linha
  - Edite pisoPrecoCentavos (preco minimo unitario no desconto maximo) no nivel da linha
  - Para desativar temporariamente um prato, use ativo: false no item
  - Mantenha ids estaveis (linha e item) para evitar quebrar payloads/historico
  - Regras de desconto/frete ficam no features.json (nao neste arquivo)
  - Exemplos:
    - R$ 36,00 => precoCentavos: 3600
    - R$ 19,57 => precoCentavos: 1957
  - Para adicionar nova linha: copie um bloco em "linhas"
  - Para adicionar nova marmita: adicione um item em "itens"
*/

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
        { id: "cutting-001", nome: "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada", ativo: true },
        { id: "cutting-002", nome: "Macarrão a Bolonhesa", ativo: true },
        { id: "cutting-003", nome: "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos", ativo: true },
        { id: "cutting-004", nome: "Macarrão c/ Frango ao Molho Branco", ativo: true }
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
        { id: "bulking-001", nome: "Carne Moída c/ Cuscuz de Milho e Cenoura Refogada", ativo: true },
        { id: "bulking-002", nome: "Macarrão a Bolonhesa", ativo: true },
        { id: "bulking-003", nome: "Carne Desfiada c/ Aipim (Mandioca) Cozida em cubos", ativo: true },
        { id: "bulking-004", nome: "Macarrão c/ Frango ao Molho Branco", ativo: true }
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
        { id: "diaadia-001", nome: "Espaguete a bolonhesa", ativo: true },
        { id: "diaadia-002", nome: "Pernil suíno desfiado ao molho de laranja e mel, arroz branco e purê de abóbora", ativo: true },
        { id: "diaadia-003", nome: "Panqueca de frango ao molho branco de queijo parmesão", ativo: true },
        { id: "diaadia-004", nome: "Strogonoff de frango com arroz branco e batata rústica assada", ativo: true },
        { id: "diaadia-005", nome: "Carne moída com cenoura e batata, arroz branco e feijão carioca", ativo: true },
        { id: "diaadia-006", nome: "Picadinho de carne com legumes, arroz branco, feijão carioca e farofa de cenoura", ativo: true }
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
        { id: "sardinha-001", nome: "Picadinho de frango c/ batata, cenoura e arroz branco", ativo: true },
        { id: "sardinha-002", nome: "Iscas de frango refogada aceboladas e batata inglesa no vapor", ativo: true },
        { id: "sardinha-003", nome: "Iscas de frango c/ mix de legumes", ativo: true },
        { id: "sardinha-004", nome: "Escondidinho de carne moída c/ batata doce", ativo: true },
        { id: "sardinha-005", nome: "Carne moída c/ arroz branco e cenoura refogada", ativo: true }
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
        { id: "reeduc-001", nome: "Pernil Suíno ao Molho de Laranja e Mel com arroz integral e purê de abóbora", ativo: true },
        { id: "reeduc-002", nome: "Macarrão Integral à Bolonhesa", ativo: true },
        { id: "reeduc-003", nome: "Almôndegas de Frango ao Molho de Tomate com arroz integral e cenoura ralada", ativo: true },
        { id: "reeduc-004", nome: "Panqueca Red Integral de Frango ao Molho de Tomate e Cenoura", ativo: true },
        { id: "reeduc-005", nome: "Carne Moída com Purê de Batata Doce", ativo: true }
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
        { id: "lowcarb-001", nome: "Frango à Pizzaiolo com Legumes", ativo: true },
        { id: "lowcarb-002", nome: "Carne Moída com Mix de Legumes", ativo: true },
        { id: "lowcarb-003", nome: "Espaguete de Cenoura à Bolonhesa", ativo: true },
        { id: "lowcarb-004", nome: "Ragú com Abóbora em Cubos", ativo: true },
        { id: "lowcarb-005", nome: "Iscas de Frango Refogado com Pimentões Coloridos e Cenoura no Vapor", ativo: true }
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
        { id: "basa-001", nome: "Carne desfiada c/ abóbora", ativo: true },
        { id: "basa-002", nome: "Escondidinho de carne c/ Batata inglesa", ativo: true },
        { id: "basa-003", nome: "Espaguete à Bolonhesa", ativo: true },
        { id: "basa-004", nome: "Almôndegas de Frango ao molho de Tomate c/ Arroz & Cenoura", ativo: true },
        { id: "basa-005", nome: "Panqueca de Frango ao Molho Branco", ativo: true }
      ]
    }
  ]
};
