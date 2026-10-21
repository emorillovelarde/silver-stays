"use client";

import { useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  getConsent,
  hasConsent,
  isConsentValid,
  type ConsentCategory,
  type ConsentState,
} from "./cookie-consent";

/**
 * useSyncExternalStore-based hooks over the cookie-consent store.
 *
 * Server snapshots are deliberately "permissive": before hydration we
 * pretend consent is valid and pretend categories have no consent, so:
 *   - the banner does NOT render on the server (no layout shift on
 *     hydration for visitors who already accepted)
 *   - the Meta Pixel does NOT render on the server (no script tag in
 *     the SSR HTML before any consent has been recorded)
 *
 * After hydration, React swaps to the live client snapshot and any
 * required UI mounts then.
 */

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

/** Reactively read whether a category may run. */
export function useHasConsent(category: ConsentCategory): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hasConsent(category),
    () => false,
  );
}

/** Reactively read the raw consent payload (null if missing/invalid shape). */
export function useConsentState(): ConsentState | null {
  return useSyncExternalStore(
    subscribe,
    () => getConsent(),
    () => null,
  );
}

/** Reactively read whether a current, in-date consent exists. */
export function useIsConsentValid(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isConsentValid(getConsent()),
    () => true,
  );
}
