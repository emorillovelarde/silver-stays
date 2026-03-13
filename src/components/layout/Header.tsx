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
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useIsAtTop } from "@/hooks/use-is-at-top";

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
        "flex flex-col gap-1 md:flex-row md:items-center md:gap-6",
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
                ? "text-[#004F56] font-bold"
                : "text-gray-600 font-medium hover:text-[#004F56]",
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
  const isAtTop = useIsAtTop(20);

  const isHidden = scrollDirection === "down";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full",
        "transition-all duration-300 ease-in-out",
        isHidden && "-translate-y-full",
        isAtTop
          ? "bg-transparent border-transparent shadow-none"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#004F56] focus:outline-none"
          aria-label="Silver Stays - Ir al inicio"
        >
          Silver Stays
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLinks />
        </div>

        {/* Right controls: CTA + Language + Mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/questionnaire"
            className={cn(
              "hidden sm:inline-flex items-center justify-center focus:outline-none",
              "bg-[#004F56] hover:bg-[#00383D] text-white",
              "px-5 py-2 rounded-full font-medium text-sm",
              "transition-colors min-h-[44px] md:min-h-0",
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
                className="md:hidden min-h-[44px] min-w-[44px] text-[#1A1A1A] hover:bg-[#004F56]/10 hover:text-[#004F56]"
                aria-label={t("openMenu")}
                aria-expanded={open}
              >
                <Menu className="h-6 w-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100vw-2rem,320px)] bg-[#FAFAFA] border-l border-[#004F56]/10"
              closeButtonAriaLabel={t("closeMenu")}
            >
              <SheetHeader>
                <SheetTitle className="text-left text-[#004F56]">
                  Silver Stays
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <NavLinks onLinkClick={() => setOpen(false)} />
                <Link
                  href="/questionnaire"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center justify-center mt-4 focus:outline-none",
                    "bg-[#004F56] hover:bg-[#00383D] text-white",
                    "px-5 py-3 rounded-full font-medium text-sm",
                    "min-h-[44px]",
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
