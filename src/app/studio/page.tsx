import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getFormula } from "@/lib/listino";
import { getDict, LOCALE } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EditorCapitolo from "./EditorCapitolo";

export default async function StudioPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/accedi");

  const lang = await getLang();
  const dict = getDict(lang);
  const t = dict.studio;
  const locale = LOCALE[lang];

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
        <p className="text-lg font-semibold text-oro">{t.label}</p>
        <h1 className="font-display mt-1 text-5xl font-semibold text-ink">
          {t.bentornato}
          {session.user.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">{t.intro}</p>

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
                      {t.formula} {f?.nome ?? o.formula} ·{" "}
                      <span className="tabular-nums">
                        {o.prezzo.toLocaleString(locale)} €
                      </span>
                    </p>
                    <p className="mt-1 text-lg text-muted">
                      {t.richiestaRicevuta}{" "}
                      {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
                        o.createdAt
                      )}
                      {t.richiestaSeguito}
                    </p>
                  </div>
                  <span className="rounded-full bg-oro/10 px-4 py-1.5 text-base font-medium text-oro">
                    {o.stato === "richiesta" ? t.inLavorazione : o.stato}
                  </span>
                </div>
              );
            })}
          </section>
        )}

        <EditorCapitolo
          iniziale={{
            titolo: capitolo?.titolo ?? "",
            genere: capitolo?.genere ?? dict.generi[0],
            testo: capitolo?.testo ?? "",
          }}
          t={dict.editor}
          generi={dict.generi}
          locale={locale}
        />

        {ordini.length === 0 && (
          <section className="mt-14 rounded-[28px] bg-ink2 px-8 py-14 text-center text-white">
            <h2 className="font-display text-balance text-4xl font-semibold">
              {t.ctaTitolo}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-white/75">{t.ctaTesto}</p>
            <Link
              href="/listino"
              className="mt-8 inline-block rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
            >
              {t.ctaBtn}
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
