import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getDict } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import LangSwitcher from "./LangSwitcher";

export default async function SiteHeader() {
  const [session, lang] = await Promise.all([auth(), getLang()]);
  const t = getDict(lang).nav;

  return (
    <nav className="sticky top-0 z-10 bg-[#0d1f1c]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-3.5">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Splendoria
        </Link>
        <div className="flex flex-wrap items-center gap-6 text-[15px]">
          <Link href="/#come-funziona" className="text-white/80 hover:text-white">
            {t.comeFunziona}
          </Link>
          <Link href="/listino" className="text-white/80 hover:text-white">
            {t.listino}
          </Link>
          {session?.user ? (
            <>
              <Link
                href="/studio"
                className="font-medium text-orochiara hover:text-white"
              >
                {t.studio}
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer text-white/60 hover:text-white"
                >
                  {t.esci}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/accedi" className="text-white/80 hover:text-white">
                {t.accedi}
              </Link>
              <Link
                href="/registrati"
                className="rounded-full bg-oro px-4 py-1.5 font-medium text-white hover:bg-[#0b7c72]"
              >
                {t.iniziaGratis}
              </Link>
            </>
          )}
          <LangSwitcher current={lang} />
        </div>
      </div>
    </nav>
  );
}
