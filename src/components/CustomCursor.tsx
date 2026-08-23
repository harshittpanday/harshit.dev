"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const visibleRef = useRef(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { damping: 32, stiffness: 900, mass: 0.18 });
  const ringY = useSpring(pointerY, { damping: 32, stiffness: 900, mass: 0.18 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) {
      return;
    }
    setIsEnabled(true);

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer")
      );
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };
    const handlePointerOver = (e: PointerEvent) => setIsPointer(isInteractive(e.target));
    const handlePointerOut = (e: PointerEvent) => setIsPointer(isInteractive(e.relatedTarget));

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [pointerX, pointerY]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/50 bg-brand-purple/10 backdrop-blur-[1px] will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isPointer ? 48 : 24,
          height: isPointer ? 48 : 24,
          borderWidth: isPointer ? "1.5px" : "1px",
          borderColor: isPointer ? "rgba(167, 139, 250, 0.8)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow-warm will-change-transform"
        style={{
          x: pointerX,
          y: pointerY,
          visibility: isVisible ? "visible" : "hidden",
        }}
        animate={{
          width: isPointer ? 6 : 4,
          height: isPointer ? 6 : 4,
          opacity: isPointer ? 0.8 : 1,
        }}
      />
    </>
  );
};
