import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you — your Winter Guide is on its way | Bluevera Residences",
  robots: "noindex, nofollow",
};

type Props = { params: Promise<{ locale: string }> };

export default async function WinterGuideThankYouPage({ params }: Props) {
  const { locale } = await params;
  // The Winter Guide flow is English-only; keep the thank-you page consistent.
  if (locale !== "en") redirect("/en/winter-guide/thank-you");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-5 font-sans">
      {/*
        TODO: Meta Pixel — install before launching the Meta Ads campaign.
        This thank-you page is the most reliable place to fire the custom
        "GuideDownload" conversion event: MailerLite redirects here after a
        successful signup (After signup action → Redirect to URL). Once the
        Pixel base code is added in src/app/layout.tsx, fire the event on
        mount from a small client component here.
      */}
      <main className="mx-auto w-full max-w-md text-center">
        <span className="font-serif text-[16px] font-semibold text-[#1B2A49]">
          Bluevera Residences
        </span>

        <h1 className="mt-8 font-serif text-2xl font-normal leading-tight text-[#1B2A49] md:text-3xl">
          Thank you
        </h1>

        <p className="mx-auto mt-4 max-w-[420px] text-[15px] font-light leading-[1.7] text-[#5A5C62]">
          Your guide is on its way to your inbox. If you don&apos;t see it
          within a few minutes, please check your spam folder — and feel free to
          reply to that email if anything doesn&apos;t arrive.
        </p>

        <p className="mt-5 text-[14px] text-[#8A8D91]">— The Bluevera team</p>

        <Link
          href="/en"
          className="mt-8 inline-block text-[13px] text-[#C96B4A] underline underline-offset-2 transition-colors hover:text-[#1B2A49]"
        >
          Back to blueveraresidences.com
        </Link>
      </main>
    </div>
  );
}
