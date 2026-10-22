'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function StoryScrollDemo() {
  return (
    <FlowArt aria-label="DevCore presentation">
      {/* 01 — ABOUT DEVCORE */}
      <FlowSection
        id="about"
        aria-label="About DevCore"
        style={{ backgroundColor: '#fd5200', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — ABOUT DEVCORE</p>
        <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
        <div>
          <h1 className="text-[clamp(2.2rem,6.8vw,7.5rem)] font-bold leading-[0.92] uppercase tracking-tight">
            ENGINEERING
            <br />
            IDEAS INTO
            <br />
            REALITY
          </h1>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-black opacity-100" />
        <p className="mt-auto max-w-[58ch] text-[clamp(1rem,1.8vw,1.5rem)] font-normal leading-relaxed">
          DevCore is a software development company focused on building meaningful digital products. We bring together software engineering, modern interface design, and interactive technologies to create experiences that look exceptional and work reliably.
        </p>
        <p className="max-w-[58ch] text-[clamp(0.95rem,1.4vw,1.25rem)] opacity-90 leading-relaxed">
          From responsive websites to full-stack applications and immersive 3D experiences, our approach combines technical precision with practical business thinking.
        </p>
      </FlowSection>

      {/* 02 — SERVICES */}
      <FlowSection
        id="services"
        aria-label="DevCore Services"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — SERVICES</p>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <div>
          <h2 className="text-[clamp(2.2rem,6.8vw,7.5rem)] font-bold leading-[0.92] uppercase tracking-tight">
            SOLUTIONS
            <br />
            THAT
            <br />
            SCALE
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-6 text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              01 — Web Development
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              Responsive, accessible, and high-performance websites designed to deliver a polished experience across devices.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              02 — Full-Stack Development
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              End-to-end web applications built with reliable frontend architecture, secure backend systems, and maintainable code.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              03 — UI/UX Engineering
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              Thoughtful digital interfaces that combine intuitive user journeys, visual clarity, and practical functionality.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              04 — Immersive 3D Experiences
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              Interactive 3D websites, motion-driven storytelling, and immersive digital experiences for modern brands.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              05 — API & System Integration
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              Reliable integrations that connect applications, services, and business workflows.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#bef264] mb-1">
              06 — AI-Powered Solutions
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              Practical AI integrations and intelligent workflows designed around real business requirements.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 03 — WORKING PROCESS */}
      <FlowSection
        id="process"
        aria-label="Working Process"
        style={{ backgroundColor: '#F5F0E8', color: '#000' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — WORKING PROCESS</p>
        <hr className="my-[1.5vw] border-none border-t border-black/60" />
        <div>
          <h2 className="text-[clamp(2.2rem,6.8vw,7.5rem)] font-bold leading-[0.92] uppercase tracking-tight">
            DISCOVER.
            <br />
            DESIGN.
            <br />
            ENGINEER.
            <br />
            DELIVER.
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-black/60" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              01 — Discover
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              We understand the business requirements, target users, and goals behind every project.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              02 — Design
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              We plan the experience, structure the interface, and define the technical approach.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              03 — Engineer
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              We build, integrate, and test the solution with attention to performance and maintainability.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              04 — Deliver
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              We validate the result and prepare the product for deployment and future improvement.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 04 — PHILOSOPHY */}
      <FlowSection
        aria-label="Company Philosophy"
        style={{ backgroundColor: '#1A3DE8', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — PHILOSOPHY</p>
        <hr className="my-[1.5vw] border-none border-t border-white/50" />
        <div>
          <h2 className="text-[clamp(2.2rem,6.8vw,7.5rem)] font-bold leading-[0.92] uppercase tracking-tight">
            BUILDING
            <br />
            THINGS THAT
            <br />
            MATTER.
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/50" />
        <p className="max-w-[50ch] text-[clamp(1rem,1.8vw,1.5rem)] font-normal leading-relaxed">
          We believe great software should do more than look impressive. It should solve real problems, simplify workflows, and help businesses move forward.
        </p>
      </FlowSection>

      {/* 05 — LET'S TALK */}
      <FlowSection
        aria-label="Contact DevCore"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">05 — LET&apos;S TALK</p>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <div>
          <h2 className="text-[clamp(2.2rem,6.8vw,7.5rem)] font-bold leading-[0.92] uppercase tracking-tight">
            HAVE AN
            <br />
            IDEA?
            <br />
            LET&apos;S BUILD.
          </h2>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/60" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,1.8vw,1.5rem)] font-normal leading-relaxed mb-6">
          Have a product idea, a business challenge, or a digital experience in mind? Get in touch with DevCore and let&apos;s discuss how we can bring it to life.
        </p>
        <a
          href="mailto:devcore@devcore.com"
          className="inline-flex items-center gap-2 text-lg font-medium text-[#bef264] hover:underline"
        >
          devcore@devcore.com &rarr;
        </a>
      </FlowSection>
    </FlowArt>
  );
}
