"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "4+",
    label: "Projects Built",
  },
  {
    number: "1+",
    label: "Years Learning",
  },
  {
    number: "∞",
    label: "Ideas to Explore",
  },
];

const interests = [
  "Artificial Intelligence",
  "Full Stack Development",
  "Product Design",
  "TypeScript",
  "Open Source",
  "UI/UX",
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-zinc-500">
          About
        </p>

        <h2 className="text-5xl font-bold">
          Building. Learning. Improving.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          I'm Harshit Pandey, a student who enjoys building software,
          experimenting with AI, and turning ideas into products.
          Every project teaches me something new—from designing interfaces
          to solving technical challenges.
        </p>
      </motion.div>

      <div className="mt-20 grid gap-8 lg:grid-cols-2">

        {/* Stats */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h3 className="text-xl font-semibold">
            Snapshot
          </h3>

          <div className="mt-8 grid grid-cols-3 gap-6">

            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-4xl font-bold">
                  {item.number}
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Interests */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h3 className="text-xl font-semibold">
            Currently Exploring
          </h3>

          <div className="mt-8 flex flex-wrap gap-3">

            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}