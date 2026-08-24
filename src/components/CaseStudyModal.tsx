"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudy } from "@/data/portfolioData";
import { X, ExternalLink, Github, Sparkles, CheckCircle2, AlertCircle, Layers } from "lucide-react";
import { playClickSound } from "@/lib/sound";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
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

  if (!study) return null;

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
            className="relative w-full max-w-4xl bg-[#F8F9F0] border border-[#10110E]/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
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

            {/* Header Badge & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-mono border"
                style={{
                  color: "#10110E",
                  borderColor: "rgba(16, 17, 14, 0.1)",
                  backgroundColor: "#C7F04B",
                }}
              >
                {study.role}
              </span>
              <span className="font-mono text-xs text-[#62655B]">
                // {study.year}
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#10110E] tracking-tight mb-2">
              {study.title}
            </h2>
            <p className="text-base sm:text-lg text-[#62655B] font-display font-medium mb-6">
              {study.subtitle}
            </p>

            <p className="text-base sm:text-lg text-[#30322C] font-sans leading-relaxed mb-6">
              {study.overview}
            </p>

            {/* Important Clarification Alert if Present */}
            {study.clarification && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#ECEEDF] border border-[#10110E]/10 text-[#30322C] text-xs sm:text-sm font-sans flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-[#10110E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#10110E] mb-0.5">What it does not do:</span>
                  <span>{study.clarification}</span>
                </div>
              </div>
            )}

            {/* Key Technical Features */}
            <div className="p-6 rounded-2xl bg-[#ECEEDF] border border-[#10110E]/10 space-y-3 mb-8">
              <h3 className="text-sm font-mono text-[#30322C] uppercase tracking-wider flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-[#10110E]" />
                How it works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#30322C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7F04B] border border-[#10110E]/20 shrink-0 mt-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills & Links */}
            <div className="pt-6 border-t border-[#10110E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-mono text-[#62655B] mr-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Stack:
                </span>
                {study.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-[#ECEEDF] text-xs font-mono text-[#30322C] border border-[#10110E]/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {study.githubUrl && (
                  <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ECEEDF] hover:bg-[#DFE2D1] text-xs font-mono text-[#10110E] transition-colors border border-[#10110E]/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {study.liveUrl && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#10110E] hover:bg-[#2A2C26] text-xs font-mono font-semibold text-[#F8F9F0] transition-colors"
                  >
                    <span>Live Demo</span>
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
