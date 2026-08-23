"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { toggleSound } from "@/lib/sound";

export const AudioToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const nextState = toggleSound();
    setEnabled(nextState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-full glass-nav border transition-all duration-300 shadow-lg ${
          enabled
            ? "border-brand-purple/50 text-brand-purple bg-purple-950/40"
            : "border-white/10 text-neutral-400 hover:text-white"
        }`}
        title={enabled ? "Mute interactive audio" : "Enable tactile sound feedback"}
        aria-label={enabled ? "Disable interactive audio" : "Enable interactive audio"}
        aria-pressed={enabled}
      >
        {enabled ? (
          <>
            <Volume2 className="w-4 h-4 text-brand-purple animate-pulse" />
            <span className="text-[11px] font-mono font-medium">Audio On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-[11px] font-mono">Audio Off</span>
          </>
        )}
      </button>
    </div>
  );
};
