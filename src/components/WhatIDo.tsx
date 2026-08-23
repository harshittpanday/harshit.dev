"use client";

import React from "react";
import { motion } from "framer-motion";
import { disciplinesData } from "@/data/portfolioData";
import { Layers, Bot, Sparkles, Rocket } from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const WhatIDo: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5 text-brand-cyan" />,
    Bot: <Bot className="w-5 h-5 text-brand-purple" />,
    Sparkles: <Sparkles className="w-5 h-5 text-brand-yellow-warm" />,
    Rocket: <Rocket className="w-5 h-5 text-brand-purple" />,
  };

  return (
    <section id="what-i-do" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1 rounded-full glass-nav text-xs font-mono text-brand-purple uppercase tracking-widest mb-3"
          >
            <span>Core Disciplines</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-100 tracking-tight"
          >
            WHAT I DO
          </motion.h2>
        </div>

        {/* 4 Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplinesData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={playClickSound}
              className="group relative rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40"
            >
              {/* Dot Grid Background */}
              <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity" />

              {/* Top Accent Gradient Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
                }}
              />

              {/* Upper Section */}
              <div className="relative z-10">
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-500 font-semibold tracking-wider">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[item.icon]}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-slate-100">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Tags at Bottom */}
              <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {item.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-neutral-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
