"use client";

import Link from "next/link";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/harshittpanday",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/harshit-pandey-02842b410/",
  },
  {
    name: "X",
    href: "https://x.com/harshittpanday",
  },
  {
    name: "Email",
    href: "mailto:harshittpanday@gmail.com",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/harshittpanday",
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:justify-between">

        <div>
          <h3 className="text-2xl font-bold">
            Harshit Pandey
          </h3>

          <p className="mt-3 max-w-sm text-zinc-400">
            Building products with curiosity and shipping ideas that solve
            real problems.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {socials.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-zinc-400 transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
        © 2026 Harshit Raj Pandey.
      </div>
    </footer>
  );
}