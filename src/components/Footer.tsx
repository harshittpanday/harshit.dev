"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import {
  ArrowUp,
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
    <footer className="relative pt-16 pb-8 px-4 sm:px-6 md:px-8 border-t border-[#10110E]/10 bg-[#ECEEDF] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* Footer Top Card Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8F9F0] border border-[#10110E]/10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            {/* Column 1: Editorial Tagline (4 Cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#10110E] tracking-tight leading-snug">
                  Still learning. <span className="bg-[#C7F04B] px-1">Always making.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#62655B] font-sans mt-3">
                  A personal corner for experiments, projects, and notes from the process.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#62655B]">
                <span className="w-2 h-2 rounded-full bg-[#C7F04B] border border-[#10110E]/20 animate-pulse" />
                <span>Open to opportunities and collaborations</span>
              </div>
            </div>

            {/* Column 2: Explore Links (3 Cols) */}
            <div className="md:col-span-5 flex flex-col md:items-end">
              <span className="text-xs font-mono text-[#10110E] uppercase tracking-wider mb-4">
                Explore
              </span>
              <ul className="flex flex-wrap gap-x-5 gap-y-2.5 md:justify-end">
                {siteConfig.navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-xs sm:text-sm font-sans text-[#62655B] hover:text-[#10110E] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Giant Editorial Wordmark Running Edge-to-Edge */}
        <div className="w-full flex justify-center py-4 overflow-hidden select-none">
          <h2 className="text-[14vw] font-display font-extrabold tracking-tighter text-[#10110E]/90 leading-none whitespace-nowrap hover:text-[#10110E] transition-colors duration-500">
            {siteConfig.siteName}
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#10110E]/10 text-xs font-mono text-[#62655B]">
          <div>
            <span>{siteConfig.siteName} · {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{siteConfig.location}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#62655B] hover:text-[#10110E] transition-colors p-1"
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
