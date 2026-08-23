"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceSkillsData } from "@/data/portfolioData";
import { playClickSound } from "@/lib/sound";

export const ExperienceSkills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-brand-yellow-warm tracking-tight">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        {/* Rows List */}
        <div className="flex flex-col divide-y divide-white/10">
          {experienceSkillsData.map((category) => (
            <motion.div
              key={category.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              onMouseEnter={playClickSound}
              className="group py-8 sm:py-12 flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:bg-white/[0.02] px-3 sm:px-6 rounded-2xl transition-all duration-300"
            >
              {/* Left Column: Number + Big Title */}
              <div className="flex items-baseline gap-4 lg:w-1/4">
                <span className="font-mono text-xs sm:text-sm text-neutral-500 font-medium">
                  {category.number}
                </span>
                <h3
                  className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: category.color }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Middle Column: Editorial Description */}
              <div className="lg:w-2/5">
                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Right Column: Skill Pills */}
              <div className="lg:w-1/3 flex flex-wrap gap-2 justify-start lg:justify-end">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-xs font-mono text-neutral-300 border border-white/10 group-hover:border-white/20 hover:text-white transition-all duration-200"
                  >
                    {skill}
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
