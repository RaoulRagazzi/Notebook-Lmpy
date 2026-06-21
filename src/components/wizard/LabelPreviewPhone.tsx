"use client";

import { useWizard, computeNutrition } from "./WizardContext";

export default function LabelPreviewPhone() {
  const { data } = useWizard();
  const nutrition = computeNutrition(data);

  const generale = data.ingredienti.filter((i) => i.category === "generale");
  const conservanti = data.ingredienti.filter(
    (i) => i.category === "conservanti"
  );

  const ingredientsLine = [
    generale.map((i) => i.label).join(", "),
    conservanti.length > 0
      ? `Conservanti e antiossidanti: ${conservanti
          .map((i) => i.label)
          .join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto w-[280px] rounded-[2.5rem] border-[6px] border-sand-900 bg-sand-50 p-5 shadow-xl">
      <div className="flex justify-end text-sand-400">
        <span className="text-xs">i</span>
      </div>
      <div className="mt-2 flex justify-end">
        <span className="rounded-full bg-sand-100 px-3 py-1 text-xs text-sand-700">
          🇮🇹 Italiano ▾
        </span>
      </div>

      {data.nome && (
        <h3 className="mt-6 text-lg font-semibold text-sand-900">
          {data.nome}
        </h3>
      )}

      {ingredientsLine && (
        <div className="mt-6">
          <h4 className="text-base font-semibold text-sand-900">
            Ingredienti
          </h4>
          <p className="mt-1 text-sm text-sand-700">
            {ingredientsLine}
          </p>
        </div>
      )}

      {(data.alcol > 0 || data.zuccheroResiduo > 0) && (
        <div className="mt-6">
          <h4 className="text-base font-semibold text-sand-900">
            Valori nutrizionali (per 100ml)
          </h4>
          <p className="mt-1 text-sm text-sand-700">
            Energia: {nutrition.energyKcal} kcal / {nutrition.energyKJ} kJ
          </p>
          <p className="text-sm text-sand-700">
            Carboidrati: {nutrition.carbsG} g, di cui zuccheri:{" "}
            {nutrition.sugarG} g
          </p>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-base font-semibold text-sand-900">
          Azienda responsabile dei contenuti
        </h4>
        <p className="mt-1 text-sm text-sand-700">{data.azienda}</p>
        <p className="text-sm text-sand-700">{data.paese}</p>
      </div>
    </div>
  );
}
