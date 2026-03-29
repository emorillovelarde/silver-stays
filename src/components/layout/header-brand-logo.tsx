"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo-bluevera-residences-costa-del-sol.svg";
const LOGO_ALT =
  "Bluevera Residences - Alquileres de Larga Estancia en la Costa del Sol";

type HeaderBrandLogoProps = {
  className?: string;
};

export function HeaderBrandLogo({ className }: HeaderBrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT}
      width={256}
      height={256}
      unoptimized
      priority
      className={cn("h-14 lg:h-20 w-auto object-contain max-w-none", className)}
    />
  );
}
