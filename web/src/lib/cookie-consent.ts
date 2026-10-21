/**
 * Cookie consent state management.
 *
 * Persists the user's choice in localStorage and exposes a small,
 * SSR-safe API used by the banner, the preferences panel, the Meta
 * Pixel and any other component that needs to gate its behaviour on
 * a category.
 *
 * Compliance summary (RGPD + LSSI 22.2 + AEPD criteria 2024–2026):
 *   - No non-essential script may run before the user has consented.
 *   - Consent is granular per category.
 *   - Consent is revocable from the footer at any time.
 *   - Proof of consent (timestamp + version + flags) is stored.
 *   - Consent expires after 12 months and is re-requested.
 *   - Changing CONSENT_VERSION forces every user to consent again.
 */

export type ConsentCategory =
  | "necessary"
  | "analytics"
  | "marketing"
  | "functional";

export type ConsentState = {
  /** Always true — strictly necessary cookies cannot be disabled. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  /** ISO 8601 timestamp of when this consent was recorded. */
  timestamp: string;
  /** Version of the cookie policy the user accepted. */
  version: string;
};

/** Version of the cookie policy. Bumping this forces re-consent for everyone. */
export const CONSENT_VERSION = "2026-05-25";

/** Twelve months in milliseconds — when consent expires and is re-requested. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** localStorage key under which the consent payload is persisted. */
export const STORAGE_KEY = "bluevera_cookie_consent";

/** CustomEvent name dispatched on window whenever consent changes. */
export const CONSENT_EVENT = "bluevera-consent-changed";

/** CustomEvent name dispatched on window to ask the manager to open the preferences modal. */
export const CONSENT_PREFERENCES_OPEN_EVENT =
  "bluevera-consent-preferences-open";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/** Read the current consent payload, or null if missing/corrupt. */
export function getConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    // Minimal shape validation. Any field missing or wrong type → discard.
    if (
      parsed.necessary !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.functional !== "boolean" ||
      typeof parsed.timestamp !== "string" ||
      typeof parsed.version !== "string"
    ) {
      return null;
    }
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Persist a new consent payload. `necessary` is forced to true and the
 * timestamp + version are stamped automatically. Dispatches a
 * `bluevera-consent-changed` event so listeners (MetaPixel, etc.) react
 * without a page reload.
 */
export function saveConsent(
  state: Pick<ConsentState, "analytics" | "marketing" | "functional">,
): ConsentState {
  const payload: ConsentState = {
    necessary: true,
    analytics: state.analytics,
    marketing: state.marketing,
    functional: state.functional,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Quota / privacy mode: state still propagates via the event to
      // any listener within this tab session.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
  }
  return payload;
}

/** Wipe the stored consent and notify listeners (banner will re-appear). */
export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/**
 * True when the stored consent is present, matches the current policy
 * version and is younger than CONSENT_MAX_AGE_MS.
 */
export function isConsentValid(state: ConsentState | null): boolean {
  if (!state) return false;
  if (state.version !== CONSENT_VERSION) return false;
  const ts = Date.parse(state.timestamp);
  if (Number.isNaN(ts)) return false;
  if (Date.now() - ts > CONSENT_MAX_AGE_MS) return false;
  return true;
}

/**
 * Whether a given category may run. `necessary` is always allowed.
 * Optional categories require a valid consent with the flag set to true.
 */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const state = getConsent();
  if (!isConsentValid(state)) return false;
  // state is non-null here because isConsentValid checks it
  return state![category] === true;
}

/** Programmatically ask the consent manager to open the preferences modal. */
export function openCookiePreferences(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_PREFERENCES_OPEN_EVENT));
}
