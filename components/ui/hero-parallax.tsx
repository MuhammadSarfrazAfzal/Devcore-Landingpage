"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
    objectPosition?: string;
  }[];
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const thirdRow = products.slice(8, 12);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end start"],
  });

  const springConfig = isMobile
    ? { stiffness: 65, damping: 20 }
    : { stiffness: 120, damping: 24 };

  const travelDist = isMobile ? 480 : 1100;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, travelDist]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -travelDist]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [isMobile ? 4 : 14, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [isMobile ? 0.85 : 0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [isMobile ? 3 : 12, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.85], [isMobile ? 0 : -450, isMobile ? 120 : 300]),
    springConfig
  );

  const row1 = isMobile ? firstRow : [...firstRow, ...firstRow];
  const row2 = isMobile ? secondRow : [...secondRow, ...secondRow];
  const row3 = isMobile ? thirdRow : [...thirdRow, ...thirdRow];

  return (
    <div
      ref={ref}
      className="h-[140vh] md:h-[260vh] pt-12 md:pt-32 pb-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className="flex flex-row-reverse"
          style={{ gap: isMobile ? "24px" : "72px", marginBottom: isMobile ? "32px" : "88px" }}
        >
          {row1.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`first-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row"
          style={{ gap: isMobile ? "24px" : "72px", marginBottom: isMobile ? "32px" : "88px" }}
        >
          {row2.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`second-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row-reverse"
          style={{ gap: isMobile ? "24px" : "72px" }}
        >
          {row3.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`third-${i}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto pt-16 md:pt-[25vh] px-6 md:pl-[15vh] pb-6 md:pb-8 w-full left-0 top-0 mb-5"
    >
      {/* Eyebrow / kicker */}
      <div
        className="flex items-center text-[11px] uppercase text-neutral-400 dark:text-neutral-500"
        style={{ gap: "14px", marginBottom: "28px", letterSpacing: "0.32em" }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "48px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(167,139,250,0.9))",
          }}
        />
        <span className="font-medium">Chapter 01 — Selected Work</span>
      </div>

      {/* Title */}
      <h1
        className="font-bold dark:text-white"
        style={{
          fontSize: "clamp(2.25rem, 6.4vw, 5.75rem)",
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          marginBottom: "36px",
        }}
      >
        Selected Work &amp;
        <br />
        <span
          style={{
            backgroundImage:
              "linear-gradient(92deg, #ffffff 0%, #c4b5fd 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          Digital Solutions.
        </span>
      </h1>

      {/* Hairline divider */}
      <div
        aria-hidden
        style={{
          width: "84px",
          height: "1px",
          marginBottom: "32px",
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.55), rgba(167,139,250,0))",
        }}
      />

      {/* Body copy */}
      <p
        style={{
          maxWidth: "64ch",
          fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
          lineHeight: 1.8,
          letterSpacing: "0.005em",
          color: "#ffffff",
          opacity: 1,
          fontWeight: 400,
        }}
      >
        A selection of digital experiences, engineering experiments, and solutions that demonstrate our approach to design and development.
      </p>

      {/* Meta row */}
      <div
        className="flex items-center text-[11px] uppercase text-neutral-500"
        style={{ gap: "18px", marginTop: "40px", letterSpacing: "0.28em" }}
      >
        <span>DevCore Portfolio</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#a78bfa" }} />
        <span>Web Engineering · 3D Experiences · Systems</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#a78bfa" }} />
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export const ProductCard = React.memo(({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    objectPosition?: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        willChange: "transform",
        transform: "translateZ(0)",
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-64 sm:h-80 w-[17rem] sm:w-[22rem] relative flex-shrink-0 overflow-hidden rounded-[20px] sm:rounded-[24px]"
    >
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl rounded-[28px] overflow-hidden"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover absolute h-full w-full inset-0 rounded-[28px]"
          style={{ objectPosition: product.objectPosition ?? "center" }}
          alt={product.title}
        />
      </Link>
      {/* Subtle inner sheen — adds a quiet premium gloss without changing animation */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-[28px]"></div>
      <h2
        className="absolute opacity-0 group-hover/product:opacity-100 text-white"
        style={{
          left: "20px",
          bottom: "18px",
          fontSize: "15px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}
      >
        {product.title}
      </h2>
    </motion.div>
  );
});
