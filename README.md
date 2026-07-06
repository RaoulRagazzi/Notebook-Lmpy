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
  capitolo della sua storia — fino a ~6 pagine (4.000 battute) — con anteprima
  impaginata come una pagina di libro.
- **Listino** (`/listino`): le quattro formule con i prezzi; il cliente
  sceglie la formula e invia la richiesta di conversione (l'ordine compare nel
  suo Studio con stato "in lavorazione").

I prezzi e le formule si aggiornano in un unico file: `src/lib/listino.ts`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS 4 · Prisma + SQLite ·
NextAuth (credenziali).

## Sviluppo

```bash
npm install
DATABASE_URL="file:./dev.db" npx prisma migrate dev   # prepara il database
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Variabili d'ambiente utili (`.env`):

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<stringa casuale>"   # obbligatoria in produzione
```

## Prossimi passi suggeriti

- Invio delle credenziali via email (ora sono mostrate solo a schermo).
- Pagamento online (es. Stripe) al posto della richiesta di contatto.
- Recupero password.
