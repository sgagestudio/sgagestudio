const NEWS_ITEMS = [
  {
    id: "digitalizacion_pymes_europa_2026",
    title: "Digitalización y pymes en Europa: cómo fintech e IA están transformando la gestión financiera en 2026",
    date: "16/01/2026",
    category: "Fintech",
    summary:
      "En 2026, la digitalización financiera de las pymes entra en una nueva fase: IA, cloud, analítica y regulación europea (Open Finance, DORA, MiCA) impulsan eficiencia y acceso a financiación.",
  },
  {
    id: "open_finance_pagos_inteligentes",
    title: "Open Finance y pagos inteligentes: la banca abierta acelera la liquidez en 2026",
    date: "09/01/2026",
    category: "Open Finance",
    summary:
      "Las APIs bancarias y la agregación de datos permiten decisiones de tesorería más rápidas, con conciliación automática y visibilidad en tiempo real.",
  },
  {
    id: "cloud_ciberseguridad_pymes",
    title: "Cloud y ciberseguridad: el binomio clave para escalar sin riesgos en pymes",
    date: "22/12/2025",
    category: "Cloud",
    summary:
      "La adopción de infraestructura cloud crece en pymes europeas con foco en continuidad, backups y modelos Zero Trust desde el inicio.",
  },
  {
    id: "ia_reporting_finanzas",
    title: "IA aplicada al reporting financiero: cómo las pymes ganan visibilidad operativa",
    date: "01/12/2025",
    category: "IA",
    summary:
      "Dashboards predictivos y automatización de informes reducen tiempos de cierre y mejoran la precisión del análisis financiero.",
  },
];

const findNewsById = (id) => NEWS_ITEMS.find((item) => item.id === id);

window.SgageNews = {
  items: NEWS_ITEMS,
  findNewsById,
};
