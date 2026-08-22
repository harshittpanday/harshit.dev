"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Mail,
  Send,
  Check,
  Copy,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    playSuccessSound();

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.85 },
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      return;
    }

    setIsSubmitting(true);
    setError("");
    playClickSound();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      playSuccessSound();

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti fallback
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-6"
              >
                Let&apos;s build something{" "}
                <span className="text-brand-purple">remarkable</span>.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed mb-8 max-w-md"
              >
                Whether you have an ambitious product idea, want to architect
                an AI-native system, or just want to chat about tech—my inbox
                is always open.
              </motion.p>

              {/* Email */}
              <div className="p-6 rounded-3xl bg-[#0e0e14] border border-white/10 mb-8 max-w-md">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Direct Email
                </span>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm sm:text-base text-white font-medium truncate">
                    {siteConfig.email}
                  </span>

                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-purple hover:text-neutral-950 text-xs font-mono text-white transition-all shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-neutral-500 mr-2">
                Socials:
              </span>

              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-brand-cyan" />
                <span>LinkedIn</span>
              </a>

              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-nav text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all"
              >
                <Twitter className="w-3.5 h-3.5 text-brand-purple" />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-white/10 relative overflow-hidden"
            >
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h3>

                  <p className="text-sm text-neutral-400 font-sans max-w-xs mb-6">
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        message: "",
                      });
                      setError("");
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Your Name
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-purple/60 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Your Email
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="xyz@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-purple/60 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Project or Message
                    </label>

                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project, timeline, or vision..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-purple/60 transition-colors font-sans resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 font-sans">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-neutral-950 font-display font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-purple/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};