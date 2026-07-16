"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export default function ProjectTimeline({
  timeline,
}: {
  timeline: TimelineItem[];
}) {
  return (
    <section className="mt-28">

      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-zinc-500">
        Development Journey
      </p>

      <h2 className="mb-16 text-4xl font-bold">
        From Idea to Launch
      </h2>

      <div className="relative">

        {/* Line */}

        <div className="absolute left-4 top-0 h-full w-px bg-white/10" />

        <div className="space-y-14">

          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="relative flex gap-8"
            >
              {/* Dot */}

              <div className="relative z-10 mt-2 h-8 w-8 rounded-full border border-blue-400 bg-black shadow-[0_0_25px_rgba(59,130,246,.5)]" />

              {/* Card */}

              <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-blue-500">

                <p className="text-sm text-zinc-500">
                  {item.date}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-zinc-400">
                  {item.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}