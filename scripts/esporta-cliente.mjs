// Esporta il materiale di un cliente dal database del sito nell'archivio clienti/.
//
//   node scripts/esporta-cliente.mjs email@cliente.it [--db percorso/al/db]
//
// Crea (o aggiorna) clienti/<nome-cliente>/ con scheda-cliente.md e
// capitoli/capitolo-01.md. Non tocca interviste/ e bozza/.

import Database from "better-sqlite3";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const radice = join(dirname(fileURLToPath(import.meta.url)), "..");

const argomenti = process.argv.slice(2);
const email = argomenti.find((a) => !a.startsWith("--"));
const dbFlag = argomenti.indexOf("--db");
const dbPath =
  dbFlag !== -1
    ? argomenti[dbFlag + 1]
    : (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");

if (!email) {
  console.error("Uso: node scripts/esporta-cliente.mjs email@cliente.it [--db dev.db]");
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });

const utente = db
  .prepare('SELECT * FROM "User" WHERE email = ?')
  .get(email.trim().toLowerCase());
if (!utente) {
  console.error(`Nessun cliente con email ${email} in ${dbPath}`);
  process.exit(1);
}

const capitolo = db
  .prepare('SELECT * FROM "Capitolo" WHERE userId = ?')
  .get(utente.id);
const ordini = db
  .prepare('SELECT * FROM "Ordine" WHERE userId = ? ORDER BY createdAt')
  .all(utente.id);

const oggi = new Date().toISOString().slice(0, 10);
const slug =
  (utente.nome || utente.email.split("@")[0])
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "cliente";

const cartella = join(radice, "clienti", slug);
mkdirSync(join(cartella, "capitoli"), { recursive: true });
mkdirSync(join(cartella, "interviste"), { recursive: true });
mkdirSync(join(cartella, "bozza"), { recursive: true });

// Scheda cliente: se esiste già, conserva il diario e le note aggiunte a mano
const percorsoScheda = join(cartella, "scheda-cliente.md");
const righeOrdini =
  ordini.length > 0
    ? ordini
        .map(
          (o) =>
            `- ${o.formula} — ${o.prezzo} € — ${o.stato} — ${String(o.createdAt).slice(0, 10)}`
        )
        .join("\n")
    : "- (nessun ordine: primo capitolo gratuito)";

const intestazione = `# Scheda cliente — ${utente.nome || utente.email}

- **Email:** ${utente.email}
- **Registrato il:** ${String(utente.createdAt).slice(0, 10)}
- **Ultimo export:** ${oggi}

## Ordini

${righeOrdini}
`;

if (existsSync(percorsoScheda)) {
  const esistente = readFileSync(percorsoScheda, "utf8");
  const daNote = esistente.indexOf("## Il progetto");
  const coda =
    daNote !== -1
      ? esistente.slice(daNote)
      : "## Il progetto\n\n—\n\n## Note del tutor\n\n—\n\n## Diario di lavorazione\n\n- (vuoto)\n";
  writeFileSync(percorsoScheda, `${intestazione}\n${coda}`);
} else {
  writeFileSync(
    percorsoScheda,
    `${intestazione}\n## Il progetto\n\n—\n\n## Note del tutor\n\n—\n\n## Diario di lavorazione\n\n- ${oggi} — primo export dal sito.\n`
  );
}

// Capitolo del cliente
if (capitolo && capitolo.testo.trim()) {
  const md = `---
titolo: ${capitolo.titolo || "Senza titolo"}
genere: ${capitolo.genere}
battute: ${capitolo.testo.length}
esportato: ${oggi}
---

${capitolo.testo.trim()}
`;
  writeFileSync(join(cartella, "capitoli", "capitolo-01.md"), md);
  console.log(`Esportato capitolo (${capitolo.testo.length} battute).`);
} else {
  console.log("Il cliente non ha ancora scritto il primo capitolo.");
}

console.log(`Cartella cliente: clienti/${slug}/`);
