"use server";

import { createLabel } from "@/lib/labels";
import type { WizardData } from "@/components/wizard/WizardContext";

export async function saveLabel(data: WizardData) {
  const slug = await createLabel(data);
  return slug;
}
