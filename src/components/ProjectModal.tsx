"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, Github, Sparkles, Check } from "lucide-react";
import { playClickSound } from "@/lib/sound";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#10110E]/70"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-3xl bg-[#F8F9F0] border border-[#10110E]/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#ECEEDF] hover:bg-[#DFE2D1] text-[#62655B] hover:text-[#10110E] flex items-center justify-center transition-colors z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-mono font-medium border"
                style={{
                  color: "#10110E",
                  borderColor: "rgba(16, 17, 14, 0.1)",
                  backgroundColor: "#C7F04B",
                }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#62655B]">
                {project.role}{project.year ? ` · ${project.year}` : ""}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#10110E] tracking-tight mb-4">
              {project.title}
            </h2>

            <p className="text-sm sm:text-base text-[#30322C] font-sans leading-relaxed mb-6">
              {project.longDescription}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2 mb-8 bg-[#ECEEDF] p-5 rounded-2xl border border-[#10110E]/10">
              <h3 className="text-xs font-mono text-[#62655B] uppercase tracking-wider mb-3">
                How it works
              </h3>
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#30322C]">
                  <Check className="w-4 h-4 text-[#10110E] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack & Links */}
            <div className="pt-6 border-t border-[#10110E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-mono text-[#62655B] mr-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Stack:
                </span>
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-[#ECEEDF] text-xs font-mono text-[#30322C] border border-[#10110E]/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ECEEDF] hover:bg-[#DFE2D1] text-xs font-mono text-[#10110E] transition-colors border border-[#10110E]/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#10110E] hover:bg-[#2A2C26] text-xs font-mono font-semibold text-[#F8F9F0] transition-colors"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
