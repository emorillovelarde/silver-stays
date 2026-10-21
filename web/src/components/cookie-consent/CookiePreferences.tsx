"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveConsent, type ConsentState } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

/**
 * Tiny accessible switch built as a button[role=switch]. We don't ship
 * @radix-ui/react-switch in this project and the spec is "no external
 * libraries", so this stays inline. The visual style follows the brand
 * palette (navy ON, silver/40 OFF).
 */
function Toggle({
  checked,
  disabled,
  onChange,
  ariaLabelledBy,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  ariaLabelledBy: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:ring-offset-2",
        checked ? "bg-[#1B2A49]" : "bg-[#8A8D91]/40",
        disabled && "cursor-not-allowed opacity-60",
        !disabled && "cursor-pointer",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

type CategoryRowProps = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  alwaysOnLabel?: string;
  onChange?: (next: boolean) => void;
};

function CategoryRow({
  id,
  title,
  description,
  checked,
  disabled,
  alwaysOnLabel,
  onChange,
}: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-[#1B2A49]/10 py-4 first:border-t-0 first:pt-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3
            id={id}
            className="font-serif text-base font-semibold text-[#1B2A49]"
          >
            {title}
          </h3>
          {disabled && alwaysOnLabel && (
            <span className="rounded-full bg-[#1B2A49]/10 px-2 py-0.5 text-xs font-medium text-[#1B2A49]">
              {alwaysOnLabel}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[#1B2A49]/75">
          {description}
        </p>
      </div>
      <Toggle
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        ariaLabelledBy={id}
      />
    </div>
  );
}

/**
 * Granular cookie preferences modal. Opened either from the banner's
 * "Customize" button (initialState is null → all opt-in OFF) or from
 * the footer's "Cookie settings" button (initialState is the user's
 * stored consent, pre-loaded into the toggles).
 *
 * If marketing flips from accepted → rejected on save, we reload the
 * page so any already-loaded fbq script is gone for subsequent requests.
 * Going the other way (OFF → ON) does not require a reload — MetaPixel
 * mounts itself via the consent-changed event.
 */
export function CookiePreferences({
  initialState,
  onSaved,
  onCancel,
}: {
  initialState: ConsentState | null;
  onSaved: (revokedMarketing: boolean) => void;
  onCancel: () => void;
}) {
  const t = useTranslations("CookieConsent.preferences");

  const [analytics, setAnalytics] = useState(initialState?.analytics ?? false);
  const [marketing, setMarketing] = useState(initialState?.marketing ?? false);
  const [functional, setFunctional] = useState(
    initialState?.functional ?? false,
  );

  const handleSave = () => {
    const prevMarketing = initialState?.marketing === true;
    saveConsent({ analytics, marketing, functional });
    onSaved(prevMarketing && !marketing);
  };

  // Dialog open state is driven by the parent. We pass onOpenChange so
  // closing via Esc / overlay click also routes through onCancel.
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent
        className="max-w-xl bg-white p-0"
        closeAriaLabel={t("close")}
      >
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-serif text-xl font-normal text-[#1B2A49]">
            {t("title")}
          </DialogTitle>
          <p className="mt-2 text-sm leading-relaxed text-[#1B2A49]/75">
            {t("description")}
          </p>
        </DialogHeader>

        <div className="px-6 py-2">
          <CategoryRow
            id="cookie-cat-necessary"
            title={t("necessary.title")}
            description={t("necessary.description")}
            checked
            disabled
            alwaysOnLabel={t("alwaysOn")}
          />
          <CategoryRow
            id="cookie-cat-analytics"
            title={t("analytics.title")}
            description={t("analytics.description")}
            checked={analytics}
            onChange={setAnalytics}
          />
          <CategoryRow
            id="cookie-cat-marketing"
            title={t("marketing.title")}
            description={t("marketing.description")}
            checked={marketing}
            onChange={setMarketing}
          />
          <CategoryRow
            id="cookie-cat-functional"
            title={t("functional.title")}
            description={t("functional.description")}
            checked={functional}
            onChange={setFunctional}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#1B2A49]/10 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#8A8D91] bg-transparent px-6 text-base font-semibold text-[#1B2A49] transition-colors hover:bg-[#8A8D91]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A8D91] focus-visible:ring-offset-2"
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#C96B4A] bg-[#C96B4A] px-6 text-base font-semibold text-white transition-colors hover:bg-[#b65a3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96B4A] focus-visible:ring-offset-2"
          >
            {t("save")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
