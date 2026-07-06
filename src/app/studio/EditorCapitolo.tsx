"use client";

import { useMemo, useState } from "react";
import { GENERI, MAX_BATTUTE_CAPITOLO, BATTUTE_PER_PAGINA } from "@/lib/listino";
import { salvaCapitolo } from "./actions";

type Props = {
  iniziale: { titolo: string; genere: string; testo: string };
};

export default function EditorCapitolo({ iniziale }: Props) {
  const [titolo, setTitolo] = useState(iniziale.titolo);
  const [genere, setGenere] = useState(iniziale.genere);
  const [testo, setTesto] = useState(iniziale.testo);
  const [anteprima, setAnteprima] = useState(false);
  const [saving, setSaving] = useState(false);
  const [salvato, setSalvato] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const battute = testo.length;
  const pagine = Math.max(1, Math.ceil(battute / BATTUTE_PER_PAGINA));
  const percento = Math.min(100, Math.round((battute / MAX_BATTUTE_CAPITOLO) * 100));

  const paragrafi = useMemo(
    () => testo.split(/\n+/).filter((p) => p.trim().length > 0),
    [testo]
  );

  async function handleSalva() {
    setSaving(true);
    setError(null);
    setSalvato(false);
    const res = await salvaCapitolo(titolo, genere, testo);
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Errore durante il salvataggio.");
      return;
    }
    setSalvato(true);
    setTimeout(() => setSalvato(false), 2500);
  }

  return (
    <section className="mt-10 border border-linea bg-paper3">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-linea px-6 py-4">
        <h2 className="font-display text-2xl font-medium text-ink">
          Capitolo primo <span className="text-oro">· in omaggio</span>
        </h2>
        <div className="flex gap-1 font-sans text-[0.7rem] uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={() => setAnteprima(false)}
            aria-pressed={!anteprima}
            className={`cursor-pointer px-3 py-1.5 ${
              !anteprima ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            Scrivi
          </button>
          <button
            type="button"
            onClick={() => setAnteprima(true)}
            aria-pressed={anteprima}
            className={`cursor-pointer px-3 py-1.5 ${
              anteprima ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            Anteprima
          </button>
        </div>
      </div>

      {anteprima ? (
        <div className="px-6 py-10 sm:px-14">
          <p className="text-center font-sans text-[0.68rem] uppercase tracking-[0.26em] text-oro">
            {genere}
          </p>
          <h3 className="mt-2 text-balance text-center font-display text-3xl font-medium text-ink">
            {titolo.trim() || "Senza titolo"}
          </h3>
          <div className="filetto" aria-hidden="true" />
          {paragrafi.length > 0 ? (
            <div className="pagina-libro mx-auto max-w-xl space-y-0 text-justify leading-relaxed">
              {paragrafi.map((p, i) => (
                <p key={i} className={i === 0 ? "incipit" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-center italic text-muted">
              Non hai ancora scritto nulla: torna alla scheda «Scrivi» e comincia la tua
              storia.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-5 px-6 py-6">
          <div className="grid gap-5 sm:grid-cols-[1fr_14rem]">
            <div>
              <label
                htmlFor="titolo"
                className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-muted"
              >
                Titolo del capitolo
              </label>
              <input
                id="titolo"
                type="text"
                value={titolo}
                maxLength={120}
                onChange={(e) => setTitolo(e.target.value)}
                placeholder="Es. Da dove tutto è cominciato"
                className="mt-1.5 w-full border border-linea bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-oro"
              />
            </div>
            <div>
              <label
                htmlFor="genere"
                className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-muted"
              >
                Genere
              </label>
              <select
                id="genere"
                value={genere}
                onChange={(e) => setGenere(e.target.value)}
                className="mt-1.5 w-full border border-linea bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-oro"
              >
                {GENERI.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="testo"
              className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-muted"
            >
              La tua storia
            </label>
            <textarea
              id="testo"
              value={testo}
              maxLength={MAX_BATTUTE_CAPITOLO}
              onChange={(e) => setTesto(e.target.value)}
              rows={16}
              placeholder="C'era una volta la tua vita. Comincia a raccontarla da dove vuoi: un ricordo, una persona, un giorno che ha cambiato tutto…"
              className="mt-1.5 w-full resize-y border border-linea bg-white px-4 py-3 leading-relaxed outline-none focus:border-oro"
            />
          </div>

          <div>
            <div className="h-1 w-full bg-linea">
              <div
                className="h-1 bg-oro transition-[width]"
                style={{ width: `${percento}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2 font-sans text-xs text-muted">
              <span className="tabular-nums">
                {battute.toLocaleString("it-IT")} /{" "}
                {MAX_BATTUTE_CAPITOLO.toLocaleString("it-IT")} battute · circa {pagine}{" "}
                {pagine === 1 ? "pagina" : "pagine"} su 6
              </span>
              <span className="flex items-center gap-3">
                {error && <span className="text-bordeaux">{error}</span>}
                {salvato && <span className="text-oro">Capitolo salvato ✓</span>}
                <button
                  type="button"
                  onClick={handleSalva}
                  disabled={saving}
                  className="cursor-pointer bg-ink px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-paper hover:bg-ink2 disabled:opacity-50"
                >
                  {saving ? "Salvataggio…" : "Salva capitolo"}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
