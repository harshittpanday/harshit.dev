"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BrowserFrame from "@/app/components/ui/browser-frame";
import ProjectTimeline from "@/app/components/project-timeline";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  live: string;
  github: string;
  tags: string[];
  year: string;
  role: string;
  status: string;
  overview: string;
  learned: string;
   timeline: {
    date: string;
    title: string;
    description: string;
  }[];
}

export default function ProjectView({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.main
      className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        All Projects
      </Link>

      <motion.section
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Case Study
        </p>

        <h1 className="mt-5 text-5xl md:text-7xl font-bold">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg md:text-xl leading-8 text-zinc-400">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={project.live}
            target="_blank"
            className="rounded-full bg-white text-black px-6 py-3 hover:scale-105 transition"
          >
            Live Demo
          </Link>

          <Link
            href={project.github}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 hover:border-white transition"
          >
            GitHub
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="mt-20 md:mt-24"
        initial={{ opacity: 0, scale: .95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: .2 }}
      >
        <BrowserFrame
          image={project.image}
          alt={project.title}
        />
      </motion.section>

<ProjectTimeline timeline={project.timeline} />

      <section className="mt-24 grid gap-6 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="text-2xl font-semibold">
            Overview
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            {project.overview}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="text-2xl font-semibold">
            Project Details
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-zinc-500">Year</span>
              <span>{project.year}</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-zinc-500">Role</span>
              <span>{project.role}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Status</span>
              <span>{project.status}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold">
          Tech Stack
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.section>

      <section className="mt-24 space-y-8">
        {[
          
          ["What I Learned", project.learned],
        ].map(([title, text]) => (
          <motion.div
            key={title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 p-10"
          >
            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              {text}
            </p>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
}