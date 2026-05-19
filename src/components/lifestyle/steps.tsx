"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
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
  Heart,
  Users,
  FileCheck,
  Car,
  Calendar,
  Plane,
  Camera,
  Home,
  Mountain,
  Leaf,
  Star,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

interface StepProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const headingClass =
  "text-xl md:text-2xl font-serif font-normal text-[#1B2A49] mb-4";
const cardClass =
  "flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 border-muted rounded-xl cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all";

const NATIONALITIES = [
  "United Kingdom",
  "Ireland",
  "Germany",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Belgium",
  "Switzerland",
  "Austria",
  "France",
  "Other",
] as const;

// ─── Step 1: Costa del Sol Experience ────────────────────────────────────────

const EXPERIENCE_OPTIONS = [
  { value: "never", icon: Plane },
  { value: "tourist", icon: Camera },
  { value: "extended", icon: Home },
  { value: "regular", icon: Star },
] as const;

export function StepExperience({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className={headingClass}>{t("step1Question")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "costaDelSolExperience",
              val as QuestionnaireFormValues["costaDelSolExperience"],
            )
          }
          defaultValue={form.getValues("costaDelSolExperience")}
          className="flex flex-col gap-2"
        >
          {EXPERIENCE_OPTIONS.map(({ value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label htmlFor={value} className={cardClass}>
                <Icon className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-medium text-[#333333]">
                  {t(`exp${value.charAt(0).toUpperCase() + value.slice(1)}`)}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

// ─── Step 2: Preferred Location ───────────────────────────────────────────────

const LOCATION_OPTIONS = [
  { value: "fuengirola_mijas", icon: Building2, key: "locFuengirolaMijas" },
  { value: "malaga_capital", icon: Landmark, key: "locMalagaCapital" },
  { value: "rincon_torre", icon: Waves, key: "locRinconTorre" },
  { value: "torrox_nerja", icon: TreePine, key: "locTorroxNerja" },
  { value: "unsure", icon: Compass, key: "locUnsure" },
] as const;

export function StepLocation({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className={headingClass}>{t("step2Question")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          onValueChange={(val) =>
            form.setValue(
              "preferredLocation",
              val as QuestionnaireFormValues["preferredLocation"],
            )
          }
          defaultValue={form.getValues("preferredLocation")}
          className="flex flex-col gap-2"
        >
          {LOCATION_OPTIONS.map(({ value, icon: Icon, key }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label htmlFor={value} className={cardClass}>
                <Icon className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-medium text-[#333333]">{t(key)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
}

// ─── Step 3: Lifestyle Preferences (multi-select) ────────────────────────────

const LIFESTYLE_OPTIONS = [
  { value: "walking_beach", icon: Waves, key: "lifWalkingBeach" },
  { value: "hiking_nature", icon: Mountain, key: "lifHikingNature" },
  { value: "culture_food", icon: UtensilsCrossed, key: "lifCultureFood" },
  { value: "sports_active", icon: Trophy, key: "lifSportsActive" },
  { value: "social_community", icon: Users, key: "lifSocialCommunity" },
  { value: "quiet_wellness", icon: Leaf, key: "lifQuietWellness" },
] as const;

type LifestyleValue = QuestionnaireFormValues["lifestylePreferences"][number];

export function StepLifestyle({ form }: StepProps) {
  const t = useTranslations("Questionnaire");
  const selected =
    useWatch({ control: form.control, name: "lifestylePreferences" }) ?? [];

  const toggle = (val: LifestyleValue) => {
    if (selected.includes(val)) {
      form.setValue(
        "lifestylePreferences",
        selected.filter((v) => v !== val),
        { shouldValidate: true },
      );
    } else {
      form.setValue("lifestylePreferences", [...selected, val], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-0">
        <CardTitle className={headingClass}>{t("step3Question")}</CardTitle>
        <p className="text-sm text-slate-500 -mt-2">{t("step3Hint")}</p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-2">
          {LIFESTYLE_OPTIONS.map(({ value, icon: Icon, key }) => {
            const isSelected = selected.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggle(value)}
                className={`flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all text-left w-full ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary"
                }`}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${isSelected ? "text-primary" : "text-slate-400"}`}
                />
                <span className="font-medium text-[#333333]">{t(key)}</span>
              </button>
            );
          })}
        </div>
        {form.formState.errors.lifestylePreferences && (
          <p className="mt-2 text-sm text-red-500">
            {t(
              `validation.${form.formState.errors.lifestylePreferences.message ?? "selectAtLeastOne"}`,
            )}
          </p>
        )}
      </CardContent>
    </div>
  );
}

// ─── Step 4: Priorities (multi-select, max 3) ─────────────────────────────────

const PRIORITY_OPTIONS = [
  { value: "healthcare", icon: Heart, key: "priHealthcare" },
  { value: "legal", icon: FileCheck, key: "priLegal" },
  { value: "community", icon: Users, key: "priCommunity" },
  { value: "transport", icon: Car, key: "priTransport" },
  { value: "accommodation", icon: Home, key: "priAccommodation" },
] as const;

type PriorityValue = QuestionnaireFormValues["priorities"][number];

export function StepPriorities({ form }: StepProps) {
  const t = useTranslations("Questionnaire");
  const selected =
    useWatch({ control: form.control, name: "priorities" }) ?? [];

  const toggle = (val: PriorityValue) => {
    if (selected.includes(val)) {
      form.setValue(
        "priorities",
        selected.filter((v) => v !== val),
        {
          shouldValidate: true,
        },
      );
    } else if (selected.length < 3) {
      form.setValue("priorities", [...selected, val], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-0">
        <CardTitle className={headingClass}>{t("step4Question")}</CardTitle>
        <p className="text-sm text-slate-500 -mt-2">{t("step4Hint")}</p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-2">
          {PRIORITY_OPTIONS.map(({ value, icon: Icon, key }) => {
            const isSelected = selected.includes(value);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggle(value)}
                disabled={isDisabled}
                className={`flex flex-row items-center gap-4 h-14 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all text-left w-full ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : isDisabled
                      ? "border-muted opacity-40 cursor-not-allowed"
                      : "border-muted hover:border-primary"
                }`}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${isSelected ? "text-primary" : "text-slate-400"}`}
                />
                <span className="font-medium text-[#333333]">{t(key)}</span>
              </button>
            );
          })}
        </div>
        {form.formState.errors.priorities && (
          <p className="mt-2 text-sm text-red-500">
            {t(
              `validation.${form.formState.errors.priorities.message ?? "selectAtLeastOne"}`,
            )}
          </p>
        )}
      </CardContent>
    </div>
  );
}

// ─── Step 5: Stay Duration + Arrival Month ────────────────────────────────────

const DURATION_OPTIONS = [
  { value: "1_3_months", key: "dur1_3" },
  { value: "3_6_months", key: "dur3_6" },
  { value: "6_9_months", key: "dur6_9" },
  { value: "more_9_months", key: "durMore9" },
] as const;

const ARRIVAL_OPTIONS = [
  { value: "oct", key: "arrOct" },
  { value: "nov", key: "arrNov" },
  { value: "dec", key: "arrDec" },
  { value: "jan", key: "arrJan" },
  { value: "feb", key: "arrFeb" },
  { value: "mar", key: "arrMar" },
  { value: "apr", key: "arrApr" },
  { value: "other", key: "arrOther" },
] as const;

export function StepStayDetails({ form }: StepProps) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className={headingClass}>{t("step5Question")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {/* Duration */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[#1B2A49] uppercase tracking-wide">
            {t("durLabel")}
          </p>
          <RadioGroup
            onValueChange={(val) =>
              form.setValue(
                "stayDuration",
                val as QuestionnaireFormValues["stayDuration"],
              )
            }
            defaultValue={form.getValues("stayDuration")}
            className="flex flex-col gap-2"
          >
            {DURATION_OPTIONS.map(({ value, key }) => (
              <div key={value}>
                <RadioGroupItem
                  value={value}
                  id={`dur-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`dur-${value}`}
                  className="flex items-center gap-3 h-12 px-4 border-2 border-muted rounded-xl cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <Calendar className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium text-[#333333]">{t(key)}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Arrival month */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[#1B2A49] uppercase tracking-wide">
            {t("arrLabel")}
          </p>
          <RadioGroup
            onValueChange={(val) =>
              form.setValue(
                "arrivalMonth",
                val as QuestionnaireFormValues["arrivalMonth"],
              )
            }
            defaultValue={form.getValues("arrivalMonth")}
            className="grid grid-cols-4 gap-2"
          >
            {ARRIVAL_OPTIONS.map(({ value, key }) => (
              <div key={value}>
                <RadioGroupItem
                  value={value}
                  id={`arr-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`arr-${value}`}
                  className="flex items-center justify-center h-10 px-2 border-2 border-muted rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all text-sm font-medium text-[#333333] text-center"
                >
                  {t(key)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </div>
  );
}

// ─── Step 6: Contact ──────────────────────────────────────────────────────────

export function StepContact({ form }: StepProps) {
  const t = useTranslations("Questionnaire");
  const tContact = useTranslations("Questionnaire.contact");
  const tValidation = useTranslations("Questionnaire.validation");

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle className={headingClass}>{t("step6Question")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-[#333333]"
            >
              {tContact("firstName")}
            </Label>
            <Input
              id="firstName"
              placeholder={tContact("firstNamePlaceholder")}
              {...form.register("firstName")}
              className="h-12 text-base border-2 focus-visible:ring-primary"
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
              className="text-sm font-medium text-[#333333]"
            >
              {tContact("lastName")}
            </Label>
            <Input
              id="lastName"
              placeholder={tContact("lastNamePlaceholder")}
              {...form.register("lastName")}
              className="h-12 text-base border-2 focus-visible:ring-primary"
            />
            {form.formState.errors.lastName?.message && (
              <p className="text-red-500 font-medium text-sm">
                {tValidation(form.formState.errors.lastName.message)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#333333]">
            {tContact("email")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={tContact("emailPlaceholder")}
            {...form.register("email")}
            className="h-12 text-base border-2 focus-visible:ring-primary"
          />
          {form.formState.errors.email?.message && (
            <p className="text-red-500 font-medium text-sm">
              {tValidation(form.formState.errors.email.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nationality"
            className="text-sm font-medium text-[#333333]"
          >
            {tContact("nationality")}
          </Label>
          <select
            id="nationality"
            {...form.register("nationality")}
            defaultValue=""
            className="w-full h-12 rounded-md border-2 border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <option value="" disabled>
              {tContact("nationalityPlaceholder")}
            </option>
            {NATIONALITIES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {form.formState.errors.nationality?.message && (
            <p className="text-red-500 font-medium text-sm">
              {tValidation(form.formState.errors.nationality.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-[#333333]">
            {tContact("phone")}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={tContact("phonePlaceholder")}
            {...form.register("phone")}
            className="h-12 text-base border-2 focus-visible:ring-primary"
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          {tContact("privacyNote")}
        </p>
      </CardContent>
    </div>
  );
}
