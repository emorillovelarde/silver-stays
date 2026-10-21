"use client";

import dynamic from "next/dynamic";

const NLVSolvencyCalculator = dynamic(
  () =>
    import("./nlv-components").then((mod) => ({
      default: mod.NLVSolvencyCalculator,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="my-10 min-h-[300px] rounded-xl bg-primary/5 animate-pulse"
        aria-busy="true"
      />
    ),
  },
);

const SchengenClockAlert = dynamic(
  () =>
    import("./nlv-components").then((mod) => ({
      default: mod.SchengenClockAlert,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="my-10 h-32 rounded-xl bg-amber-50 animate-pulse"
        aria-busy="true"
      />
    ),
  },
);

export function NLVSolvencyCalculatorClient() {
  return <NLVSolvencyCalculator />;
}

export function SchengenClockAlertClient() {
  return <SchengenClockAlert />;
}
