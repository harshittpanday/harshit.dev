"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useSpring(0, { damping: 28, stiffness: 450 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 450 });

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/50 bg-brand-purple/10 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow-warm"
        style={{
          x: cursorX,
          y: cursorY,
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
