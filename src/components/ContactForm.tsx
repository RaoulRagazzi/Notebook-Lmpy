"use client";

import { useState } from "react";
import type { Dict, Lang } from "@/lib/i18n";

type ContactLabels = Dict["footer"];

export default function ContactForm({
  lang,
  labels,
}: {
  lang: Lang;
  labels: ContactLabels;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });

      if (!response.ok) throw new Error("Contact request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-md border border-linea bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-oro focus:ring-2 focus:ring-oro/20";

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <p className="text-sm text-muted sm:col-span-2">{labels.required}</p>
      <label className="text-sm font-semibold text-ink">
        {labels.fullName}
        <input
          className={fieldClass}
          name="fullName"
          autoComplete="name"
          maxLength={100}
          required
        />
      </label>
      <label className="text-sm font-semibold text-ink">
        {labels.phone}
        <input
          className={fieldClass}
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          required
        />
      </label>
      <label className="text-sm font-semibold text-ink sm:col-span-2">
        {labels.email}
        <input
          className={fieldClass}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          required
        />
      </label>
      <label className="text-sm font-semibold text-ink sm:col-span-2">
        {labels.subject}
        <input className={fieldClass} name="subject" maxLength={160} required />
      </label>
      <label className="text-sm font-semibold text-ink sm:col-span-2">
        {labels.message}
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          name="message"
          maxLength={3000}
          required
        />
      </label>
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-oro px-6 py-3 font-semibold text-white transition hover:bg-[#0b7c72] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.send}
        </button>
        <p
          aria-live="polite"
          className={`text-sm font-medium ${status === "error" ? "text-red-700" : "text-[#0b7c72]"}`}
        >
          {status === "success" ? labels.success : status === "error" ? labels.error : ""}
        </p>
      </div>
    </form>
  );
}
