import { UseFormReturn, useWatch } from "react-hook-form";
import { QuestionnaireData } from "@/lib/schemas/questionnaire";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Sunrise, Waves, Coffee, Trophy, BookOpen, Building2, Trees, Stethoscope, ShieldCheck, Activity, Users, Globe, User, Utensils, Mountain, HeartHandshake } from "lucide-react";

interface StepProps {
    form: UseFormReturn<QuestionnaireData>;
}

// --- Bloque I: La Visión ---

export function StepMorningActivity({ form }: StepProps) {
    const options = [
        { value: "Caminar por la playa", label: "Caminar por la playa", icon: <Waves className="h-8 w-8 mb-2" /> },
        { value: "Desayunar con vistas", label: "Desayunar con vistas", icon: <Coffee className="h-8 w-8 mb-2" /> },
        { value: "Golf/Tenis", label: "Golf / Tenis", icon: <Trophy className="h-8 w-8 mb-2" /> },
        { value: "Silencio/Leer", label: "Silencio / Leer", icon: <BookOpen className="h-8 w-8 mb-2" /> },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#333333]">La Visión</CardTitle>
                <CardDescription className="text-lg">¿Cuál es la primera actividad que desea hacer al despertar?</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    onValueChange={(val) => form.setValue("morningActivity", val as any)}
                    defaultValue={form.getValues("morningActivity")}
                    className="grid grid-cols-2 gap-4"
                >
                    {options.map((opt) => (
                        <div key={opt.value}>
                            <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                            <Label
                                htmlFor={opt.value}
                                className="flex flex-col items-center justify-center p-6 border-2 border-muted rounded-xl cursor-pointer hover:border-[#006D77] peer-data-[state=checked]:border-[#006D77] peer-data-[state=checked]:bg-[#006D77]/5 transition-all h-full text-center"
                            >
                                <div className="text-[#006D77]">{opt.icon}</div>
                                <span className="font-medium text-[#333333]">{opt.label}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </div>
    );
}

export function StepEnvironment({ form }: StepProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#333333]">El Entorno</CardTitle>
                <CardDescription className="text-lg">¿Qué entorno prefiere?</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    onValueChange={(val) => form.setValue("environment", val as any)}
                    defaultValue={form.getValues("environment")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div className="relative">
                        <RadioGroupItem value="Urbano/Vibrante" id="urban" className="peer sr-only" />
                        <Label htmlFor="urban" className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#006D77] peer-data-[state=checked]:border-[#006D77] peer-data-[state=checked]:bg-[#006D77]/5 transition-all">
                            <Building2 className="h-10 w-10 mb-3 text-[#006D77]" />
                            <span className="text-lg font-bold text-[#333333]">Urbano / Vibrante</span>
                            <span className="text-sm text-muted-foreground text-center mt-2">Tiendas, restaurantes y vida social a pie de calle.</span>
                        </Label>
                    </div>
                    <div className="relative">
                        <RadioGroupItem value="Natural/Reservado" id="natural" className="peer sr-only" />
                        <Label htmlFor="natural" className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#006D77] peer-data-[state=checked]:border-[#006D77] peer-data-[state=checked]:bg-[#006D77]/5 transition-all">
                            <Trees className="h-10 w-10 mb-3 text-[#006D77]" />
                            <span className="text-lg font-bold text-[#333333]">Natural / Reservado</span>
                            <span className="text-sm text-muted-foreground text-center mt-2">Tranquilidad, espacios verdes y privacidad.</span>
                        </Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </div>
    );
}

// --- Bloque II: Intereses ---

export function StepInterests({ form }: StepProps) {
    const tags = ["Gastronomía", "Senderismo suave", "Bridge", "Voluntariado", "Yoga"];

    const currentInterests = useWatch({
        control: form.control,
        name: "interests",
        defaultValue: []
    }) ?? [];

    const toggle = (tag: string) => {
        const current = form.getValues("interests") || [];
        let newInterests;

        if (current.includes(tag)) {
            newInterests = current.filter((t) => t !== tag);
        } else {
            newInterests = [...current, tag];
        }

        form.setValue("interests", newInterests, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#333333]">Intereses</CardTitle>
                <CardDescription className="text-lg">Seleccione sus temas de interés</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
                {tags.map((tag) => {
                    const isSelected = currentInterests.includes(tag);
                    return (
                        <div
                            key={tag}
                            onClick={() => toggle(tag)}
                            className={cn(
                                "cursor-pointer px-6 py-3 rounded-full border-2 text-lg font-medium transition-all select-none",
                                isSelected
                                    ? "bg-[#006D77]/5 border-[#006D77] text-[#333333] font-semibold"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-[#006D77] hover:text-[#006D77]"
                            )}
                        >
                            {tag}
                        </div>
                    );
                })}
            </CardContent>
        </div>
    );
}

// --- Bloque III: Logística ---

export function StepDuration({ form }: StepProps) {
    const options = ["1-3 meses", "3-6 meses", "6-9 meses", "+9 meses"];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#333333]">Logística</CardTitle>
                <CardDescription className="text-lg">Duración estimada de la estancia</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    onValueChange={(val) => form.setValue("duration", val as any)}
                    defaultValue={form.getValues("duration")}
                    className="grid grid-cols-2 gap-4"
                >
                    {options.map((opt) => (
                        <div key={opt}>
                            <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                            <Label htmlFor={opt} className="flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer hover:border-[#006D77] peer-data-[state=checked]:border-[#006D77] peer-data-[state=checked]:bg-[#006D77]/5 transition-all text-center text-lg font-medium text-[#333333]">
                                {opt}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </div>
    );
}

// --- Bloque IV: Contacto ---

import { Input } from "@/components/ui/input";

export function StepContact({ form }: StepProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#333333]">Contacto</CardTitle>
                <CardDescription className="text-lg">Para enviarle su Dossier personalizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-lg font-medium text-[#333333]">Nombre</Label>
                        <Input
                            id="firstName"
                            placeholder="Juan"
                            {...form.register("firstName")}
                            className="h-12 text-lg border-2 focus-visible:ring-[#006D77]"
                        />
                        {form.formState.errors.firstName && (
                            <p className="text-red-500 font-medium text-sm">{form.formState.errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-lg font-medium text-[#333333]">Apellido</Label>
                        <Input
                            id="lastName"
                            placeholder="Pérez"
                            {...form.register("lastName")}
                            className="h-12 text-lg border-2 focus-visible:ring-[#006D77]"
                        />
                        {form.formState.errors.lastName && (
                            <p className="text-red-500 font-medium text-sm">{form.formState.errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium text-[#333333]">Correo electrónico</Label>
                    <Input
                        id="email"
                        placeholder="ejemplo@correo.com"
                        {...form.register("email")}
                        className="h-12 text-lg border-2 focus-visible:ring-[#006D77]"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 font-medium text-sm">{form.formState.errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-medium text-[#333333]">Teléfono</Label>
                    <Input
                        id="phone"
                        placeholder="+34 600 000 000"
                        {...form.register("phone")}
                        className="h-12 text-lg border-2 focus-visible:ring-[#006D77]"
                    />
                    {form.formState.errors.phone && (
                        <p className="text-red-500 font-medium text-sm">{form.formState.errors.phone.message}</p>
                    )}
                </div>

                <p className="text-sm text-muted-foreground pt-2">
                    Sus datos están seguros. Solo usaremos este correo para enviarle propuestas de estancias.
                </p>
            </CardContent>
        </div>
    );
}
