import { prisma } from "@/lib/prisma";
import type { Ingredient, RecyclingMode, WizardData } from "@/components/wizard/WizardContext";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createLabel(data: WizardData) {
  const base = slugify(data.nome) || "vino";
  const suffix = Math.random().toString(36).slice(2, 7);
  const slug = `${base}-${suffix}`;

  await prisma.label.create({
    data: {
      slug,
      nome: data.nome,
      alcol: data.alcol,
      acidita: data.acidita,
      zuccheroResiduo: data.zuccheroResiduo,
      glicerinaManuale: data.glicerinaManuale,
      ingredientiJson: JSON.stringify(data.ingredienti),
      riciclaggio: data.riciclaggio,
      azienda: data.azienda,
      paese: data.paese,
    },
  });

  return slug;
}

export async function listLabels() {
  return prisma.label.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getLabelBySlug(slug: string) {
  const label = await prisma.label.findUnique({ where: { slug } });
  if (!label) return null;

  return {
    ...label,
    ingredienti: JSON.parse(label.ingredientiJson) as Ingredient[],
    riciclaggio: label.riciclaggio as RecyclingMode,
  };
}
