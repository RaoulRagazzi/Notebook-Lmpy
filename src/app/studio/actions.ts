"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GENERI, MAX_BATTUTE_CAPITOLO } from "@/lib/listino";

export async function salvaCapitolo(titolo: string, genere: string, testo: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, error: "Sessione scaduta: accedi di nuovo." };
  }

  if (testo.length > MAX_BATTUTE_CAPITOLO) {
    return {
      ok: false as const,
      error: `Il capitolo gratuito può contenere al massimo ${MAX_BATTUTE_CAPITOLO.toLocaleString("it-IT")} battute.`,
    };
  }

  const genereValido = (GENERI as readonly string[]).includes(genere)
    ? genere
    : GENERI[0];

  await prisma.capitolo.upsert({
    where: { userId: session.user.id },
    update: { titolo: titolo.trim(), genere: genereValido, testo },
    create: {
      userId: session.user.id,
      titolo: titolo.trim(),
      genere: genereValido,
      testo,
    },
  });

  return { ok: true as const };
}
