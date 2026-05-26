"use client";

import { openCookiePreferences } from "@/lib/cookie-consent";

/**
 * Footer "Cookie settings" button. Styled to blend with the adjacent
 * legal Links — same colour, same focus ring, same hover behaviour —
 * so the visual rhythm of the footer's legal row stays intact.
 *
 * Clicking dispatches the open event; CookieConsentManager picks it up
 * and opens the granular preferences modal pre-loaded with the user's
 * current consent.
 */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className="cursor-pointer bg-transparent p-0 text-inherit underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
    >
      {label}
    </button>
  );
}
