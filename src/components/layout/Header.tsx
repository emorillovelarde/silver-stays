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
              "min-h-[44px] min-w-[44px] flex items-center px-4 py-3 text-base font-medium transition-colors rounded-md",
              "text-[#1A1A1A] hover:bg-[#004F56]/10 hover:text-[#004F56]",
              "focus:outline-none focus:ring-2 focus:ring-[#004F56] focus:ring-offset-2",
              "md:min-h-0 md:min-w-0 md:px-0 md:py-2",
              isActive && "text-[#004F56] font-semibold",
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
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navigation");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-[#FAFAFA]/85 backdrop-blur-md border-b border-[#004F56]/10",
        "supports-[backdrop-filter]:bg-[#FAFAFA]/80",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#004F56] focus:outline-none focus:ring-2 focus:ring-[#004F56] focus:ring-offset-2 rounded-md"
          aria-label="Silver Stays - Ir al inicio"
        >
          Silver Stays
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLinks />
        </div>

        {/* Right controls: Language + Mobile menu */}
        <div className="flex items-center gap-2">
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
              <div className="mt-8 flex flex-col gap-2">
                <NavLinks onLinkClick={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
