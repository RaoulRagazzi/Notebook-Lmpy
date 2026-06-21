"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";

function EtichettaCreataContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [url, setUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const labelUrl = `${window.location.origin}/v/${slug}`;
    setUrl(labelUrl);
    QRCode.toDataURL(labelUrl, { width: 240, margin: 1 }).then(setQrDataUrl);
  }, [slug]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-wine-500">
        Etichetta creata
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-sand-900">
        La tua etichetta elettronica è pronta
      </h1>
      <p className="mt-3 max-w-md text-sand-600">
        Scarica il codice QR e inviarlo alla tua tipografia, oppure copia
        l&apos;URL della scheda tecnica del vino.
      </p>

      <div className="mt-8">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrDataUrl}
            alt="Codice QR dell'etichetta"
            width={240}
            height={240}
            className="rounded-lg border border-sand-300 bg-white p-3"
          />
        ) : (
          <div className="flex h-60 w-60 items-center justify-center rounded-lg border border-sand-300 bg-sand-100 text-sm text-sand-500">
            Generazione QR…
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={qrDataUrl ?? undefined}
          download="etichetta-qr.png"
          className="rounded-full bg-olive-500 px-6 py-2 text-sm font-medium text-sand-50 hover:bg-wine-600 aria-disabled:opacity-40"
          aria-disabled={!qrDataUrl}
        >
          ⬇ Scarica QR
        </a>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(url)}
          className="rounded-full border border-sand-300 px-6 py-2 text-sm font-medium text-sand-700 hover:bg-sand-100"
        >
          Copia l&apos;URL
        </button>
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-sm text-sand-600 hover:underline"
        >
          {url}
        </a>
      )}

      <Link
        href="/etichette"
        className="mt-10 text-sm font-medium text-wine-500 hover:underline"
      >
        Vai alle mie etichette →
      </Link>
    </div>
  );
}

export default function EtichettaCreataPage() {
  return (
    <Suspense fallback={null}>
      <EtichettaCreataContent />
    </Suspense>
  );
}
