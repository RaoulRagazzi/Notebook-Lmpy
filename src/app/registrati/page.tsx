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
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-12">
      <div className="w-full max-w-md border border-orochiara/60 bg-ink p-9 text-paper outline outline-1 outline-offset-[6px] outline-orochiara/30">
        <p className="text-center font-sans text-[0.68rem] uppercase tracking-[0.3em] text-orochiara">
          Splendoria
        </p>

        {credenziali ? (
          <>
            <h1 className="mt-3 text-center font-display text-3xl font-medium">
              Benvenuto{nome ? `, ${nome.trim()}` : ""}.
            </h1>
            <p className="mt-3 text-center text-sm text-paper/75">
              Il tuo account è pronto. Queste sono le tue credenziali:{" "}
              <em className="text-orochiara">conservale con cura</em>, ti serviranno per
              accedere al tuo Studio.
            </p>
            <dl className="mt-6 space-y-4 border border-paper/15 p-5 font-sans text-sm">
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-orochiara">
                  Nome utente (email)
                </dt>
                <dd className="mt-1 break-all">{credenziali.email}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-orochiara">
                  Password
                </dt>
                <dd className="mt-1 flex items-center gap-3">
                  <code className="bg-paper/10 px-2 py-1 text-base tracking-wide">
                    {credenziali.password}
                  </code>
                  <button
                    type="button"
                    onClick={copiaPassword}
                    className="cursor-pointer border border-paper/30 px-2 py-1 text-[0.66rem] uppercase tracking-[0.14em] hover:border-orochiara"
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
              className="mt-7 w-full cursor-pointer bg-orochiara px-6 py-3 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88]"
            >
              Entra nel tuo Studio
            </button>
          </>
        ) : (
          <>
            <h1 className="mt-3 text-center font-display text-3xl font-medium">
              Crea il tuo account
            </h1>
            <p className="mt-3 text-center text-sm text-paper/75">
              Ricevi subito le tue credenziali e scrivi gratis il primo capitolo della tua
              storia: fino a sei pagine, senza impegno.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="nome"
                  className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-orochiara"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1.5 w-full border border-paper/30 bg-transparent px-3 py-2.5 font-sans text-sm outline-none focus:border-orochiara"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-orochiara"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full border border-paper/30 bg-transparent px-3 py-2.5 font-sans text-sm outline-none focus:border-orochiara"
                />
              </div>

              {error && <p className="text-sm text-[#e2a5a5]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-orochiara px-6 py-3 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88] disabled:opacity-50"
              >
                {loading ? "Creazione…" : "Registrati gratis"}
              </button>
            </form>

            <p className="mt-6 text-center font-sans text-sm text-paper/70">
              Hai già un account?{" "}
              <Link href="/accedi" className="text-orochiara hover:underline">
                Accedi
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
