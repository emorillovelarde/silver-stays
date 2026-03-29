import fs from "fs";
import path from "path";
import Image from "next/image";
import { UserRound } from "lucide-react";

const PARTNER_PHOTO = "/images/socio-director.jpg";

function photoExists(): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public/images/socio-director.jpg"),
    );
  } catch {
    return false;
  }
}

export function PartnerAvatar({ alt }: { alt: string }) {
  if (photoExists()) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-primary/15 bg-white shadow-sm ring-1 ring-black/[0.04]">
        <Image
          src={PARTNER_PHOTO}
          alt={alt}
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-gradient-to-br from-[#FAFAFA] to-primary/[0.06] shadow-sm ring-1 ring-black/[0.04]"
      role="img"
      aria-label={alt}
    >
      <UserRound
        className="h-6 w-6 text-primary/50"
        strokeWidth={1.35}
        aria-hidden
      />
    </div>
  );
}
