"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  applyPresenceStaleness,
  offlinePresence,
  type PresenceRecord,
} from "@/lib/presence";

const POLL_INTERVAL_MS = 20_000;

const formatDuration = (startedAt: string, now: number) => {
  const elapsedSeconds = Math.max(0, Math.floor((now - Date.parse(startedAt)) / 1000));
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
};

export const ActivityPresence: React.FC = () => {
  const [presence, setPresence] = useState<PresenceRecord>(() => offlinePresence());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let cancelled = false;

    const refreshPresence = async () => {
      try {
        const response = await fetch("/api/presence", { cache: "no-store" });
        if (!response.ok) throw new Error("Presence request failed.");
        const nextPresence = (await response.json()) as PresenceRecord;
        if (!cancelled) setPresence(applyPresenceStaleness(nextPresence));
      } catch {
        if (!cancelled) {
          setPresence((current) => applyPresenceStaleness(current));
        }
      }
    };

    void refreshPresence();
    const pollInterval = window.setInterval(refreshPresence, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    const clockInterval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(clockInterval);
  }, []);

  const visiblePresence = useMemo(
    () => applyPresenceStaleness(presence, now),
    [presence, now],
  );

  const contentKey = visiblePresence.status === "offline"
    ? "offline"
    : `${visiblePresence.primary?.app ?? "spotify"}:${visiblePresence.spotify?.title ?? ""}`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={contentKey}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {visiblePresence.status === "offline" ? (
          <>
            <div className="flex items-center gap-2 text-sm font-mono text-[#62655B] mb-3">
              <span className="h-2.5 w-2.5 rounded-full border border-[#62655B]" />
              <span>Offline</span>
            </div>
            <p className="text-base sm:text-lg text-[#30322C] font-sans leading-relaxed max-w-md">
              I&apos;m not at my desk right now. Probably building something somewhere else.
            </p>
          </>
        ) : (
          <div className="space-y-5">
            {visiblePresence.primary && (
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#10110E] tracking-tight">
                  {visiblePresence.primary.app}
                </h3>
                <p className="text-sm font-mono text-[#62655B] mt-1">
                  {visiblePresence.primary.activityType === "coding" ? "Working" : "Playing"}
                </p>
                <p className="text-xs font-mono text-[#62655B] mt-1.5">
                  Active for {formatDuration(visiblePresence.primary.startedAt, now)}
                </p>
              </div>
            )}

            {visiblePresence.spotify && (
              <div>
                <p className="text-sm font-mono text-[#62655B] mb-1">Spotify</p>
                <p className="text-base sm:text-lg text-[#30322C] font-sans leading-relaxed max-w-md">
                  {visiblePresence.spotify.title} — {visiblePresence.spotify.artist}
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
