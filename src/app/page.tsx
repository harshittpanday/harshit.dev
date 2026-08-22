"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { HeroSection } from "@/components/HeroSection";
import { StatementSection } from "@/components/StatementSection";
import { WhatIDo } from "@/components/WhatIDo";
import { ExperienceSkills } from "@/components/ExperienceSkills";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { AudioToggle } from "@/components/AudioToggle";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="min-h-screen bg-[#08080a]" />;
  }

  return (
    <main className="min-h-screen bg-[#08080a] text-slate-100 relative selection:bg-purple-500/30 selection:text-purple-200">
      {/* Intro Preloader Sequence */}
      <AnimatePresence mode="wait">
        {!introFinished && (
          <Preloader onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience Revealed After Intro */}
      <div className={`relative transition-opacity duration-700 ${introFinished ? "opacity-100" : "opacity-0"}`}>
        <CustomCursor />
        <BackgroundCanvas />
        <Navbar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introFinished ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroSection />
          <StatementSection />
          <WhatIDo />
          <ExperienceSkills />
          <CaseStudiesSection />
          <ProjectsSection />
          <TechStackSection />
          <AboutSection />
          <ContactSection />
          <Footer />
          <AudioToggle />
        </motion.div>
      </div>
    </main>
  );
}
