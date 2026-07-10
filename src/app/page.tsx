import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FORMULE } from "@/lib/listino";
import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { LOCALE } from "@/lib/i18n";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <p className="text-center text-lg font-semibold text-oro">{label}</p>
      <h2 className="font-display mx-auto mt-2 mb-14 max-w-3xl text-balance text-center text-5xl font-semibold text-ink sm:text-6xl">
        {title}
      </h2>
    </>
  );
}

export default async function Home() {
  const lang = await getLang();
  const dict = getDict(lang);
  const t = dict.home;
  const locale = LOCALE[lang];

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <header className="bg-ink2 px-6 pb-28 pt-24 text-center text-white">
        <p className="text-xl font-semibold text-orochiara">{t.eyebrow}</p>
        <h1 className="font-display mx-auto mt-4 max-w-4xl text-balance text-7xl font-semibold sm:text-8xl">
          Splendoria
        </h1>
        <p className="font-display mx-auto mt-5 max-w-2xl text-balance text-3xl italic text-[#a8c3b8] sm:text-4xl">
          {t.tagline}
        </p>
        <p className="mx-auto mt-7 max-w-2xl text-balance text-2xl text-white/85">
          {t.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/registrati"
            className="rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
          >
            {t.ctaPrimo}
          </Link>
          <Link
            href="#come-funziona"
            className="text-xl font-medium text-orochiara hover:underline"
          >
            {t.ctaScopri}
          </Link>
        </div>
      </header>

      <main>
        {/* La storia */}
        <section className="bg-paper2 px-6 py-24" id="storia">
          <SectionHeading label={t.storiaLabel} title={t.storiaTitolo} />
          <div className="mx-auto max-w-3xl space-y-6 text-2xl leading-relaxed text-testo">
            <p>{t.storiaP1}</p>
            <p>
              {t.storiaP2}{" "}
              <span className="font-semibold text-ink">{t.storiaForte}</span>
            </p>
          </div>
        </section>

        {/* Come funziona */}
        <section className="px-6 py-24" id="come-funziona">
          <SectionHeading label={t.comeLabel} title={t.comeTitolo} />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.passi.map((p, i) => (
              <div key={p.titolo} className="rounded-[28px] bg-paper2 p-8">
                <span className="text-4xl font-semibold text-oro">{i + 1}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                  {p.titolo}
                </h3>
                <p className="mt-3 text-lg text-muted">{p.testo}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-14 max-w-3xl text-center text-2xl text-muted">
            <span className="font-semibold text-ink">{t.genereTitolo}</span>{" "}
            {t.genereTesto}
          </p>
        </section>

        {/* Le formule */}
        <section className="bg-paper2 px-6 py-24" id="formule">
          <SectionHeading label={t.listinoLabel} title={t.listinoTitolo} />
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
            {FORMULE.map((f) => {
              const ft = dict.formule[f.id];
              return (
                <article
                  key={f.id}
                  className={`flex flex-col rounded-[28px] p-9 ${
                    f.inEvidenza ? "bg-ink text-white" : "bg-white"
                  }`}
                >
                  <h3
                    className={`font-display text-3xl font-semibold ${
                      f.inEvidenza ? "text-white" : "text-ink"
                    }`}
                  >
                    {f.nome}
                  </h3>
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
                  <ul className="mt-6 flex-1 space-y-0">
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
                  <Link
                    href="/listino"
                    className="mt-8 rounded-full bg-oro px-6 py-3.5 text-center text-lg font-medium text-white hover:bg-[#0b7c72]"
                  >
                    {t.scegli} {f.nome.split(" ")[0]}
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-muted">
            {t.listinoNota}
          </p>
        </section>

        {/* Sempre incluso */}
        <section className="px-6 py-24" id="servizi">
          <SectionHeading label={t.serviziLabel} title={t.serviziTitolo} />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.servizi.map((s) => (
              <div key={s.titolo} className="rounded-[28px] bg-paper2 p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {s.titolo}
                </h3>
                <p className="mt-3 text-lg text-muted">{s.testo}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scuola Holden */}
        <aside className="bg-ink2 px-6 py-24 text-center text-white">
          <p className="font-display mx-auto max-w-4xl text-balance text-3xl font-semibold sm:text-4xl">
            {t.holdenQuote}
          </p>
          <p className="mt-6 text-xl text-orochiara">{t.holdenSub}</p>
        </aside>

        {/* Dicono di noi */}
        <section className="px-6 py-24" id="voci">
          <SectionHeading label={t.vociLabel} title={t.vociTitolo} />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {t.voci.map((v) => (
              <article key={v.autore} className="rounded-[28px] bg-paper2 p-8">
                <blockquote className="font-display text-2xl leading-relaxed text-testo">
                  “{v.testo}”
                </blockquote>
                <p className="mt-6 text-lg">
                  <b className="font-semibold text-ink">{v.autore}</b>
                  <span className="text-muted"> · {v.ruolo}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section className="bg-paper2 px-6 py-24 text-center">
          <h2 className="font-display mx-auto max-w-3xl text-balance text-5xl font-semibold text-ink sm:text-6xl">
            {t.finaleTitolo}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-2xl text-muted">
            {t.finaleTesto}
          </p>
          <Link
            href="/registrati"
            className="mt-10 inline-block rounded-full bg-oro px-8 py-4 text-xl font-medium text-white hover:bg-[#0b7c72]"
          >
            {t.finaleBtn}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
