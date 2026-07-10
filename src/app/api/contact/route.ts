import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  countRecentContactMessages,
  createContactMessage,
  setContactDelivery,
} from "@/lib/db";

const DESTINATION = "raoul.ragazzi@apple.bz";
const SENDER = "contatti@splendoria.vip";
const MAX_PER_IP_PER_HOUR = 5;
const MAX_PER_EMAIL_PER_HOUR = 3;

const ContactSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(5).max(3000),
  lang: z.enum(["it", "de", "en"]),
  website: z.string().max(200).optional().default(""),
});

type EmailBinding = {
  send(message: {
    to: string;
    from: { email: string; name: string };
    replyTo: { email: string; name: string };
    subject: string;
    text: string;
    html: string;
  }): Promise<{ messageId: string }>;
};

type CloudflareEnv = { CONTACT_EMAIL?: EmailBinding };

async function getEmailBinding(): Promise<EmailBinding | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext() as unknown as { env?: CloudflareEnv };
    return env?.CONTACT_EMAIL;
  } catch {
    return undefined;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

async function hashIp(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  const parsed = ContactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const input = parsed.data;
  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const ipHash = await hashIp(ip);
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await countRecentContactMessages({
    ipHash,
    email: input.email.toLowerCase(),
    since,
  });

  if (recent.byIp >= MAX_PER_IP_PER_HOUR || recent.byEmail >= MAX_PER_EMAIL_PER_HOUR) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const id = await createContactMessage({
    fullName: input.fullName,
    phone: input.phone,
    email: input.email.toLowerCase(),
    subject: input.subject,
    message: input.message,
    lang: input.lang,
    ipHash,
  });

  const email = await getEmailBinding();
  if (!email) {
    await setContactDelivery(id, "failed", "CONTACT_EMAIL binding unavailable");
    return NextResponse.json({ ok: true, queued: true }, { status: 202 });
  }

  const subject = input.subject.replace(/[\r\n]+/g, " ");
  const text = [
    "Nuova richiesta dal modulo Splendoria",
    "",
    `Nome e cognome: ${input.fullName}`,
    `Telefono: ${input.phone}`,
    `Email: ${input.email}`,
    `Lingua: ${input.lang.toUpperCase()}`,
    `Oggetto: ${subject}`,
    "",
    "Messaggio:",
    input.message,
  ].join("\n");

  const html = `
    <h2>Nuova richiesta dal modulo Splendoria</h2>
    <p><strong>Nome e cognome:</strong> ${escapeHtml(input.fullName)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Lingua:</strong> ${escapeHtml(input.lang.toUpperCase())}</p>
    <p><strong>Oggetto:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Messaggio:</strong><br>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await email.send({
      to: DESTINATION,
      from: { email: SENDER, name: "Splendoria" },
      replyTo: { email: input.email, name: input.fullName },
      subject: `[Splendoria] ${subject}`,
      text,
      html,
    });
    await setContactDelivery(id, "sent");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email delivery failed";
    console.error("Contact email delivery failed", error);
    await setContactDelivery(id, "failed", message);
    return NextResponse.json({ ok: true, queued: true }, { status: 202 });
  }

  return NextResponse.json({ ok: true });
}
