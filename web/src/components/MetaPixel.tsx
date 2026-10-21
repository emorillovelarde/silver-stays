"use client";

import Script from "next/script";
import { useHasConsent } from "@/lib/use-consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Meta Pixel base script — gated on marketing consent.
 *
 * The script (including the `fbevents.js` external load and the PageView
 * event) only mounts after the user has accepted the marketing category.
 * Before consent there is no request to connect.facebook.net or
 * facebook.com/tr from this component.
 *
 * Marketing consent is subscribed via useSyncExternalStore over the
 * `bluevera-consent-changed` event so the pixel can come online
 * mid-session when the user accepts marketing later. Revoking marketing
 * does NOT unload an already-loaded fbq (browsers can't be asked to
 * forget a loaded script); the CookiePreferences modal triggers a
 * page reload after a revoke so the next request starts clean.
 *
 * The legacy <noscript> tracking pixel was removed deliberately — a
 * cookieless GET to facebook.com still transfers IP and Referer before
 * the user can consent, which violates LSSI 22.2 / RGPD.
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const marketingOn = useHasConsent("marketing");

  if (!pixelId || !marketingOn) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`,
      }}
    />
  );
}
