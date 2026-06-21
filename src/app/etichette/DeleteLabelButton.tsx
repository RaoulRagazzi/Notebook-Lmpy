"use client";

import { useState } from "react";
import { removeLabel } from "./actions";

export default function DeleteLabelButton({ slug }: { slug: string }) {
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Eliminare definitivamente questa etichetta?")) return;
    setPending(true);
    await removeLabel(slug);
    setPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-wine-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Elimino…" : "Elimina"}
    </button>
  );
}
