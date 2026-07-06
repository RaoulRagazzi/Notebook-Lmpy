"use server";

import { randomInt } from "crypto";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export async function login(email: string, password: string) {
  const errors = getDict(await getLang()).errors;
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: errors.credenziali };
    }
    throw error;
  }
}

// Password leggibili e facili da trascrivere: due parole + due cifre
const PAROLE = [
  "inchiostro",
  "romanzo",
  "capitolo",
  "poesia",
  "racconto",
  "memoria",
  "pagina",
  "penna",
  "storia",
  "libro",
  "prosa",
  "epilogo",
  "incipit",
  "sogno",
  "vita",
  "parola",
];

function generaPassword(): string {
  const a = PAROLE[randomInt(PAROLE.length)];
  const b = PAROLE[randomInt(PAROLE.length)];
  const n = randomInt(10, 100);
  return `${a}-${b}-${n}`;
}

export async function registrati(nome: string, email: string) {
  const errors = getDict(await getLang()).errors;
  const emailPulita = email.trim().toLowerCase();
  const nomePulito = nome.trim();
  if (!nomePulito || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPulita)) {
    return { ok: false as const, error: errors.datiNonValidi };
  }

  const existing = await prisma.user.findUnique({ where: { email: emailPulita } });
  if (existing) {
    return { ok: false as const, error: errors.emailEsistente };
  }

  const password = generaPassword();
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { nome: nomePulito, email: emailPulita, passwordHash },
  });

  const res = await login(emailPulita, password);
  if (!res.ok) return { ok: false as const, error: res.error };

  return { ok: true as const, email: emailPulita, password };
}
