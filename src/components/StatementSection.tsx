"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Check,
  Copy,
  Sparkles,
  FileText,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export const StatementSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="statement" className="relative py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Top Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400">
              // Student &amp; Builder
            </span>
          </div>

          {/* Social Icons & Action Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Social Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full glass-nav">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Resume Pill */}
            {siteConfig.resumeUrl && (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-nav hover:border-brand-yellow-warm/40 text-xs font-mono text-neutral-300 hover:text-white transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-brand-yellow-warm" />
                <span>Resume</span>
              </a>
            )}

            {/* Email Copy Pill */}
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-nav hover:border-brand-purple/40 text-xs font-mono text-neutral-300 hover:text-white transition-all group"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-purple transition-colors" />
                  <span>{siteConfig.email}</span>
                  <Copy className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300 ml-1 opacity-60" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Big Editorial Elevator Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-slate-100 leading-snug tracking-tight"
            >
              I’m a <span className="text-brand-yellow-warm font-semibold">student and developer</span>{" "}
              building <span className="text-brand-purple font-semibold">AI tools</span>, developer
              tools, and <span className="text-brand-cyan underline decoration-brand-cyan/40 underline-offset-8">web products</span>.
            </motion.h2>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
              I study PCM in Lucknow and learn by making independent projects. I’m especially
              interested in local-first software, code tools, and useful AI applications.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>Web Development · AI Tools · Developer Tools</span>
            </div>
          </div>
        </div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-4"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 tracking-tight flex items-center gap-3">
            <span>Projects are where I learn.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
