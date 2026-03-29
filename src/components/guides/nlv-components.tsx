"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, AlertTriangle, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GBP_EUR_RATE_2026 = 1.11;
const MAIN_ANNUAL_EUR = 28800; // 400% * 600 * 12
const DEPENDENT_ANNUAL_EUR = 7200; // 100% * 600 * 12

const calcLabels = {
  es: {
    title: "NLV Solvency Engine",
    description:
      "Verifique su elegibilidad financiera según el tipo de cambio GBP/EUR 2026",
    incomeLabel: "Ingresos anuales (GBP)",
    incomePlaceholder: "Ej: 35000",
    dependentsLabel: "Nº de dependientes",
    required: "Requisito mínimo:",
    yourIncome: "Sus ingresos convertidos:",
    eligible: "✓ Cumple los requisitos de solvencia",
    notEligible: "Le faltan",
    perYear: "€ anuales",
  },
  en: {
    title: "NLV Solvency Engine",
    description:
      "Verify your financial eligibility against the GBP/EUR 2026 exchange rate",
    incomeLabel: "Annual income (GBP)",
    incomePlaceholder: "E.g. 35000",
    dependentsLabel: "No. of dependents",
    required: "Minimum requirement:",
    yourIncome: "Your converted income:",
    eligible: "✓ Meets solvency requirements",
    notEligible: "Shortfall of",
    perYear: "€ per year",
  },
};

export function NLVSolvencyCalculator() {
  const locale = useLocale() as "es" | "en";
  const t = calcLabels[locale] ?? calcLabels.en;
  const [incomeGBP, setIncomeGBP] = useState("");
  const [dependents, setDependents] = useState(0);

  const incomeNum = parseFloat(incomeGBP) || 0;
  const incomeEUR = incomeNum * GBP_EUR_RATE_2026;
  const requiredEUR = MAIN_ANNUAL_EUR + dependents * DEPENDENT_ANNUAL_EUR;
  const isEligible = incomeEUR >= requiredEUR;
  const shortfall = Math.max(0, requiredEUR - incomeEUR);

  return (
    <Card
      className="my-10 border-2 border-primary/20 shadow-lg bg-white"
      aria-labelledby="solvency-calculator-title"
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 min-w-[44px] items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-hidden
          >
            <Calculator size={28} />
          </div>
          <div>
            <CardTitle
              id="solvency-calculator-title"
              className="text-2xl font-bold text-primary"
            >
              {t.title}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {t.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="income-gbp"
              className="text-lg font-semibold text-[#1A1A1A]"
            >
              {t.incomeLabel}
            </Label>
            <Input
              id="income-gbp"
              type="number"
              min="0"
              step="100"
              placeholder={t.incomePlaceholder}
              value={incomeGBP}
              onChange={(e) => setIncomeGBP(e.target.value)}
              className="h-12 min-h-[44px] text-lg"
              aria-label="Ingresos anuales en libras esterlinas"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="dependents"
              className="text-lg font-semibold text-[#1A1A1A]"
            >
              {t.dependentsLabel}
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              max="10"
              value={dependents}
              onChange={(e) =>
                setDependents(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="h-12 min-h-[44px] text-lg"
              aria-label="Número de dependientes"
            />
          </div>
        </div>

        <div
          className="rounded-xl p-6 text-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg text-[#1A1A1A] mb-2">
            {t.required}{" "}
            <strong className="text-primary">
              {requiredEUR.toLocaleString(locale === "es" ? "es-ES" : "en-GB")}{" "}
              €/año
            </strong>
          </p>
          <p className="text-lg text-[#1A1A1A] mb-4">
            {t.yourIncome}{" "}
            <strong>
              {incomeEUR.toLocaleString(locale === "es" ? "es-ES" : "en-GB", {
                maximumFractionDigits: 0,
              })}{" "}
              €
            </strong>
          </p>
          <div
            className={cn(
              "text-2xl md:text-3xl font-bold py-4 px-6 rounded-lg",
              isEligible
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-800",
            )}
          >
            {isEligible ? (
              <>{t.eligible}</>
            ) : (
              <>
                ✗ {t.notEligible}{" "}
                {shortfall.toLocaleString(locale === "es" ? "es-ES" : "en-GB")}{" "}
                {t.perYear}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const schengenLabels = {
  es: {
    title: "Sistema EES/ETIAS: Riesgo para estancias >90 días",
    body: "Desde abril de 2026, el Entry/Exit System (EES) y el ETIAS registran biométricamente cada entrada y salida. Exceder los 90 días en 180 puede acarrear multas de hasta 10.000 € y prohibición de entrada de hasta 5 años.",
    shield: "El NLV desactiva el reloj de los 90 días de forma permanente.",
  },
  en: {
    title: "EES/ETIAS System: Risk for stays >90 days",
    body: "From April 2026, the Entry/Exit System (EES) and ETIAS record every entry and exit biometrically. Exceeding 90 days in 180 can result in fines of up to €10,000 and entry bans of up to 5 years.",
    shield: "The NLV permanently deactivates the 90-day clock.",
  },
};

export function SchengenClockAlert() {
  const locale = useLocale() as "es" | "en";
  const t = schengenLabels[locale] ?? schengenLabels.en;

  return (
    <div
      className="my-10 rounded-xl border-2 border-amber-500 bg-amber-50 p-6 shadow-md"
      role="alert"
      aria-labelledby="schengen-alert-title"
    >
      <div className="flex gap-4">
        <div
          className="flex h-14 w-14 min-w-[44px] shrink-0 items-center justify-center rounded-full bg-amber-500 text-white"
          aria-hidden
        >
          <AlertTriangle size={28} />
        </div>
        <div>
          <h3
            id="schengen-alert-title"
            className="text-xl font-bold text-amber-900 mb-2"
          >
            {t.title}
          </h3>
          <p className="text-lg text-amber-900/90 mb-4 leading-relaxed">
            {t.body}
          </p>
          <div className="flex items-center gap-2 text-amber-800 font-semibold">
            <Shield size={20} aria-hidden />
            <span>{t.shield}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
