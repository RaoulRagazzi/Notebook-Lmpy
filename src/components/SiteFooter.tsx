import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export default async function SiteFooter() {
  const lang = await getLang();
  const t = getDict(lang).footer;

  return (
    <footer className="mt-auto bg-paper2 text-testo">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-14 gap-y-6 px-6 py-12 text-center text-[17px]">
        <span>
          <b className="mb-1 block font-semibold">{t.indirizzo}</b>
          <span className="text-muted">
            Via J. W. von Goethe 42
            <br />
            39012 Merano (BZ), Italia
          </span>
        </span>
        <span>
          <b className="mb-1 block font-semibold">{t.telefono}</b>
          <a href="tel:+3902950290219" className="text-oro hover:underline">
            +39 02 950 290 219
          </a>
        </span>
        <span>
          <b className="mb-1 block font-semibold">{t.email}</b>
          <a href="mailto:info@splendoria.vip" className="text-oro hover:underline">
            info@splendoria.vip
          </a>
        </span>
      </div>
      <p className="border-t border-linea py-6 text-center text-[15px] text-muted">
        {t.tagline}
      </p>
    </footer>
  );
}
