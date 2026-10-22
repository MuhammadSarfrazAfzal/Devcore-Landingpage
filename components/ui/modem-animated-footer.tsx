"use client";
import React from "react";
import Link from "next/link";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

const isExternalUrl = (href: string) => /^https?:\/\//i.test(href);
const isProtocolLink = (href: string) => /^(mailto:|tel:|sms:)/i.test(href);

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "DevCore",
  brandDescription = "Engineering modern digital experiences through thoughtful design and reliable software development.",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full flex flex-col mt-0 overflow-hidden bg-black", className)}>
      <footer className="border-t border-white/10 bg-black/90 relative flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="max-w-6xl w-full flex flex-col mx-auto relative z-10 px-4 sm:px-8 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="flex flex-col items-center justify-center text-center w-full">
            
            {/* Brand Title & Tagline */}
            <div className="flex flex-col items-center gap-3 max-w-2xl px-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                {brandName}
              </span>
              <p className="text-neutral-400 font-normal text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                {brandDescription}
              </p>
            </div>

            {/* Social Icons Row */}
            {socialLinks.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
                {socialLinks.map((link, index) => {
                  const proto = isProtocolLink(link.href);
                  const external = isExternalUrl(link.href);
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-neutral-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-105"
                      target={proto ? undefined : external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Navigation Links Row */}
            {navLinks.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 mt-8 sm:mt-10 text-xs sm:text-sm font-medium text-neutral-400 max-w-2xl px-4">
                {navLinks.map((link, index) => {
                  const proto = isProtocolLink(link.href);
                  const external = isExternalUrl(link.href);
                  if (proto || external) {
                    return (
                      <a
                        key={index}
                        className="hover:text-white transition-colors duration-200 tracking-wide"
                        href={link.href}
                        target={proto ? undefined : "_blank"}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      className="hover:text-white transition-colors duration-200 tracking-wide"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* Floating DevCore Emblem Pill */}
            <div className="mt-12 sm:mt-16 flex items-center justify-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.15)] flex items-center justify-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  {brandIcon || (
                    <NotepadTextDashed className="w-6 h-6 text-white drop-shadow-md" />
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Giant Brand Watermark */}
            <div className="w-full overflow-hidden select-none pointer-events-none mt-6 mb-4">
              <div
                className="bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent font-extrabold tracking-tighter text-center leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 11rem)",
                }}
              >
                {brandName.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Copyright & Bottom Metadata */}
          <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-neutral-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl ? (
              <a
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Crafted by {creatorName}
              </a>
            ) : (
              <p className="text-neutral-400 text-center sm:text-right">
                Software Development &amp; Digital Experiences
              </p>
            )}
          </div>
        </div>
      </footer>
    </section>
  );
};
export default Footer;
