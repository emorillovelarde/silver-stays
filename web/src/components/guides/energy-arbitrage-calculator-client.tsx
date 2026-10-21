"use client";

import dynamic from "next/dynamic";

const EnergyArbitrageCalculator = dynamic(
  () =>
    import("./energy-arbitrage-calculator").then((mod) => ({
      default: mod.EnergyArbitrageCalculator,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="my-10 min-h-[400px] rounded-xl border-2 border-primary/10 bg-white p-8 shadow-lg animate-pulse"
        aria-busy="true"
        aria-label="Cargando calculadora de arbitraje energético"
      >
        <div className="h-8 w-48 bg-primary/20 rounded mb-6" />
        <div className="h-4 w-full bg-primary/10 rounded mb-4" />
        <div className="h-4 w-3/4 bg-primary/10 rounded mb-4" />
        <div className="h-12 w-full bg-primary/10 rounded mt-8" />
      </div>
    ),
  },
);

export function EnergyArbitrageCalculatorClient() {
  return <EnergyArbitrageCalculator />;
}
