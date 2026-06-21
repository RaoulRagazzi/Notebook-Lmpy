"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Email o password non corretti." };
    }
    throw error;
  }
}

export async function registrati(nome: string, email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "Esiste già un account con questa email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { nome, email, passwordHash } });

  return login(email, password);
}
