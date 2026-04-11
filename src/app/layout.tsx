import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import {
  Atkinson_Hyperlegible,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blueveraresidences.com",
  ),
};

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${atkinson.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
