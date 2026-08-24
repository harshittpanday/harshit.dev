"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Home,
  Briefcase,
  User,
  Code2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-3.5 h-3.5" />,
    Briefcase: <Briefcase className="w-3.5 h-3.5" />,
    User: <User className="w-3.5 h-3.5" />,
    Code2: <Code2 className="w-3.5 h-3.5" />,
  };

  useEffect(() => {
    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        scrollFrame = 0;
      });
    };

    const sections = ["home", "about", "projects", "skills", "contact"]
      .map((section) => document.getElementById(section))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center pt-4 px-4 sm:px-6 pointer-events-none">
        <nav
          className={`w-full max-w-6xl flex items-center justify-between pointer-events-auto transition-all duration-300 ${
            isScrolled ? "py-1" : "py-2"
          }`}
        >
          {/* Left Pill: Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-nav hover:border-[#10110E]/25 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-[#C7F04B] border border-[#10110E]/20 group-hover:scale-125 transition-transform" />
              <span className="font-mono text-sm font-semibold tracking-tight text-[#10110E]">
                {siteConfig.siteName}
              </span>
            </a>
          </motion.div>

          {/* Center Pill: Desktop Nav Links */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass-nav"
          >
            {siteConfig.navItems.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#10110E] font-semibold"
                      : "text-[#62655B] hover:text-[#10110E]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-[#10110E]/[0.06] border border-[#10110E]/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 opacity-80">{iconMap[item.icon]}</span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Right Pill: Contact Action & Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-medium text-[#62655B] hover:text-[#10110E] hover:border-[#10110E]/25 transition-all group"
            >
              <Mail className="w-3.5 h-3.5 text-[#10110E] group-hover:rotate-12 transition-transform" />
              <span>Contact Me</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-nav text-[#62655B] hover:text-[#10110E]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl glass-nav md:hidden border border-[#10110E]/10 flex flex-col gap-2"
          >
            {siteConfig.navItems.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#10110E]/[0.06] text-[#10110E] font-semibold"
                      : "text-[#62655B] hover:text-[#10110E] hover:bg-[#10110E]/[0.04]"
                  }`}
                >
                  <span className="text-[#10110E]">{iconMap[item.icon]}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="h-px bg-[#10110E]/10 my-1" />
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#C7F04B] text-[#10110E] hover:bg-[#B9E03F] font-medium text-sm transition-colors border border-[#10110E]/10"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
