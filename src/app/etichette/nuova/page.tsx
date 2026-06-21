"use client";

import { useState } from "react";
import Stepper from "@/components/wizard/Stepper";
import LabelPreviewPhone from "@/components/wizard/LabelPreviewPhone";

export default function NuovaEtichettaPage() {
  const [wineName, setWineName] = useState("");

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-sand-900">
            Creare una nuova etichetta elettronica
          </h1>
          <button
            type="button"
            aria-label="Chiudi"
            className="text-2xl leading-none text-sand-500 hover:text-sand-800"
          >
            ×
          </button>
        </div>

        <div className="mt-8 border-b border-sand-200 pb-6">
          <Stepper />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm text-sand-600">
              I campi contrassegnati da un asterisco (*) devono essere
              compilati per l&apos;etichetta elettronica. Tuttavia, possono
              essere compilati anche in un secondo momento.
            </p>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-sand-900">Nome *</h2>
              <p className="mt-1 text-sm text-sand-600">
                Si prega di inserire il nome del proprio vino.
              </p>
              <textarea
                value={wineName}
                onChange={(e) => setWineName(e.target.value)}
                placeholder="Nome del tuo vino *"
                rows={2}
                className="mt-3 w-full resize-none rounded-lg border border-sand-300 bg-white px-4 py-3 text-sand-900 placeholder:text-sand-400 focus:border-wine-500 focus:outline-none focus:ring-1 focus:ring-wine-500"
              />
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-semibold text-sand-900">
                Immagine del vino
              </h2>
              <p className="mt-1 text-sm text-sand-600">
                È possibile aggiungere una foto del proprio vino.
                L&apos;inserimento è volontario e non è richiesto dalla legge.
                Si prega di notare che non sono consentite immagini con
                contenuti di marketing.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr]">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-sand-300 px-4 py-2 text-sm text-sand-700 hover:bg-sand-100"
                  >
                    📄 Locale
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-sand-300 px-4 py-2 text-sm text-sand-700 hover:bg-sand-100"
                  >
                    🖼 Biblioteca multimediale
                  </button>
                  <select className="rounded-lg border border-sand-300 bg-white px-3 py-2 text-sm text-sand-700">
                    <option>Formato</option>
                  </select>
                  <p className="text-xs text-sand-500">
                    La dimensione massima del file è 5 MB.
                  </p>
                </div>

                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-sand-300 bg-sand-100">
                  <svg
                    width="56"
                    height="44"
                    viewBox="0 0 56 44"
                    fill="none"
                    className="text-sand-400"
                  >
                    <circle cx="14" cy="12" r="6" className="fill-sand-300" />
                    <path
                      d="M2 38L18 22L30 32L40 20L54 38H2Z"
                      className="fill-sand-300"
                    />
                  </svg>
                </div>
              </div>
            </section>

            <div className="mt-12 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
              >
                ← Indietro
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
                >
                  Salto
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-olive-500 px-6 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600"
                >
                  Avanti →
                </button>
              </div>
            </div>
          </div>

          <div className="lg:pt-2">
            <LabelPreviewPhone wineName={wineName || undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
