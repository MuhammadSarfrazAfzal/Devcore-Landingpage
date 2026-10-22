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
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", onBeforeUnload);
    }

    const lenis = new Lenis({
      lerp: isTouch ? 0.12 : 0.08,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
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
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", onBeforeUnload);
      }
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
