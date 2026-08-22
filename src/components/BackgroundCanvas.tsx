"use client";

import React, { useEffect, useRef } from "react";

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = [
      "rgba(167, 139, 250, ", // purple
      "rgba(254, 240, 138, ", // warm yellow
      "rgba(34, 211, 238, ",  // cyan
      "rgba(74, 222, 128, ",  // green
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let extraAlpha = 0;
        if (dist < 120) {
          extraAlpha = (1 - dist / 120) * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, p.alpha + extraAlpha)})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.035 * (1 - distBetween / 100)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Ambient Radial Lights */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-amber-900/08 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      
      {/* Subtle Grid Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 mask-radial" />
    </div>
  );
};
