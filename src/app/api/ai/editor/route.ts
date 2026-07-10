import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { getAiUsage, incrementAiUsage } from "@/lib/db";
import { MAX_BATTUTE_CAPITOLO } from "@/lib/listino";

const AI_DAILY_REQUEST_LIMIT = 20;

const Modes = z.enum([
  "start",
  "outline",
  "draft",
  "continue",
  "style",
  "emotional",
  "clear",
  "literary",
  "simple",
  "proofread",
]);

const RequestSchema = z.object({
  mode: Modes,
  title: z.string().max(120).optional().default(""),
  genre: z.string().max(80).optional().default(""),
  currentText: z.string().max(MAX_BATTUTE_CAPITOLO),
  guide: z.object({
    tema: z.string().max(1200).optional().default(""),
    personaggi: z.string().max(1200).optional().default(""),
    luogoPeriodo: z.string().max(1200).optional().default(""),
    tono: z.string().max(300).optional().default(""),
    puntoDiVista: z.string().max(300).optional().default(""),
    eventi: z.string().max(1800).optional().default(""),
    appunti: z.string().max(3000).optional().default(""),
  }),
});

type CloudflareEnv = {
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
};

type AnthropicTextBlock = { type: "text"; text: string };

const MODE_LABELS: Record<z.infer<typeof Modes>, string> = {
  start: "Aiutami a iniziare: proponi alcune aperture alternative",
  outline: "Crea una scaletta del primo capitolo",
  draft: "Scrivi una prima bozza",
  continue: "Continua il testo gia scritto",
  style: "Migliora lo stile senza cambiare il contenuto sostanziale",
  emotional: "Rendi il testo piu emozionante",
  clear: "Rendi il testo piu chiaro",
  literary: "Rendi il testo piu letterario",
  simple: "Rendi il testo piu semplice",
  proofread: "Correggi grammatica e sintassi",
};

const REWRITE_MODES = new Set<z.infer<typeof Modes>>([
  "style",
  "emotional",
  "clear",
  "literary",
  "simple",
  "proofread",
]);

async function getAnthropicEnv(): Promise<CloudflareEnv> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext() as unknown as { env?: CloudflareEnv };
    return env ?? {};
  } catch {
    return {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
    };
  }
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function buildPrompt(input: z.infer<typeof RequestSchema>, availableChars: number) {
  const hasText = input.currentText.trim().length > 0;
  const operation = REWRITE_MODES.has(input.mode)
    ? "Puoi proporre una versione rivista del testo esistente, senza superare il limite indicato."
    : "Proponi un testo da aggiungere o usare come struttura, senza superare il limite indicato.";

  return [
    `Modalita richiesta: ${MODE_LABELS[input.mode]}.`,
    operation,
    `Titolo provvisorio: ${input.title || "non indicato"}.`,
    `Genere: ${input.genre || "non indicato"}.`,
    `Tema principale: ${input.guide.tema || "non indicato"}.`,
    `Personaggi coinvolti: ${input.guide.personaggi || "non indicati"}.`,
    `Luogo e periodo: ${input.guide.luogoPeriodo || "non indicati"}.`,
    `Tono desiderato: ${input.guide.tono || "non indicato"}.`,
    `Punto di vista narrativo: ${input.guide.puntoDiVista || "non indicato"}.`,
    `Eventi da raccontare nel primo capitolo: ${input.guide.eventi || "non indicati"}.`,
    `Appunti, ricordi o testi gia preparati: ${input.guide.appunti || "nessuno"}.`,
    `Testo gia presente nell'editor: ${hasText ? input.currentText : "nessun testo ancora presente"}.`,
    `Battute massime disponibili per questa proposta: ${availableChars}.`,
    "Rispondi solo con il testo da mostrare in anteprima all'autore.",
  ].join("\n\n");
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonError("Sessione scaduta: accedi di nuovo.", 401);
  }

  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return jsonError("Dati non validi per l'assistente AI.");
  }

  const input = parsed.data;
  const remainingChars = MAX_BATTUTE_CAPITOLO - input.currentText.length;
  const availableChars = REWRITE_MODES.has(input.mode) ? MAX_BATTUTE_CAPITOLO : remainingChars;
  if (availableChars <= 0) {
    return jsonError("Hai raggiunto il limite di 12.000 battute: libera spazio prima di usare l'AI.");
  }

  const date = todayKey();
  const usedToday = await getAiUsage(session.user.id, date);
  if (usedToday >= AI_DAILY_REQUEST_LIMIT) {
    return jsonError("Hai raggiunto il limite giornaliero di richieste AI. Riprova domani.", 429);
  }

  const env = await getAnthropicEnv();
  if (!env.ANTHROPIC_API_KEY) {
    return jsonError("Assistente AI non configurato: manca il segreto ANTHROPIC_API_KEY.", 503);
  }

  const prompt = buildPrompt(input, availableChars);
  const maxTokens = Math.max(700, Math.min(3800, Math.ceil(availableChars / 2.4)));

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
      max_tokens: maxTokens,
      temperature: input.mode === "proofread" ? 0.2 : 0.7,
      system:
        "Sei un assistente editoriale per Splendoria. Aiuti l'autore a superare il blocco della pagina bianca, ma non sostituisci la sua creativita. Non inventare dati biografici certi se l'utente non li fornisce. Rispetta il limite di battute residuo indicato. Mantieni il testo in italiano.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    return jsonError("Il motore AI non ha risposto correttamente. Riprova tra poco.", 502);
  }

  const data = (await response.json()) as { content?: AnthropicTextBlock[] };
  const text = data.content?.find((block) => block.type === "text")?.text?.trim() ?? "";
  if (!text) {
    return jsonError("Il motore AI non ha prodotto testo utilizzabile.", 502);
  }

  const safeText = text.slice(0, availableChars);
  const requestsToday = await incrementAiUsage(session.user.id, date);

  return NextResponse.json({
    ok: true,
    text: safeText,
    remainingChars,
    availableChars,
    requestsToday,
    dailyLimit: AI_DAILY_REQUEST_LIMIT,
    notice:
      "Il testo generato dall'AI e una proposta iniziale: leggilo, verificalo e personalizzalo prima di usarlo.",
  });
}
