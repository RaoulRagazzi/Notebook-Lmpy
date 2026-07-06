import Link from "next/link";
import { auth } from "@/auth";
import { FORMULE } from "@/lib/listino";
import { getDict, LOCALE } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { creaOrdine } from "./actions";

export const metadata = {
  title: "Listino — Splendoria",
};

export default async function ListinoPage() {
  const session = await auth();
  const lang = await getLang();
  const dict = getDict(lang);
  const t = dict.listinoPage;
  const locale = LOCALE[lang];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 pt-16">
        <p className="text-center text-lg font-semibold text-oro">{t.label}</p>
        <h1 className="font-display mx-auto mt-2 max-w-3xl text-balance text-center text-5xl font-semibold text-ink sm:text-6xl">
          {t.titolo}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-2xl text-muted">
          {t.intro}
        </p>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {FORMULE.map((f) => {
            const ft = dict.formule[f.id];
            return (
              <article
                key={f.id}
                className={`flex flex-col rounded-[28px] p-9 ${
                  f.inEvidenza ? "bg-ink text-white" : "bg-paper2"
                }`}
              >
                <h2
                  className={`font-display text-3xl font-semibold ${
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
                  {ft.sottotitolo}
                </p>
                <p className="font-display mt-6 text-5xl font-semibold tabular-nums">
                  {f.prezzo.toLocaleString(locale)}&nbsp;€
                </p>
                <p
                  className={`mt-1 text-lg ${
                    f.inEvidenza ? "text-white/70" : "text-muted"
                  }`}
                >
                  {ft.pagine}
                </p>
                <ul className="mt-6 flex-1">
                  {ft.dettagli.map((d) => (
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
                      className="w-full cursor-pointer rounded-full bg-oro px-6 py-3.5 text-lg font-medium text-white hover:bg-[#0b7c72]"
                    >
                      {t.scegliFormula}
                    </button>
                  </form>
                ) : (
                  <Link
                    href="/registrati"
                    className="mt-8 block rounded-full bg-oro px-6 py-3.5 text-center text-lg font-medium text-white hover:bg-[#0b7c72]"
                  >
                    {t.registratiPer}
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-muted">
          {t.nota}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
