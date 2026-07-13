"use client";

import Glow from "../ui/glow";
import Grid from "../ui/grid";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="mx-auto max-w-5xl text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="mb-5 text-sm uppercase tracking-[0.3em] text-zinc-500"
        >
          Student • Builder • AI Enthusiast
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1, duration: .5 }}
          className="text-5xl font-bold leading-tight md:text-7xl"
        >
          Hi, I'm Harshit — A
          <br />
          <span className="text-blue-500">
            self-driven developer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2, duration: .5 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400"
        >
          I'm Harshit. I'm a student exploring AI, software engineering,
          and product design through real-world projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3, duration: .5 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            href="#work"
            className="rounded-full bg-white px-6 py-3 text-black transition hover:scale-105"
          >
            View Work
          </Link>

          <Link
            href="https://github.com/harshittpanday"
            target="_blank"
            className="rounded-full border border-white/10 px-6 py-3 transition hover:border-white"
          >
            GitHub
          </Link>
        </motion.div>

      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, y: [0, 10, 0] }}
  transition={{
    delay: 1,
    duration: 2,
    repeat: Infinity,
  }}
  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500"
>
  ↓ Scroll
</motion.div>

      </div> 



    </section>

    
  );
}
