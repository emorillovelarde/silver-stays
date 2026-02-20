"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

const content = {
  es: {
    title: "¿Listo para blindar su jubilación en la Costa del Sol?",
    description:
      "No deje su estancia al azar del algoritmo fronterizo. Complete su perfil y reciba el Checklist NLV 2026 personalizado.",
    cta: "Obtener mi Checklist NLV 2026 personalizado",
    ariaLabel: "Completar cuestionario y recibir Checklist NLV 2026",
  },
  en: {
    title: "Ready to secure your retirement on the Costa del Sol?",
    description:
      "Don't leave your stay to the border algorithm. Complete your profile and receive your personalised 2026 NLV Checklist.",
    cta: "Get your Personalized 2026 NLV Checklist",
    ariaLabel: "Complete questionnaire and receive 2026 NLV Checklist",
  },
};

export function NLVGuideCTA() {
  const locale = useLocale() as "es" | "en";
  const t = content[locale] ?? content.en;

  return (
    <div
      className="my-12 rounded-xl border-2 border-primary bg-primary/5 p-8 text-center shadow-lg"
      role="complementary"
      aria-label={locale === "es" ? "Llamada a la acción" : "Call to action"}
    >
      <h3 className="text-2xl font-bold text-[#004F56] mb-4">{t.title}</h3>
      <p className="text-lg text-[#1A1A1A] mb-6 max-w-2xl mx-auto">
        {t.description}
      </p>
      <Link href="/questionnaire">
        <Button
          size="lg"
          className="h-14 min-h-[44px] px-10 text-xl font-bold bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t.ariaLabel}
        >
          <FileCheck className="mr-3 h-6 w-6" aria-hidden />
          {t.cta}
        </Button>
      </Link>
    </div>
  );
}
