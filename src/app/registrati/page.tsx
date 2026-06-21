"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registrati } from "../accedi/actions";

export default function RegistratiPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await registrati(nome, email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Errore durante la registrazione.");
      return;
    }
    router.push("/etichette");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-sand-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-sand-900">Crea un account</h1>
        <p className="mt-1 text-sm text-sand-600">
          Inizia a creare le tue etichette elettroniche.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-sand-700">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2 text-sm outline-none focus:border-wine-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-sand-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2 text-sm outline-none focus:border-wine-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-sand-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2 text-sm outline-none focus:border-wine-500"
            />
          </div>

          {error && <p className="text-sm text-wine-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-olive-500 px-5 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600 disabled:opacity-50"
          >
            {loading ? "Creazione…" : "Crea account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-sand-600">
          Hai già un account?{" "}
          <Link href="/accedi" className="font-medium text-wine-500 hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
