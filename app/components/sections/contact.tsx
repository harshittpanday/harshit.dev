"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Globe } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

const socials = [
  {
    title: "Email",
    subtitle: "harshittpanday@gmail.com",
    href: "mailto:harshittpanday@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    subtitle: "@harshittpanday",
    href: "https://github.com/harshittpanday",
    icon: SiGithub,
  },
  {
    title: "LinkedIn",
    subtitle: "Harshit Pandey",
    href: "https://linkedin.com/in/harshit-pandey-02842b410/",
    icon: Globe,
  },
  {
    title: "X",
    subtitle: "@harshittpanday",
    href: "https://x.com/harshittpanday",
    icon: SiX,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-zinc-500">
          Contact
        </p>

        <h2 className="text-5xl font-bold">
          Let's build something great.
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Whether you have a project, a question, or just want to connect,
          I'd love to hear from you.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <motion.a
              key={social.title}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7 text-zinc-300" />

                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {social.title}
              </h3>

              <p className="mt-2 text-zinc-400">
                {social.subtitle}
              </p>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}