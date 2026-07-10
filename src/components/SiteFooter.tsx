import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import ContactForm from "./ContactForm";

export default async function SiteFooter() {
  const lang = await getLang();
  const t = getDict(lang).footer;

  return (
    <footer id="contatti" className="mt-auto scroll-mt-24 bg-paper2 text-testo">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-lg font-semibold text-oro">Splendoria</p>
          <h2 className="font-display mt-2 text-4xl font-semibold text-ink">
            {t.contactTitle}
          </h2>
          <p className="mt-3 max-w-sm text-lg text-muted">{t.contactIntro}</p>
          <div className="mt-8 text-[17px]">
            <b className="mb-1 block font-semibold">{t.indirizzo}</b>
            <span className="text-muted">
              Via J. W. von Goethe 42
              <br />
              39012 Merano (BZ), Italia
            </span>
          </div>
        </div>
        <ContactForm lang={lang} labels={t} />
      </div>
      <p className="border-t border-linea py-6 text-center text-[15px] text-muted">
        {t.tagline}
      </p>
    </footer>
  );
}
