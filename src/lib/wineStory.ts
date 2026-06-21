import { prisma } from "@/lib/prisma";

export type WineStoryData = {
  annata: string;
  denominazione: string;
  vitigno: string;
  zonaProduzione: string;
  vigneto: string;
  vinificazione: string;
  affinamento: string;
  noteDegustazione: string;
  temperaturaServizio: string;
  abbinamenti: string;
  certificazioni: string;
  storiaVino: string;
  raccontoCantina: string;
  premi: string[];
  testoSocialBreve: string;
  testoSitoLungo: string;
  immagineBottiglia: string;
  immagineEtichetta: string;
  immagineVigneto: string;
  immagineCantina: string;
  lingua: string;
};

export const emptyWineStory: WineStoryData = {
  annata: "",
  denominazione: "",
  vitigno: "",
  zonaProduzione: "",
  vigneto: "",
  vinificazione: "",
  affinamento: "",
  noteDegustazione: "",
  temperaturaServizio: "",
  abbinamenti: "",
  certificazioni: "",
  storiaVino: "",
  raccontoCantina: "",
  premi: [],
  testoSocialBreve: "",
  testoSitoLungo: "",
  immagineBottiglia: "",
  immagineEtichetta: "",
  immagineVigneto: "",
  immagineCantina: "",
  lingua: "it",
};

async function assertOwnedLabel(userId: string, labelSlug: string) {
  const label = await prisma.label.findFirst({
    where: { slug: labelSlug, userId },
  });
  if (!label) throw new Error("Etichetta non trovata.");
  return label;
}

export async function getWineStory(userId: string, labelSlug: string) {
  const label = await prisma.label.findFirst({
    where: { slug: labelSlug, userId },
    include: { wineStory: true },
  });
  if (!label) return null;

  if (!label.wineStory) {
    return { label, story: emptyWineStory };
  }

  const { premiJson, ...rest } = label.wineStory;
  return {
    label,
    story: { ...rest, premi: JSON.parse(premiJson) as string[] },
  };
}

export async function saveWineStory(
  userId: string,
  labelSlug: string,
  data: WineStoryData
) {
  const label = await assertOwnedLabel(userId, labelSlug);

  const { premi, ...rest } = data;
  await prisma.wineStory.upsert({
    where: { labelId: label.id },
    create: { labelId: label.id, ...rest, premiJson: JSON.stringify(premi) },
    update: { ...rest, premiJson: JSON.stringify(premi) },
  });
}

export async function listWinesWithStoryStatus(userId: string) {
  const labels = await prisma.label.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { wineStory: { select: { id: true } } },
  });

  return labels.map((label) => ({
    ...label,
    hasStory: Boolean(label.wineStory),
  }));
}
