"use client";

import { useWizard, computeNutrition } from "../WizardContext";

export default function StepNutrizionali() {
  const { data, update } = useWizard();
  const nutrition = computeNutrition(data);

  return (
    <div>
      <h2 className="text-lg font-semibold text-sand-900">
        Informazioni nutrizionali
      </h2>
      <p className="mt-1 text-sm text-sand-600">
        I valori nutrizionali più importanti per i vini normali sono:
        Calorie, carboidrati e zuccheri. Tutti gli altri valori (grassi,
        grassi saturi, proteine, sale) sono indicati almeno con quantità
        minori, anche se si utilizza il valore 0.
      </p>

      <h3 className="mt-8 text-base font-semibold text-sand-900">
        Informazioni enologiche
      </h3>
      <p className="mt-1 text-sm text-sand-600">
        I valori richiesti per il potere calorifico e i carboidrati vengono
        calcolate automaticamente dai valori inseriti per l&apos;alcol, lo
        zucchero e l&apos;acidità.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Alcol"
          unit="%vol"
          value={data.alcol}
          onChange={(v) => update({ alcol: v })}
        />
        <Field
          label="Zucchero residuo"
          unit="g/l"
          value={data.zuccheroResiduo}
          onChange={(v) => update({ zuccheroResiduo: v })}
        />
        <Field
          label="Acidità totale (C4H6O6)"
          unit="g/l"
          value={data.acidita}
          onChange={(v) => update({ acidita: v })}
        />
      </div>

      <div className="mt-6 space-y-2">
        <label className="flex items-center gap-2 text-sm text-sand-700">
          <input
            type="radio"
            name="glicerina"
            checked={!data.glicerinaManuale}
            onChange={() => update({ glicerinaManuale: false })}
            className="accent-wine-500"
          />
          Valore predefinito per la glicerina
        </label>
        <label className="flex items-center gap-2 text-sm text-sand-700">
          <input
            type="radio"
            name="glicerina"
            checked={data.glicerinaManuale}
            onChange={() => update({ glicerinaManuale: true })}
            className="accent-wine-500"
          />
          Valore della glicerina manuale
        </label>
      </div>

      <div className="mt-8 rounded-lg border border-sand-200 bg-sand-100 p-5">
        <p className="text-sm font-medium text-sand-700">
          Valori calcolati (per 100 ml)
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-sand-800 sm:grid-cols-4">
          <Stat label="Energia" value={`${nutrition.energyKcal} kcal`} />
          <Stat label="" value={`${nutrition.energyKJ} kJ`} />
          <Stat label="Carboidrati" value={`${nutrition.carbsG} g`} />
          <Stat label="Di cui zuccheri" value={`${nutrition.sugarG} g`} />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-sand-700">{label}</label>
      <div className="mt-1 flex items-center rounded-lg border border-sand-300 bg-white px-3">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent py-2 text-sand-900 focus:outline-none"
        />
        <span className="text-sm text-sand-500">{unit}</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      {label && <p className="text-xs text-sand-500">{label}</p>}
      <p className="font-semibold">{value}</p>
    </div>
  );
}
