'use client';

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightArmed, setSpotlightArmed] = useState(false);
  const [loadScene, setLoadScene] = useState(false);
  const [isSceneInView, setIsSceneInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Desktop: Warm up the 3D runtime eagerly in the background on scroll/pointer
    const startWarmUp = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setLoadScene(true);
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", startWarmUp);
        window.removeEventListener("pointerdown", startWarmUp);
      }
    };

    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      if (window.scrollY > 10) {
        requestAnimationFrame(() => setLoadScene(true));
      } else {
        window.addEventListener("scroll", startWarmUp, { passive: true });
        window.addEventListener("pointerdown", startWarmUp, { passive: true });
      }
    }

    // IntersectionObserver for Spotlight + active scene rendering
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsSceneInView(entry.isIntersecting);
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setSpotlightArmed(true);
            if (typeof window !== "undefined" && window.innerWidth >= 768) {
              setLoadScene(true);
            }
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5], rootMargin: "150px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanupListeners();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Card ref={cardRef} className="w-full h-full rounded-none border-0 bg-black/[0.96] relative overflow-hidden flex flex-col justify-center">
      {spotlightArmed && isSceneInView && (
        <Spotlight
          key="spotlight-armed"
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="flex flex-col md:flex-row h-full w-full items-center justify-center">
        {/* Editorial Text Column */}
        <div className="w-full md:flex-1 py-8 md:py-16 px-6 sm:px-10 md:pr-12 md:pl-8 relative z-10 flex flex-col justify-center items-center md:items-end">
          <div className="max-w-xl w-full text-left">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#bef264] mb-3 sm:mb-4 block">
              DEVCORE / DIGITAL ENGINEERING
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              We Build Digital Experiences Beyond Ordinary.
            </h1>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
              DevCore engineers high-performance web applications and immersive digital experiences for ambitious businesses. We combine thoughtful design, reliable engineering, and modern technology to turn ideas into impactful digital products.
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-400 font-mono tracking-wide">
              Building things that matter. Scroll down. Discover DevCore.
            </p>
          </div>
        </div>

        {/* Visual / 3D Canvas Column */}
        {isMobile ? (
          /* Mobile High-Performance Holographic Core (0% GPU/RAM overhead, 120fps smooth) */
          <div className="w-full flex-1 min-h-[180px] sm:min-h-[220px] relative flex items-center justify-center overflow-hidden pointer-events-none pb-8">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Pulsing neon radial backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8b5cf6]/35 via-[#3b82f6]/25 to-[#bef264]/20 blur-2xl animate-pulse" />
              {/* Outer glowing orbital ring */}
              <div
                className="absolute inset-2 rounded-full border border-[#8b5cf6]/40"
                style={{
                  animation: "spin 16s linear infinite",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              />
              {/* Middle dashed orbital ring */}
              <div
                className="absolute inset-6 rounded-full border border-dashed border-[#bef264]/40"
                style={{
                  animation: "spin 11s linear infinite reverse",
                }}
              />
              {/* Inner glowing core */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white via-[#8b5cf6] to-[#0a0a0f] shadow-[0_0_35px_rgba(139,92,246,0.85)] flex items-center justify-center border border-white/40">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-black">DC</span>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Interactive 3D Spline Scene */
          <div
            className="flex-1 relative pointer-events-auto h-full w-full"
            style={{
              visibility: isSceneInView ? "visible" : "hidden",
              pointerEvents: isSceneInView ? "auto" : "none",
            }}
          >
            {loadScene && (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Card>
  );
}

export default SplineSceneBasic;
