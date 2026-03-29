import { getTranslations } from "next-intl/server";
import { PartnerAvatar } from "@/components/success/partner-avatar";
import { SuccessPageView } from "@/components/success/success-page-view";

export default async function SuccessPage() {
  const t = await getTranslations("Success");

  return (
    <SuccessPageView
      partnerAvatar={<PartnerAvatar alt={t("partnerAvatarAlt")} />}
    />
  );
}
