// Genera il PDF di prova (formato A5) da un file Markdown di capitolo o bozza.
//
//   node scripts/genera-pdf.mjs clienti/mario-rossi/bozza/manoscritto.md
//
// Il PDF viene salvato accanto al file di partenza, con lo stesso nome.
// Formato atteso: eventuale front matter (---), un titolo `#`, sezioni
// `## Capitolo …`, paragrafi separati da riga vuota.

import { jsPDF } from "jspdf";
import { readFileSync, writeFileSync } from "fs";

const input = process.argv[2];
if (!input) {
  console.error("Uso: node scripts/genera-pdf.mjs percorso/al/file.md");
  process.exit(1);
}

let testo = readFileSync(input, "utf8");

// Front matter
let meta = {};
const fm = testo.match(/^---\n([\s\S]*?)\n---\n/);
if (fm) {
  for (const riga of fm[1].split("\n")) {
    const m = riga.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2];
  }
  testo = testo.slice(fm[0].length);
}

// Titolo del libro: front matter o primo heading #
let titolo = meta.titolo || "";
const righe = testo.split("\n");
const blocchi = []; // { tipo: "capitolo" | "paragrafo", testo }
let paragrafo = [];

function chiudiParagrafo() {
  if (paragrafo.length) {
    blocchi.push({ tipo: "paragrafo", testo: paragrafo.join(" ").trim() });
    paragrafo = [];
  }
}

for (const riga of righe) {
  const r = riga.trimEnd();
  if (r.startsWith("# ") && !titolo) {
    titolo = r.slice(2).trim();
  } else if (r.startsWith("## ")) {
    chiudiParagrafo();
    blocchi.push({ tipo: "capitolo", testo: r.slice(3).trim() });
  } else if (r.trim() === "") {
    chiudiParagrafo();
  } else if (!r.startsWith("#")) {
    paragrafo.push(r.trim());
  }
}
chiudiParagrafo();

if (!titolo) titolo = "Senza titolo";

// Impaginazione A5
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
const titoloRighe = doc.splitTextToSize(titolo, AREA);
doc.text(titoloRighe, LARGH / 2, 85, { align: "center" });
if (meta.genere) {
  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.text(meta.genere, LARGH / 2, 85 + titoloRighe.length * 10 + 6, {
    align: "center",
  });
}
doc.setFontSize(9);
doc.setTextColor(100, 114, 107);
doc.text("PDF di prova", LARGH / 2, 195, { align: "center" });

// Testo
doc.addPage();
let y = MARGINE + 4;

function aCapoPagina(spazio = 0) {
  if (y + spazio > FONDO) {
    doc.addPage();
    y = MARGINE + 4;
  }
}

for (const b of blocchi) {
  if (b.tipo === "capitolo") {
    aCapoPagina(30);
    if (y > MARGINE + 10) y += 10;
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    doc.setTextColor(19, 49, 43);
    for (const r of doc.splitTextToSize(b.testo, AREA)) {
      aCapoPagina();
      doc.text(r, LARGH / 2, y, { align: "center" });
      y += 7;
    }
    y += 4;
  } else {
    doc.setFont("times", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(39, 51, 47);
    for (const r of doc.splitTextToSize(b.testo, AREA)) {
      aCapoPagina();
      doc.text(r, MARGINE, y);
      y += 5.4;
    }
    y += 3.2;
  }
}

// Piè di pagina
const totale = doc.getNumberOfPages();
for (let i = 2; i <= totale; i++) {
  doc.setPage(i);
  doc.setFontSize(9);
  doc.setTextColor(100, 114, 107);
  doc.text(String(i - 1), LARGH / 2, 200, { align: "center" });
  doc.text("Splendoria", MARGINE, 200);
  doc.text("PDF di prova", LARGH - MARGINE, 200, { align: "right" });
}

const output = input.replace(/\.md$/i, "") + ".pdf";
writeFileSync(output, Buffer.from(doc.output("arraybuffer")));
console.log(`PDF generato: ${output} (${totale} pagine)`);
