"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function PixelLeadEvent() {
  useEffect(() => {
    const fireLead = () => {
      window.fbq?.("track", "Lead", {
        content_name: "Winter Guide Download",
        value: 0.0,
        currency: "EUR",
      });
    };

    // fbq already loaded — fire immediately.
    if (typeof window.fbq === "function") {
      fireLead();
      return;
    }

    // The base Pixel script loads asynchronously, so useEffect can run
    // before fbq exists on window. Poll until it's ready, then fire once.
    const POLL_MS = 200;
    const TIMEOUT_MS = 10_000;
    let elapsed = 0;

    const intervalId = window.setInterval(() => {
      if (typeof window.fbq === "function") {
        fireLead();
        window.clearInterval(intervalId);
        return;
      }
      elapsed += POLL_MS;
      if (elapsed >= TIMEOUT_MS) {
        // Give up after 10s — visitor most likely blocks trackers.
        window.clearInterval(intervalId);
      }
    }, POLL_MS);

    // Clear the interval if the component unmounts mid-poll.
    return () => window.clearInterval(intervalId);
  }, []);

  return null;
}
