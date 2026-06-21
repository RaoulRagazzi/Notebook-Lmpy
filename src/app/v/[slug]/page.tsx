import { notFound } from "next/navigation";
import { getLabelBySlug } from "@/lib/labels";
import { computeNutrition } from "@/lib/nutrition";

export default async function PublicWinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = await getLabelBySlug(slug);

  if (!label) notFound();

  const nutrition = computeNutrition(label);
  const generale = label.ingredienti.filter((i) => i.category === "generale");
  const conservanti = label.ingredienti.filter(
    (i) => i.category === "conservanti"
  );
  const ingredientsLine = [
    generale.map((i) => i.label).join(", "),
    conservanti.length > 0
      ? `Conservanti e antiossidanti: ${conservanti
          .map((i) => i.label)
          .join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
        <div className="flex justify-end">
          <span className="rounded-full bg-sand-100 px-3 py-1 text-xs text-sand-700">
            🇮🇹 Italiano ▾
          </span>
        </div>

        <h1 className="mt-4 text-xl font-semibold text-sand-900">
          {label.nome}
        </h1>

        {ingredientsLine && (
          <Section title="Ingredienti">
            <p className="text-sm text-sand-700">{ingredientsLine}</p>
          </Section>
        )}

        <Section title="Valori nutrizionali (per 100ml)">
          <p className="text-sm text-sand-700">
            Energia: {nutrition.energyKcal} kcal / {nutrition.energyKJ} kJ
          </p>
          <p className="text-sm text-sand-700">
            Carboidrati: {nutrition.carbsG} g, di cui zuccheri:{" "}
            {nutrition.sugarG} g
          </p>
          <p className="text-sm text-sand-700">Alcol: {label.alcol} %vol</p>
        </Section>

        <Section title="Azienda responsabile dei contenuti">
          <p className="text-sm text-sand-700">{label.azienda}</p>
          <p className="text-sm text-sand-700">{label.paese}</p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold text-sand-900">{title}</h2>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  );
}
