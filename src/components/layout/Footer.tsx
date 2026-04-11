import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
          <span>{t("privacyPolicy")}</span>
          <span aria-hidden="true">|</span>
          <span>{t("legalNotice")}</span>
          <span aria-hidden="true">|</span>
          <span>{t("cookiePolicy")}</span>
        </div>

        <p className="mt-4 text-sm text-white/60">{t("copyright")}</p>
      </div>
    </footer>
  );
}
