"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { caseStudiesData, CaseStudy } from "@/data/portfolioData";
import { CaseStudyModal } from "./CaseStudyModal";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const CaseStudiesSection: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openStudy = (study: CaseStudy) => {
    playClickSound();
    setSelectedStudy(study);
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="case-studies"
        className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mono text-brand-yellow-warm uppercase tracking-widest mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Deep Dives</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-display font-bold text-brand-yellow-warm tracking-tight mb-4"
            >
              Case Studies
            </motion.h2>

            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-sans leading-relaxed">
              End-to-end full-stack architectures, AI systems, and product
              execution — from research to deployed, high-throughput software.
            </p>
          </div>

          {/* Case Studies Rows */}
          <div className="flex flex-col divide-y divide-white/10">
            {caseStudiesData.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onClick={() => openStudy(study)}
                className="group py-10 sm:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/[0.02] px-4 sm:px-8 rounded-3xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(167, 139, 250, 0.06), transparent 70%)",
                  }}
                />

                {/* Left Column: Project Info */}
                <div className="flex flex-col gap-2 md:max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="text-brand-purple font-semibold">
                      {study.role}
                    </span>
                    <span>·</span>
                    <span>{study.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white group-hover:text-brand-purple transition-colors duration-200 tracking-tight flex items-center gap-3">
                    <span>{study.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-brand-purple group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-0 group-hover:opacity-100" />
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-sans line-clamp-2 mt-1">
                    {study.description}
                  </p>
                </div>

                {/* Right Column: Highlight */}
                <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-center gap-1 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <span className="text-lg sm:text-xl font-display font-bold text-brand-purple tracking-tight text-right">
                    {study.highlightTag}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 text-right">
                    Selected project
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action to Explore All Projects */}
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                playClickSound();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 border border-white/15 hover:border-brand-purple/50 text-sm font-mono text-white transition-all group shadow-lg"
            >
              <span>Explore All Projects</span>
              <span className="text-brand-purple group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        study={selectedStudy}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};