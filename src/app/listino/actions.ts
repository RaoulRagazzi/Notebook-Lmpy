"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getFormula } from "@/lib/listino";

export async function creaOrdine(formulaId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/registrati");

  const formula = getFormula(formulaId);
  if (!formula) redirect("/listino");

  const esistente = await prisma.ordine.findFirst({
    where: { userId: session.user.id, formula: formula.id, stato: "richiesta" },
  });
  if (!esistente) {
    await prisma.ordine.create({
      data: {
        userId: session.user.id,
        formula: formula.id,
        prezzo: formula.prezzo,
      },
    });
  }

  redirect("/studio");
}
