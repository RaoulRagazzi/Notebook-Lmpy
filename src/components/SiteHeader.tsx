import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function SiteHeader() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-10 border-b border-orochiara/35 bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-6 py-3">
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-[0.22em] text-orochiara"
        >
          Splendoria
        </Link>
        <div className="flex flex-wrap items-baseline gap-5 font-sans text-[0.72rem] uppercase tracking-[0.14em]">
          <Link href="/#come-funziona" className="opacity-85 hover:text-orochiara">
            Come funziona
          </Link>
          <Link href="/listino" className="opacity-85 hover:text-orochiara">
            Listino
          </Link>
          {session?.user ? (
            <>
              <Link href="/studio" className="text-orochiara">
                Il tuo Studio
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer uppercase tracking-[0.14em] opacity-70 hover:opacity-100"
                >
                  Esci
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/accedi" className="opacity-85 hover:text-orochiara">
                Accedi
              </Link>
              <Link
                href="/registrati"
                className="bg-orochiara px-3 py-1.5 text-ink hover:bg-[#e6cd88]"
              >
                Inizia gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
