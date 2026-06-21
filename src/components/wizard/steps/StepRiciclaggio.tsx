"use client";

import { useWizard, type RecyclingMode } from "../WizardContext";

const options: { id: RecyclingMode; title: string; description: string }[] = [
  {
    id: "manuale",
    title: "Inserimento manuale delle informazioni di riciclaggio",
    description: "Seleziona i materiali utilizzati per l'imballaggio del tuo vino.",
  },
  {
    id: "pdf",
    title: "Caricare un file PDF",
    description: "Carica il PDF con le informazioni sul riciclaggio.",
  },
  {
    id: "url",
    title: "Collegamento al sito web",
    description: "Inserisci l'URL del tuo sito con le informazioni sul riciclaggio.",
  },
];

export default function StepRiciclaggio() {
  const { data, update } = useWizard();

  return (
    <div>
      <h2 className="text-lg font-semibold text-sand-900">Riciclaggio</h2>
      <p className="mt-1 text-sm text-sand-600">
        Se hai già un sito web o un file PDF con informazioni sul
        riciclaggio, puoi collegare l&apos;URL (sito web) o caricare il PDF
        nella tua etichetta. In caso contrario, seleziona i materiali
        utilizzati per l&apos;imballaggio del tuo vino. Le informazioni sul
        riciclaggio saranno generate automaticamente.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={[
              "flex cursor-pointer flex-col gap-2 rounded-lg border p-4 text-sm",
              data.riciclaggio === opt.id
                ? "border-wine-500 bg-sand-100"
                : "border-sand-300 bg-white",
            ].join(" ")}
          >
            <span className="flex items-center gap-2 font-medium text-sand-900">
              <input
                type="radio"
                name="riciclaggio"
                checked={data.riciclaggio === opt.id}
                onChange={() => update({ riciclaggio: opt.id })}
                className="accent-wine-500"
              />
              {opt.title}
            </span>
            <span className="text-sand-600">{opt.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
