import Link from "next/link";

const mockLabels = [
  { id: "demo-vino", nome: "Brunello di Montalcino", azienda: "Fisar" },
];

export default function EtichetteListPage() {
  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-sand-900">
            Etichette elettroniche
          </h1>
          <Link
            href="/etichette/nuova"
            className="rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600"
          >
            + nuova etichetta
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-sand-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-100 text-sand-700">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Azienda</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {mockLabels.map((label) => (
                <tr key={label.id} className="border-t border-sand-200">
                  <td className="px-4 py-3 text-sand-900">{label.nome}</td>
                  <td className="px-4 py-3 text-sand-700">{label.azienda}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/v/${label.id}`}
                      className="text-wine-500 hover:underline"
                    >
                      Vedi scheda →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
