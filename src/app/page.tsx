"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { HeroSection } from "@/components/HeroSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ProjectsSection } from "@/components/ProjectsSection";
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
    return <div className="min-h-screen bg-[#08090b]" />;
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-slate-100 relative selection:bg-purple-500/30 selection:text-purple-200">
      {/* Intro Preloader Sequence */}
      <AnimatePresence mode="wait">
        {!introFinished && (
          <Preloader onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience Revealed After Intro */}
      {introFinished && (
        <div className="relative">
          <CustomCursor />
          <BackgroundCanvas />
          <Navbar />

          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <ContactSection />
          <Footer />
          <AudioToggle />
        </div>
      )}
    </main>
  );
}
