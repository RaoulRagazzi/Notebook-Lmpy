// Listino Splendoria — prezzi in euro.
// Aggiornare qui le cifre: tutto il sito legge da questo file.

export type FormulaId = "GOLD" | "PREMIUM_SHORT" | "PREMIUM_FULL" | "CORPORATE";

export type Formula = {
  id: FormulaId;
  nome: string;
  sottotitolo: string;
  prezzo: number;
  pagine: string;
  dettagli: string[];
  inEvidenza?: boolean;
};

export const FORMULE: Formula[] = [
  {
    id: "GOLD",
    nome: "Gold",
    sottotitolo: "A un prezzo fisso e conveniente",
    prezzo: 600,
    pagine: "80 pagine · 50.000 battute",
    dettagli: [
      "Due interviste online da 30 minuti",
      "Possibilità di videointervista e invio di foto e documenti",
      "Scrittura ed editing professionale",
      "Menabò digitale e copertina inclusi",
      "Stampa in brossura A5, prime 5 copie comprese",
      "Consegna entro 10 giorni e deposito dell'opera",
    ],
  },
  {
    id: "PREMIUM_SHORT",
    nome: "Premium · Short Book",
    sottotitolo: "Con approfondimento psicologico",
    prezzo: 1000,
    pagine: "100 pagine · 72.000 battute",
    inEvidenza: true,
    dettagli: [
      "Call di 60 minuti su temi, aneddoti e messaggio",
      "4 call di scrittura da un'ora",
      "Copertina personalizzata, formato su richiesta",
      "Prime 5 copie comprese, consegna in 10 giorni",
      "Marcatura e deposito dell'opera",
    ],
  },
  {
    id: "PREMIUM_FULL",
    nome: "Premium · Biografia completa",
    sottotitolo: "La tua vita intera, anche romanzata",
    prezzo: 3000,
    pagine: "250 pagine · 200.000 battute",
    dettagli: [
      "Call di 60 minuti su temi, aneddoti e messaggio",
      "5 call di scrittura da un'ora",
      "Biografia completa, anche in forma di romanzo",
      "Copertina personalizzata, formato su richiesta",
      "Prime 5 copie comprese, consegna in 10 giorni",
      "Marcatura e deposito dell'opera",
    ],
  },
  {
    id: "CORPORATE",
    nome: "Personal Branding & Corporate",
    sottotitolo: "Per aziende, professionisti e partite IVA",
    prezzo: 2500,
    pagine: "200 pagine · 150–180.000 battute",
    dettagli: [
      "Proposta sartoriale per raccontare la tua impresa",
      "4 call di scrittura da un'ora",
      "Il racconto scritto dagli scrittori della Scuola Holden",
      "Un libro che infonde stima e credibilità",
      "Prime 5 copie comprese, deposito dell'opera",
    ],
  },
];

export function getFormula(id: string): Formula | undefined {
  return FORMULE.find((f) => f.id === id);
}

// Il capitolo gratuito: circa 6 pagine (≈ 650 battute a pagina)
export const BATTUTE_PER_PAGINA = 650;
export const MAX_BATTUTE_CAPITOLO = 4000;

export const GENERI = [
  "Autobiografia",
  "Memoriale",
  "Ritratto",
  "Giallo",
  "Thriller",
  "Romanzo",
] as const;
