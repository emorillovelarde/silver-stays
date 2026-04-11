import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function TrustBar() {
  const t = await getTranslations("TrustBar");

  return (
    <section className="border-b border-gray-100 bg-white py-10 shadow-sm md:py-12">
      <div className="container mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-full border border-brand-silver/25 bg-brand-silver/10 px-6 py-3.5 md:px-8 md:py-4">
          <ShieldCheck className="h-8 w-8 shrink-0 text-brand-navy" />
          <div className="text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-navy">
              {t("title")}
            </p>
            <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
