"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { deleteLabel } from "@/lib/labels";

export async function removeLabel(slug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autenticato.");

  await deleteLabel(session.user.id, slug);
  revalidatePath("/etichette");
}
