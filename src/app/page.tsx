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
    <main className="min-h-screen bg-[#F4F5E9] text-[#10110E] relative selection:bg-[#C7F04B] selection:text-[#10110E]">
      {/* Intro Preloader Sequence */}
      <AnimatePresence mode="wait">
        {!introFinished && (
          <Preloader onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience Revealed After Intro */}
      {introFinished && (
        <div className="editorial-theme relative">
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
