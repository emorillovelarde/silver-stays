import { QuestionnaireWizard } from "@/components/lifestyle/questionnaire-wizard";
import { getTranslations } from "next-intl/server";

export default async function QuestionnairePage() {
  const t = await getTranslations("Questionnaire");

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <div className="w-full text-center pt-8 md:pt-10 pb-6 px-4 shrink-0 md:-mt-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] font-sans tracking-tight mb-2">
          {t("pageTitle")}
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-[90%] md:max-w-2xl mx-auto">
          {t("pageSubtitle")}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start md:justify-start md:pt-4 px-4 pb-12 w-full">
        <QuestionnaireWizard />
      </div>
    </main>
  );
}
