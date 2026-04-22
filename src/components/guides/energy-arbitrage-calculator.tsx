"use client";

import { useState, useEffect } from "react";
import { useEnergyArbitrageStore } from "@/lib/stores/energy-arbitrage-store";
import { Calculator, Euro, Flame, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Datos de Referencia Febrero 2026 (Guía Arbitraje Energético) ───
const SPAIN_PVPC_CT = 12.0; // ct/kWh media España PVPC
const BASE_KWH_PER_M2 = 2; // kWh/m²/mes referencia calefacción en Málaga (HDD 1)

type CityId = "london" | "berlin" | "stockholm" | "oslo";

interface CityData {
  id: CityId;
  name: string;
  nameEn: string;
  electricityCt: number;
  gasCt: number;
  hddMultiplier: number; // respecto a Málaga
}

const CITIES: CityData[] = [
  {
    id: "london",
    name: "Londres",
    nameEn: "London",
    electricityCt: 33.0,
    gasCt: 7.2,
    hddMultiplier: 2.5,
  },
  {
    id: "berlin",
    name: "Berlín",
    nameEn: "Berlin",
    electricityCt: 36.0,
    gasCt: 10.5,
    hddMultiplier: 3,
  },
  {
    id: "stockholm",
    name: "Estocolmo",
    nameEn: "Stockholm",
    electricityCt: 19.5,
    gasCt: 21.3,
    hddMultiplier: 4,
  },
  {
    id: "oslo",
    name: "Oslo",
    nameEn: "Oslo",
    electricityCt: 22.0,
    gasCt: 12.0,
    hddMultiplier: 4,
  },
];

type EnergyType = "gas" | "electricity";

interface CalculationResult {
  costOriginMonthly: number;
  costSpainMonthly: number;
  savingsMonthly: number;
  consumptionOriginKwh: number;
  consumptionSpainKwh: number;
}

function calculateSavings(
  cityId: CityId,
  homeSizeM2: number,
  energyType: EnergyType,
): CalculationResult {
  const city = CITIES.find((c) => c.id === cityId)!;
  const pricePerKwh =
    energyType === "gas" ? city.gasCt / 100 : city.electricityCt / 100;

  const consumptionOriginKwh =
    BASE_KWH_PER_M2 * city.hddMultiplier * homeSizeM2;
  const consumptionSpainKwh = BASE_KWH_PER_M2 * 1 * homeSizeM2; // HDD 1 en Málaga

  const costOriginMonthly = consumptionOriginKwh * pricePerKwh;
  const costSpainMonthly = consumptionSpainKwh * (SPAIN_PVPC_CT / 100);
  const savingsMonthly = costOriginMonthly - costSpainMonthly;

  return {
    costOriginMonthly,
    costSpainMonthly,
    savingsMonthly,
    consumptionOriginKwh,
    consumptionSpainKwh,
  };
}

/** Animación de conteo sin framer-motion */
function useAnimatedValue(
  target: number,
  duration = 400,
  enabled = true,
): number {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!enabled) {
      const id = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(id);
    }
    const start = display;
    const diff = target - start;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setDisplay(Math.round((start + diff * eased) * 100) / 100);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
    // display intentionally excluded - used as animation start value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, enabled]);

  return display;
}

export function EnergyArbitrageCalculator() {
  const [cityId, setCityId] = useState<CityId>("london");
  const [homeSizeM2, setHomeSizeM2] = useState(80);
  const [energyType, setEnergyType] = useState<EnergyType>("gas");

  const setResult = useEnergyArbitrageStore((s) => s.setResult);
  const result = calculateSavings(cityId, homeSizeM2, energyType);

  useEffect(() => {
    setResult({
      cityId,
      homeSizeM2,
      energyType,
      costOriginMonthly: result.costOriginMonthly,
      costSpainMonthly: result.costSpainMonthly,
      savingsMonthly: result.savingsMonthly,
    });
  }, [
    cityId,
    homeSizeM2,
    energyType,
    result.costOriginMonthly,
    result.costSpainMonthly,
    result.savingsMonthly,
    setResult,
  ]);

  const animatedSavings = useAnimatedValue(result.savingsMonthly);
  const animatedOrigin = useAnimatedValue(result.costOriginMonthly);
  const animatedSpain = useAnimatedValue(result.costSpainMonthly);

  const maxCost = Math.max(
    result.costOriginMonthly,
    result.costSpainMonthly,
    result.savingsMonthly,
    1,
  );

  return (
    <Card
      className="my-10 border-2 border-primary/10 shadow-lg bg-white"
      aria-labelledby="calculator-title"
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="p-3 bg-primary rounded-full text-primary-foreground"
            aria-hidden
          >
            <Calculator size={28} />
          </div>
          <div>
            <CardTitle
              id="calculator-title"
              className="text-2xl md:text-3xl font-bold text-primary"
            >
              Calculadora de Arbitraje Energético
            </CardTitle>
            <CardDescription className="text-base mt-1">
              Compare su gasto en calefacción en origen con el coste en la Costa
              del Sol
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ─── Inputs ─── */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label
              htmlFor="city-select"
              className="text-lg font-semibold text-foreground"
            >
              Ciudad de Origen
            </Label>
            <select
              id="city-select"
              value={cityId}
              onChange={(e) => setCityId(e.target.value as CityId)}
              className="w-full text-lg p-3 border-2 border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-colors"
              aria-label="Seleccione su ciudad de origen"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <Label
                htmlFor="home-size-slider"
                className="text-lg font-semibold text-foreground"
              >
                Tamaño del Hogar
              </Label>
              <span
                className="text-xl font-bold text-primary"
                aria-live="polite"
                aria-atomic="true"
              >
                {homeSizeM2} m²
              </span>
            </div>
            <Slider
              id="home-size-slider"
              value={[homeSizeM2]}
              onValueChange={([v]) => setHomeSizeM2(v)}
              min={40}
              max={150}
              step={5}
              className="w-full"
              aria-label="Tamaño del hogar en metros cuadrados"
              aria-valuenow={homeSizeM2}
              aria-valuemin={40}
              aria-valuemax={150}
            />
          </div>
        </div>

        {/* ─── Toggle Tipo de Energía ─── */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-foreground">
            Tipo de Energía en Origen
          </Label>
          <div
            role="group"
            aria-label="Tipo de energía para calefacción"
            className="inline-flex rounded-lg border-2 border-input p-1 bg-muted/50"
          >
            <Button
              type="button"
              variant={energyType === "gas" ? "default" : "ghost"}
              size="lg"
              onClick={() => setEnergyType("gas")}
              className={cn(
                "gap-2 transition-all",
                energyType === "gas" && "bg-primary text-primary-foreground",
              )}
              aria-pressed={energyType === "gas"}
            >
              <Flame className="h-5 w-5" />
              Gas
            </Button>
            <Button
              type="button"
              variant={energyType === "electricity" ? "default" : "ghost"}
              size="lg"
              onClick={() => setEnergyType("electricity")}
              className={cn(
                "gap-2 transition-all",
                energyType === "electricity" &&
                  "bg-primary text-primary-foreground",
              )}
              aria-pressed={energyType === "electricity"}
            >
              <Zap className="h-5 w-5" />
              Electricidad
            </Button>
          </div>
        </div>

        {/* ─── Gráfico de Barras Comparativas ─── */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Comparativa de Costes Mensuales
          </h4>
          <div
            className="space-y-4"
            role="img"
            aria-label="Gráfico de barras: coste en origen, coste en España y ahorro"
          >
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-600/90 font-medium">
                  Coste en {CITIES.find((c) => c.id === cityId)?.name}
                </span>
                <span className="text-xl font-bold text-red-600">
                  {animatedOrigin.toFixed(2)} €
                </span>
              </div>
              <div
                className="h-8 rounded-md bg-red-100 overflow-hidden"
                style={{ maxWidth: "100%" }}
              >
                <div
                  className="h-full bg-red-400/80 rounded-md transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      100,
                      (result.costOriginMonthly / maxCost) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary font-medium">
                  Coste en España (Costa del Sol)
                </span>
                <span className="text-xl font-bold text-primary">
                  {animatedSpain.toFixed(2)} €
                </span>
              </div>
              <div className="h-8 rounded-md bg-primary/10 overflow-hidden">
                <div
                  className="h-full bg-primary/60 rounded-md transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      100,
                      (result.costSpainMonthly / maxCost) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-emerald-600 font-medium">
                  Ahorro Mensual Estimado
                </span>
                <span className="text-xl font-bold text-emerald-600">
                  {animatedSavings.toFixed(2)} €
                </span>
              </div>
              <div className="h-8 rounded-md bg-emerald-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-md transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, (result.savingsMonthly / maxCost) * 100),
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Resultado Principal (Silver-Safe: text-xl+) ─── */}
        <div
          className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-6"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-lg font-medium text-emerald-800 mb-2">
            Ahorro mensual en suministros
          </p>
          <div className="flex items-baseline gap-2">
            <Euro className="h-10 w-10 text-emerald-600" aria-hidden />
            <span
              className="text-4xl md:text-5xl font-bold text-emerald-600"
              role="status"
            >
              {animatedSavings.toFixed(2)} €
            </span>
          </div>
          <p className="text-xl text-emerald-700 mt-2">
            Este ahorro puede financiar hasta{" "}
            <strong>
              {result.savingsMonthly > 0
                ? Math.min(
                    100,
                    Math.round((result.savingsMonthly / 1200) * 100),
                  )
                : 0}
              %
            </strong>{" "}
            de un alquiler Bluevera Standard típico (1.200 €/mes).
          </p>
          <p className="text-base text-emerald-600 mt-4">
            Los resultados se guardan automáticamente. Puede continuar al
            cuestionario de perfilado para recibir propuestas personalizadas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
