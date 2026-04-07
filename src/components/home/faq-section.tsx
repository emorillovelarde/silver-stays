import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_KEYS = [
  "stayDuration",
  "seasonalContract",
  "rentalCost",
  "safeRental",
  "healthInsurance",
  "winterWeather",
  "pets",
  "overstay",
] as const;

export async function FaqSection() {
  const t = await getTranslations("Faq");

  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`${key}.q`),
    answer: t(`${key}.a`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className="border-t border-gray-100 bg-primary/[0.03] py-20 md:py-24"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="mb-4 text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-lg text-slate-600">
          {t("subtitle")}
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQ_KEYS.map((key) => (
            <AccordionItem
              key={key}
              value={key}
              className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm transition-shadow hover:shadow-md data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-brand-navy hover:no-underline md:text-lg [&[data-state=open]>svg]:rotate-180">
                {t(`${key}.q`)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-slate-600">
                {t(`${key}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
