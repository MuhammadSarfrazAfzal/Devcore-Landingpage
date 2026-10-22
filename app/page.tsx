import FrameToFullscreen from "@/components/animations/FrameToFullscreen";
import ScrollFloat from "@/components/animations/ScrollFloat";
import { ScrollRevealCurtain } from "@/components/animations/ScrollRevealCurtain";
import ScrollWarpPortal from "@/components/animations/ScrollWarpPortal";
import ScrollFoldTransition from "@/components/animations/ScrollFoldTransition";
import VSCodePortfolio from "@/components/ui/vscode-portfolio";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import StoryScrollDemo from "@/components/ui/story-scroll-demo";
import HeroParallaxDemo from "@/components/ui/hero-parallax-demo";
import ScrollMorphSection from "@/components/ui/scroll-morph-section";
import ScrollTiltedGridDemo from "@/components/ui/scroll-tilted-grid-demo";
import CardCarouselDemo from "@/components/ui/card-carousel-demo";
import LightRays from "@/components/ui/LightRays";
import ZoomParallaxDemo from "@/components/ui/zoom-parallax-demo";
import ProfileCard from "@/components/ui/ProfileCard";
import FooterDemo from "@/components/ui/footer-demo";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="relative">
      <FrameToFullscreen
        titleComponent={
          <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold text-white mt-[1vh] md:mt-[3vh] px-2 text-center">
            Crafting digital experiences with <br />
            <ScrollFloat
              stagger={0.6}
              textClassName="text-white font-bold tracking-tight inline-block"
              style={{
                fontSize: "clamp(2.2rem, 7.5vw, 9.5rem)",
                marginTop: "0.75rem"
              }}
              scrollRange={[0.0, 0.16]}
            >
              DEVCORE
            </ScrollFloat>
          </h1>
        }
      >
        <VSCodePortfolio />
      </FrameToFullscreen>

      <div id="showcase">
        <ScrollWarpPortal
          voidColor="#050505"
          accent="#c8a882"
          scrollDistance="+=140%"
          label={
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-70">
                Chapter 01
              </span>
              <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
                The
                <br />
                Showcase
              </span>
            </div>
          }
        />
      </div>

      <div id="projects" className="scroll-mt-0">
        <HeroParallaxDemo />
      </div>

      <ScrollMorphSection />

      <div id="gallery">
        <ScrollFoldTransition
          seamColor="#c8a882"
          voidColor="#050505"
          topColor="#0f0f0f"
          bottomColor="#1a1a1a"
          scrollDistance="+=150%"
          label={
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-70">
                Chapter 02
              </span>
              <span className="text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight flex flex-col items-center" style={{ whiteSpace: "nowrap" }}>
                <span>DESIGNED</span>
                <span>WITH&nbsp;INTENT</span>
              </span>
            </div>
          }
        />
      </div>

      <ScrollTiltedGridDemo />

      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Premium light-rays backdrop — masked + low-saturation gold to blend with the ink palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(200,168,130,0.06) 0%, rgba(200,168,130,0.02) 40%, transparent 75%), #060606",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 30%, transparent 85%)",
            opacity: 0.55,
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#c8a882"
            raysSpeed={0.5}
            lightSpread={1.2}
            rayLength={1.6}
            fadeDistance={1.4}
            saturation={0.45}
            followMouse
            mouseInfluence={0.06}
            noiseAmount={0.06}
            distortion={0.02}
          />
        </div>
        <div className="relative z-10 w-full">
          <CardCarouselDemo />
        </div>
      </section>

      <ZoomParallaxDemo />

      {/* Desktop Only: 3D Spline Scene & Curtain Transition (completely removed on mobile) */}
      <div className="hidden md:block">
        <ScrollRevealCurtain
          curtainColor="#fd5200"
          scrollDistance="+=120%"
          label={
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
                Chapter 03
              </span>
              <span className="block text-[clamp(2.5rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
                About
                <br />
                DevCore
              </span>
            </div>
          }
          beneath={
            <section className="relative w-full h-screen bg-[#080808] overflow-hidden">
              <SplineSceneBasic />
            </section>
          }
        />
      </div>

      <div id="about">
        <StoryScrollDemo />
      </div>

      <section id="contact" className="w-full relative flex flex-col items-center justify-center bg-black px-4 sm:px-6 py-12 sm:py-20 md:py-28 text-center overflow-hidden">
        {/* Subtle Ambient Cosmic Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[620px] h-[320px] sm:h-[620px] bg-gradient-to-tr from-violet-600/15 via-cyan-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 px-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a78bfa] mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            Initiate Transmission
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Have an Idea? <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-400 bg-clip-text text-transparent">Let&apos;s Build It.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Have a product idea, a business challenge, or a next-generation digital experience in mind? Connect directly with the DevCore engineering studio.
          </p>
        </div>

        <div className="w-full flex justify-center relative z-10">
          <ProfileCard
            name="DevCore"
            title="Digital Engineering Studio"
            handle="devcore"
            status="Available for Projects"
            contactText="Start a Conversation"
            iconUrl="/iconpattern.png"
            grainUrl="/grain.webp"
            showUserInfo
            enableTilt
            enableMobileTilt
            behindGlowEnabled
            innerGradient="linear-gradient(145deg, rgba(96, 73, 110, 0.6) 0%, rgba(56, 189, 248, 0.25) 100%)"
            contactHref="mailto:devcore@devcore.com"
          />
        </div>
      </section>

      <FooterDemo />
    </main>
  );
}
