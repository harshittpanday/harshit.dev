"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projectsData, Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const categories = ["All", ...Array.from(new Set(projectsData.map((project) => project.category)))];
  const categoryColors: Record<string, string> = {
    All: "#FEF08A",
    "AI & Tools": "#A78BFA",
    "Full-Stack": "#22D3EE",
    Social: "#FEF08A",
    Web: "#22D3EE",
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const openProject = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <>
      <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl font-display font-bold text-brand-yellow-warm tracking-tight mb-3"
              >
                My Projects
              </motion.h2>
              <p className="text-sm sm:text-base text-neutral-400 font-sans">
                Things I&apos;ve made, how they work, and what I used to build them.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl glass-nav">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(category);
                    setVisibleCount(4);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedCategory === category
                      ? "text-neutral-950 font-bold shadow-md"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={selectedCategory === category ? { backgroundColor: categoryColors[category] } : undefined}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Rows */}
          <div className="flex flex-col divide-y divide-white/10">
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout="position"
                  transition={{ layout: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
                  onClick={() => openProject(project)}
                  className="group py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/[0.02] px-4 sm:px-6 rounded-2xl transition-all duration-300 relative"
                >
                  {/* Left Side: Title & Description */}
                  <div className="flex flex-col gap-1.5 md:max-w-xl">
                    <div className="flex items-center gap-3">
                      <h3
                        className="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors duration-200"
                        style={{ color: project.accentColor }}
                      >
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-0 group-hover:opacity-100" />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                      <span>{project.year}</span>
                      <span>·</span>
                      <span className="text-neutral-400">{project.role}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Right Side: Tech Stack & Actions */}
                  <div className="flex flex-col md:items-end justify-between gap-3">
                    <div className="text-xs font-mono font-medium" style={{ color: project.accentColor }}>
                      {project.category}
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-w-xs md:justify-end">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-neutral-900 text-[11px] font-mono text-neutral-400 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Direct Quick Links */}
                    <div className="flex items-center gap-2 pt-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="View Source on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="View Live Project"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Load More Button if more projects available */}
          {visibleCount < filteredProjects.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => {
                  playClickSound();
                  setVisibleCount((prev) => prev + 4);
                }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 border border-white/15 hover:border-brand-purple/50 text-sm font-mono text-white transition-all group shadow-lg"
              >
                <span>Load More</span>
                <span className="text-brand-purple group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
