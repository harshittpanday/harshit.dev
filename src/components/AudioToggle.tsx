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
            ? "border-[#10110E]/25 text-[#10110E] bg-[#C7F04B]"
            : "border-[#10110E]/10 text-[#62655B] hover:text-[#10110E]"
        }`}
        title={enabled ? "Mute interactive audio" : "Enable tactile sound feedback"}
        aria-label={enabled ? "Disable interactive audio" : "Enable interactive audio"}
        aria-pressed={enabled}
      >
        {enabled ? (
          <>
            <Volume2 className="w-4 h-4 text-[#10110E] animate-pulse" />
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
