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
    <div className="flex min-h-screen items-center justify-center bg-paper2 px-6 py-14">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-10 shadow-sm">
        <p className="text-center text-lg font-semibold text-oro">Splendoria</p>
        <h1 className="mt-2 text-center text-4xl font-semibold tracking-tight text-ink">
          Accedi
        </h1>
        <p className="mt-4 text-center text-lg text-muted">
          Entra nel tuo Studio e continua a scrivere la tua storia.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          <div>
            <label htmlFor="password" className="text-base font-semibold text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-linea px-4 py-3 text-lg outline-none focus:border-oro"
            />
          </div>

          {error && <p className="text-lg text-[#de3b30]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-full bg-oro px-6 py-4 text-xl font-medium text-white hover:bg-[#0077ed] disabled:opacity-50"
          >
            {loading ? "Accesso…" : "Accedi"}
          </button>
        </form>

        <p className="mt-7 text-center text-lg text-muted">
          Non hai un account?{" "}
          <Link href="/registrati" className="font-medium text-oro hover:underline">
            Registrati gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
