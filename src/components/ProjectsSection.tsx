"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudiesData, projectsData, CaseStudy, Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { CaseStudyModal } from "./CaseStudyModal";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "work">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const selectedProjects = projectsData.filter((project) => project.featured);
  const selectedWork = projectsData.filter((project) => !project.featured);
  const isProjectsTab = activeTab === "projects";
  const visibleProjects = isProjectsTab ? selectedProjects : selectedWork;

  const openProject = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
    setModalOpen(true);
  };

  const openStudy = (study: CaseStudy) => {
    playClickSound();
    setSelectedStudy(study);
    setStudyModalOpen(true);
  };

  return (
    <>
      <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-[#10110E]/10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl font-display font-bold text-[#10110E] tracking-tight mb-3"
              >
                {isProjectsTab ? "SELECTED PROJECTS" : "SELECTED WORK"}
              </motion.h2>
              <p className="text-sm sm:text-base text-[#62655B] font-sans">
                {isProjectsTab
                  ? "Things I've made, how they work, and what I used to build them."
                  : "Client work and products I've shipped for others."}
              </p>
            </div>

            <div
              className="inline-flex items-center gap-1 p-1.5 rounded-full glass-nav mt-6"
              role="tablist"
              aria-label="Portfolio category"
            >
              {(["projects", "work"] as const).map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      playClickSound();
                      setActiveTab(tab);
                    }}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#10110E] font-semibold"
                        : "text-[#62655B] hover:text-[#10110E]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeProjectsTab"
                        className="absolute inset-0 rounded-full bg-[#10110E]/[0.06] border border-[#10110E]/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col divide-y divide-[#10110E]/10"
            >
              {visibleProjects.map((project) => {
                const study = caseStudiesData.find((item) => item.id === project.id);
                return (
                  <motion.div
                    key={project.id}
                    layout="position"
                    transition={{ layout: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
                    onClick={() => openProject(project)}
                    onKeyDown={(event) => {
                      if (event.target !== event.currentTarget) return;
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProject(project);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="group py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-[#ECEEDF]/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10110E]/30 px-4 sm:px-6 rounded-2xl transition-all duration-300 relative"
                  >
                    <div className="flex flex-col gap-1.5 md:max-w-xl">
                      <div className="flex items-center gap-3">
                        <h3 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#10110E] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-[#62655B] group-hover:text-[#10110E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-0 group-hover:opacity-100" />
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#62655B]">
                        {project.year && (
                          <>
                            <span>{project.year}</span>
                            <span>·</span>
                          </>
                        )}
                        <span className="text-[#30322C]">{project.role}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#62655B] font-sans mt-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-3">
                      <div className="text-xs font-mono font-medium text-[#10110E] bg-[#C7F04B] px-2.5 py-1 rounded-full">
                        {project.category}
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-w-xs md:justify-end">
                        {project.stack.slice(0, isProjectsTab ? 4 : 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#ECEEDF] text-[11px] font-mono text-[#62655B] border border-[#10110E]/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {study && (
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              openStudy(study);
                            }}
                            className="px-3 py-1.5 rounded-full border border-[#10110E]/15 text-[11px] font-mono text-[#30322C] hover:text-[#10110E] hover:border-[#10110E]/35 transition-colors"
                          >
                            Read case study
                          </button>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.stopPropagation();
                              playClickSound();
                            }}
                            className="p-1.5 rounded-lg text-[#62655B] hover:text-[#10110E] hover:bg-[#10110E]/[0.06] transition-colors"
                            aria-label={`View ${project.title} source on GitHub`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.stopPropagation();
                              playClickSound();
                            }}
                            className={
                              isProjectsTab
                                ? "p-1.5 rounded-lg text-[#62655B] hover:text-[#10110E] hover:bg-[#10110E]/[0.06] transition-colors"
                                : "flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10110E]/15 text-[11px] font-mono text-[#30322C] hover:text-[#10110E] hover:border-[#10110E]/35 transition-colors"
                            }
                            aria-label={`View ${project.title} website`}
                          >
                            {!isProjectsTab && <span>View website</span>}
                            <ExternalLink className={isProjectsTab ? "w-4 h-4" : "w-3.5 h-3.5"} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <CaseStudyModal
        study={selectedStudy}
        isOpen={studyModalOpen}
        onClose={() => setStudyModalOpen(false)}
      />
    </>
  );
};
