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
    <section className="mt-12 rounded-[28px] bg-paper2 p-2">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Capitolo primo <span className="text-oro">· in omaggio</span>
        </h2>
        <div className="flex rounded-full bg-white p-1 text-base font-medium">
          <button
            type="button"
            onClick={() => setAnteprima(false)}
            aria-pressed={!anteprima}
            className={`cursor-pointer rounded-full px-5 py-2 ${
              !anteprima ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Scrivi
          </button>
          <button
            type="button"
            onClick={() => setAnteprima(true)}
            aria-pressed={anteprima}
            className={`cursor-pointer rounded-full px-5 py-2 ${
              anteprima ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Anteprima
          </button>
        </div>
      </div>

      {anteprima ? (
        <div className="rounded-[22px] bg-white px-6 py-12 sm:px-16">
          <p className="text-center text-lg font-semibold text-oro">{genere}</p>
          <h3 className="mx-auto mt-2 mb-10 font-display max-w-2xl text-balance text-center text-4xl font-semibold text-ink">
            {titolo.trim() || "Senza titolo"}
          </h3>
          {paragrafi.length > 0 ? (
            <div className="pagina-libro font-display mx-auto max-w-2xl text-[22px] leading-relaxed text-testo">
              {paragrafi.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-muted">
              Non hai ancora scritto nulla: torna alla scheda «Scrivi» e comincia la tua
              storia.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6 rounded-[22px] bg-white px-6 py-8">
          <div className="grid gap-6 sm:grid-cols-[1fr_16rem]">
            <div>
              <label htmlFor="titolo" className="text-base font-semibold text-ink">
                Titolo del capitolo
              </label>
              <input
                id="titolo"
                type="text"
                value={titolo}
                maxLength={120}
                onChange={(e) => setTitolo(e.target.value)}
                placeholder="Es. Da dove tutto è cominciato"
                className="mt-1.5 w-full rounded-xl border border-linea px-4 py-3 text-lg outline-none focus:border-oro"
              />
            </div>
            <div>
              <label htmlFor="genere" className="text-base font-semibold text-ink">
                Genere
              </label>
              <select
                id="genere"
                value={genere}
                onChange={(e) => setGenere(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3 text-lg outline-none focus:border-oro"
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
            <label htmlFor="testo" className="text-base font-semibold text-ink">
              La tua storia
            </label>
            <textarea
              id="testo"
              value={testo}
              maxLength={MAX_BATTUTE_CAPITOLO}
              onChange={(e) => setTesto(e.target.value)}
              rows={14}
              placeholder="C'era una volta la tua vita. Comincia a raccontarla da dove vuoi: un ricordo, una persona, un giorno che ha cambiato tutto…"
              className="mt-1.5 w-full resize-y rounded-xl border border-linea px-5 py-4 text-xl leading-relaxed outline-none focus:border-oro"
            />
          </div>

          <div>
            <div className="h-1.5 w-full rounded-full bg-paper2">
              <div
                className="h-1.5 rounded-full bg-oro transition-[width]"
                style={{ width: `${percento}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-base text-muted">
              <span className="tabular-nums">
                {battute.toLocaleString("it-IT")} /{" "}
                {MAX_BATTUTE_CAPITOLO.toLocaleString("it-IT")} battute · circa {pagine}{" "}
                {pagine === 1 ? "pagina" : "pagine"} su 6
              </span>
              <span className="flex items-center gap-4">
                {error && <span className="text-[#de3b30]">{error}</span>}
                {salvato && (
                  <span className="font-medium text-oro">Capitolo salvato ✓</span>
                )}
                <button
                  type="button"
                  onClick={handleSalva}
                  disabled={saving}
                  className="cursor-pointer rounded-full bg-oro px-7 py-3 text-lg font-medium text-white hover:bg-[#0b7c72] disabled:opacity-50"
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
