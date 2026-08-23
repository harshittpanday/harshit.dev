"use client";

import React from "react";
import Image from "next/image";
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
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-x-clip select-none"
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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-white/15 p-1 flex items-center justify-center shadow-lg shadow-black/50 overflow-hidden">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/pfp.png"
                alt="Harshit Pandey"
                fill
                sizes="(min-width: 640px) 48px, 40px"
                className="rounded-full object-contain"
                priority
              />
            </div>
          </div>
          <div className="px-4 py-2 rounded-full glass-nav text-xs sm:text-sm font-mono text-neutral-300 border border-white/10 flex items-center gap-2">
            <span>Hello, I&apos;m {siteConfig.name}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Giant Editorial Stacked Typography with secondary collaborative cursors */}
        <div className="relative w-full my-2">
          <div className="hidden sm:flex min-h-8 items-center justify-between gap-8 max-w-4xl mx-auto mb-3 px-6 pointer-events-none opacity-80">
            <motion.div animate={cursorFloat1} className="flex items-center gap-1.5">
              <MousePointer2 className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-brand-cyan text-neutral-950 shadow-sm">
                Developer
              </span>
            </motion.div>
            <motion.div animate={cursorFloat3} className="hidden md:flex items-center gap-1.5">
              <MousePointer2 className="w-4 h-4 text-brand-purple fill-brand-purple" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-brand-purple text-neutral-950 shadow-sm">
                AI Tools
              </span>
            </motion.div>
            <motion.div animate={cursorFloat2} className="flex items-center gap-1.5">
              <MousePointer2 className="w-4 h-4 text-brand-yellow-warm fill-brand-yellow-warm" />
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-brand-yellow-warm text-neutral-950 shadow-sm">
                {siteConfig.siteName}
              </span>
            </motion.div>
          </div>

          {/* Editorial Stacked Heading: STUDENT · BUILDER & · AI ENGINEER */}
          <div className="flex flex-col items-center justify-center font-display font-extrabold tracking-tight uppercase leading-[0.88]">
            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-[clamp(2.65rem,13.5vw,10.5rem)] text-brand-yellow-warm hover:scale-[1.01] transition-transform duration-300">
                STUDENT
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-[clamp(2.5rem,13vw,10rem)] text-brand-yellow-warm hover:scale-[1.01] transition-transform duration-300 whitespace-nowrap">
                BUILDER &amp;
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <h1 className="max-w-full text-[clamp(2.05rem,11.7vw,9rem)] whitespace-nowrap hover:scale-[1.01] transition-transform duration-300">
                <span className="text-brand-purple">AI</span>{" "}
                <span className="text-brand-cyan">ENGINEER</span>
              </h1>
            </motion.div>
          </div>

          {/* Editorial metadata: side gutters on wide screens */}
          <div className="hidden 2xl:block absolute -left-40 top-1/2 -translate-y-1/2 w-36 text-left font-mono text-[11px] leading-relaxed pointer-events-none">
            <motion.div variants={itemVariants}>
              <p className="text-neutral-600 uppercase tracking-wider">// Focus</p>
              <p className="text-neutral-400 font-medium uppercase">
                Building things I want to exist
              </p>
            </motion.div>
          </div>

          <div className="hidden 2xl:block absolute -right-36 top-1/2 -translate-y-1/2 w-32 text-right font-mono text-[11px] leading-relaxed pointer-events-none">
            <motion.div variants={itemVariants}>
              <p className="text-neutral-600 uppercase tracking-wider">// Location</p>
              <p className="text-neutral-400 font-medium uppercase">{siteConfig.location}</p>
            </motion.div>
          </div>

          {/* Dedicated row keeps metadata clear of the headline below 2xl */}
          <motion.div
            variants={itemVariants}
            className="2xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 mt-6 sm:mt-8 px-2 sm:px-8 font-mono text-[10px] sm:text-[11px] leading-relaxed pointer-events-none"
          >
            <div className="max-w-44 text-left">
              <p className="text-neutral-600 uppercase tracking-wider">// Focus</p>
              <p className="text-neutral-400 font-medium uppercase">
                Building things I want to exist
              </p>
            </div>
            <div className="max-w-40 text-right justify-self-end">
              <p className="text-neutral-600 uppercase tracking-wider">// Location</p>
              <p className="text-neutral-400 font-medium uppercase">{siteConfig.location}</p>
            </div>
          </motion.div>
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
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-brand-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
};
