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
  <section
    id={id}
    data-flow-section
    aria-label={ariaLabel}
    className={cx(
      'relative w-full min-h-[175vh] sm:min-h-[190vh] md:min-h-[205vh] last:min-h-screen',
      className
    )}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex h-screen w-full flex-col justify-between overflow-hidden',
        'will-change-transform shadow-[0_-25px_60px_-10px_rgba(0,0,0,0.65)]',
      )}
      style={{
        transformOrigin: 'bottom left',
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
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
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
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        const nextSection = sections[i + 1];

        // 1. PINNING: Pin each section to stay stationary on screen during its dwell + transition
        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              end: () => `+=${section.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            }),
          );
        }

        // 2. ENTRY ANIMATION: Smooth stacked card entrance with gentle rotation and inertia damping
        if (i > 0) {
          if (isMobile) {
            // Mobile: smooth vertical slide with subtle scale & opacity ramp
            gsap.set(inner, {
              yPercent: 40,
              scale: 0.95,
              opacity: 0.75,
            });

            const tween = gsap.to(inner, {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          } else {
            // Desktop: elegant editorial rotation (14deg) + scale + smooth glide
            gsap.set(inner, {
              rotation: 14,
              scale: 0.94,
              yPercent: 30,
              transformOrigin: 'bottom left',
            });

            const tween = gsap.to(inner, {
              rotation: 0,
              scale: 1,
              yPercent: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          }
        }

        // 3. EXIT ANIMATION: When next section glides in over this one, subtly dim and scale this one back
        if (nextSection) {
          const exitTween = gsap.to(inner, {
            scale: 0.96,
            opacity: 0.45,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: nextSection,
              start: 'top bottom',
              end: 'top top',
              scrub: isMobile ? 0.8 : 1.2,
              invalidateOnRefresh: true,
            },
          });
          if (exitTween.scrollTrigger) triggers.push(exitTween.scrollTrigger);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
