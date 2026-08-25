"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Terminal,
  Laptop,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";
import { ActivityPresence } from "@/components/ActivityPresence";

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
    <section id="about" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-[#10110E]/10 bg-[#F8F9F0]/45">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-mono text-[#62655B] uppercase tracking-widest mb-3"
          >
            <span>About Me</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-display font-bold text-[#10110E] tracking-tight"
          >
            Hi, I&apos;m Harshit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-display font-bold text-[#62655B] tracking-tight mt-2"
          >
            A little about me.
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
            className="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#ECEEDF] border border-[#10110E]/10 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10110E] uppercase">
                <Terminal className="w-4 h-4" />
                <span>The Story</span>
              </div>

              <p className="text-base sm:text-lg text-[#30322C] font-sans leading-relaxed">
                I’m still early in my journey, which is honestly the fun part. I got into coding by building random things I wanted to exist, and that slowly turned into web apps, AI tools, and developer tools. I learn mostly by shipping projects, trying unfamiliar tools, breaking things, fixing them, and getting a little better at understanding the engineering behind what I build.
              </p>
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
              className="p-6 rounded-3xl bg-[#F8F9F0] border border-[#10110E]/10 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#62655B]">
                  <MapPin className="w-4 h-4 text-[#10110E]" />
                  <span>Lucknow, India</span>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7F04B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C7F04B] border border-[#10110E]/20" />
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#10110E] tracking-tight">
                  {currentTime || "05:30 PM"}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#62655B] mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>IST (UTC +5:30)</span>
                </div>
              </div>
            </motion.div>

            {/* Setup / Daily Driver Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-3xl bg-[#F8F9F0] border border-[#10110E]/10 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#62655B] uppercase mb-3">
                <Laptop className="w-4 h-4 text-[#10110E]" />
                <span>Daily Environment</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "TypeScript", "Antigravity IDE", "Docker", "PostgreSQL", "Figma"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-[#ECEEDF] text-[11px] font-mono text-[#30322C] border border-[#10110E]/10"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-h-[230px] p-6 sm:p-8 rounded-3xl bg-[#ECEEDF] border border-[#10110E]/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#10110E] uppercase mb-6">
                <span aria-hidden="true">&gt;_</span>
                <span>On Desk</span>
              </div>



              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#10110E] tracking-tight">
                Finding Internship
              </h3>
              <p className="text-sm sm:text-base text-[#62655B] font-sans leading-relaxed mt-2 max-w-md">
                Looking for an internship where I can contribute and upskill myself.
              </p>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#30322C] uppercase">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C7F04B] border border-[#10110E]/20" />
                <span>Open for Work</span>
              </div>
              <p className="text-xs font-mono text-[#62655B] mt-1.5 ml-[18px]">

              </p>
            </div>
          </motion.div>












          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="min-h-[230px] p-6 sm:p-8 rounded-3xl bg-[#F8F9F0] border border-[#10110E]/10 flex flex-col"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#10110E] uppercase mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C7F04B] border border-[#10110E]/20" />
              <span>Activity</span>
            </div>

            <ActivityPresence />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
