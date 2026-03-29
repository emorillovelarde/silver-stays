"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderBrandLogo } from "./header-brand-logo";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/properties", key: "properties" as const },
  { href: "/guias", key: "guidesAndResources" as const },
] as const;

function NavLinks({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-center md:gap-8",
        className,
      )}
      aria-label="Navegación principal"
    >
      {NAV_LINKS.map(({ href, key }) => {
        const isActive =
          href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(href);
        return (
          <Link
            key={key}
            href={href}
            onClick={onLinkClick}
            className={cn(
              "min-h-[44px] min-w-[44px] flex items-center px-4 py-2 text-base transition-colors focus:outline-none",
              "md:min-h-0 md:min-w-0",
              isActive
                ? "text-brand-navy font-bold"
                : "text-brand-navy font-medium hover:text-brand-navy/75",
            )}
            aria-label={t(key)}
            aria-current={isActive ? "page" : undefined}
          >
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const isQuestionnaire = pathname.includes("/questionnaire");
  const isSuccess = pathname.includes("/success");

  if (isQuestionnaire || isSuccess) return null;

  return <HeaderFull />;
}

function HeaderFull() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navigation");
  const scrollDirection = useScrollDirection(10);

  const isHidden = scrollDirection === "down";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full overflow-visible",
        "bg-white/40 backdrop-blur-md border-b border-white/20",
        "transition-transform duration-300 ease-out",
        isHidden && "-translate-y-full",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-5 sm:px-6 lg:h-20">
        <Link
          href="/"
          title={t("logoHomeTitle")}
          aria-label={t("logoHomeTitle")}
          className="flex shrink-0 items-center pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30 focus-visible:ring-offset-2 rounded-sm"
        >
          <HeaderBrandLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <NavLinks />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/questionnaire"
            className={cn(
              "hidden sm:inline-flex items-center justify-center focus:outline-none",
              "bg-brand-cta hover:bg-brand-cta-hover text-[#FFFFFF]",
              "px-5 py-2 rounded-full font-medium text-sm",
              "transition-colors min-h-[44px] md:min-h-0",
              "focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2",
            )}
          >
            {t("startYourPlan")}
          </Link>
          <LanguageSwitcher />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden min-h-[44px] min-w-[44px] text-brand-navy hover:bg-brand-navy/5 hover:text-brand-navy"
                aria-label={t("openMenu")}
                aria-expanded={open}
              >
                <Menu className="h-6 w-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100vw-2rem,320px)] bg-[#FAFAFA] border-l border-primary/10"
              closeButtonAriaLabel={t("closeMenu")}
            >
              <SheetHeader>
                <SheetTitle className="sr-only">{t("siteName")}</SheetTitle>
                <Link
                  href="/"
                  title={t("logoHomeTitle")}
                  aria-label={t("logoHomeTitle")}
                  onClick={() => setOpen(false)}
                  className="flex shrink-0 items-center pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  <HeaderBrandLogo />
                </Link>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <NavLinks onLinkClick={() => setOpen(false)} />
                <Link
                  href="/questionnaire"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center justify-center mt-4 focus:outline-none",
                    "bg-brand-cta hover:bg-brand-cta-hover text-[#FFFFFF]",
                    "px-5 py-3 rounded-full font-medium text-sm",
                    "min-h-[44px]",
                    "focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2",
                  )}
                >
                  {t("startYourPlan")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
