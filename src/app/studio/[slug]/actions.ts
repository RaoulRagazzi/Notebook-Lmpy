"use server";

import { auth } from "@/auth";
import { saveWineStory, type WineStoryData } from "@/lib/wineStory";

export async function saveStory(slug: string, data: WineStoryData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autenticato.");

  await saveWineStory(session.user.id, slug, data);
}
