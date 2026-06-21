import Link from "next/link";
import { auth } from "@/auth";
import { listWinesWithStoryStatus } from "@/lib/wineStory";

export default async function StudioDashboard() {
  const session = await auth();
  const wines = await listWinesWithStoryStatus(session!.user.id);

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-wine-500">
              Veritas Studio
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-sand-900">
              Materiali di marketing per i tuoi vini
            </h1>
            <p className="mt-2 max-w-xl text-sm text-sand-600">
              Trasforma i dati delle tue etichette in schede tecniche,
              contenuti social e materiali commerciali pronti all&apos;uso.
            </p>
          </div>
          <Link
            href="/etichette"
            className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
          >
            ← Le mie etichette
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-sand-200 bg-white">
          {wines.length === 0 ? (
            <p className="p-6 text-sm text-sand-600">
              Non hai ancora nessuna etichetta. Crea prima un&apos;etichetta
              elettronica per poter generare materiali di marketing.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-100 text-sand-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Vino</th>
                  <th className="px-4 py-3 font-medium">Stato racconto</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {wines.map((wine) => (
                  <tr key={wine.id} className="border-t border-sand-200">
                    <td className="px-4 py-3 text-sand-900">{wine.nome}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          wine.hasStory
                            ? "bg-olive-100 text-olive-700"
                            : "bg-sand-100 text-sand-600"
                        }`}
                      >
                        {wine.hasStory ? "Dati completati" : "Da completare"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/studio/${wine.slug}`}
                          className="text-sand-700 hover:underline"
                        >
                          {wine.hasStory ? "Modifica dati" : "Completa dati"}
                        </Link>
                        <Link
                          href={`/studio/${wine.slug}/crea`}
                          className="rounded-full bg-olive-500 px-4 py-1.5 text-sm font-medium text-sand-50 hover:bg-wine-600"
                        >
                          Crea materiale marketing
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
