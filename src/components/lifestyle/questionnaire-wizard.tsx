"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  questionnaireSchema,
  QuestionnaireFormValues,
} from "@/lib/schemas/questionnaire";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  StepLocation,
  StepLifestyle,
  StepEssentialServices,
  StepDuration,
  StepContact,
} from "./steps";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { sendLeadEmail } from "@/actions/send-lead-email";

export function QuestionnaireWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("Questionnaire");
  const locale = useLocale();

  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(
      questionnaireSchema,
    ) as Resolver<QuestionnaireFormValues>,
    defaultValues: {
      location: "",
      lifestyle: "",
      essentialServices: "",
      duration: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const totalSteps = 5;
  const STEP_LABEL_KEYS = [
    "step1",
    "step2",
    "step3",
    "step4",
    "step5",
  ] as const;

  const nextStep = async () => {
    let isValid = false;

    const stepFields: Record<number, (keyof QuestionnaireFormValues)[]> = {
      1: ["location"],
      2: ["lifestyle"],
      3: ["essentialServices"],
      4: ["duration"],
      5: ["firstName", "lastName", "phone", "email"],
    };

    const fields = stepFields[currentStep];
    if (fields) {
      isValid = await form.trigger(fields);
    }

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuestionnaireFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const leadData = {
        questionnaire: {
          location: data.location,
          lifestyle: data.lifestyle,
          essentialServices: data.essentialServices,
          duration: data.duration,
        },
        contact: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
        },
        submittedAt: new Date().toISOString(),
      };

      const { error: leadError } = await supabase.from("leads").insert({
        email: data.email,
        full_name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        data: leadData,
      });

      if (leadError) throw leadError;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("profiles")
          .update({
            health_notes: JSON.stringify(leadData),
          })
          .eq("id", user.id);
      }

      const { success } = await sendLeadEmail({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        locale,
      });
      if (!success) {
        console.warn("[Questionnaire] Lead email could not be sent");
      }

      router.push("/success");
    } catch (err: unknown) {
      console.error(err);
      setSubmitError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepLocation form={form} />;
      case 2:
        return <StepLifestyle form={form} />;
      case 3:
        return <StepEssentialServices form={form} />;
      case 4:
        return <StepDuration form={form} />;
      case 5:
        return <StepContact form={form} />;
      default:
        return null;
    }
  };

  const progress = (currentStep / totalSteps) * 100;
  const stepLabelKey = STEP_LABEL_KEYS[currentStep - 1];
  const progressText = t("progress.stepOf", {
    current: currentStep,
    total: totalSteps,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-none bg-white overflow-hidden flex flex-col max-h-[85vh]">
      <div className="px-6 pt-5 pb-2 space-y-2 shrink-0">
        <p className="text-sm font-medium text-slate-600" aria-live="polite">
          {progressText}: {t(`progress.${stepLabelKey}`)}
        </p>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`${progressText}: ${t(`progress.${stepLabelKey}`)}`}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col flex-grow min-h-0"
      >
        <div className="flex-grow min-h-0 overflow-y-auto px-6 py-4">
          {renderStep()}
        </div>

        {submitError && (
          <div
            className="px-6 py-2 text-red-600 font-medium bg-red-50 mx-6 rounded-md mb-4"
            role="alert"
          >
            {submitError}
          </div>
        )}

        <CardFooter className="flex justify-between p-6 border-t bg-slate-50/50 shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="text-lg h-12 text-slate-500 hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> {t("nav.back")}
          </Button>

          <Button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className={cn(
              "text-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white shadow-md transition-all",
              isSubmitting && "opacity-80",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                {t("nav.processing")}
              </>
            ) : currentStep === totalSteps ? (
              t("nav.submit")
            ) : (
              <>
                {t("nav.next")} <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
