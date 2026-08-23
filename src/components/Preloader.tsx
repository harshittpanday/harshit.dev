"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isDone, setIsDone] = useState(false);

  const greetings = siteConfig.intro.greetings;
  const intervalTime = siteConfig.intro.greetingIntervalMs;

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cycle through greetings
  useEffect(() => {
    if (index === greetings.length - 1) return;
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, intervalTime);
    return () => clearTimeout(timer);
  }, [index, greetings.length, intervalTime]);

  // Smooth progress counter from 0% to 100%
  useEffect(() => {
    const totalTime = siteConfig.intro.totalDurationMs;
    const updateInterval = 25;
    const steps = totalTime / updateInterval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(
        100,
        Math.round((currentStep / steps) * 100)
      );
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 150);
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG curved reveal path
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${
    dimension.width / 2
  } 0 0 0 L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#050508] text-white overflow-hidden select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 pt-8 sm:px-12 sm:pt-12 z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
            {siteConfig.siteName}
          </span>
        </div>
        <div className="font-mono text-xs text-neutral-500 tracking-widest uppercase hidden sm:block">
          Portfolio Experience 2026
        </div>
        <button
          onClick={() => {
            setIsDone(true);
            setTimeout(onComplete, 300);
          }}
          className="text-xs font-mono text-neutral-400 hover:text-white px-3 py-1 rounded-full border border-neutral-800 hover:border-neutral-600 transition-colors"
        >
          Skip ↵
        </button>
      </div>

      {/* Center Multilingual Greeting */}
      <div className="flex flex-col items-center justify-center z-10 my-auto px-4">
        <div className="relative h-28 sm:h-36 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-medium tracking-tight text-neutral-100 flex items-center gap-4">
                <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand-yellow-warm animate-ping mr-2" />
                {greetings[index]?.text}
              </h1>
              <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mt-3">
                {greetings[index]?.lang}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Indicator */}
      <div className="px-8 pb-8 sm:px-12 sm:pb-12 z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Initializing Space
              </span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>
            {/* Progress Track */}
            <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-purple via-brand-yellow-warm to-brand-cyan"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-mono text-neutral-500 hidden sm:block">
              Crafted with Next.js &amp; Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* SVG Morphing Curtain Exit */}
      {dimension.width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#050508]">
          <motion.path
            variants={curveVariants}
            initial="initial"
            exit="exit"
            animate={isDone ? "exit" : "initial"}
          />
        </svg>
      )}
    </motion.div>
  );
};
