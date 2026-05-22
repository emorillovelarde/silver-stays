"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function PixelLeadEvent() {
  useEffect(() => {
    // Guard: the base Pixel script may not have loaded yet, or the
    // visitor may be blocking trackers — only fire when fbq is ready.
    if (typeof window.fbq !== "function") return;

    window.fbq("track", "Lead", {
      content_name: "Winter Guide Download",
      value: 0.0,
      currency: "EUR",
    });
  }, []);

  return null;
}
