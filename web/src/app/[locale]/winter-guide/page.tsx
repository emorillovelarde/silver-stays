import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { WinterGuideLanding } from "@/components/winter-guide";

export const metadata: Metadata = {
  title: "Free Winter Guide — Costa del Sol 2026 | Bluevera Residences",
  description:
    "Download the free 2026 guide to wintering on the Costa del Sol. Legal framework, healthcare, neighbourhoods and costs — everything you need to plan a stay of 1–9 months.",
  robots: "noindex, nofollow",
};

type Props = { params: Promise<{ locale: string }> };

export default async function WinterGuidePage({ params }: Props) {
  const { locale } = await params;
  // The Winter Guide flow (MailerLite form + English-only automation) ships
  // in English only. A Spanish landing will follow with its own ES automation.
  if (locale !== "en") redirect("/en/winter-guide");

  return <WinterGuideLanding />;
}
