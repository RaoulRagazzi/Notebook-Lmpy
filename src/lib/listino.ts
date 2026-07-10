// Listino Splendoria — prezzi in euro.
// Aggiornare qui le cifre: tutto il sito legge da questo file.
// I testi descrittivi delle formule (per lingua) sono in src/lib/i18n.ts.

export type FormulaId = "HYBRID" | "PREMIUM_SHORT" | "CORPORATE";

export type Formula = {
  id: FormulaId;
  nome: string; // il nome commerciale è uguale in tutte le lingue
  prezzo: number;
  inEvidenza?: boolean;
};

export const FORMULE: Formula[] = [
  { id: "HYBRID", nome: "Hybrid", prezzo: 1000 },
  { id: "PREMIUM_SHORT", nome: "Premium Short Book", prezzo: 1900, inEvidenza: true },
  { id: "CORPORATE", nome: "Personal Branding & Corporate", prezzo: 2500 },
];

export function getFormula(id: string): Formula | undefined {
  return FORMULE.find((f) => f.id === id);
}

// Il capitolo gratuito: limite editoriale espresso in battute, spazi inclusi.
export const BATTUTE_PER_PAGINA = 650;
export const MAX_BATTUTE_CAPITOLO = 12000;
