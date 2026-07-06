"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "./actions";

export default function AccediPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Errore durante l'accesso.");
      return;
    }
    router.push("/studio");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-12">
      <div className="w-full max-w-md border border-orochiara/60 bg-ink p-9 text-paper outline outline-1 outline-offset-[6px] outline-orochiara/30">
        <p className="text-center font-sans text-[0.68rem] uppercase tracking-[0.3em] text-orochiara">
          Splendoria
        </p>
        <h1 className="mt-3 text-center font-display text-3xl font-medium">Accedi</h1>
        <p className="mt-3 text-center text-sm text-paper/75">
          Entra nel tuo Studio e continua a scrivere la tua storia.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
          <div>
            <label
              htmlFor="password"
              className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-orochiara"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full border border-paper/30 bg-transparent px-3 py-2.5 font-sans text-sm outline-none focus:border-orochiara"
            />
          </div>

          {error && <p className="text-sm text-[#e2a5a5]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-orochiara px-6 py-3 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ink hover:bg-[#e6cd88] disabled:opacity-50"
          >
            {loading ? "Accesso…" : "Accedi"}
          </button>
        </form>

        <p className="mt-6 text-center font-sans text-sm text-paper/70">
          Non hai un account?{" "}
          <Link href="/registrati" className="text-orochiara hover:underline">
            Registrati gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
