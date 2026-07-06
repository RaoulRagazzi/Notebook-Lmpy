import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getFormula } from "@/lib/listino";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EditorCapitolo from "./EditorCapitolo";

export default async function StudioPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/accedi");

  const [capitolo, ordini] = await Promise.all([
    prisma.capitolo.findUnique({ where: { userId: session.user.id } }),
    prisma.ordine.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-20 pt-12">
        <p className="font-sans text-[0.72rem] uppercase tracking-[0.26em] text-oro">
          Il tuo Studio
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">
          Bentornato{session.user.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="mt-3 max-w-2xl">
          Questo è il tuo spazio di scrittura. Il primo capitolo — fino a sei pagine — è
          in omaggio: raccontaci come comincia la tua storia. Quando vorrai continuare,
          scegli una formula del listino e un ghostwriter professionista la porterà a
          compimento.
        </p>

        {ordini.length > 0 && (
          <section className="mt-8 space-y-3">
            {ordini.map((o) => {
              const f = getFormula(o.formula);
              return (
                <div
                  key={o.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 border border-oro/50 bg-paper3 px-5 py-4"
                >
                  <div>
                    <p className="font-display text-lg text-ink">
                      Formula {f?.nome ?? o.formula} ·{" "}
                      <span className="tabular-nums">
                        {o.prezzo.toLocaleString("it-IT")} €
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      Richiesta ricevuta il{" "}
                      {new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(
                        o.createdAt
                      )}
                      : ti contatteremo per il pagamento e per fissare la prima
                      intervista.
                    </p>
                  </div>
                  <span className="bg-oro/15 px-3 py-1 font-sans text-[0.66rem] uppercase tracking-[0.16em] text-oro">
                    {o.stato === "richiesta" ? "In lavorazione" : o.stato}
                  </span>
                </div>
              );
            })}
          </section>
        )}

        <EditorCapitolo
          iniziale={{
            titolo: capitolo?.titolo ?? "",
            genere: capitolo?.genere ?? "Autobiografia",
            testo: capitolo?.testo ?? "",
          }}
        />

        {ordini.length === 0 && (
          <section className="mt-12 border border-orochiara/60 bg-ink px-8 py-10 text-center text-paper">
            <h2 className="text-balance font-display text-2xl font-medium">
              Ti piace com&apos;è cominciata?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-paper/80">
              Il tuo primo capitolo è solo l&apos;inizio. Scegli la formula più adatta e
              i nostri ghostwriter trasformeranno la tua storia in un libro vero, stampato
              e depositato a tuo nome.
            </p>
            <Link
              href="/listino"
              className="mt-6 inline-block bg-orochiara px-8 py-3 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88]"
            >
              Continua il tuo libro — vedi il listino
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
