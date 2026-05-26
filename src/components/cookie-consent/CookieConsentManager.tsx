"use client";

import { useEffect, useState } from "react";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferences } from "./CookiePreferences";
import {
  CONSENT_PREFERENCES_OPEN_EVENT,
  getConsent,
  saveConsent,
  type ConsentState,
} from "@/lib/cookie-consent";
import { useIsConsentValid } from "@/lib/use-consent";

/**
 * Top-level orchestrator rendered once in the locale layout.
 *
 * - `useIsConsentValid` (useSyncExternalStore) returns `true` on the
 *   server snapshot, so the banner never renders during SSR — no
 *   layout shift on hydration for visitors who already accepted. The
 *   real client snapshot takes over after hydration; if no valid
 *   consent exists, the banner mounts then.
 * - Listens to `bluevera-consent-preferences-open` so any component
 *   (the footer "Cookie settings" button is the obvious one) can ask
 *   the granular modal to open.
 * - Saving consent dispatches the consent-changed event; the hook
 *   picks it up and the banner unmounts automatically — no explicit
 *   `setShowBanner(false)` needed.
 */
export function CookieConsentManager({ locale }: { locale: "en" | "es" }) {
  const consentIsValid = useIsConsentValid();

  const [showPrefs, setShowPrefs] = useState(false);
  // When the prefs modal is opened from the footer we pre-load the
  // user's current consent; when opened from the banner's "Customize"
  // we deliberately start with everything optional OFF (compliance:
  // no pre-ticked boxes).
  const [initialPrefsState, setInitialPrefsState] =
    useState<ConsentState | null>(null);

  useEffect(() => {
    const openPrefs = () => {
      // Load whatever is currently stored so toggles reflect reality.
      setInitialPrefsState(getConsent());
      setShowPrefs(true);
    };
    window.addEventListener(CONSENT_PREFERENCES_OPEN_EVENT, openPrefs);
    return () =>
      window.removeEventListener(CONSENT_PREFERENCES_OPEN_EVENT, openPrefs);
  }, []);

  const showBanner = !consentIsValid;

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true, functional: true });
    // consent-changed event flips consentIsValid → showBanner becomes false.
  };

  const handleRejectAll = () => {
    saveConsent({ analytics: false, marketing: false, functional: false });
  };

  const handleCustomizeFromBanner = () => {
    // Banner → Customize: all optional categories start OFF.
    setInitialPrefsState(null);
    setShowPrefs(true);
  };

  const handlePrefsSaved = (revokedMarketing: boolean) => {
    setShowPrefs(false);
    // fbq stays in window once loaded. The only clean way to make
    // sure the pixel stops tracking on the rest of the session is to
    // reload. Small delay so the modal dismiss animation runs.
    if (revokedMarketing) {
      window.setTimeout(() => window.location.reload(), 150);
    }
  };

  const handlePrefsCancel = () => {
    setShowPrefs(false);
  };

  return (
    <>
      {showBanner && !showPrefs && (
        <CookieBanner
          locale={locale}
          onAcceptAll={handleAcceptAll}
          onRejectAll={handleRejectAll}
          onCustomize={handleCustomizeFromBanner}
        />
      )}
      {showPrefs && (
        <CookiePreferences
          initialState={initialPrefsState}
          onSaved={handlePrefsSaved}
          onCancel={handlePrefsCancel}
        />
      )}
    </>
  );
}
