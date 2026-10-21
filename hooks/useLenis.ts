"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
    });

    lenisInstance = lenis;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      ScrollTrigger.update();
      if (typeof document !== "undefined") {
        if (!document.body.classList.contains("is-scrolling")) {
          document.body.classList.add("is-scrolling");
        }
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          document.body.classList.remove("is-scrolling");
        }, 120);
      }
    };

    lenis.on("scroll", handleScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    // Use sensible lagSmoothing so minor stalls do not cause sudden jarring skips
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (typeof document !== "undefined") {
        document.body.classList.remove("is-scrolling");
      }
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
