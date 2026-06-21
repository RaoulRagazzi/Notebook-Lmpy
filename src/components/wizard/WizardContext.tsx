"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export { computeNutrition } from "@/lib/nutrition";

export type Ingredient = {
  id: string;
  label: string;
  category: "generale" | "conservanti";
  organic: boolean;
};

export type RecyclingMode = "manuale" | "pdf" | "url";

export type WizardData = {
  nome: string;
  alcol: number;
  acidita: number;
  zuccheroResiduo: number;
  glicerinaManuale: boolean;
  ingredienti: Ingredient[];
  riciclaggio: RecyclingMode;
  azienda: string;
  paese: string;
};

export const defaultIngredients: Ingredient[] = [
  { id: "uve", label: "Uve", category: "generale", organic: false },
  { id: "solfiti", label: "Solfiti", category: "conservanti", organic: false },
];

const defaultData: WizardData = {
  nome: "",
  alcol: 0,
  acidita: 0,
  zuccheroResiduo: 0,
  glicerinaManuale: false,
  ingredienti: [defaultIngredients[0], defaultIngredients[1]],
  riciclaggio: "manuale",
  azienda: "Fisar",
  paese: "Italia",
};

type WizardContextValue = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: WizardData;
}) {
  const [data, setData] = useState<WizardData>(initialData ?? defaultData);

  function update(patch: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  return (
    <WizardContext.Provider value={{ data, update }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}
