import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const CONTACT_EMAIL = "eduardo@blueveraresidences.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });
  return {
    title: t("metaTitle"),
    description: t("description"),
    // Drop the home page's canonical and hreflang inherited from the layout.
    alternates: null,
    openGraph: { title: t("metaTitle"), description: t("description") },
    robots: { index: false, follow: false },
  };
}

// Reached through the middleware rewrite while MAINTENANCE_MODE is on.
export default async function MaintenancePage({ params }: Props) {
  if (process.env.MAINTENANCE_MODE !== "true") notFound();

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Maintenance" });
  const tFooter = await getTranslations({ locale, namespace: "Footer" });

  // The slugs are localised: each language has its own URL for legal pages.
  const privacyHref =
    locale === "es" ? "/politica-privacidad" : "/privacy-policy";
  const legalHref = locale === "es" ? "/aviso-legal" : "/legal-notice";
  const cookieHref = locale === "es" ? "/politica-cookies" : "/cookie-policy";
  const legalLinkClass =
    "inline-flex min-h-12 items-center px-2 underline underline-offset-4";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAF8] px-6 py-16 text-center text-[#1B2A49]">
      <div className="max-w-xl space-y-6">
        <p className="text-lg tracking-wide">{t("brand")}</p>
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-xl leading-relaxed">{t("body")}</p>
        <p className="text-xl leading-relaxed">
          {t.rich("contact", {
            email: CONTACT_EMAIL,
            link: (chunks) => (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-bold underline underline-offset-4"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
        <p className="text-xl">{t("signature")}</p>
      </div>
      <nav
        aria-label={tFooter("legalNavLabel")}
        className="mt-16 flex flex-wrap justify-center gap-4 text-lg"
      >
        <Link href={privacyHref} className={legalLinkClass}>
          {tFooter("privacyPolicy")}
        </Link>
        <Link href={legalHref} className={legalLinkClass}>
          {tFooter("legalNotice")}
        </Link>
        <Link href={cookieHref} className={legalLinkClass}>
          {tFooter("cookiePolicy")}
        </Link>
      </nav>
    </main>
  );
}
