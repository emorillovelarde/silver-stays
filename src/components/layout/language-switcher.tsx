"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslations } from "next-intl";

const LOCALES = [
  { code: "es" as const, label: "Español" },
  { code: "en" as const, label: "English" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale() as "es" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const handleLocaleChange = (newLocale: "es" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLabel = LOCALES.find((l) => l.code === locale)?.label ?? locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-[44px] min-w-[44px] gap-1.5 text-brand-navy hover:bg-brand-navy/5 hover:text-brand-navy/80 md:min-h-0 md:min-w-0 md:px-3"
          aria-label={t("selectLanguage")}
        >
          <Languages className="h-5 w-5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">{currentLabel}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LOCALES.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className="min-h-[44px] cursor-pointer md:min-h-0"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
