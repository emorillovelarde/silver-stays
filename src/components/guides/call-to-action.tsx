"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  title: string;
  buttonText: string;
  link: string;
}

export function CallToAction({ title, buttonText, link }: CallToActionProps) {
  return (
    <div
      className="my-12 rounded-xl border-2 border-[#004F56] bg-[#004F56]/5 p-8 sm:p-10 text-center shadow-lg"
      role="complementary"
      aria-label="Call to action"
    >
      <h3 className="text-2xl font-bold text-[#004F56] mb-4">{title}</h3>
      <Link href={link}>
        <Button
          size="lg"
          className="h-14 min-h-[44px] px-10 text-xl font-bold bg-[#004F56] hover:bg-[#004F56]/90 focus-visible:ring-2 focus-visible:ring-[#004F56] focus-visible:ring-offset-2"
          aria-label={buttonText}
        >
          {buttonText}
          <ArrowRight className="ml-3 h-6 w-6" aria-hidden />
        </Button>
      </Link>
    </div>
  );
}
