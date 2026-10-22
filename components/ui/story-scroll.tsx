'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  id,
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <div
    id={id}
    data-flow-card
    aria-label={ariaLabel}
    className={cx(
      'absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden will-change-transform',
      'shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.7)]',
      className
    )}
    style={{
      paddingLeft: 'clamp(1.25rem, 6vw, 9rem)',
      paddingRight: 'clamp(1.25rem, 6vw, 9rem)',
      paddingTop: 'clamp(2rem, 5vh, 5.5rem)',
      paddingBottom: 'clamp(2rem, 5vh, 5.5rem)',
      rowGap: 'clamp(1rem, 2.5vh, 2.5rem)',
      ...style,
    }}
  >
    {children}
  </div>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !stageRef.current || reducedMotion) return;

      const cards = Array.from(
        stageRef.current.querySelectorAll<HTMLElement>('[data-flow-card]'),
      );
      if (cards.length === 0) return;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // 1. Initial State: Card 0 is full screen; subsequent cards are parked below viewport
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: (i + 1) * 10,
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          filter: 'brightness(1)',
          force3D: true,
        });
      });

      // 2. Single Unified GSAP Timeline for all stacked cards
      // Pinned stage with generous scroll distance: no overlap, no bleed-through, silky smooth
      const scrollDistance = isMobile
        ? `+=${cards.length * 85}%`
        : `+=${cards.length * 115}%`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: scrollDistance,
          pin: stageRef.current,
          pinSpacing: true,
          scrub: isMobile ? 0.6 : 0.9, // Luxurious inertia damping
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial reading dwell time for Card 0 (About DevCore)
      tl.to({}, { duration: 0.8 });

      // Sequentially slide each card up cleanly over the previous one
      for (let i = 1; i < cards.length; i++) {
        const prevCard = cards[i - 1];
        const currentCard = cards[i];

        // Slide incoming card cleanly from bottom (yPercent: 100 -> 0)
        tl.to(
          currentCard,
          {
            yPercent: 0,
            duration: 1.0,
            ease: 'power2.inOut',
            force3D: true,
          },
          `+=0`
        );

        // Previous card smoothly scales back and dims into background for cinematic depth
        tl.to(
          prevCard,
          {
            scale: 0.94,
            filter: 'brightness(0.6)',
            duration: 1.0,
            ease: 'power2.inOut',
            force3D: true,
          },
          `<`
        );

        // Reading dwell time: card stays stationary & 100% visible so user can read comfortably
        tl.to({}, { duration: i === cards.length - 1 ? 0.8 : 1.1 });
      }

      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('relative w-full min-h-screen overflow-hidden', className)}
    >
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {children}
      </div>
    </div>
  );
};

export default FlowArt;
