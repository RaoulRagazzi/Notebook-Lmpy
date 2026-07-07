"use client";

import { useMemo, useState } from "react";
import { MAX_BATTUTE_CAPITOLO, BATTUTE_PER_PAGINA } from "@/lib/listino";
import type { Dict } from "@/lib/i18n";
import { salvaCapitolo } from "./actions";

type Props = {
  iniziale: { titolo: string; genere: string; testo: string };
  t: Dict["editor"];
  generi: readonly string[];
  locale: string;
  autore: string;
};

export default function EditorCapitolo({ iniziale, t, generi, locale, autore }: Props) {
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
      setError(res.error ?? t.erroreSalvataggio);
      return;
    }
    setSalvato(true);
    setTimeout(() => setSalvato(false), 2500);
  }

  // Genera il PDF di prova impaginato in formato A5, come una pagina di libro
  async function generaPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a5" });
    const LARGH = 148;
    const MARGINE = 20;
    const AREA = LARGH - MARGINE * 2;
    const FONDO = 185;

    // Frontespizio
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(13, 148, 136);
    doc.text("S P L E N D O R I A", LARGH / 2, 60, { align: "center" });
    doc.setTextColor(19, 49, 43);
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    const titoloRighe = doc.splitTextToSize(titolo.trim() || t.senzaTitolo, AREA);
    doc.text(titoloRighe, LARGH / 2, 85, { align: "center" });
    doc.setFont("times", "italic");
    doc.setFontSize(13);
    const yGenere = 85 + titoloRighe.length * 10 + 6;
    doc.text(genere, LARGH / 2, yGenere, { align: "center" });
    if (autore) {
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(`${t.di} ${autore}`, LARGH / 2, yGenere + 9, { align: "center" });
    }
    doc.setFontSize(9);
    doc.setTextColor(100, 114, 107);
    doc.text(t.pdfProva, LARGH / 2, 195, { align: "center" });

    // Testo del capitolo
    doc.addPage();
    doc.setFont("times", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(39, 51, 47);
    let y = MARGINE + 4;
    for (const p of paragrafi) {
      const righe: string[] = doc.splitTextToSize(p, AREA);
      for (const riga of righe) {
        if (y > FONDO) {
          doc.addPage();
          y = MARGINE + 4;
        }
        doc.text(riga, MARGINE, y);
        y += 5.4;
      }
      y += 3.2; // spazio tra paragrafi
    }

    // Piè di pagina con numero
    const totale = doc.getNumberOfPages();
    for (let i = 2; i <= totale; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100, 114, 107);
      doc.text(String(i - 1), LARGH / 2, 200, { align: "center" });
      doc.text("Splendoria", MARGINE, 200);
      doc.text(t.pdfProva, LARGH - MARGINE, 200, { align: "right" });
    }

    const nomeFile = (titolo.trim() || "capitolo")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    doc.save(`splendoria-${nomeFile || "capitolo"}.pdf`);
  }

  return (
    <section className="mt-12 rounded-[28px] bg-paper2 p-2">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <h2 className="font-display text-3xl font-semibold text-ink">
          {t.capitolo} <span className="text-oro">{t.omaggio}</span>
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
            {t.scrivi}
          </button>
          <button
            type="button"
            onClick={() => setAnteprima(true)}
            aria-pressed={anteprima}
            className={`cursor-pointer rounded-full px-5 py-2 ${
              anteprima ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {t.anteprima}
          </button>
        </div>
      </div>

      {anteprima ? (
        <div className="rounded-[22px] bg-white px-6 py-12 sm:px-16">
          <p className="text-center text-lg font-semibold text-oro">{genere}</p>
          <h3 className="mx-auto mt-2 mb-10 font-display max-w-2xl text-balance text-center text-4xl font-semibold text-ink">
            {titolo.trim() || t.senzaTitolo}
          </h3>
          {paragrafi.length > 0 ? (
            <>
              <div className="pagina-libro font-display mx-auto max-w-2xl text-[22px] leading-relaxed text-testo">
                {paragrafi.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-10 text-center">
                <button
                  type="button"
                  onClick={generaPdf}
                  className="cursor-pointer rounded-full bg-oro px-7 py-3 text-lg font-medium text-white hover:bg-[#0b7c72]"
                >
                  {t.pdfBtn}
                </button>
              </p>
            </>
          ) : (
            <p className="text-center text-xl text-muted">{t.vuoto}</p>
          )}
        </div>
      ) : (
        <div className="space-y-6 rounded-[22px] bg-white px-6 py-8">
          <div className="grid gap-6 sm:grid-cols-[1fr_16rem]">
            <div>
              <label htmlFor="titolo" className="text-base font-semibold text-ink">
                {t.titoloLabel}
              </label>
              <input
                id="titolo"
                type="text"
                value={titolo}
                maxLength={120}
                onChange={(e) => setTitolo(e.target.value)}
                placeholder={t.titoloPlaceholder}
                className="mt-1.5 w-full rounded-xl border border-linea px-4 py-3 text-lg outline-none focus:border-oro"
              />
            </div>
            <div>
              <label htmlFor="genere" className="text-base font-semibold text-ink">
                {t.genereLabel}
              </label>
              <select
                id="genere"
                value={genere}
                onChange={(e) => setGenere(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3 text-lg outline-none focus:border-oro"
              >
                {!generi.includes(genere) && (
                  <option value={genere}>{genere}</option>
                )}
                {generi.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="testo" className="text-base font-semibold text-ink">
              {t.storiaLabel}
            </label>
            <textarea
              id="testo"
              value={testo}
              maxLength={MAX_BATTUTE_CAPITOLO}
              onChange={(e) => setTesto(e.target.value)}
              rows={14}
              placeholder={t.testoPlaceholder}
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
                {battute.toLocaleString(locale)} /{" "}
                {MAX_BATTUTE_CAPITOLO.toLocaleString(locale)} {t.battute} · {t.circa}{" "}
                {pagine} {pagine === 1 ? t.pagina : t.pagine} {t.su6}
              </span>
              <span className="flex items-center gap-4">
                {error && <span className="text-[#de3b30]">{error}</span>}
                {salvato && <span className="font-medium text-oro">{t.salvato}</span>}
                <button
                  type="button"
                  onClick={handleSalva}
                  disabled={saving}
                  className="cursor-pointer rounded-full bg-oro px-7 py-3 text-lg font-medium text-white hover:bg-[#0b7c72] disabled:opacity-50"
                >
                  {saving ? t.salvataggio : t.salva}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
