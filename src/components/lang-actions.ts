"use server";

import { cookies } from "next/headers";
import type { Lang } from "@/lib/i18n";

export async function setLangCookie(lang: Lang) {
  (await cookies()).set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
