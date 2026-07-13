"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";

const items = [
  {
    label: "Intent",
    action: () => window.open("/projects/intent", "_blank"),
  },
  {
    label: "Study AI",
    action: () =>
      window.open("/projects/study-ai", "_blank"),
  },
  {
    label: "Chat App",
    action: () => window.open("/projects/chat-app", "_blank"),
  },
  {
    label: "GitHub",
    action: () =>
      window.open("https://github.com/harshittpanday", "_blank"),
  },
  {
    label: "LinkedIn",
    action: () =>
      window.open(
        "https://linkedin.com/in/harshit-pandey-02842b410/",
        "_blank"
      ),
  },
  {
    label: "Resume",
    action: () => window.open("/resume.pdf", "_blank"),
  },
  {
    label: "Contact",
    action: () =>
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" }),
  },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isCmdK =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

      const slash =
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement);

      if (isCmdK || slash) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    window.addEventListener("keydown", down);

    return () => window.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-32 w-[90%] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
      >
        <Command.Input
          placeholder="Jump to a project, page, or link..."
          className="w-full border-b border-white/10 bg-transparent px-5 py-4 outline-none"
        />

        <Command.List className="max-h-96 overflow-y-auto p-2">
          {items.map((item) => (
            <Command.Item
              key={item.label}
              onSelect={() => {
                item.action();
                setOpen(false);
              }}
              className="cursor-pointer rounded-xl px-4 py-3 transition hover:bg-white/10"
            >
              {item.label}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}