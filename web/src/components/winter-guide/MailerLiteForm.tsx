"use client";

import Script from "next/script";

const ENV_ACCOUNT_ID = process.env.NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID ?? "";
const ENV_FORM_ID = process.env.NEXT_PUBLIC_MAILERLITE_FORM_ID ?? "";

type MailerLiteFormProps = {
  /** MailerLite form ID (data-form). Defaults to NEXT_PUBLIC_MAILERLITE_FORM_ID. */
  formId?: string;
  /** MailerLite account ID for the universal script. Defaults to NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID. */
  accountId?: string;
};

/**
 * Renders the embedded MailerLite "Winter Guide download form".
 *
 * The MailerLite universal script is injected here with `next/script`
 * (deduped by `id`, so it loads once) and only on pages that render this
 * component — there is no MailerLite form anywhere else on the site, so the
 * script never ships on other routes.
 *
 * The form's own styling (fonts, colours, field order, GDPR checkbox) is
 * controlled from the MailerLite form editor, NOT from this codebase — do not
 * try to override it with CSS here, it breaks on every MailerLite update.
 * See docs/ESTADO-WINTER-GUIDE-MAILERLITE.md.
 */
export function MailerLiteForm({
  formId = ENV_FORM_ID,
  accountId = ENV_ACCOUNT_ID,
}: MailerLiteFormProps) {
  return (
    <>
      {accountId && (
        <Script id="mailerlite-universal" strategy="afterInteractive">
          {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
ml('account', '${accountId}');`}
        </Script>
      )}

      {/* MailerLite injects the form markup into this placeholder once
          universal.js loads. It stays empty until both env vars are set. */}
      <div className="ml-embedded" data-form={formId} />

      {!formId && process.env.NODE_ENV === "development" && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-700">
          MailerLite placeholder. Set{" "}
          <code className="font-mono">NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID</code>{" "}
          and <code className="font-mono">NEXT_PUBLIC_MAILERLITE_FORM_ID</code>{" "}
          in <code className="font-mono">.env.local</code> to render the real
          form.
        </p>
      )}
    </>
  );
}
