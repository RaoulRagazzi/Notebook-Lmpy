import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/accedi", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/etichette/:path*"],
};
