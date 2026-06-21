"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { WineStoryData } from "@/lib/wineStory";
import { saveStory } from "./actions";

const languages = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "Inglese" },
  { code: "de", label: "Tedesco" },
  { code: "fr", label: "Francese" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-sand-700">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-sand-300 px-3 py-2 text-sm outline-none focus:border-wine-500";

export default function StoryForm({
  slug,
  nomeVino,
  initialData,
}: {
  slug: string;
  nomeVino: string;
  initialData: WineStoryData;
}) {
  const router = useRouter();
  const [data, setData] = useState<WineStoryData>(initialData);
  const [premiText, setPremiText] = useState(initialData.premi.join("\n"));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof WineStoryData>(key: K, value: WineStoryData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const premi = premiText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
    await saveStory(slug, { ...data, premi });
    setSaving(false);
    router.push(`/studio/${slug}/crea`);
  }

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-wine-500">
              Veritas Studio
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-sand-900">
              Racconto di {nomeVino}
            </h1>
            <p className="mt-2 text-sm text-sand-600">
              Completa questi dati una volta: verranno usati per generare
              automaticamente tutti i materiali di marketing.
            </p>
          </div>
          <Link
            href="/studio"
            aria-label="Chiudi"
            className="text-2xl leading-none text-sand-500 hover:text-sand-800"
          >
            ×
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Identità del vino
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Annata">
                <input
                  className={inputClass}
                  value={data.annata}
                  onChange={(e) => set("annata", e.target.value)}
                />
              </Field>
              <Field label="Denominazione">
                <input
                  className={inputClass}
                  value={data.denominazione}
                  onChange={(e) => set("denominazione", e.target.value)}
                />
              </Field>
              <Field label="Vitigno / uvaggio">
                <input
                  className={inputClass}
                  value={data.vitigno}
                  onChange={(e) => set("vitigno", e.target.value)}
                />
              </Field>
              <Field label="Zona di produzione">
                <input
                  className={inputClass}
                  value={data.zonaProduzione}
                  onChange={(e) => set("zonaProduzione", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Vigneto e vinificazione
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Caratteristiche del vigneto">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={data.vigneto}
                  onChange={(e) => set("vigneto", e.target.value)}
                />
              </Field>
              <Field label="Metodo di vinificazione">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={data.vinificazione}
                  onChange={(e) => set("vinificazione", e.target.value)}
                />
              </Field>
              <Field label="Affinamento">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={data.affinamento}
                  onChange={(e) => set("affinamento", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Degustazione e servizio
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Note di degustazione">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={data.noteDegustazione}
                  onChange={(e) => set("noteDegustazione", e.target.value)}
                />
              </Field>
              <Field label="Temperatura di servizio">
                <input
                  className={inputClass}
                  value={data.temperaturaServizio}
                  onChange={(e) => set("temperaturaServizio", e.target.value)}
                />
              </Field>
              <Field label="Abbinamenti gastronomici">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={data.abbinamenti}
                  onChange={(e) => set("abbinamenti", e.target.value)}
                />
              </Field>
              <Field label="Certificazioni">
                <input
                  className={inputClass}
                  value={data.certificazioni}
                  onChange={(e) => set("certificazioni", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Racconto
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Storia del vino">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={data.storiaVino}
                  onChange={(e) => set("storiaVino", e.target.value)}
                />
              </Field>
              <Field label="Racconto della cantina">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={data.raccontoCantina}
                  onChange={(e) => set("raccontoCantina", e.target.value)}
                />
              </Field>
              <Field label="Premi e riconoscimenti (uno per riga)">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={premiText}
                  onChange={(e) => setPremiText(e.target.value)}
                  placeholder={"92 punti James Suckling\nMedaglia d'oro Concours Mondial de Bruxelles"}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Testi pronti
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Testo breve per social media">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={data.testoSocialBreve}
                  onChange={(e) => set("testoSocialBreve", e.target.value)}
                />
              </Field>
              <Field label="Testo lungo per sito, catalogo o scheda commerciale">
                <textarea
                  className={inputClass}
                  rows={4}
                  value={data.testoSitoLungo}
                  onChange={(e) => set("testoSitoLungo", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">
              Immagini
            </h2>
            <p className="mt-1 text-xs text-sand-500">
              Inserisci l&apos;URL di ciascuna immagine già pubblicata online.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Bottiglia">
                <input
                  className={inputClass}
                  value={data.immagineBottiglia}
                  onChange={(e) => set("immagineBottiglia", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Etichetta">
                <input
                  className={inputClass}
                  value={data.immagineEtichetta}
                  onChange={(e) => set("immagineEtichetta", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Vigneto">
                <input
                  className={inputClass}
                  value={data.immagineVigneto}
                  onChange={(e) => set("immagineVigneto", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Cantina">
                <input
                  className={inputClass}
                  value={data.immagineCantina}
                  onChange={(e) => set("immagineCantina", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-sand-900">Lingua</h2>
            <div className="mt-4">
              <Field label="Lingua principale dei contenuti">
                <select
                  className={inputClass}
                  value={data.lingua}
                  onChange={(e) => set("lingua", e.target.value)}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/studio"
              className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
            >
              Annulla
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-olive-500 px-6 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600 disabled:opacity-50"
            >
              {saving ? "Salvataggio…" : "Salva e continua →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
