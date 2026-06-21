"use client";

import { useState } from "react";
import { useWizard, type Ingredient } from "../WizardContext";

const catalog: Ingredient[] = [
  { id: "uve", label: "Uve", category: "generale", organic: false },
  { id: "mosto", label: "Mosto concentrato", category: "generale", organic: false },
  { id: "acido-tartarico", label: "Acido tartarico", category: "generale", organic: false },
  { id: "solfiti", label: "Solfiti", category: "conservanti", organic: false },
  { id: "acido-ascorbico", label: "Acido ascorbico", category: "conservanti", organic: false },
];

export default function StepIngredienti() {
  const { data, update } = useWizard();
  const [productType, setProductType] = useState<
    "vino" | "aromatizzati" | "fortificati"
  >("vino");

  function toggle(ingredient: Ingredient) {
    const exists = data.ingredienti.some((i) => i.id === ingredient.id);
    update({
      ingredienti: exists
        ? data.ingredienti.filter((i) => i.id !== ingredient.id)
        : [...data.ingredienti, ingredient],
    });
  }

  function toggleOrganic(id: string) {
    update({
      ingredienti: data.ingredienti.map((i) =>
        i.id === id ? { ...i, organic: !i.organic } : i
      ),
    });
  }

  const generale = catalog.filter((i) => i.category === "generale");
  const conservanti = catalog.filter((i) => i.category === "conservanti");

  return (
    <div>
      <h2 className="text-lg font-semibold text-sand-900">
        Ingredienti del vino
      </h2>
      <p className="mt-1 text-sm text-sand-600">
        Selezionare gli ingredienti dalla lista degli ingredienti del vino.
        Tutti gli ingredienti non elencati non devono essere specificati.
      </p>

      <h3 className="mt-8 text-base font-semibold text-sand-900">
        1. Selezionare il tipo di prodotto
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { id: "vino", label: "Vino (ad esempio, vino bianco, vino rosso o spumante)" },
          { id: "aromatizzati", label: "Vini aromatizzati (ad es. vin brulé o glogg)" },
          { id: "fortificati", label: "Vini fortificati (ad esempio, porto o sherry)" },
        ].map((opt) => (
          <label
            key={opt.id}
            className="flex items-start gap-2 rounded-lg border border-sand-300 bg-white p-3 text-sm text-sand-700"
          >
            <input
              type="radio"
              name="productType"
              checked={productType === opt.id}
              onChange={() => setProductType(opt.id as typeof productType)}
              className="mt-1 accent-wine-500"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <h3 className="mt-8 text-base font-semibold text-sand-900">
        2. Selezionare gli ingredienti del vino
      </h3>

      <IngredientGroup
        title="Generale"
        items={generale}
        selected={data.ingredienti}
        onToggle={toggle}
        onToggleOrganic={toggleOrganic}
      />
      <IngredientGroup
        title="Conservanti e antiossidanti"
        items={conservanti}
        selected={data.ingredienti}
        onToggle={toggle}
        onToggleOrganic={toggleOrganic}
      />
    </div>
  );
}

function IngredientGroup({
  title,
  items,
  selected,
  onToggle,
  onToggleOrganic,
}: {
  title: string;
  items: Ingredient[];
  selected: Ingredient[];
  onToggle: (i: Ingredient) => void;
  onToggleOrganic: (id: string) => void;
}) {
  return (
    <div className="mt-4 rounded-lg border border-sand-200 bg-sand-100 p-4">
      <p className="text-sm font-medium text-sand-700">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => {
          const isSelected = selected.some((i) => i.id === item.id);
          const selectedItem = selected.find((i) => i.id === item.id);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2"
            >
              <label className="flex items-center gap-2 text-sm text-sand-800">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(item)}
                  className="accent-wine-500"
                />
                {item.label}
              </label>
              {isSelected && (
                <label className="flex items-center gap-2 text-xs text-sand-600">
                  <input
                    type="checkbox"
                    checked={selectedItem?.organic ?? false}
                    onChange={() => onToggleOrganic(item.id)}
                    className="accent-olive-500"
                  />
                  Ingrediente biologico
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
