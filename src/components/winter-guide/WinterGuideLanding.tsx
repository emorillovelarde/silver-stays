"use client";

import Link from "next/link";
import { FileText, Heart, MapPin, Shield } from "lucide-react";
import { MailerLiteForm } from "./MailerLiteForm";

const BULLETS = [
  { Icon: FileText, label: "Legal framework" },
  { Icon: Heart, label: "Healthcare access" },
  { Icon: MapPin, label: "Neighbourhood guide" },
  { Icon: Shield, label: "Scam protection" },
] as const;

export function WinterGuideLanding() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      <div className="mx-auto w-full max-w-2xl px-5 pb-10 sm:px-6 md:max-w-4xl">
        {/* Logo strip */}
        <div className="pt-6 text-center">
          <span
            className="font-serif text-[16px] font-semibold text-[#1B2A49]"
            aria-label="Bluevera Residences"
          >
            Bluevera Residences
          </span>
        </div>

        {/* Hero copy — full width above both columns */}
        <div className="mt-8 text-center">
          <h1 className="font-serif text-2xl font-normal leading-tight text-[#1B2A49] md:text-3xl">
            Your free guide to wintering on the Costa del Sol
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] font-light leading-[1.7] text-[#5A5C62]">
            Everything you need to plan a stay of 1–9 months with confidence —
            legal framework, healthcare, neighbourhoods, and what to watch out
            for.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
          {/* Left column — thumbnail + bullets */}
          <div className="md:w-2/5">
            {/* Guide cover image */}
            <img
              src="/guides/winter-guide-cover.jpg"
              alt="A Winter on the Costa del Sol — Your 2026 Guide"
              className="h-[280px] w-full rounded-lg object-cover"
              style={{ objectPosition: "top" }}
            />

            {/* Bullets */}
            <div className="mt-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#8A8D91]">
                {"What's inside:"}
              </p>
              <ul className="space-y-[10px]">
                {BULLETS.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 text-[13px] text-[#5A5C62]"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-[#C96B4A]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="md:w-3/5">
            <div className="rounded-[12px] border border-[#E8E6E0] bg-white p-7 shadow-sm">
              <h2 className="font-serif text-[18px] font-semibold text-[#1B2A49]">
                Send me the free guide
              </h2>
              <p className="mt-1 text-[12px] text-[#8A8D91]">
                Sent instantly to your inbox. No spam, unsubscribe any time.
              </p>

              <div className="mt-5">
                <MailerLiteForm />
              </div>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-[#8A8D91]">
          <span>
            <span className="text-[#C96B4A]">✓</span> 100% legally verified
            properties
          </span>
          <span aria-hidden>·</span>
          <span>
            <span className="text-[#C96B4A]">✓</span> No spam
          </span>
          <span aria-hidden>·</span>
          <span>
            <span className="text-[#C96B4A]">✓</span> Unsubscribe any time
          </span>
        </div>

        {/* Minimal footer — GDPR: legal pages must be reachable before the
            visitor is asked for their email. */}
        <footer className="mt-8 pb-8 text-center text-[11px] text-[#AAACB0]">
          © 2026 Bluevera Residences ·{" "}
          <Link
            href="/en/legal/aviso-legal"
            className="underline underline-offset-2 hover:text-[#1B2A49]"
          >
            Legal Notice
          </Link>{" "}
          ·{" "}
          <Link
            href="/en/legal/privacy-policy"
            className="underline underline-offset-2 hover:text-[#1B2A49]"
          >
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
}
