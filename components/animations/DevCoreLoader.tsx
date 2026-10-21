"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";

export default function DevCoreLoader() {
  const [progress, setProgress] = useState(0);
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
    }, 1150);
  }, []);

  const handleSkip = useCallback(() => {
    setProgress(100);
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

    // Listen for ESC key to skip
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
      if (current < 35) {
        increment = Math.floor(Math.random() * 4) + 2; // +2..5
      } else if (current < 75) {
        increment = Math.floor(Math.random() * 3) + 1; // +1..3
      } else if (current < 92) {
        increment = Math.floor(Math.random() * 2) + 1; // +1..2
      } else {
        increment = 1;
      }

      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsComplete(true);

        // Pause 800ms on "WELCOME TO DEVCORE" before triggering the cinematic split reveal
        setTimeout(() => {
          triggerOpen();
        }, 800);
      }
    }, 28);

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
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* ===== TOP SPLIT VAULT PANEL ===== */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#e7e6e9] overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? "-100%" : 0 }}
        transition={{
          duration: 1.1,
          ease: [0.85, 0, 0.15, 1],
        }}
      >
        {/* Top Header Row */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-14 py-7 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#111113]">
              DEVCORE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-[0.25em] text-[#6b6a70] uppercase">
              Digital Engineering
            </span>
          </div>

          {/* Equalizer Wave with Purple Dot (Exact match from user reference) */}
          <div className="flex items-center">
            <div className="flex items-end gap-1.5 h-7 px-1">
              {/* Bar 1 with glowing purple dot */}
              <div className="flex flex-col items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.9)] animate-pulse" />
                <span className="w-1 h-3.5 bg-[#18181b] rounded-full" />
              </div>
              {/* Bar 2 */}
              <motion.span
                className="w-1 bg-[#18181b] rounded-full"
                animate={{ height: ["10px", "22px", "8px", "18px"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Bar 3 */}
              <motion.span
                className="w-1 bg-[#18181b] rounded-full"
                animate={{ height: ["18px", "10px", "24px", "12px"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Bar 4 */}
              <motion.span
                className="w-1 bg-[#18181b] rounded-full"
                animate={{ height: ["12px", "24px", "14px", "20px"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Top-Half Seamless Marquee - Exactly centered at the bottom edge */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 pointer-events-none select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-[clamp(4.2rem,12vw,12.5rem)] font-black uppercase tracking-tight text-[#0d0d10] leading-none inline-block">
              DEVELOPER • FRONTEND • FULL-STACK • REACT • NEXT.JS • THREE.JS • DEVCORE • DIGITAL EXPERIENCES •&nbsp;
            </span>
            <span className="text-[clamp(4.2rem,12vw,12.5rem)] font-black uppercase tracking-tight text-[#0d0d10] leading-none inline-block">
              DEVELOPER • FRONTEND • FULL-STACK • REACT • NEXT.JS • THREE.JS • DEVCORE • DIGITAL EXPERIENCES •&nbsp;
            </span>
          </div>
        </div>
      </motion.div>

      {/* ===== BOTTOM SPLIT VAULT PANEL ===== */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#e7e6e9] overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? "100%" : 0 }}
        transition={{
          duration: 1.1,
          ease: [0.85, 0, 0.15, 1],
        }}
      >
        {/* Bottom-Half Seamless Marquee - Exactly centered at the top edge */}
        <div className="absolute top-0 left-0 w-full -translate-y-1/2 pointer-events-none select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-[clamp(4.2rem,12vw,12.5rem)] font-black uppercase tracking-tight text-[#0d0d10] leading-none inline-block">
              DEVELOPER • FRONTEND • FULL-STACK • REACT • NEXT.JS • THREE.JS • DEVCORE • DIGITAL EXPERIENCES •&nbsp;
            </span>
            <span className="text-[clamp(4.2rem,12vw,12.5rem)] font-black uppercase tracking-tight text-[#0d0d10] leading-none inline-block">
              DEVELOPER • FRONTEND • FULL-STACK • REACT • NEXT.JS • THREE.JS • DEVCORE • DIGITAL EXPERIENCES •&nbsp;
            </span>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-8 md:px-14 py-7 z-20">
          <span className="text-xs font-mono tracking-widest text-[#6b6a70] uppercase">
            [SYS.INIT] 2026.PROD
          </span>
          <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-[#6b6a70] uppercase">
            WE BUILD DIGITAL EXPERIENCES BEYOND ORDINARY
          </span>
        </div>
      </motion.div>

      {/* ===== CENTER GLOWING PILL CAPSULE (EXACT MATCH FROM USER IMAGE) ===== */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
        onClick={handleSkip}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isRevealing ? 1.25 : 1,
          opacity: isRevealing ? 0 : 1,
        }}
        transition={{
          duration: isRevealing ? 0.7 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          className="relative flex items-center justify-between px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0a0a0f] text-white overflow-hidden shadow-2xl transition-all duration-300 max-w-[92vw]"
          style={{
            minWidth: isComplete ? "min(340px, 90vw)" : "min(280px, 84vw)",
            height: "58px",
            border: "1.5px solid rgba(139, 92, 246, 0.5)",
            boxShadow:
              "0 0 45px -5px rgba(139, 92, 246, 0.65), 0 15px 45px rgba(0, 0, 0, 0.85), inset 0 0 16px rgba(139, 92, 246, 0.2)",
          }}
        >
          {/* Animated gradient rim highlight */}
          <div
            aria-hidden="true"
            className="absolute -inset-[1.5px] rounded-full pointer-events-none opacity-70"
            style={{
              background:
                "linear-gradient(90deg, rgba(168,85,247,0.9), rgba(99,102,241,0.3), rgba(168,85,247,0.9))",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s linear infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1.5px",
            }}
          />

          {/* Left Text */}
          <div className="flex items-center gap-2.5 z-10">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  isComplete ? "bg-[#bef264]" : "bg-[#a855f7]"
                } opacity-75 animate-ping`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isComplete ? "bg-[#bef264]" : "bg-[#a855f7]"
                }`}
              />
            </span>
            <span className="text-[12px] font-bold tracking-[0.24em] uppercase text-white">
              {isComplete ? "WELCOME TO" : "LOADING"}
            </span>
          </div>

          {/* Right Counter & Progress Fill Box */}
          <div className="flex items-center gap-3 z-10 pl-4">
            <span className="font-mono text-[14px] font-semibold tracking-tight text-white tabular-nums">
              {isComplete ? "DEVCORE" : `${progress}%`}
            </span>

            {/* Small Glowing Progress Box (seen in user reference) */}
            <div className="relative w-4 h-4 rounded-[3px] bg-[#1a1a24] border border-white/20 overflow-hidden flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-white"
                style={{
                  scaleY: progress / 100,
                  transformOrigin: "bottom",
                }}
                transition={{ ease: "linear", duration: 0.08 }}
              />
              {isComplete && (
                <svg
                  className="w-3 h-3 text-black z-10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 8 7 12 13 4" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shimmer animation & Marquee CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
