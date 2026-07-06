"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MAX_BATTUTE_CAPITOLO } from "@/lib/listino";
import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export async function salvaCapitolo(titolo: string, genere: string, testo: string) {
  const errors = getDict(await getLang()).errors;

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, error: errors.sessioneScaduta };
  }

  if (testo.length > MAX_BATTUTE_CAPITOLO) {
    return {
      ok: false as const,
      error: errors.troppeBattute.replace(
        "{max}",
        MAX_BATTUTE_CAPITOLO.toLocaleString("it-IT")
      ),
    };
  }

  const genereValido = genere.trim().slice(0, 40) || "Autobiografia";

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
