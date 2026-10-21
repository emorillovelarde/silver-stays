"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error boundary]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4 text-center">
      <h1 className="text-5xl font-bold text-brand-navy mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <Button
        onClick={reset}
        className="bg-brand-cta hover:bg-brand-cta-hover text-white px-6 py-3 rounded-full font-medium"
      >
        Try again
      </Button>
    </main>
  );
}
