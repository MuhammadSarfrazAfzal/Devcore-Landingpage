"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";

const BOOT_LOGS = [
  "INITIALIZING DEVCORE ARCHITECTURE",
  "COMPILING HIGH-PRECISION SHADERS",
  "CALIBRATING 3D DIGITAL VIEWPORTS",
  "SYNCHRONIZING CINEMATIC ENGINE",
  "ALL SYSTEMS OPERATIONAL // ONLINE",
];

export default function DevCoreLoader() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const hasStartedRef = useRef(false);

  const triggerOpen = useCallback(() => {
    setIsRevealing(true);
    document.body.style.overflow = "";
    getLenis()?.start();
    setTimeout(() => {
      setIsExited(true);
    }, 1100);
  }, []);

  const handleSkip = useCallback(() => {
    setProgress(100);
    setLogIndex(BOOT_LOGS.length - 1);
    setIsComplete(true);
    triggerOpen();
  }, [triggerOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock scrolling during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();

    // Listen for ESC or Space key to skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Smooth progressive counter
    let current = 0;
    const interval = setInterval(() => {
      let increment = 1;
      if (current < 30) {
        increment = Math.floor(Math.random() * 4) + 2; // +2..5
      } else if (current < 70) {
        increment = Math.floor(Math.random() * 3) + 2; // +2..4
      } else if (current < 90) {
        increment = Math.floor(Math.random() * 2) + 1; // +1..2
      } else {
        increment = 1;
      }

      current = Math.min(100, current + increment);
      setProgress(current);

      // Cycle boot log status
      if (current < 25) setLogIndex(0);
      else if (current < 55) setLogIndex(1);
      else if (current < 80) setLogIndex(2);
      else if (current < 99) setLogIndex(3);
      else setLogIndex(4);

      if (current >= 100) {
        clearInterval(interval);
        setIsComplete(true);

        // Pause 700ms on "ALL SYSTEMS OPERATIONAL" before initiating warp portal reveal
        setTimeout(() => {
          triggerOpen();
        }, 700);
      }
    }, 24);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow || "";
      lenis?.start();
    };
  }, [handleSkip, triggerOpen]);

  if (isExited) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-black"
      style={{ isolation: "isolate" }}
      onClick={handleSkip}
    >
      {/* ===== TOP SPLIT SHUTTER PANEL ===== */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#040407] border-b border-violet-500/20 overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? "-100%" : 0 }}
        transition={{
          duration: 1.05,
          ease: [0.85, 0, 0.15, 1],
        }}
      >
        {/* Subtle Ambient Nebula Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Top Header Bar */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 py-6 z-20">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              DEVCORE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="hidden sm:inline-block text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
              Digital Engineering Lab
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              [ESC TO SKIP]
            </span>
          </div>
        </div>
      </motion.div>

      {/* ===== BOTTOM SPLIT SHUTTER PANEL ===== */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#040407] border-t border-cyan-500/20 overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? "100%" : 0 }}
        transition={{
          duration: 1.05,
          ease: [0.85, 0, 0.15, 1],
        }}
      >
        {/* Subtle Ambient Bottom Cyan Glow */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Bottom Footer Info */}
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 py-6 z-20 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          <span>PORTAL // READY</span>
          <span className="hidden sm:inline">HIGH-PERFORMANCE RUNTIME</span>
          <span>DEVCORE © 2024</span>
        </div>
      </motion.div>

      {/* ===== CENTRAL FLOATING HUD & PROGRESS CONSOLE ===== */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6"
        animate={{
          opacity: isRevealing ? 0 : 1,
          scale: isRevealing ? 1.08 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Rotating Futuristic HUD Reticle */}
        <div className="relative w-36 sm:w-44 h-36 sm:h-44 flex items-center justify-center mb-8">
          {/* Outer dashed spinning ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-violet-500/40 animate-spin"
            style={{ animationDuration: "18s" }}
          />

          {/* Inner counter-spinning tick ring */}
          <div
            className="absolute inset-3 rounded-full border border-cyan-400/30 animate-spin"
            style={{ animationDuration: "12s", animationDirection: "reverse" }}
          />

          {/* Core glow orb */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-violet-600/20 to-cyan-400/20 blur-md" />

          {/* Center DevCore Geometric Monogram */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <svg
              className="w-12 sm:w-14 h-12 sm:h-14 text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,8 88,30 88,70 50,92 12,70 12,30"
                stroke="url(#loaderGrad)"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              <polygon
                points="50,22 76,50 50,78 24,50"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="rgba(56, 189, 248, 0.15)"
              />
              <path
                d="M40 38 L40 62 M40 38 C48 38 52 42 52 50 C52 58 48 62 40 62"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Corner Tech Brackets */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-violet-400/70" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-violet-400/70" />
        </div>

        {/* Counter Digits */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="font-mono text-sm sm:text-base text-cyan-400 font-bold">
            %
          </span>
        </div>

        {/* Laser Energy Progress Bar */}
        <div className="w-56 sm:w-72 h-1.5 bg-white/10 rounded-full overflow-hidden relative mb-4 p-[1px] border border-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing lead particle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
          </motion.div>
        </div>

        {/* Dynamic Telemetry Status Log */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neutral-400 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              <span>{BOOT_LOGS[logIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Center Laser Beam Seam during Reveal */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-y-1/2 z-40 pointer-events-none shadow-[0_0_20px_#38bdf8]"
            initial={{ opacity: 1, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 1.5 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
