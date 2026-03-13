import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CheckCircle, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PDF_PATH = "/guides/guia-costa-del-sol-2026.pdf";

export default async function SuccessPage() {
  const t = await getTranslations("Success");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] p-4">
      <Card className="w-full max-w-xl border-none shadow-xl bg-white overflow-hidden">
        <CardContent className="flex flex-col items-center text-center p-8 md:p-12">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-[#004F56]" aria-hidden />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] font-sans tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto mb-2">
            {t("subtitle")}
          </p>

          <hr className="my-8 w-full border-gray-100" />

          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">
            {t("guideTitle")}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
            {t("guideDesc")}
          </p>
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-4 text-base font-semibold text-white bg-[#004F56] hover:bg-[#004F56]/90 rounded-xl transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004F56] focus-visible:ring-offset-2"
          >
            <Download className="w-5 h-5 shrink-0" aria-hidden />
            {t("btnDownload")}
          </a>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 mt-8 underline decoration-transparent hover:decoration-gray-900 transition-all"
          >
            {t("btnHome")}
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
