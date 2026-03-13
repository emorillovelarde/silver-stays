"use client";

import { UseFormReturn } from "react-hook-form";
import { QuestionnaireFormValues } from "@/lib/schemas/questionnaire";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building2,
  Landmark,
  TreePine,
  Compass,
  Waves,
  Trophy,
  UtensilsCrossed,
  BookOpen,
  Heart,
  Users,
  FileCheck,
  Car,
  Calendar,
  CalendarDays,
  Sun,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

interface StepProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const LOCATION_OPTIONS = [
  { value: "locWest", icon: Building2 },
  { value: "locCenter", icon: Landmark },
  { value: "locEast", icon: TreePine },
  { value: "locUnsure", icon: Compass },
] as const;

const LIFESTYLE_OPTIONS = [
  { value: "lifeBeach", icon: Waves },
  { value: "lifeGolf", icon: Trophy },
  { value: "lifeCulture", icon: UtensilsCrossed },
  { value: "lifeQuiet", icon: BookOpen },
] as const;

const ESSENTIAL_SERVICES_OPTIONS = [
  { value: "srvHealth", icon: Heart },
  { value: "srvCommunity", icon: Users },
  { value: "srvLegal", icon: FileCheck },
  { value: "srvTransport", icon: Car },
] as const;

const DURATION_OPTIONS = [
  { value: "dur1", icon: Calendar },
  { value: "dur3", icon: CalendarDays },
  { value: "dur6", icon: Sun },
  { value: "dur9", icon: FileText },
] as const;

export function StepLocation({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-sans mb-4">
          {t("step1Question")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "location",
              val as QuestionnaireFormValues["location"],
            )
          }
          defaultValue={form.getValues("location")}
          className="flex flex-col gap-2"
        >
          {LOCATION_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 border-muted rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all"
              >
                <Icon className="h-6 w-6 shrink-0 text-[#004F56]" />
                <span className="font-medium text-[#333333]">{t(value)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepLifestyle({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-sans mb-4">
          {t("step2Question")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "lifestyle",
              val as QuestionnaireFormValues["lifestyle"],
            )
          }
          defaultValue={form.getValues("lifestyle")}
          className="flex flex-col gap-2"
        >
          {LIFESTYLE_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 border-muted rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all"
              >
                <Icon className="h-6 w-6 shrink-0 text-[#004F56]" />
                <span className="font-medium text-[#333333]">{t(value)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepEssentialServices({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-sans mb-4">
          {t("step3Question")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "essentialServices",
              val as QuestionnaireFormValues["essentialServices"],
            )
          }
          defaultValue={form.getValues("essentialServices")}
          className="flex flex-col gap-2"
        >
          {ESSENTIAL_SERVICES_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 border-muted rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all"
              >
                <Icon className="h-6 w-6 shrink-0 text-[#004F56]" />
                <span className="font-medium text-[#333333]">{t(value)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepDuration({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-sans mb-4">
          {t("step4Question")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "duration",
              val as QuestionnaireFormValues["duration"],
            )
          }
          defaultValue={form.getValues("duration")}
          className="flex flex-col gap-2"
        >
          {DURATION_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 border-muted rounded-xl cursor-pointer hover:border-[#004F56] peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5 transition-all font-medium text-[#333333]"
              >
                <Icon className="h-6 w-6 shrink-0 text-[#004F56]" />
                {t(value)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

export function StepContact({ form }: StepProps) {
  const t = useTranslations("Questionnaire");
  const tContact = useTranslations("Questionnaire.contact");
  const tValidation = useTranslations("Questionnaire.validation");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-sans mb-4">
          {t("step5Question")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-lg font-medium text-[#333333]"
            >
              {tContact("firstName")}
            </Label>
            <Input
              id="firstName"
              placeholder={tContact("firstNamePlaceholder")}
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
              {tContact("lastName")}
            </Label>
            <Input
              id="lastName"
              placeholder={tContact("lastNamePlaceholder")}
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
            {tContact("email")}
          </Label>
          <Input
            id="email"
            placeholder={tContact("emailPlaceholder")}
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
            {tContact("phone")}
          </Label>
          <Input
            id="phone"
            placeholder={tContact("phonePlaceholder")}
            {...form.register("phone")}
            className="h-12 text-lg border-2 focus-visible:ring-[#004F56]"
          />
          {form.formState.errors.phone?.message && (
            <p className="text-red-500 font-medium text-sm">
              {tValidation(form.formState.errors.phone.message)}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          {tContact("privacyNote")}
        </p>
      </CardContent>
    </div>
  );
}
