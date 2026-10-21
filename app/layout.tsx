import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { MouseFollower } from "@/components/animations/MouseFollower";
import DevCoreLoader from "@/components/animations/DevCoreLoader";
import { AssetPreloader } from "@/components/animations/AssetPreloader";
import { PerformanceProvider } from "@/hooks/usePerformanceMode";
import { PerformanceToggle } from "@/components/ui/PerformanceToggle";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-website-domain.com"),
  title: "DevCore — Software Development & Digital Experiences",
  description:
    "DevCore builds modern web applications, full-stack digital products, and immersive web experiences for ambitious businesses.",
  keywords: [
    "DevCore",
    "software development",
    "digital experiences",
    "web development",
    "full-stack development",
    "Three.js",
    "GSAP",
    "Next.js",
  ],
  openGraph: {
    title: "DevCore — Software Development & Digital Experiences",
    description:
      "DevCore builds modern web applications, full-stack digital products, and immersive web experiences for ambitious businesses.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="bg-[#080808] text-[#f0ece4] antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <PerformanceProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <DevCoreLoader />
          <AssetPreloader />
          <SmoothScrollProvider>
            <MouseFollower />
            {children}
          </SmoothScrollProvider>
          <PerformanceToggle />
        </PerformanceProvider>
      </body>
    </html>
  );
}
