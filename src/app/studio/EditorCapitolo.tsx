"use client";

import { useMemo, useState } from "react";
import { MAX_BATTUTE_CAPITOLO, BATTUTE_PER_PAGINA } from "@/lib/listino";
import type { Dict } from "@/lib/i18n";
import { salvaCapitolo } from "./actions";

type AiMode =
  | "start"
  | "outline"
  | "draft"
  | "continue"
  | "style"
  | "emotional"
  | "clear"
  | "literary"
  | "simple"
  | "proofread";

type AiGuide = {
  tema: string;
  personaggi: string;
  luogoPeriodo: string;
  tono: string;
  puntoDiVista: string;
  eventi: string;
  appunti: string;
};

type Props = {
  iniziale: { titolo: string; genere: string; testo: string };
  t: Dict["editor"];
  generi: readonly string[];
  locale: string;
  autore: string;
};

const AI_MODES: { id: AiMode; label: string }[] = [
  { id: "start", label: "Aiutami a iniziare" },
  { id: "outline", label: "Crea una scaletta" },
  { id: "draft", label: "Scrivi una prima bozza" },
  { id: "continue", label: "Continua il testo" },
  { id: "style", label: "Migliora lo stile" },
  { id: "emotional", label: "Piu emozionante" },
  { id: "clear", label: "Piu chiaro" },
  { id: "literary", label: "Piu letterario" },
  { id: "simple", label: "Piu semplice" },
  { id: "proofread", label: "Correggi grammatica" },
];

const GUIDE_INIZIALE: AiGuide = {
  tema: "",
  personaggi: "",
  luogoPeriodo: "",
  tono: "",
  puntoDiVista: "",
  eventi: "",
  appunti: "",
};

export default function EditorCapitolo({ iniziale, t, generi, locale, autore }: Props) {
  const [titolo, setTitolo] = useState(iniziale.titolo);
  const [genere, setGenere] = useState(iniziale.genere);
  const [testo, setTesto] = useState(iniziale.testo);
  const [anteprima, setAnteprima] = useState(false);
  const [saving, setSaving] = useState(false);
  const [salvato, setSalvato] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState<AiMode>("start");
  const [guide, setGuide] = useState<AiGuide>(GUIDE_INIZIALE);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiPreview, setAiPreview] = useState("");
  const [aiNotice, setAiNotice] = useState("");

  const battute = testo.length;
  const rimanenti = Math.max(0, MAX_BATTUTE_CAPITOLO - battute);
  const pagine = Math.max(1, Math.ceil(battute / BATTUTE_PER_PAGINA));
  const percento = Math.min(100, Math.round((battute / MAX_BATTUTE_CAPITOLO) * 100));
  const vicinoLimite = percento >= 85 && battute <= MAX_BATTUTE_CAPITOLO;
  const oltreLimite = battute > MAX_BATTUTE_CAPITOLO;
  const modalitaRevisione = [
    "style",
    "emotional",
    "clear",
    "literary",
    "simple",
    "proofread",
  ].includes(aiMode);
  const limiteAnteprimaAi = modalitaRevisione ? MAX_BATTUTE_CAPITOLO : rimanenti;

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

  function aggiornaGuida(campo: keyof AiGuide, value: string) {
    setGuide((corrente) => ({ ...corrente, [campo]: value }));
  }

  async function chiediAi() {
    setAiLoading(true);
    setAiError(null);
    setAiPreview("");
    setAiNotice("");

    try {
      const res = await fetch("/api/ai/editor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: aiMode,
          title: titolo,
          genre: genere,
          currentText: testo,
          guide,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        text?: string;
        error?: string;
        notice?: string;
        requestsToday?: number;
        dailyLimit?: number;
      };
      if (!res.ok || !data.ok || !data.text) {
        setAiError(data.error ?? "Errore durante la generazione AI.");
        return;
      }
      setAiPreview(data.text);
      const quota =
        data.requestsToday && data.dailyLimit
          ? ` Richieste oggi: ${data.requestsToday}/${data.dailyLimit}.`
          : "";
      setAiNotice(`${data.notice ?? ""}${quota}`);
    } catch {
      setAiError("Impossibile contattare l'assistente AI. Riprova tra poco.");
    } finally {
      setAiLoading(false);
    }
  }

  function inserisciProposta(sostituisci = false) {
    const proposta = aiPreview.slice(0, MAX_BATTUTE_CAPITOLO);
    if (sostituisci) {
      setTesto(proposta.slice(0, MAX_BATTUTE_CAPITOLO));
      return;
    }
    const separatore = testo.trim().length > 0 ? "\n\n" : "";
    setTesto(`${testo}${separatore}${proposta}`.slice(0, MAX_BATTUTE_CAPITOLO));
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

          <div className="rounded-2xl border border-linea bg-paper2 px-5 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-semibold text-ink">
                  Assistente editoriale AI
                </p>
                <p className="mt-1 max-w-2xl text-base text-muted">
                  Il testo generato e una proposta iniziale: leggilo, verificalo e
                  personalizzalo prima di inserirlo nel capitolo.
                </p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted">
                {rimanenti.toLocaleString(locale)} battute disponibili
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {AI_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setAiMode(mode.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
                    aiMode === mode.id
                      ? "bg-ink text-white"
                      : "bg-white text-muted hover:text-ink"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-tema">
                  Tema principale
                </label>
                <input
                  id="ai-tema"
                  value={guide.tema}
                  onChange={(e) => aggiornaGuida("tema", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Es. un ritorno, una perdita, una rinascita"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-tono">
                  Tono desiderato
                </label>
                <input
                  id="ai-tono"
                  value={guide.tono}
                  onChange={(e) => aggiornaGuida("tono", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Es. intimo, ironico, epico, sobrio"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-personaggi">
                  Personaggi coinvolti
                </label>
                <textarea
                  id="ai-personaggi"
                  value={guide.personaggi}
                  onChange={(e) => aggiornaGuida("personaggi", e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-y rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Nomi, ruoli, relazioni, dettagli utili"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-luogo">
                  Luogo e periodo
                </label>
                <textarea
                  id="ai-luogo"
                  value={guide.luogoPeriodo}
                  onChange={(e) => aggiornaGuida("luogoPeriodo", e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-y rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Dove e quando si svolge la storia"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-pov">
                  Punto di vista narrativo
                </label>
                <input
                  id="ai-pov"
                  value={guide.puntoDiVista}
                  onChange={(e) => aggiornaGuida("puntoDiVista", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Es. prima persona, terza persona, narratore esterno"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink" htmlFor="ai-eventi">
                  Eventi del primo capitolo
                </label>
                <textarea
                  id="ai-eventi"
                  value={guide.eventi}
                  onChange={(e) => aggiornaGuida("eventi", e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-y rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                  placeholder="Cosa deve succedere o essere raccontato"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-ink" htmlFor="ai-appunti">
                Appunti, ricordi o testi gia preparati
              </label>
              <textarea
                id="ai-appunti"
                value={guide.appunti}
                onChange={(e) => aggiornaGuida("appunti", e.target.value)}
                rows={4}
                className="mt-1.5 w-full resize-y rounded-xl border border-linea bg-white px-4 py-3 outline-none focus:border-oro"
                placeholder="Incolla qui note, frasi, ricordi o materiali da cui partire"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={chiediAi}
                disabled={aiLoading || limiteAnteprimaAi <= 0}
                className="cursor-pointer rounded-full bg-ink px-6 py-3 text-base font-medium text-white hover:bg-oro disabled:cursor-not-allowed disabled:opacity-50"
              >
                {aiLoading ? "Generazione..." : "Genera proposta"}
              </button>
              {aiPreview && (
                <button
                  type="button"
                  onClick={chiediAi}
                  disabled={aiLoading}
                  className="cursor-pointer rounded-full bg-white px-5 py-3 text-base font-medium text-ink hover:text-oro disabled:opacity-50"
                >
                  Rigenera
                </button>
              )}
              {aiError && <span className="text-base text-[#de3b30]">{aiError}</span>}
            </div>

            {aiPreview && (
              <div className="mt-5 rounded-2xl bg-white p-4">
                <label className="text-sm font-semibold text-ink" htmlFor="ai-preview">
                  Anteprima proposta AI
                </label>
                <textarea
                  id="ai-preview"
                  value={aiPreview}
                  onChange={(e) => setAiPreview(e.target.value)}
                  rows={8}
                  maxLength={limiteAnteprimaAi}
                  className="mt-1.5 w-full resize-y rounded-xl border border-linea px-4 py-3 leading-relaxed outline-none focus:border-oro"
                />
                {aiNotice && <p className="mt-2 text-sm text-muted">{aiNotice}</p>}
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => inserisciProposta(false)}
                    className="cursor-pointer rounded-full bg-oro px-5 py-3 text-base font-medium text-white hover:bg-[#0b7c72]"
                  >
                    Inserisci nel capitolo
                  </button>
                  <button
                    type="button"
                    onClick={() => inserisciProposta(true)}
                    className="cursor-pointer rounded-full bg-ink px-5 py-3 text-base font-medium text-white hover:bg-oro"
                  >
                    Sostituisci testo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAiPreview("");
                      setAiNotice("");
                    }}
                    className="cursor-pointer rounded-full bg-paper2 px-5 py-3 text-base font-medium text-muted hover:text-ink"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="h-1.5 w-full rounded-full bg-paper2">
              <div
                className={`h-1.5 rounded-full transition-[width] ${
                  oltreLimite ? "bg-[#de3b30]" : vicinoLimite ? "bg-[#d99b00]" : "bg-oro"
                }`}
                style={{ width: `${percento}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-base text-muted">
              <div className="space-y-1">
                <span className="block tabular-nums">
                  {battute.toLocaleString(locale)} {t.battute} usate ·{" "}
                  {rimanenti.toLocaleString(locale)} disponibili
                </span>
                <span className="block tabular-nums">
                  Limite: {MAX_BATTUTE_CAPITOLO.toLocaleString(locale)} {t.battute} · {t.circa}{" "}
                  {pagine} {pagine === 1 ? t.pagina : t.pagine}
                </span>
                {vicinoLimite && (
                  <span className="block font-medium text-[#a66f00]">
                    Ti stai avvicinando al limite massimo del capitolo.
                  </span>
                )}
                {oltreLimite && (
                  <span className="block font-medium text-[#de3b30]">
                    Il testo supera il limite di 12.000 battute e non puo essere salvato.
                  </span>
                )}
              </div>
              <span className="flex items-center gap-4">
                {error && <span className="text-[#de3b30]">{error}</span>}
                {salvato && <span className="font-medium text-oro">{t.salvato}</span>}
                <button
                  type="button"
                  onClick={handleSalva}
                  disabled={saving || oltreLimite}
                  className="cursor-pointer rounded-full bg-oro px-7 py-3 text-lg font-medium text-white hover:bg-[#0b7c72] disabled:cursor-not-allowed disabled:opacity-50"
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
