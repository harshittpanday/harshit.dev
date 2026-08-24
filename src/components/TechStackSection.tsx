"use client";

import React from "react";
import { motion } from "framer-motion";
import { techStackCategories } from "@/data/portfolioData";
import {
  Code2,
  FileCode,
  Terminal,
  Database,
  Layout,
  Boxes,
  Atom,
  Palette,
  Sparkles,
  Server,
  Zap,
  Layers,
  Bot,
  Search,
  GitFork,
  Cloud,
  Container,
  GitBranch,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const TechStackSection: React.FC = () => {
  const iconComponents: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6" />,
    FileCode: <FileCode className="w-6 h-6" />,
    Terminal: <Terminal className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Layout: <Layout className="w-6 h-6" />,
    Boxes: <Boxes className="w-6 h-6" />,
    Atom: <Atom className="w-6 h-6" />,
    Palette: <Palette className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Server: <Server className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Bot: <Bot className="w-6 h-6" />,
    Search: <Search className="w-6 h-6" />,
    GitFork: <GitFork className="w-6 h-6" />,
    Cloud: <Cloud className="w-6 h-6" />,
    Container: <Container className="w-6 h-6" />,
    GitBranch: <GitBranch className="w-6 h-6" />,
  };

  const allItems = techStackCategories.flatMap((cat) => cat.items);
  const row1 = allItems.slice(0, Math.ceil(allItems.length / 2));
  const row2 = allItems.slice(Math.ceil(allItems.length / 2));

  return (
    <section id="skills" className="relative py-24 border-t border-[#10110E]/10 overflow-hidden select-none bg-[#ECEEDF]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-14 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-display font-bold text-[#10110E] tracking-tight"
        >
          TOOLS I BUILD WITH
        </motion.h2>
      </div>

      {/* Infinite Dual-Direction Marquee */}
      <div className="flex flex-col gap-6 relative">
        {/* Left-Right Gradient Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#F0F2E4] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#F0F2E4] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="tech-marquee-track flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={`row-1-copy-${copy}`} className="flex shrink-0 gap-4 pr-4">
                {row1.map((tech) => (
                  <div
                    key={`r1-${copy}-${tech.name}`}
                    onMouseEnter={playClickSound}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F8F9F0] border border-[#10110E]/10 hover:border-[#10110E]/25 hover:bg-white transition-all cursor-default"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#C7F04B] text-[#10110E]"
                    >
                      {iconComponents[tech.icon] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-display font-semibold text-[#10110E]">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="tech-marquee-track flex w-max animate-marquee-right group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={`row-2-copy-${copy}`} className="flex shrink-0 gap-4 pr-4">
                {row2.map((tech) => (
                  <div
                    key={`r2-${copy}-${tech.name}`}
                    onMouseEnter={playClickSound}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F8F9F0] border border-[#10110E]/10 hover:border-[#10110E]/25 hover:bg-white transition-all cursor-default"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#C7F04B] text-[#10110E]"
                    >
                      {iconComponents[tech.icon] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-display font-semibold text-[#10110E]">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
