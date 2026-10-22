"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ContainerScrollContext } from "@/components/ui/container-scroll-animation";

type Props = {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
};

export const FrameToFullscreen: React.FC<Props> = ({ titleComponent, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    if (!sectionRef.current || !frameRef.current || !innerRef.current) return;

    let ctx: gsap.Context;
    let resizeListener: () => void;

    const setupTimeline = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const isMobile = vw < 768;

        // Card visual target dimensions (balanced for both mobile and desktop)
        const targetW = isMobile ? vw * 0.92 : Math.min(vw * 0.84, 1340);
        const targetH = isMobile ? Math.min(vh * 0.54, 460) : Math.min(vh * 0.58, 700);

        // Required scale ratios to map 100vw/100vh down to card size
        const startScaleX = targetW / vw;
        const startScaleY = targetH / vh;

        // Vertical offset so the card sits comfortably near the bottom
        const padBottom = vh * (isMobile ? 0.03 : 0.06);

        // Pre-configure initial card transforms (scaled down and tilted)
        gsap.set(frameRef.current, {
          transformPerspective: 1600,
          transformOrigin: "50% 100%",
          rotateX: isMobile ? 8 : 18,
          scaleX: startScaleX,
          scaleY: startScaleY,
          y: (isMobile ? 14 : 45) - padBottom,
          borderRadius: isMobile ? 14 : 22,
          opacity: 1,
        });

        gsap.set(innerRef.current, {
          borderRadius: isMobile ? 10 : 16,
        });

        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: 0,
            opacity: 1,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "+=120%" : "+=150%",
            scrub: 0.35, // Snappy, buttery smooth tracking without sluggish lag
            pin: stageRef.current,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // =========================================================
        // Phase 1 (0.00 → 0.40): Fast, silky expansion
        // =========================================================

        // Title floats up gently and fades out cleanly
        if (titleRef.current) {
          tl.to(
            titleRef.current,
            {
              y: -35,
              opacity: 0,
              duration: 0.22,
              ease: "power2.out",
            },
            0
          );
        }

        // Frame smoothly unfolds and expands into fullscreen (GPU-accelerated)
        tl.to(
          frameRef.current,
          {
            rotateX: 0,
            scaleX: 1,
            scaleY: 1,
            y: 0,
            borderRadius: 0,
            duration: 0.40,
            ease: "power1.inOut",
          },
          0
        );

        tl.to(
          innerRef.current,
          {
            borderRadius: 0,
            duration: 0.40,
            ease: "power1.inOut",
          },
          0
        );

        // =========================================================
        // Phase 2 (0.40 → 0.65): Fullscreen viewing hold
        // =========================================================
        tl.to({}, { duration: 0.25 }, 0.40);

        // =========================================================
        // Phase 3 (0.65 → 1.00): Silky fadeout to next section
        // =========================================================
        tl.to(
          frameRef.current,
          {
            opacity: 0,
            scaleX: isMobile ? 0.96 : 0.94,
            scaleY: isMobile ? 0.96 : 0.94,
            y: isMobile ? -12 : -20,
            duration: 0.35,
            ease: "power1.inOut",
          },
          0.65
        );
      }, sectionRef);
    };

    setupTimeline();

    // Recreate the timeline dynamically on resize to keep scales mathematically perfect
    let resizeTimeout: NodeJS.Timeout;
    resizeListener = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupTimeline();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <ContainerScrollContext.Provider value={scrollYProgress}>
      <section
        ref={sectionRef}
        className="relative w-full h-[220vh] md:h-[250vh] bg-black"
      >
        <div
          ref={stageRef}
          className="relative w-full h-screen overflow-hidden flex items-end justify-center bg-black"
          style={{
            perspective: "1600px",
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {titleComponent && (
            <div
              ref={titleRef}
              className="absolute top-[5vh] md:top-[8vh] left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-4 text-center pointer-events-none"
            >
              {titleComponent}
            </div>
          )}

          <div
            ref={frameRef}
            className="absolute left-0 bottom-0 bg-[#1e1e1e] shadow-2xl"
            style={{
              width: "100vw",
              height: "100vh",
              boxShadow:
                "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              ref={innerRef}
              className="relative w-full h-full overflow-hidden bg-zinc-900"
              style={{
                willChange: "transform, borderRadius",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </ContainerScrollContext.Provider>
  );
};

export default FrameToFullscreen;
