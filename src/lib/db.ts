// Accesso al database senza Prisma, così funziona nativamente su Cloudflare
// Workers (D1) senza compilare WebAssembly a runtime.
//
// - Su Cloudflare Workers usa il binding D1 "DB" (async).
// - In sviluppo locale usa SQLite su file tramite better-sqlite3 (sincrono).
//
// Un unico strato astrae le due API dietro first/all/run asincroni.

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  nome: string;
  createdAt: string;
};

export type Capitolo = {
  id: string;
  userId: string;
  titolo: string;
  genere: string;
  testo: string;
  createdAt: string;
  updatedAt: string;
};

export type Ordine = {
  id: string;
  userId: string;
  formula: string;
  prezzo: number;
  stato: string;
  createdAt: string;
};

export type AiUsage = {
  userId: string;
  date: string;
  requests: number;
  updatedAt: string;
};

type Backend = {
  first<T>(sql: string, params?: unknown[]): Promise<T | null>;
  all<T>(sql: string, params?: unknown[]): Promise<T[]>;
  run(sql: string, params?: unknown[]): Promise<void>;
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "createdAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE TABLE IF NOT EXISTS "Capitolo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "titolo" TEXT NOT NULL DEFAULT '',
    "genere" TEXT NOT NULL DEFAULT 'Autobiografia',
    "testo" TEXT NOT NULL DEFAULT '',
    "createdAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Capitolo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Capitolo_userId_key" ON "Capitolo"("userId")`,
  `CREATE TABLE IF NOT EXISTS "Ordine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "prezzo" INTEGER NOT NULL,
    "stato" TEXT NOT NULL DEFAULT 'richiesta',
    "createdAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ordine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "AiUsage" (
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("userId", "date"),
    CONSTRAINT "AiUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
  )`,
];

type D1PreparedStatement = {
  bind: (...params: unknown[]) => D1PreparedStatement;
  first: <T>() => Promise<T | null>;
  all: <T>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
};
type D1Database = { prepare: (sql: string) => D1PreparedStatement };

function d1Backend(DB: D1Database): Backend {
  return {
    async first<T>(sql: string, params: unknown[] = []) {
      return (await DB.prepare(sql).bind(...params).first<T>()) ?? null;
    },
    async all<T>(sql: string, params: unknown[] = []) {
      const r = await DB.prepare(sql).bind(...params).all<T>();
      return r.results;
    },
    async run(sql: string, params: unknown[] = []) {
      await DB.prepare(sql).bind(...params).run();
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sqliteBackend(db: any): Backend {
  return {
    async first<T>(sql: string, params: unknown[] = []) {
      return (db.prepare(sql).get(...params) as T | undefined) ?? null;
    },
    async all<T>(sql: string, params: unknown[] = []) {
      return db.prepare(sql).all(...params) as T[];
    },
    async run(sql: string, params: unknown[] = []) {
      db.prepare(sql).run(...params);
    },
  };
}

const globalForDb = globalThis as unknown as { dbPromise?: Promise<Backend> };

async function creaBackend(): Promise<Backend> {
  let backend: Backend | null = null;

  // Cloudflare Workers: binding D1
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext() as unknown as {
      env?: { DB?: D1Database };
    };
    if (env?.DB) backend = d1Backend(env.DB);
  } catch {
    // Non siamo su Cloudflare.
  }

  // Sviluppo locale: SQLite su file
  if (!backend) {
    const { default: Database } = await import("better-sqlite3");
    const file = (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");
    backend = sqliteBackend(new Database(file));
  }

  for (const sql of SCHEMA) await backend.run(sql);
  return backend;
}

function getDb(): Promise<Backend> {
  if (!globalForDb.dbPromise) globalForDb.dbPromise = creaBackend();
  return globalForDb.dbPromise;
}

function nuovoId(): string {
  return crypto.randomUUID();
}

// ---- Utenti ----

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDb();
  return db.first<User>('SELECT * FROM "User" WHERE "email" = ?', [email]);
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  nome: string;
}): Promise<User> {
  const db = await getDb();
  const user: User = {
    id: nuovoId(),
    email: input.email,
    passwordHash: input.passwordHash,
    nome: input.nome,
    createdAt: new Date().toISOString(),
  };
  await db.run(
    'INSERT INTO "User" ("id","email","passwordHash","nome","createdAt") VALUES (?,?,?,?,?)',
    [user.id, user.email, user.passwordHash, user.nome, user.createdAt]
  );
  return user;
}

// ---- Capitolo ----

export async function getCapitolo(userId: string): Promise<Capitolo | null> {
  const db = await getDb();
  return db.first<Capitolo>('SELECT * FROM "Capitolo" WHERE "userId" = ?', [userId]);
}

export async function upsertCapitolo(
  userId: string,
  dati: { titolo: string; genere: string; testo: string }
): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.run(
    `INSERT INTO "Capitolo" ("id","userId","titolo","genere","testo","createdAt","updatedAt")
     VALUES (?,?,?,?,?,?,?)
     ON CONFLICT("userId") DO UPDATE SET
       "titolo" = excluded."titolo",
       "genere" = excluded."genere",
       "testo" = excluded."testo",
       "updatedAt" = excluded."updatedAt"`,
    [nuovoId(), userId, dati.titolo, dati.genere, dati.testo, now, now]
  );
}

// ---- AI editoriale ----

export async function getAiUsage(userId: string, date: string): Promise<number> {
  const db = await getDb();
  const row = await db.first<{ requests: number }>(
    'SELECT "requests" FROM "AiUsage" WHERE "userId" = ? AND "date" = ?',
    [userId, date]
  );
  return row?.requests ?? 0;
}

export async function incrementAiUsage(userId: string, date: string): Promise<number> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.run(
    `INSERT INTO "AiUsage" ("userId","date","requests","updatedAt")
     VALUES (?,?,1,?)
     ON CONFLICT("userId","date") DO UPDATE SET
       "requests" = "requests" + 1,
       "updatedAt" = excluded."updatedAt"`,
    [userId, date, now]
  );
  return getAiUsage(userId, date);
}

// ---- Ordini ----

export async function listOrdini(userId: string): Promise<Ordine[]> {
  const db = await getDb();
  return db.all<Ordine>(
    'SELECT * FROM "Ordine" WHERE "userId" = ? ORDER BY "createdAt" DESC',
    [userId]
  );
}

export async function ordineRichiestaEsistente(
  userId: string,
  formula: string
): Promise<boolean> {
  const db = await getDb();
  const row = await db.first<{ id: string }>(
    'SELECT "id" FROM "Ordine" WHERE "userId" = ? AND "formula" = ? AND "stato" = ? LIMIT 1',
    [userId, formula, "richiesta"]
  );
  return row !== null;
}

export async function createOrdine(input: {
  userId: string;
  formula: string;
  prezzo: number;
}): Promise<void> {
  const db = await getDb();
  await db.run(
    'INSERT INTO "Ordine" ("id","userId","formula","prezzo","stato","createdAt") VALUES (?,?,?,?,?,?)',
    [nuovoId(), input.userId, input.formula, input.prezzo, "richiesta", new Date().toISOString()]
  );
}
