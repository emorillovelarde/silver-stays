"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { QuestionnaireFormValues } from "@/lib/schemas/questionnaire";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Waves,
  Coffee,
  Trophy,
  BookOpen,
  Building2,
  Trees,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

interface StepProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const MORNING_OPTIONS = [
  { value: "beach_walk", icon: Waves },
  { value: "breakfast_views", icon: Coffee },
  { value: "golf_tennis", icon: Trophy },
  { value: "silence_read", icon: BookOpen },
] as const;

const INTEREST_KEYS = [
  "gastronomy",
  "gentle_hiking",
  "bridge",
  "volunteering",
  "yoga",
] as const;

const DURATION_OPTIONS = [
  "1_3_months",
  "3_6_months",
  "6_9_months",
  "9_plus_months",
] as const;

export function StepMorningActivity({ form }: StepProps) {
  const t = useTranslations("Questionnaire.morningActivity");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#333333]">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-lg">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "morningActivity",
              val as QuestionnaireFormValues["morningActivity"],
            )
          }
          defaultValue={form.getValues("morningActivity")}
          className="grid grid-cols-2 gap-4"
        >
          {MORNING_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-col items-center justify-center p-6 border-2 border-muted rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all h-full text-center"
              >
                <div className="text-[#004F56]">
                  <Icon className="h-8 w-8 mb-2" />
                </div>
                <span className="font-medium text-[#333333]">{t(value)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepEnvironment({ form }: StepProps) {
  const t = useTranslations("Questionnaire.environment");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#333333]">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-lg">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "environment",
              val as QuestionnaireFormValues["environment"],
            )
          }
          defaultValue={form.getValues("environment")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="relative">
            <RadioGroupItem
              value="urban_vibrant"
              id="urban"
              className="peer sr-only"
            />
            <Label
              htmlFor="urban"
              className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all"
            >
              <Building2 className="h-10 w-10 mb-3 text-[#004F56]" />
              <span className="text-lg font-bold text-[#333333]">
                {t("urban_vibrant")}
              </span>
              <span className="text-sm text-muted-foreground text-center mt-2">
                {t("urban_vibrant_desc")}
              </span>
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              value="natural_reserved"
              id="natural"
              className="peer sr-only"
            />
            <Label
              htmlFor="natural"
              className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all"
            >
              <Trees className="h-10 w-10 mb-3 text-[#004F56]" />
              <span className="text-lg font-bold text-[#333333]">
                {t("natural_reserved")}
              </span>
              <span className="text-sm text-muted-foreground text-center mt-2">
                {t("natural_reserved_desc")}
              </span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepInterests({ form }: StepProps) {
  const t = useTranslations("Questionnaire.interests");
  const currentInterests =
    useWatch({
      control: form.control,
      name: "interests",
      defaultValue: [],
    }) ?? [];

  const toggle = (key: string) => {
    const current = form.getValues("interests") || [];
    let newInterests: string[];
    if (current.includes(key)) {
      newInterests = current.filter((t) => t !== key);
    } else {
      newInterests = [...current, key];
    }
    form.setValue("interests", newInterests, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#333333]">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-lg">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {INTEREST_KEYS.map((key) => {
          const isSelected = currentInterests.includes(key);
          return (
            <div
              key={key}
              onClick={() => toggle(key)}
              className={cn(
                "cursor-pointer px-6 py-3 rounded-full border-2 text-lg font-medium transition-all select-none",
                isSelected
                  ? "bg-[#004F56]/5 border-[#004F56] text-[#333333] font-semibold"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#004F56] hover:text-[#004F56]",
              )}
            >
              {t(key)}
            </div>
          );
        })}
      </CardContent>
    </div>
  );
}

export function StepDuration({ form }: StepProps) {
  const t = useTranslations("Questionnaire.duration");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#333333]">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-lg">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "duration",
              val as QuestionnaireFormValues["duration"],
            )
          }
          defaultValue={form.getValues("duration")}
          className="grid grid-cols-2 gap-4"
        >
          {DURATION_OPTIONS.map((opt) => (
            <div key={opt}>
              <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
              <Label
                htmlFor={opt}
                className="flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all text-center text-lg font-medium text-[#333333]"
              >
                {t(opt)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepContact({ form }: StepProps) {
  const t = useTranslations("Questionnaire.contact");
  const tValidation = useTranslations("Questionnaire.validation");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#333333]">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-lg">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-lg font-medium text-[#333333]"
            >
              {t("firstName")}
            </Label>
            <Input
              id="firstName"
              placeholder={t("firstNamePlaceholder")}
              {...form.register("firstName")}
              className="h-12 text-lg border-2 focus-visible:ring-[#004F56]"
            />
            {form.formState.errors.firstName?.message && (
              <p className="text-red-500 font-medium text-sm">
                {tValidation(form.formState.errors.firstName.message)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-lg font-medium text-[#333333]"
            >
              {t("lastName")}
            </Label>
            <Input
              id="lastName"
              placeholder={t("lastNamePlaceholder")}
              {...form.register("lastName")}
              className="h-12 text-lg border-2 focus-visible:ring-[#004F56]"
            />
            {form.formState.errors.lastName?.message && (
              <p className="text-red-500 font-medium text-sm">
                {tValidation(form.formState.errors.lastName.message)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-medium text-[#333333]">
            {t("email")}
          </Label>
          <Input
            id="email"
            placeholder={t("emailPlaceholder")}
            {...form.register("email")}
            className="h-12 text-lg border-2 focus-visible:ring-[#004F56]"
          />
          {form.formState.errors.email?.message && (
            <p className="text-red-500 font-medium text-sm">
              {tValidation(form.formState.errors.email.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-lg font-medium text-[#333333]">
            {t("phone")}
          </Label>
          <Input
            id="phone"
            placeholder={t("phonePlaceholder")}
            {...form.register("phone")}
            className="h-12 text-lg border-2 focus-visible:ring-[#004F56]"
          />
          {form.formState.errors.phone?.message && (
            <p className="text-red-500 font-medium text-sm">
              {tValidation(form.formState.errors.phone.message)}
            </p>
          )}
        </div>

        <p className="text-sm text-muted-foreground pt-2">{t("privacyNote")}</p>
      </CardContent>
    </div>
  );
}
