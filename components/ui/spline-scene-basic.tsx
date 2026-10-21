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

  useEffect(() => {
    // 1. Warm up the 3D runtime eagerly in the background on first scroll or touch
    const startWarmUp = () => {
      setLoadScene(true);
      cleanupListeners();
    };

    const cleanupListeners = () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", startWarmUp);
        window.removeEventListener("pointerdown", startWarmUp);
        window.removeEventListener("touchstart", startWarmUp);
      }
    };

    if (typeof window !== "undefined") {
      if (window.scrollY > 10) {
        requestAnimationFrame(() => setLoadScene(true));
      } else {
        window.addEventListener("scroll", startWarmUp, { passive: true });
        window.addEventListener("pointerdown", startWarmUp, { passive: true });
        window.addEventListener("touchstart", startWarmUp, { passive: true });
      }
    }

    // 2. IntersectionObserver for Spotlight + active scene rendering
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsSceneInView(entry.isIntersecting);
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setSpotlightArmed(true);
            setLoadScene(true);
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5], rootMargin: "150px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanupListeners();
    };
  }, []);

  return (
    <Card ref={cardRef} className="w-full h-full rounded-none border-0 bg-black/[0.96] relative overflow-hidden">
      {spotlightArmed && isSceneInView && (
        <Spotlight
          key="spotlight-armed"
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="flex h-full">
        <div className="flex-1 py-16 relative z-10 flex flex-col justify-center items-end pr-12 pointer-events-none">
          <div className="max-w-xl w-full">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#bef264] mb-4 block">
              DEVCORE / DIGITAL ENGINEERING
            </span>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              We Build Digital Experiences Beyond Ordinary.
            </h1>
            <p className="mt-5 text-base md:text-lg text-neutral-300 leading-relaxed">
              DevCore engineers high-performance web applications and immersive digital experiences for ambitious businesses. We combine thoughtful design, reliable engineering, and modern technology to turn ideas into impactful digital products.
            </p>
            <p className="mt-4 text-xs md:text-sm text-neutral-400 font-mono tracking-wide">
              Building things that matter. Scroll down. Discover DevCore.
            </p>
            <div className="mt-8 flex items-center gap-4 pointer-events-auto">
              <a
                href="#projects"
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs md:text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Explore Our Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full border border-neutral-700 text-white font-semibold text-xs md:text-sm hover:border-white transition-colors cursor-pointer"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex-1 relative pointer-events-auto"
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
      </div>
    </Card>
  );
}

export default SplineSceneBasic;
