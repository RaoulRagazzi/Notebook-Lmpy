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
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-20 pt-14">
        <p className="text-center font-sans text-[0.72rem] uppercase tracking-[0.26em] text-oro">
          Il listino
        </p>
        <h1 className="mt-2 text-balance text-center font-display text-4xl font-medium text-ink">
          Continua il tuo libro.
        </h1>
        <div className="filetto" aria-hidden="true" />
        <p className="mx-auto max-w-2xl text-center">
          Il primo capitolo è in omaggio. Per trasformarlo in un libro completo — scritto
          da un ghostwriter professionista, stampato e depositato a tuo nome — scegli la
          formula più adatta: ti contatteremo per il pagamento e per fissare la prima
          intervista.
        </p>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {FORMULE.map((f) => (
            <article
              key={f.id}
              className={
                f.inEvidenza
                  ? "flex flex-col bg-ink p-7 text-paper"
                  : "flex flex-col border border-linea bg-paper3 p-7"
              }
            >
              <h2
                className={`font-display text-2xl font-medium ${
                  f.inEvidenza ? "text-orochiara" : "text-ink"
                }`}
              >
                {f.nome}
              </h2>
              <p
                className={`font-display italic ${
                  f.inEvidenza ? "text-paper/75" : "text-bordeaux"
                }`}
              >
                {f.sottotitolo}
              </p>
              <p className="mt-4 font-display text-3xl tabular-nums">
                {f.prezzo.toLocaleString("it-IT")}&nbsp;€{" "}
                <small
                  className={`font-sans text-sm tracking-wide ${
                    f.inEvidenza ? "text-paper/60" : "text-muted"
                  }`}
                >
                  · {f.pagine}
                </small>
              </p>
              <ul className="mt-4 flex-1">
                {f.dettagli.map((d) => (
                  <li
                    key={d}
                    className={`relative border-t py-2 pl-5 text-[0.93rem] before:absolute before:left-0 before:text-oro before:content-['—'] ${
                      f.inEvidenza ? "border-paper/15" : "border-linea"
                    }`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
              {session?.user ? (
                <form action={creaOrdine.bind(null, f.id)} className="mt-6">
                  <button
                    type="submit"
                    className={`w-full cursor-pointer px-6 py-3 font-sans text-[0.74rem] uppercase tracking-[0.16em] ${
                      f.inEvidenza
                        ? "bg-orochiara text-ink hover:bg-[#e6cd88]"
                        : "bg-ink text-paper hover:bg-ink2"
                    }`}
                  >
                    Scegli questa formula
                  </button>
                </form>
              ) : (
                <Link
                  href="/registrati"
                  className={`mt-6 block px-6 py-3 text-center font-sans text-[0.74rem] uppercase tracking-[0.16em] ${
                    f.inEvidenza
                      ? "bg-orochiara text-ink hover:bg-[#e6cd88]"
                      : "bg-ink text-paper hover:bg-ink2"
                  }`}
                >
                  Registrati per iniziare
                </Link>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
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
