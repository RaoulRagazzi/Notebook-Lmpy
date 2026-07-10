# Splendoria — La tua vita in un romanzo

Sito web del progetto **Splendoria** (già *Fabulis Vitae*): il servizio di
ghostwriting che trasforma la storia di una persona — o di un'azienda — in un
libro vero, scritto da professionisti.

## Cosa fa il sito

- **Landing page** con la storia del progetto, come funziona, le formule, i
  servizi inclusi e le testimonianze.
- **Registrazione** (`/registrati`): il cliente inserisce nome ed email e
  riceve subito le credenziali (la password viene generata automaticamente e
  mostrata a schermo).
- **Studio** (`/studio`, area riservata): il cliente scrive gratis il primo
  capitolo della sua storia — fino a 12.000 battute, spazi inclusi — con anteprima
  impaginata come una pagina di libro.
- **Listino** (`/listino`): le tre formule con i prezzi (Hybrid, Premium Short Book, Personal Branding & Corporate); il cliente
  sceglie la formula e invia la richiesta di conversione (l'ordine compare nel
  suo Studio con stato "in lavorazione").

I prezzi e le formule si aggiornano in un unico file: `src/lib/listino.ts`
(i testi descrittivi, in tre lingue, sono in `src/lib/i18n.ts`).

## Tre lingue

Il sito è in italiano, tedesco e inglese: il selettore nell'header salva la
scelta in un cookie e tutte le pagine (vetrina, registrazione, Studio,
listino) leggono i testi dai dizionari in `src/lib/i18n.ts`.

## Archivio clienti e ghostwriter

- `clienti/` — una cartella per cliente (scheda, capitoli, interviste, bozza).
  Le istruzioni operative per il ghostwriter Claude sono in `clienti/CLAUDE.md`.
- `node scripts/esporta-cliente.mjs email@cliente.it` — esporta dal database
  del sito la scheda e il primo capitolo del cliente nell'archivio.
- `node scripts/genera-pdf.mjs clienti/<cliente>/bozza/manoscritto.md` —
  genera il PDF di prova impaginato in A5.
- Il cliente può scaricare da solo il PDF di prova del suo primo capitolo
  dall'anteprima nel suo Studio.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS 4 · NextAuth (credenziali).
Database: **Cloudflare D1** in produzione, SQLite su file in locale — un unico
strato (`src/lib/db.ts`) astrae le due. In produzione l'app gira su
**Cloudflare Workers** tramite l'adattatore OpenNext.

## Sviluppo

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). In locale il database è
`dev.db` (SQLite): le tabelle vengono create automaticamente al primo avvio.

`.env` utile in locale:

```
AUTH_SECRET="<stringa casuale>"   # una stringa lunga a caso
```

## Deploy su Cloudflare

Il database D1 di produzione è `splendoria-db` (già creato, vedi
`wrangler.jsonc`). Per pubblicare:

```bash
npx wrangler login                       # una volta, per collegare l'account
npx wrangler secret put AUTH_SECRET      # incolla una stringa lunga a caso
npm run deploy                           # build OpenNext + deploy del Worker
```

Poi in Cloudflare, nel Worker `splendoria`, collega il dominio
(es. `app.splendoria.vip`) da **Settings → Domains & Routes**.

- `npm run preview` — prova il Worker in locale (con un D1 locale).
- Le tabelle su D1 vengono create in automatico al primo utilizzo.

## Prossimi passi suggeriti

- Invio delle credenziali via email (ora sono mostrate solo a schermo).
- Pagamento online (es. Stripe) al posto della richiesta di contatto.
- Recupero password.
