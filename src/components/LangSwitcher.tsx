"use client";

import { useRouter } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { setLangCookie } from "./lang-actions";

export default function LangSwitcher({ current }: { current: Lang }) {
  const router = useRouter();

  async function setLang(lang: Lang) {
    await setLangCookie(lang);
    router.refresh();
  }

  return (
    <span className="flex items-center gap-1 text-[13px]">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          {i > 0 && <span className="text-white/30">·</span>}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={current === l.code}
            className={`cursor-pointer px-0.5 ${
              current === l.code
                ? "font-semibold text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </span>
  );
}
