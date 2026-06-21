"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import TemplateRenderer, { type WineInfo } from "@/components/studio/TemplateRenderer";
import { templates, formatDimensions } from "@/components/studio/templates";
import type { WineStoryData } from "@/lib/wineStory";

const documentFormats = ["a4"];
const imageFormats = ["square", "story", "horizontal"];

export default function CreaFlow({
  slug,
  wine,
  story,
}: {
  slug: string;
  wine: WineInfo;
  story: WineStoryData;
}) {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const template = templates.find((t) => t.id === templateId)!;
  const isDocument = documentFormats.includes(template.formato);
  const isImageFormat = imageFormats.includes(template.formato);

  async function exportPng() {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${slug}-${templateId}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }

  async function exportPdf() {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 });
      const { width, height } = formatDimensions[template.formato];
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "pt",
        format: [width, height],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`${slug}-${templateId}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-wine-500">
              Veritas Studio
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-sand-900">
              Crea materiale per {wine.nome}
            </h1>
          </div>
          <Link
            href="/studio"
            aria-label="Chiudi"
            className="text-2xl leading-none text-sand-500 hover:text-sand-800"
          >
            ×
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
              Scegli un modello
            </p>
            <div className="mt-3 space-y-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplateId(t.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                    t.id === templateId
                      ? "border-wine-500 bg-white shadow-sm"
                      : "border-sand-200 bg-white/60 hover:bg-white"
                  }`}
                >
                  <p className="font-medium text-sand-900">{t.nome}</p>
                  <p className="mt-0.5 text-xs text-sand-500">{t.descrizione}</p>
                  <p className="mt-1 text-xs font-medium text-olive-700">
                    {t.usoConsigliato}
                  </p>
                </button>
              ))}
            </div>

            <Link
              href={`/studio/${slug}`}
              className="mt-4 block text-center text-sm text-sand-600 hover:underline"
            >
              ← Modifica i dati del racconto
            </Link>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-sand-700">
                Anteprima — {formatDimensions[template.formato].label}
              </p>
              <div className="flex gap-2">
                {isDocument && (
                  <button
                    type="button"
                    onClick={exportPdf}
                    disabled={exporting}
                    className="rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600 disabled:opacity-50"
                  >
                    {exporting ? "Esportazione…" : "Scarica PDF"}
                  </button>
                )}
                {isImageFormat && (
                  <button
                    type="button"
                    onClick={exportPng}
                    disabled={exporting}
                    className="rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600 disabled:opacity-50"
                  >
                    {exporting ? "Esportazione…" : "Scarica immagine"}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-center overflow-auto rounded-2xl border border-sand-200 bg-sand-100 p-8">
              <TemplateRenderer
                ref={previewRef}
                templateId={templateId}
                formato={template.formato}
                wine={wine}
                story={story}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-sand-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
                    Testo breve per social
                  </p>
                  <button
                    type="button"
                    onClick={() => copyText(story.testoSocialBreve, "breve")}
                    className="text-xs font-medium text-wine-500 hover:underline"
                  >
                    {copied === "breve" ? "Copiato ✓" : "Copia"}
                  </button>
                </div>
                <p className="mt-2 text-sm text-sand-700">
                  {story.testoSocialBreve || "—"}
                </p>
              </div>
              <div className="rounded-xl border border-sand-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
                    Testo lungo per sito / catalogo
                  </p>
                  <button
                    type="button"
                    onClick={() => copyText(story.testoSitoLungo, "lungo")}
                    className="text-xs font-medium text-wine-500 hover:underline"
                  >
                    {copied === "lungo" ? "Copiato ✓" : "Copia"}
                  </button>
                </div>
                <p className="mt-2 text-sm text-sand-700">
                  {story.testoSitoLungo || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
