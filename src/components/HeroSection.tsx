"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointer2, ArrowDown, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { playClickSound } from "@/lib/sound";

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cursorFloat1 = {
    y: [0, -12, 0],
    x: [0, 8, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  };

  const cursorFloat2 = {
    y: [0, 14, 0],
    x: [0, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
  };

  const cursorFloat3 = {
    y: [0, -8, 0],
    x: [0, -6, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden select-none"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Top Greeting Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-white/15 p-1 flex items-center justify-center shadow-lg shadow-black/50">
            <span className="text-xl sm:text-2xl font-mono font-bold text-brand-purple">HP</span>
          </div>
          <div className="px-4 py-2 rounded-full glass-nav text-xs sm:text-sm font-mono text-neutral-300 border border-white/10 flex items-center gap-2">
            <span>Hello, I&apos;m {siteConfig.name}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Giant Editorial Stacked Typography with Floating Collaborative Cursors */}
        <div className="relative w-full my-2">
          {/* Floating Cursor 1: Builder */}
          <motion.div
            animate={cursorFloat1}
            className="absolute -top-4 left-4 sm:left-12 lg:left-24 z-20 hidden sm:flex items-center gap-1.5 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-brand-pink fill-brand-pink" />
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-brand-pink text-black shadow-sm">
              Builder
            </span>
          </motion.div>

          {/* Floating Cursor 2: Brand Tag */}
          <motion.div
            animate={cursorFloat2}
            className="absolute bottom-16 right-4 sm:right-16 lg:right-28 z-20 hidden sm:flex items-center gap-1.5 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-brand-purple fill-brand-purple" />
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-brand-purple text-neutral-950 shadow-sm">
              {siteConfig.siteName}
            </span>
          </motion.div>

          {/* Floating Cursor 3: AI Systems */}
          <motion.div
            animate={cursorFloat3}
            className="absolute top-1/2 left-2 sm:left-8 z-20 hidden md:flex items-center gap-1.5 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-brand-cyan text-neutral-950 shadow-sm">
              AI Tools
            </span>
          </motion.div>

          {/* Editorial Stacked Heading: STUDENT · BUILDER · ENGINEER · AI */}
          <div className="flex flex-col items-center justify-center font-display font-extrabold tracking-tight uppercase leading-[0.92] sm:leading-[0.88]">
            {/* Line 1: STUDENT (Lilac/Purple) */}
            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-brand-purple hover:scale-[1.01] transition-transform duration-300">
                STUDENT
              </h1>
            </motion.div>

            {/* Line 2: BUILDER (Warm Butter/Yellow) */}
            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-brand-yellow hover:scale-[1.01] transition-transform duration-300">
                BUILDER
              </h1>
            </motion.div>

            {/* Line 3 & 4 Container with Sub-tags */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 relative w-full">
              {/* Left Sub-tag (Desktop) */}
              <motion.div
                variants={itemVariants}
                className="hidden lg:block text-left font-mono text-xs text-neutral-400 absolute left-4 bottom-6 max-w-[200px]"
              >
                <p className="text-neutral-500">// Focus</p>
                <p className="text-neutral-300 font-medium">Turning ideas into real software</p>
              </motion.div>

              {/* Line 3: ENGINEER (Crisp White) */}
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-slate-100">
                  ENGINEER
                </h1>
              </motion.div>

              {/* Line 4: AI (Electric Cyan) */}
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-brand-cyan">
                  &amp; AI
                </h1>
              </motion.div>

              {/* Right Sub-tag (Desktop) */}
              <motion.div
                variants={itemVariants}
                className="hidden lg:block text-right font-mono text-xs text-neutral-400 absolute right-4 bottom-6 max-w-[200px]"
              >
                <p className="text-neutral-500">// Location</p>
                <p className="text-neutral-300 font-medium">{siteConfig.location}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Connect & Resume Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playClickSound();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-900/90 border border-white/15 hover:border-brand-purple/60 hover:bg-neutral-800/90 text-sm font-medium text-white transition-all shadow-lg group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Let&apos;s Connect</span>
            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          {siteConfig.resumeUrl && (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="flex items-center gap-2 px-5 py-3 rounded-full glass-nav border border-white/10 hover:border-white/25 text-xs sm:text-sm font-mono text-neutral-300 hover:text-white transition-all"
            >
              <FileText className="w-4 h-4 text-brand-yellow-warm" />
              <span>View Resume</span>
            </a>
          )}

          <div className="px-5 py-3 rounded-full glass-nav border border-white/10 text-xs sm:text-sm font-mono text-neutral-400">
            <span>// Open to opportunities &amp; internships</span>
          </div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-300 transition-colors"
          onClick={() => {
            playClickSound();
            document.querySelector("#statement")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-brand-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
};
