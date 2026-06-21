import Link from "next/link";
import { auth, signOut } from "@/auth";
import { listLabels } from "@/lib/labels";
import DeleteLabelButton from "./DeleteLabelButton";

export default async function EtichetteListPage() {
  const session = await auth();
  const labels = await listLabels(session!.user.id);

  return (
    <div className="min-h-screen bg-sand-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-sand-900">
              Etichette elettroniche
            </h1>
            <p className="mt-1 text-sm text-sand-600">
              {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/etichette/nuova"
              className="rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600"
            >
              + nuova etichetta
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
              >
                Esci
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-sand-200 bg-white">
          {labels.length === 0 ? (
            <p className="p-6 text-sm text-sand-600">
              Non hai ancora creato nessuna etichetta.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-100 text-sand-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">Azienda</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {labels.map((label) => (
                  <tr key={label.id} className="border-t border-sand-200">
                    <td className="px-4 py-3 text-sand-900">{label.nome}</td>
                    <td className="px-4 py-3 text-sand-700">
                      {label.azienda}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/v/${label.slug}`}
                          className="text-wine-500 hover:underline"
                        >
                          Vedi scheda →
                        </Link>
                        <Link
                          href={`/etichette/${label.slug}/modifica`}
                          className="text-sand-700 hover:underline"
                        >
                          Modifica
                        </Link>
                        <DeleteLabelButton slug={label.slug} />
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
