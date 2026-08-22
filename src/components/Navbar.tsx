"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Home,
  BookOpen,
  Briefcase,
  User,
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
    BookOpen: <BookOpen className="w-3.5 h-3.5" />,
    Briefcase: <Briefcase className="w-3.5 h-3.5" />,
    User: <User className="w-3.5 h-3.5" />,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["home", "case-studies", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
              className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-nav hover:border-white/20 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-sm font-semibold tracking-tight text-white/90 group-hover:text-white">
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
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
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
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-medium text-neutral-200 hover:text-white hover:border-brand-purple/40 transition-all group"
            >
              <Mail className="w-3.5 h-3.5 text-brand-purple group-hover:rotate-12 transition-transform" />
              <span>Contact Me</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-nav text-neutral-300 hover:text-white"
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
            className="fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl glass-nav md:hidden border border-white/10 flex flex-col gap-2"
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
                      ? "bg-white/10 text-white font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-brand-purple">{iconMap[item.icon]}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="h-px bg-white/10 my-1" />
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 font-medium text-sm transition-colors border border-brand-purple/30"
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
