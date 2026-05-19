import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const NO_CHROME_SEGMENTS = ["/winter-guide"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blueveraresidences.com";

  const languages: Record<string, string> = {
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`]),
    ),
    "x-default": `${baseUrl}/${routing.defaultLocale}`,
  };

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  await params;
  const messages = await getMessages();

  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const showChrome = !NO_CHROME_SEGMENTS.some((seg) => pathname.includes(seg));

  return (
    <NextIntlClientProvider messages={messages}>
      {showChrome && <Header />}
      {children}
      {showChrome && <Footer />}
    </NextIntlClientProvider>
  );
}
