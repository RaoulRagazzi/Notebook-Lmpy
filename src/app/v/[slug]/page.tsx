const mockWine = {
  nome: "Brunello di Montalcino",
  ingredienti: "Uve, Conservanti e antiossidanti: Solfiti",
  azienda: "Fisar",
  paese: "Italia",
  alcol: 13.5,
  energiaKcal: 85,
  energiaKJ: 356,
  carboidrati: 0.3,
  zuccheri: 0.3,
};

export default async function PublicWinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  const wine = mockWine;

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
        <div className="flex justify-end">
          <span className="rounded-full bg-sand-100 px-3 py-1 text-xs text-sand-700">
            🇮🇹 Italiano ▾
          </span>
        </div>

        <h1 className="mt-4 text-xl font-semibold text-sand-900">
          {wine.nome}
        </h1>

        <Section title="Ingredienti">
          <p className="text-sm text-sand-700">{wine.ingredienti}</p>
        </Section>

        <Section title="Valori nutrizionali (per 100ml)">
          <p className="text-sm text-sand-700">
            Energia: {wine.energiaKcal} kcal / {wine.energiaKJ} kJ
          </p>
          <p className="text-sm text-sand-700">
            Carboidrati: {wine.carboidrati} g, di cui zuccheri: {wine.zuccheri} g
          </p>
          <p className="text-sm text-sand-700">Alcol: {wine.alcol} %vol</p>
        </Section>

        <Section title="Azienda responsabile dei contenuti">
          <p className="text-sm text-sand-700">{wine.azienda}</p>
          <p className="text-sm text-sand-700">{wine.paese}</p>
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
