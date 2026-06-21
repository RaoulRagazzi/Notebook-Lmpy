"use server";

import { auth } from "@/auth";
import { updateLabel } from "@/lib/labels";
import type { WizardData } from "@/components/wizard/WizardContext";

export async function saveLabelEdit(slug: string, data: WizardData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autenticato.");

  await updateLabel(session.user.id, slug, data);
}
