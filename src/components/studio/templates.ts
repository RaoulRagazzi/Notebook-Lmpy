export type TemplateFormat = "a4" | "square" | "story" | "horizontal";

export type TemplateConfig = {
  id: string;
  nome: string;
  formato: TemplateFormat;
  descrizione: string;
  usoConsigliato: string;
};

export const templates: TemplateConfig[] = [
  {
    id: "tecnica",
    nome: "Scheda tecnica professionale",
    formato: "a4",
    descrizione: "Dati strutturati per buyer, agenti e ristoratori.",
    usoConsigliato: "B2B / vendite",
  },
  {
    id: "emozionale",
    nome: "Scheda emozionale",
    formato: "a4",
    descrizione: "Racconto narrativo pensato per il consumatore finale.",
    usoConsigliato: "Consumatore finale",
  },
  {
    id: "catalogo",
    nome: "Scheda elegante per catalogo",
    formato: "a4",
    descrizione: "Layout sobrio ed elegante per cataloghi commerciali.",
    usoConsigliato: "Catalogo / importatori",
  },
  {
    id: "story",
    nome: "Instagram Story",
    formato: "story",
    descrizione: "Formato verticale pensato per le stories.",
    usoConsigliato: "Social — Stories",
  },
  {
    id: "post",
    nome: "Post social quadrato",
    formato: "square",
    descrizione: "Formato quadrato per feed Instagram e Facebook.",
    usoConsigliato: "Social — Post",
  },
  {
    id: "newsletter",
    nome: "Formato orizzontale",
    formato: "horizontal",
    descrizione: "Per sito web, newsletter o banner.",
    usoConsigliato: "Sito web / newsletter",
  },
  {
    id: "premium",
    nome: "Scheda premium alta gamma",
    formato: "a4",
    descrizione: "Toni scuri e oro per vini di fascia alta.",
    usoConsigliato: "Vini premium",
  },
  {
    id: "essenziale",
    nome: "Scheda essenziale minimalista",
    formato: "a4",
    descrizione: "Massima pulizia, solo l'essenziale.",
    usoConsigliato: "Stile minimal",
  },
  {
    id: "territorio",
    nome: "Scheda territoriale",
    formato: "a4",
    descrizione: "Focus su zona, vigneto e denominazione.",
    usoConsigliato: "Storytelling di territorio",
  },
  {
    id: "degustazione",
    nome: "Scheda degustazione",
    formato: "a4",
    descrizione: "Focus su profumi, gusto, abbinamenti e servizio.",
    usoConsigliato: "Degustazioni / eventi",
  },
];

export const formatDimensions: Record<TemplateFormat, { width: number; height: number; label: string }> = {
  a4: { width: 595, height: 842, label: "A4" },
  square: { width: 700, height: 700, label: "1080×1080" },
  story: { width: 540, height: 960, label: "1080×1920" },
  horizontal: { width: 800, height: 420, label: "1200×630" },
};
