"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface BrowserFrameProps {
  image: string;
  alt: string;
}

export default function BrowserFrame({
  image,
  alt,
}: BrowserFrameProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
      className="relative mx-auto w-full max-w-6xl"
    >
      {/* Glow */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-purple-500/20 blur-3xl" />

      {/* Browser */}

      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d] shadow-[0_40px_120px_rgba(0,0,0,.55)]">

        {/* Top Bar */}

        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-[#141414] px-5">

          <div className="flex gap-2">

            <div className="h-3 w-3 rounded-full bg-red-500" />

            <div className="h-3 w-3 rounded-full bg-yellow-500" />

            <div className="h-3 w-3 rounded-full bg-green-500" />

          </div>

          <div className="mx-6 hidden h-9 flex-1 items-center rounded-full bg-white/5 px-4 text-sm text-zinc-500 md:flex">
            harshit.dev
          </div>

          <div className="w-12" />

        </div>

        {/* Screenshot */}

        <div className="relative aspect-video w-full bg-black">

          <Image
            src={image}
            alt={alt}
            fill
            priority
            className="object-cover object-top"
          />

        </div>

      </div>
    </motion.div>
  );
}