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
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  StepMorningActivity,
  StepEnvironment,
  StepInterests,
  StepDuration,
  StepContact,
} from "./steps";
import { ChevronRight, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function QuestionnaireWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("Questionnaire");

  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(
      questionnaireSchema,
    ) as Resolver<QuestionnaireFormValues>,
    defaultValues: {
      morningActivity: "",
      environment: "",
      interests: [],
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
      1: ["morningActivity"],
      2: ["environment"],
      3: ["interests"],
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
          morningActivity: data.morningActivity,
          environment: data.environment,
          interests: data.interests ?? [],
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

      setIsCompleted(true);
    } catch (err: unknown) {
      console.error(err);
      setSubmitError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (isCompleted) return null;

    switch (currentStep) {
      case 1:
        return <StepMorningActivity form={form} />;
      case 2:
        return <StepEnvironment form={form} />;
      case 3:
        return <StepInterests form={form} />;
      case 4:
        return <StepDuration form={form} />;
      case 5:
        return <StepContact form={form} />;
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-none bg-white animate-in zoom-in-95 duration-500">
        <CardContent className="flex flex-col items-center text-center p-12 space-y-6">
          <div className="bg-[#004F56]/10 p-6 rounded-full mb-4 animate-bounce">
            <Sparkles className="h-16 w-16 text-[#004F56]" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#333333]">
            {t("completion.title")}
          </CardTitle>
          <CardDescription className="text-xl text-[#333333]/80 max-w-md mx-auto leading-relaxed">
            {t.rich("completion.message", {
              name: form.getValues("firstName"),
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
            <br />
            <span className="font-semibold text-[#004F56]">
              {form.getValues("email")}
            </span>
          </CardDescription>

          <div className="pt-8">
            <Button
              onClick={() => router.push("/")}
              className="bg-[#004F56] hover:bg-[#004F56]/90 text-white text-lg px-8 h-12 rounded-full shadow-lg"
            >
              {t("completion.backHome")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = (currentStep / totalSteps) * 100;
  const stepLabelKey = STEP_LABEL_KEYS[currentStep - 1];
  const progressText = t("progress.stepOf", {
    current: currentStep,
    total: totalSteps,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-none bg-white overflow-hidden flex flex-col min-h-[500px]">
      <div className="px-6 pt-6 pb-2 space-y-2">
        <p className="text-sm font-medium text-slate-600" aria-live="polite">
          {progressText}: {t(`progress.${stepLabelKey}`)}
        </p>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#004F56] transition-all duration-500 ease-out rounded-full"
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
        className="flex flex-col flex-grow"
      >
        <div className="flex-grow p-1">{renderStep()}</div>

        {submitError && (
          <div
            className="px-6 py-2 text-red-600 font-medium bg-red-50 mx-6 rounded-md mb-4"
            role="alert"
          >
            {submitError}
          </div>
        )}

        <CardFooter className="flex justify-between p-8 border-t bg-slate-50/50">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="text-lg h-12 text-slate-500 hover:text-[#004F56]"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> {t("nav.back")}
          </Button>

          <Button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className={cn(
              "text-lg h-12 px-8 bg-[#004F56] hover:bg-[#004F56]/90 text-white shadow-md transition-all",
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
