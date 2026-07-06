import Link from "next/link";
import { auth } from "@/auth";
import { FORMULE } from "@/lib/listino";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { creaOrdine } from "./actions";

export const metadata = {
  title: "Listino — Splendoria",
};

export default async function ListinoPage() {
  const session = await auth();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 pt-16">
        <p className="text-center text-lg font-semibold text-oro">Listino</p>
        <h1 className="mx-auto mt-2 max-w-3xl text-balance text-center text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          Continua il tuo libro.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-2xl text-muted">
          Il primo capitolo è in omaggio. Per trasformarlo in un libro completo —
          scritto da un ghostwriter professionista, stampato e depositato a tuo nome —
          scegli la formula più adatta: ti contatteremo per il pagamento e per fissare
          la prima intervista.
        </p>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {FORMULE.map((f) => (
            <article
              key={f.id}
              className={`flex flex-col rounded-[28px] p-9 ${
                f.inEvidenza ? "bg-ink text-white" : "bg-paper2"
              }`}
            >
              <h2
                className={`text-3xl font-semibold tracking-tight ${
                  f.inEvidenza ? "text-white" : "text-ink"
                }`}
              >
                {f.nome}
              </h2>
              <p
                className={`mt-1 text-lg ${
                  f.inEvidenza ? "text-white/70" : "text-muted"
                }`}
              >
                {f.sottotitolo}
              </p>
              <p className="mt-6 text-5xl font-semibold tracking-tight tabular-nums">
                {f.prezzo.toLocaleString("it-IT")}&nbsp;€
              </p>
              <p
                className={`mt-1 text-lg ${
                  f.inEvidenza ? "text-white/70" : "text-muted"
                }`}
              >
                {f.pagine}
              </p>
              <ul className="mt-6 flex-1">
                {f.dettagli.map((d) => (
                  <li
                    key={d}
                    className={`border-t py-3 text-lg ${
                      f.inEvidenza
                        ? "border-white/15 text-white/85"
                        : "border-linea text-testo"
                    }`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
              {session?.user ? (
                <form action={creaOrdine.bind(null, f.id)} className="mt-8">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-oro px-6 py-3.5 text-lg font-medium text-white hover:bg-[#0077ed]"
                  >
                    Scegli questa formula
                  </button>
                </form>
              ) : (
                <Link
                  href="/registrati"
                  className="mt-8 block rounded-full bg-oro px-6 py-3.5 text-center text-lg font-medium text-white hover:bg-[#0077ed]"
                >
                  Registrati per iniziare
                </Link>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-muted">
          Tutte le formule comprendono tutor dedicato, menabò digitale, versione
          sfogliabile, stampa delle prime 5 copie, consegna entro 10 giorni
          dall&apos;approvazione della bozza e deposito dell&apos;opera a tutela dei
          diritti d&apos;autore.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
