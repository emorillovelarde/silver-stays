import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { CookieSettingsButton } from "@/components/cookie-consent/CookieSettingsButton";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  // The slugs are localised: each language has its own URL for legal pages.
  // Sending the locale-correct slug avoids a redirect roundtrip.
  const privacyHref =
    locale === "es" ? "/politica-privacidad" : "/privacy-policy";
  const legalHref = locale === "es" ? "/aviso-legal" : "/legal-notice";
  const cookieHref = locale === "es" ? "/politica-cookies" : "/cookie-policy";

  return (
    <footer
      className="bg-[#1A365D] py-12 text-white"
      aria-label={t("ariaLabel")}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="mb-6 text-xl text-white/95">{t("cta")}</p>
        <Link
          href="/questionnaire"
          className="inline-block rounded-full border-0 bg-[#D9734E] px-8 py-3 text-lg font-bold text-white shadow-none transition-colors hover:bg-[#c45d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9734E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A365D]"
        >
          {t("questionnaire")}
        </Link>

        <nav
          aria-label={t("legalNavLabel")}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/80"
        >
          <Link
            href={privacyHref}
            className="underline-offset-2 hover:underline focus-visible:underline"
          >
            {t("privacyPolicy")}
          </Link>
          <span aria-hidden="true">|</span>
          <Link
            href={legalHref}
            className="underline-offset-2 hover:underline focus-visible:underline"
          >
            {t("legalNotice")}
          </Link>
          <span aria-hidden="true">|</span>
          <Link
            href={cookieHref}
            className="underline-offset-2 hover:underline focus-visible:underline"
          >
            {t("cookiePolicy")}
          </Link>
          <span aria-hidden="true">|</span>
          <CookieSettingsButton label={t("cookieSettings")} />
        </nav>

        <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">
          <p>{t("address")}</p>
          <p className="mt-1">
            <a
              href="tel:+34696676348"
              className="underline-offset-2 hover:underline focus-visible:underline"
            >
              +34 696 676 348
            </a>
            <span className="mx-2 text-white/40" aria-hidden="true">
              ·
            </span>
            <a
              href="mailto:hello@blueveraresidences.com"
              className="underline-offset-2 hover:underline focus-visible:underline"
            >
              hello@blueveraresidences.com
            </a>
          </p>
        </address>

        <p className="mt-4 text-sm text-white/60">{t("copyright")}</p>
      </div>
    </footer>
  );
}
