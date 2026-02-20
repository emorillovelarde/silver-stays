import { create } from "zustand";

export interface EnergyArbitrageResult {
  cityId: string;
  homeSizeM2: number;
  energyType: "gas" | "electricity";
  costOriginMonthly: number;
  costSpainMonthly: number;
  savingsMonthly: number;
  calculatedAt: string;
}

interface EnergyArbitrageStore {
  result: EnergyArbitrageResult | null;
  setResult: (result: Omit<EnergyArbitrageResult, "calculatedAt">) => void;
  clearResult: () => void;
}

export const useEnergyArbitrageStore = create<EnergyArbitrageStore>((set) => ({
  result: null,
  setResult: (result) =>
    set({
      result: {
        ...result,
        calculatedAt: new Date().toISOString(),
      },
    }),
  clearResult: () => set({ result: null }),
}));
