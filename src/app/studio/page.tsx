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
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-24 pt-14">
        <p className="text-lg font-semibold text-oro">Il tuo Studio</p>
        <h1 className="font-display mt-1 text-5xl font-semibold text-ink">
          Bentornato{session.user.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">
          Questo è il tuo spazio di scrittura. Il primo capitolo — fino a sei pagine — è
          in omaggio: raccontaci come comincia la tua storia. Quando vorrai continuare,
          scegli una formula del listino e un ghostwriter professionista la porterà a
          compimento.
        </p>

        {ordini.length > 0 && (
          <section className="mt-10 space-y-4">
            {ordini.map((o) => {
              const f = getFormula(o.formula);
              return (
                <div
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] bg-paper2 px-8 py-6"
                >
                  <div>
                    <p className="font-display text-2xl font-semibold text-ink">
                      Formula {f?.nome ?? o.formula} ·{" "}
                      <span className="tabular-nums">
                        {o.prezzo.toLocaleString("it-IT")} €
                      </span>
                    </p>
                    <p className="mt-1 text-lg text-muted">
                      Richiesta ricevuta il{" "}
                      {new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(
                        o.createdAt
                      )}
                      : ti contatteremo per il pagamento e per fissare la prima
                      intervista.
                    </p>
                  </div>
                  <span className="rounded-full bg-oro/10 px-4 py-1.5 text-base font-medium text-oro">
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
          <section className="mt-14 rounded-[28px] bg-ink2 px-8 py-14 text-center text-white">
            <h2 className="font-display text-balance text-4xl font-semibold">
              Ti piace com&apos;è cominciata?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-white/75">
              Il tuo primo capitolo è solo l&apos;inizio. Scegli la formula più adatta e
              i nostri ghostwriter trasformeranno la tua storia in un libro vero,
              stampato e depositato a tuo nome.
            </p>
            <Link
              href="/listino"
              className="mt-8 inline-block rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
            >
              Continua il tuo libro&nbsp;›
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
