"use client";

import React, { useState } from "react";
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
  Eye,
  Cpu,
  Server,
  Zap,
  Radio,
  Layers,
  Bot,
  BrainCircuit,
  Search,
  GitFork,
  Wand2,
  Workflow,
  Cloud,
  CloudRain,
  Container,
  GitBranch,
  Figma,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

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
    Eye: <Eye className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Server: <Server className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Radio: <Radio className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Bot: <Bot className="w-6 h-6" />,
    BrainCircuit: <BrainCircuit className="w-6 h-6" />,
    Search: <Search className="w-6 h-6" />,
    GitFork: <GitFork className="w-6 h-6" />,
    Wand2: <Wand2 className="w-6 h-6" />,
    Workflow: <Workflow className="w-6 h-6" />,
    Cloud: <Cloud className="w-6 h-6" />,
    CloudRain: <CloudRain className="w-6 h-6" />,
    Container: <Container className="w-6 h-6" />,
    GitBranch: <GitBranch className="w-6 h-6" />,
    Figma: <Figma className="w-6 h-6" />,
  };

  const allItems = techStackCategories.flatMap((cat) => cat.items);
  const row1 = allItems.slice(0, Math.ceil(allItems.length / 2));
  const row2 = allItems.slice(Math.ceil(allItems.length / 2));

  return (
    <section id="tech-stack" className="relative py-24 border-t border-white/5 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-widest mb-3"
        >
          <span>Tools &amp; Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-display font-bold text-brand-cyan tracking-tight mb-6"
        >
          MY TECH STACK
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-neutral-300 max-w-4xl mx-auto leading-snug"
        >
          Languages, frameworks, and tools I use in my projects.
        </motion.p>
      </div>

      {/* Infinite Dual-Direction Marquee */}
      <div className="flex flex-col gap-6 relative">
        {/* Left-Right Gradient Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#08090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#08090b] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="flex gap-4 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((tech, idx) => (
              <div
                key={`r1-${tech.name}-${idx}`}
                onMouseEnter={playClickSound}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0e0e14] border border-white/10 hover:border-white/25 hover:bg-neutral-900 transition-all cursor-default shadow-sm"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5"
                  style={{ color: tech.color }}
                >
                  {iconComponents[tech.icon] || <Code2 className="w-5 h-5" />}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-display font-semibold text-white">
                    {tech.name}

                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap group">
          <div className="flex gap-4 animate-marquee-right group-hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((tech, idx) => (
              <div
                key={`r2-${tech.name}-${idx}`}
                onMouseEnter={playClickSound}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0e0e14] border border-white/10 hover:border-white/25 hover:bg-neutral-900 transition-all cursor-default shadow-sm"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5"
                  style={{ color: tech.color }}
                >
                  {iconComponents[tech.icon] || <Code2 className="w-5 h-5" />}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-display font-semibold text-white">
                    {tech.name}

                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Deep-Dive Grid (Collapsible/Interactive) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d12] border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <h3 className="text-lg font-display font-bold text-white">
              Skill Taxonomy by Category
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["All", ...techStackCategories.map((c) => c.category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${activeCategory === cat
                    ? "bg-brand-purple text-neutral-950 font-bold"
                    : "text-neutral-400 hover:text-white bg-white/5"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackCategories
              .filter((c) => activeCategory === "All" || c.category === activeCategory)
              .map((cat) => (
                <div key={cat.category} className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono text-brand-yellow-warm uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-xs font-mono text-neutral-300 border border-white/5 hover:border-white/20 transition-colors"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
