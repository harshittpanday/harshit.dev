"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap, Code2, Brain } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    title: "Student",
    subtitle: "ALLEN Career Institute",
    period: "2026 — Present",
    description:
      "Preparing for JEE while building software and exploring AI in my free time.",
  },
  {
    icon: Code2,
    title: "Projects",
    subtitle: "Independent Developer",
    period: "2025 — Present",
    description:
      "Building products like Intent, Study AI, and other full-stack web applications.",
  },
  {
    icon: Brain,
    title: "Currently Learning",
    subtitle: "AI • TypeScript • System Design",
    period: "Every Day",
    description:
      "Focused on improving engineering skills by building real-world projects.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-zinc-500">
          Experience
        </p>

        <h2 className="text-5xl font-bold">
          Learning by building.
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          My journey so far has been driven by curiosity, consistent learning,
          and shipping projects that solve real problems.
        </p>
      </motion.div>

      <div className="mt-16 space-y-6">
        {timeline.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20"
            >
              <div className="flex gap-5">
                <div className="rounded-2xl bg-white/10 p-4">
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-zinc-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <span className="text-sm text-zinc-500">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-zinc-400 leading-7">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <a
          href="/resume.pdf"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
        >
          <Download size={18} />
          Download Resume
        </a>
      </div>
    </section>
  );
}