"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Zap,
  Terminal,
  Compass,
  Laptop,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const AboutSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-mono text-brand-yellow-warm uppercase tracking-widest mb-3"
          >
            <span>Background &amp; Narrative</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-display font-bold text-slate-100 tracking-tight"
          >
            Hello! I&apos;m Harshit 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-display font-bold text-brand-yellow-warm tracking-tight mt-2"
          >
            Student, Developer &amp; Creator
          </motion.p>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Story Card (8 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/10 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow-warm uppercase">
                <Terminal className="w-4 h-4" />
                <span>The Story</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white leading-snug">
                I’m a student in Lucknow who enjoys making{" "}
                <span className="text-brand-purple">AI tools</span>,{" "}
                <span className="text-brand-cyan">developer tools</span>, and{" "}
                <span className="text-brand-yellow-warm">web products</span>.
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                I learn by taking ideas from a rough prototype to working software. That means
                writing the interface, backend, data layer, and the small interactions that make a
                product pleasant to use.
              </p>

              <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                I’m most interested in practical projects that help people research, understand
                code, or work more clearly. The projects on this site show that work in detail.
              </p>
            </div>

            {/* Quick Principles Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 mt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-500">// Principle 01</span>
                <span className="text-sm font-semibold text-neutral-200 mt-1">
                  Speed &amp; Craft
                </span>
                <span className="text-xs text-neutral-400">Zero sluggishness</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-500">// Principle 02</span>
                <span className="text-sm font-semibold text-neutral-200 mt-1">
                  Pragmatic Tech
                </span>
                <span className="text-xs text-neutral-400">Tested primitives</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-500">// Principle 03</span>
                <span className="text-sm font-semibold text-neutral-200 mt-1">
                  Useful AI
                </span>
                <span className="text-xs text-neutral-400">Only where it helps</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Bento Widgets (4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Live Timezone / Location Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={playClickSound}
              className="p-6 rounded-3xl bg-[#0e0e14] border border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <MapPin className="w-4 h-4 text-brand-cyan" />
                  <span>Lucknow, India</span>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                  {currentTime || "05:30 PM"}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>IST (UTC +5:30)</span>
                </div>
              </div>
            </motion.div>

            {/* Current Focus Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-3xl bg-[#0e0e14] border border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow-warm uppercase mb-3">
                <Compass className="w-4 h-4" />
                <span>Current Exploration</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                Exploring local AI tools, codebase search, and practical web products through
                independent projects.
              </p>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-xs font-mono text-neutral-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Building independent projects</span>
              </div>
            </motion.div>

            {/* Setup / Daily Driver Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-3xl bg-[#0e0e14] border border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase mb-3">
                <Laptop className="w-4 h-4 text-brand-purple" />
                <span>Daily Environment</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "TypeScript", "VS Code / Cursor", "Docker", "PostgreSQL", "Figma"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-neutral-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
