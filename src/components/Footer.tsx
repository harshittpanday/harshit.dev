"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (href: string) => {
    playClickSound();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-16 pb-8 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-[#060608] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* Footer Top Card Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0c12] border border-white/10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            {/* Column 1: Editorial Tagline (4 Cols) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                  Still learning. <span className="text-brand-yellow-warm">Always making.</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-3">
                  A personal corner for experiments, projects, and notes from the process.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open to opportunities and collaborations</span>
              </div>
            </div>

            {/* Column 2: Explore Links (3 Cols) */}
            <div className="md:col-span-3 flex flex-col">
              <span className="text-xs font-mono text-brand-yellow-warm uppercase tracking-wider mb-4">
                Explore
              </span>
              <ul className="flex flex-col gap-2.5">
                {siteConfig.navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-xs sm:text-sm font-sans text-neutral-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Follow Me (3 Cols) */}
            <div className="md:col-span-3 flex flex-col">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-4">
                Follow Me
              </span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Twitter / X</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Action CTAs (2 Cols) */}
            <div className="md:col-span-2 flex flex-col gap-3 justify-center">
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-brand-purple/20 border border-white/10 hover:border-brand-purple/40 text-xs font-mono text-white transition-all group"
              >
                <div className="flex flex-col text-left">
                  <span className="font-bold">Contact Me</span>
                  <span className="text-[10px] text-neutral-400">Say Hello!</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => scrollTo("#case-studies")}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-brand-yellow-warm/20 border border-white/10 hover:border-brand-yellow-warm/40 text-xs font-mono text-white transition-all group"
              >
                <div className="flex flex-col text-left">
                  <span className="font-bold">Case Studies</span>
                  <span className="text-[10px] text-neutral-400">See the details</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-brand-yellow-warm/20 text-brand-yellow-warm flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Giant Editorial Wordmark Running Edge-to-Edge */}
        <div className="w-full flex justify-center py-4 overflow-hidden select-none">
          <h2 className="text-[14vw] font-display font-extrabold tracking-tighter text-neutral-100/90 leading-none whitespace-nowrap hover:text-white transition-colors duration-500">
            {siteConfig.siteName}
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-neutral-500">
          <div>
            <span>{siteConfig.siteName} © {new Date().getFullYear()} · All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{siteConfig.location}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors p-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
