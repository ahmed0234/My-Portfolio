"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

export default function HeroBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      aria-hidden="true"
    >
      {/* Layer 1: Technical grid system */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Secondary finer grid */}
      <div
        className="absolute inset-0 opacity-[0.024]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 0.5px, transparent 0.5px),
            linear-gradient(90deg, var(--border) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Layer 2: Soft ambient radial gradients */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] opacity-[0.085]"
        style={{
          background:
            "radial-gradient(ellipse, var(--text-subtle) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, var(--text-subtle) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute top-[30%] right-[20%] w-[400px] h-[400px] opacity-[0.045]"
        style={{
          background:
            "radial-gradient(circle, var(--text-subtle) 0%, transparent 50%)",
        }}
      />

      {/* Layer 3: SVG architectural system — blueprint lines, network paths, nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Horizontal architectural wireframe lines */}
        <motion.line
          x1="0" y1="25%" x2="100%" y2="25%"
          stroke="var(--border)" strokeWidth="0.5" opacity="0.2"
          strokeDasharray="8 16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
        <motion.line
          x1="0" y1="75%" x2="100%" y2="75%"
          stroke="var(--border)" strokeWidth="0.5" opacity="0.16"
          strokeDasharray="4 20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, ease: "easeInOut", delay: 1 }}
        />

        {/* Vertical blueprint lines */}
        <motion.line
          x1="33%" y1="0" x2="33%" y2="100%"
          stroke="var(--border)" strokeWidth="0.5" opacity="0.15"
          strokeDasharray="6 24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.line
          x1="66%" y1="0" x2="66%" y2="100%"
          stroke="var(--border)" strokeWidth="0.5" opacity="0.12"
          strokeDasharray="4 28"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 9, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Flowing network connection paths */}
        <motion.path
          d="M0,40% Q15%,30% 30%,42% T60%,38% T100%,35%"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M0,65% Q20%,55% 35%,68% T65%,60% T100%,62%"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.09"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 3 }}
        />

        {/* Diagonal system-diagram connector lines */}
        <motion.path
          d="M10%,15% L25%,35% L40%,28% L55%,50%"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.14"
          strokeDasharray="3 9"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
        />
        <motion.path
          d="M60%,80% L72%,65% L85%,72% L95%,55%"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.12"
          strokeDasharray="4 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 4 }}
        />

        {/* Network nodes and scattered shimmering stars/dots */}
        {[
          // Core intersection nodes
          { cx: "25%", cy: "35%", r: 2.5, delay: 1, duration: 3.5 },
          { cx: "40%", cy: "28%", r: 2, delay: 2, duration: 4 },
          { cx: "55%", cy: "50%", r: 2.5, delay: 1.5, duration: 3.5 },
          { cx: "72%", cy: "65%", r: 2, delay: 2.5, duration: 4 },
          { cx: "85%", cy: "72%", r: 2.5, delay: 0.5, duration: 3 },
          { cx: "33%", cy: "25%", r: 1.5, delay: 3, duration: 5 },
          { cx: "66%", cy: "75%", r: 1.5, delay: 1.2, duration: 4.5 },
          // Scattered background stars
          { cx: "10%", cy: "15%", r: 1.5, delay: 0.8, duration: 3.2 },
          { cx: "18%", cy: "60%", r: 2, delay: 2.2, duration: 4.2 },
          { cx: "15%", cy: "80%", r: 1.2, delay: 3.5, duration: 5.2 },
          { cx: "30%", cy: "45%", r: 1.5, delay: 1.7, duration: 3.7 },
          { cx: "38%", cy: "85%", r: 2, delay: 0.3, duration: 2.8 },
          { cx: "45%", cy: "12%", r: 1.2, delay: 4.1, duration: 4.9 },
          { cx: "50%", cy: "68%", r: 1.8, delay: 2.9, duration: 3.9 },
          { cx: "60%", cy: "22%", r: 2, delay: 1.1, duration: 3.3 },
          { cx: "68%", cy: "10%", r: 1.2, delay: 3.2, duration: 5.0 },
          { cx: "78%", cy: "38%", r: 1.5, delay: 2.4, duration: 4.4 },
          { cx: "82%", cy: "20%", r: 2, delay: 0.7, duration: 3.1 },
          { cx: "90%", cy: "48%", r: 1.5, delay: 3.8, duration: 4.8 },
          { cx: "92%", cy: "85%", r: 1.8, delay: 1.4, duration: 3.6 },
          { cx: "5%", cy: "45%", r: 1.2, delay: 2.7, duration: 4.1 },
          { cx: "95%", cy: "20%", r: 1.5, delay: 3.0, duration: 3.8 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="var(--text)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}

        {/* Small architectural corner brackets */}
        {/* Top-left */}
        <line x1="5%" y1="8%" x2="8%" y2="8%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        <line x1="5%" y1="8%" x2="5%" y2="11%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        {/* Top-right */}
        <line x1="92%" y1="8%" x2="95%" y2="8%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        <line x1="95%" y1="8%" x2="95%" y2="11%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        {/* Bottom-left */}
        <line x1="5%" y1="92%" x2="8%" y2="92%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        <line x1="5%" y1="89%" x2="5%" y2="92%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        {/* Bottom-right */}
        <line x1="92%" y1="92%" x2="95%" y2="92%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />
        <line x1="95%" y1="89%" x2="95%" y2="92%" stroke="var(--border)" strokeWidth="0.5" opacity="0.28" />

        {/* Orbital geometry arcs — subtle concentric curves */}
        <motion.circle
          cx="65%" cy="45%" r="180"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.4"
          strokeDasharray="6 18"
          opacity="0.12"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "65% 45%" }}
        />
        <motion.circle
          cx="65%" cy="45%" r="280"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.3"
          strokeDasharray="4 24"
          opacity="0.08"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "65% 45%" }}
        />
      </svg>

      {/* Layer 4: Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Layer 5: Cursor-following spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 150 }}
        style={{
          background:
            "radial-gradient(circle, rgba(250,250,250,0.038) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
