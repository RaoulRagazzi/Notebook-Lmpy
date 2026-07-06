import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { getLang } from "@/lib/lang";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Splendoria — La tua vita in un romanzo",
  description:
    "Il servizio di ghostwriting che trasforma la tua storia in un libro vero, scritto da professionisti. Scrivi gratis il tuo primo capitolo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html lang={lang} className={`${garamond.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
