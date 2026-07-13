"use client";

import { motion } from "framer-motion";
import BrowserFrame from "../ui/browser-frame";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/app/data/projects";

export default function Work() {
  return (
    <section
      id="work"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-zinc-500">
          Selected Work
        </p>

        <h2 className="text-5xl font-bold">
          Things I've Built
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          A selection of projects where I explored AI, product design,
          and modern web technologies.
        </p>
      </motion.div>

      <div className="mt-24 space-y-32">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className={`grid items-center gap-16 lg:grid-cols-2 ${
              index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text */}
            <div>

              <h3 className="text-4xl font-bold">
                {project.title}
              </h3>

              <p className="mt-6 text-lg leading-8 text-zinc-400">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-white transition hover:gap-4"
                >
                  View Case Study
                  <ArrowRight size={18} />
                </Link>
              </div>

            </div>

            {/* Preview */}
            <Link
              href={`/projects/${project.slug}`}
              className="block"
            >
              <motion.div
                whileHover={{
  y: -10,
  scale: 1.03,
}}
             transition={{
  type: "spring",
  stiffness: 140,
  damping: 16,
}}
              >
                <BrowserFrame
                  image={project.image}
                  alt={project.title}
                />
              </motion.div>
            </Link>

          </motion.article>
        ))}
      </div>
    </section>
  );
}