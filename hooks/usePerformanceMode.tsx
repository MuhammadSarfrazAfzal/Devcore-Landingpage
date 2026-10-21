"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type QualityMode = "high" | "performance" | "low";

interface PerformanceContextValue {
  mode: QualityMode;
  setMode: (mode: QualityMode) => void;
  isPerformance: boolean;
  isLow: boolean;
  dprCap: number;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  mode: "performance",
  setMode: () => {},
  isPerformance: true,
  isLow: false,
  dprCap: 1.0,
});

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<QualityMode>("performance");

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem("portfolio_quality_mode") as QualityMode | null;
    if (saved && (saved === "high" || saved === "performance" || saved === "low")) {
      setModeState(saved);
      return;
    }

    // Auto-detect based on hardware heuristics
    // Target user system: 8 GB RAM, Intel UHD integrated GPU
    const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isConstrainedMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 8;

    if (prefersReducedMotion) {
      setModeState("low");
    } else if (isConstrainedMemory) {
      setModeState("performance");
    } else {
      // Default to performance for smooth 60fps on integrated graphics
      setModeState("performance");
    }
  }, []);

  const setMode = (newMode: QualityMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("portfolio_quality_mode", newMode);
    } catch {
      // ignore
    }
  };

  const isPerformance = mode === "performance" || mode === "low";
  const isLow = mode === "low";
  const dprCap = mode === "high" ? 1.5 : mode === "performance" ? 1.0 : 0.75;

  return (
    <PerformanceContext.Provider
      value={{
        mode,
        setMode,
        isPerformance,
        isLow,
        dprCap,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceMode() {
  return useContext(PerformanceContext);
}
