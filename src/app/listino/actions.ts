"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getFormula } from "@/lib/listino";
import { ordineRichiestaEsistente, createOrdine } from "@/lib/db";

export async function creaOrdine(formulaId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/registrati");

  const formula = getFormula(formulaId);
  if (!formula) redirect("/listino");

  const esistente = await ordineRichiestaEsistente(session.user.id, formula.id);
  if (!esistente) {
    await createOrdine({
      userId: session.user.id,
      formula: formula.id,
      prezzo: formula.prezzo,
    });
  }

  redirect("/studio");
}
