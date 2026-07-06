"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registrati } from "../accedi/actions";

type Credenziali = { email: string; password: string };

export default function RegistratiPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [credenziali, setCredenziali] = useState<Credenziali | null>(null);
  const [copiato, setCopiato] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await registrati(nome, email);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Errore durante la registrazione.");
      return;
    }
    setCredenziali({ email: res.email, password: res.password });
  }

  async function copiaPassword() {
    if (!credenziali) return;
    try {
      await navigator.clipboard.writeText(credenziali.password);
      setCopiato(true);
      setTimeout(() => setCopiato(false), 2000);
    } catch {
      // clipboard non disponibile: la password resta visibile a schermo
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper2 px-6 py-14">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-10 shadow-sm">
        <p className="text-center text-lg font-semibold text-oro">Splendoria</p>

        {credenziali ? (
          <>
            <h1 className="mt-2 text-center text-4xl font-semibold tracking-tight text-ink">
              Benvenuto{nome ? `, ${nome.trim()}` : ""}.
            </h1>
            <p className="mt-4 text-center text-lg text-muted">
              Il tuo account è pronto. Queste sono le tue credenziali:{" "}
              <b className="font-semibold text-ink">conservale con cura</b>, ti
              serviranno per accedere al tuo Studio.
            </p>
            <dl className="mt-7 space-y-5 rounded-2xl bg-paper2 p-6">
              <div>
                <dt className="text-base font-semibold text-ink">
                  Nome utente (email)
                </dt>
                <dd className="mt-1 break-all text-lg text-testo">
                  {credenziali.email}
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-ink">Password</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-3">
                  <code className="rounded-lg bg-white px-3 py-1.5 text-xl tracking-wide">
                    {credenziali.password}
                  </code>
                  <button
                    type="button"
                    onClick={copiaPassword}
                    className="cursor-pointer rounded-full border border-linea px-4 py-1.5 text-base font-medium text-oro hover:border-oro"
                  >
                    {copiato ? "Copiata ✓" : "Copia"}
                  </button>
                </dd>
              </div>
            </dl>
            <button
              onClick={() => {
                router.push("/studio");
                router.refresh();
              }}
              className="mt-8 w-full cursor-pointer rounded-full bg-oro px-6 py-4 text-xl font-medium text-white hover:bg-[#0077ed]"
            >
              Entra nel tuo Studio
            </button>
          </>
        ) : (
          <>
            <h1 className="mt-2 text-center text-4xl font-semibold tracking-tight text-ink">
              Crea il tuo account
            </h1>
            <p className="mt-4 text-center text-lg text-muted">
              Ricevi subito le tue credenziali e scrivi gratis il primo capitolo della
              tua storia: fino a sei pagine, senza impegno.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="nome" className="text-base font-semibold text-ink">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-linea px-4 py-3 text-lg outline-none focus:border-oro"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-base font-semibold text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-linea px-4 py-3 text-lg outline-none focus:border-oro"
                />
              </div>

              {error && <p className="text-lg text-[#de3b30]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-full bg-oro px-6 py-4 text-xl font-medium text-white hover:bg-[#0077ed] disabled:opacity-50"
              >
                {loading ? "Creazione…" : "Registrati gratis"}
              </button>
            </form>

            <p className="mt-7 text-center text-lg text-muted">
              Hai già un account?{" "}
              <Link href="/accedi" className="font-medium text-oro hover:underline">
                Accedi
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
