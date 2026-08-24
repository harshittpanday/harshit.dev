"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site";
import { playClickSound } from "@/lib/sound";

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-[#10110E]/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#ECEEDF] border border-[#10110E]/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono text-[#62655B] uppercase tracking-widest mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-[#10110E] tracking-tight mb-4">
              Let&apos;s <span className="bg-[#C7F04B] px-1">talk</span>.
            </h2>
            <p className="text-sm sm:text-base text-[#62655B] max-w-xl">
              Have a project, opportunity, or question? Email me directly.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 lg:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={playClickSound}
              className="w-full sm:w-auto min-w-0 inline-flex items-center justify-between gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-[#C7F04B] text-[#10110E] font-mono text-[11px] sm:text-sm font-semibold hover:bg-[#B9E03F] transition-colors border border-[#10110E]/10"
            >
              <span>{siteConfig.email}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" onClick={playClickSound} className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-[#62655B] hover:text-[#10110E] hover:border-[#10110E]/30 transition-all">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" onClick={playClickSound} className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-[#62655B] hover:text-[#10110E] hover:border-[#10110E]/30 transition-all">
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a href={siteConfig.socials.twitter} target="_blank" rel="noreferrer" onClick={playClickSound} className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-[#62655B] hover:text-[#10110E] hover:border-[#10110E]/30 transition-all">
                <Twitter className="w-3.5 h-3.5" />
                <span>X</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
