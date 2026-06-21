import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-sand-50 px-6 text-center">
      <div className="absolute right-6 top-6 flex gap-3">
        {session?.user ? (
          <Link
            href="/etichette"
            className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
          >
            Le mie etichette
          </Link>
        ) : (
          <>
            <Link
              href="/accedi"
              className="rounded-full border border-sand-300 px-5 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
            >
              Accedi
            </Link>
            <Link
              href="/registrati"
              className="rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600"
            >
              Registrati
            </Link>
          </>
        )}
      </div>

      <p className="text-sm font-medium uppercase tracking-wide text-wine-500">
        Etichette elettroniche per vino
      </p>
      <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-sand-900">
        Crea la tua etichetta elettronica in pochi minuti
      </h1>
      <p className="mt-4 max-w-md text-sand-600">
        Carica i dati di analisi, seleziona gli ingredienti e scarica il
        codice QR da inviare in tipografia.
      </p>
      <Link
        href={session?.user ? "/etichette/nuova" : "/registrati"}
        className="mt-8 rounded-full bg-olive-500 px-8 py-3 text-sm font-medium text-sand-50 hover:bg-wine-600"
      >
        Crea nuova etichetta →
      </Link>
    </div>
  );
}
