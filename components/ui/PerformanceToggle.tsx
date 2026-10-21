"use client";

import React, { useState } from "react";
import { usePerformanceMode, QualityMode } from "@/hooks/usePerformanceMode";
import { Zap, Gauge, Leaf, Sparkles } from "lucide-react";

export function PerformanceToggle() {
  const { mode, setMode } = usePerformanceMode();
  const [isOpen, setIsOpen] = useState(false);

  const options: { id: QualityMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "performance",
      label: "Performance",
      icon: <Zap className="w-3.5 h-3.5 text-[#c8a882]" />,
      desc: "Smooth 60 FPS, optimized for 8GB & iGPU (Recommended)",
    },
    {
      id: "high",
      label: "High Quality",
      icon: <Sparkles className="w-3.5 h-3.5 text-neutral-300" />,
      desc: "Max resolution, full shader detail",
    },
    {
      id: "low",
      label: "Low Power",
      icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />,
      desc: "Battery saver, minimal background effects",
    },
  ];

  const currentOption = options.find((o) => o.id === mode) || options[0];

  return (
    <div className="fixed bottom-4 right-4 z-[9990] font-sans text-xs">
      {isOpen ? (
        <div className="bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1 w-64 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-1.5 px-2 border-b border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-[#c8a882] font-semibold">
              Quality Mode
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors text-xs px-1"
              aria-label="Close quality selector"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setMode(opt.id);
                  setIsOpen(false);
                }}
                className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                  mode === opt.id
                    ? "bg-white/10 text-white border border-[#c8a882]/40"
                    : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200 border border-transparent"
                }`}
              >
                <div className="mt-0.5">{opt.icon}</div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs flex items-center gap-1.5">
                    {opt.label}
                    {opt.id === "performance" && (
                      <span className="text-[9px] bg-[#c8a882]/20 text-[#c8a882] px-1.5 py-0.2 rounded-full font-mono">
                        Auto
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-neutral-500 leading-tight mt-0.5">
                    {opt.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f0f0f]/90 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white hover:border-[#c8a882]/60 hover:bg-[#1a1a1a] transition-all shadow-lg group"
          title="Adjust performance & visual quality"
        >
          <Gauge className="w-3.5 h-3.5 text-[#c8a882] group-hover:rotate-45 transition-transform" />
          <span className="text-[11px] font-medium tracking-wide">
            {currentOption.label}
          </span>
        </button>
      )}
    </div>
  );
}
