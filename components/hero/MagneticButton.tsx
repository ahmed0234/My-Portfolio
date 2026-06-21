"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  href = "#",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const glowOpacity = useMotionValue(0);
  const springGlow = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    x.set(deltaX);
    y.set(deltaY);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
    scale.set(1);
  };

  const handleMouseDown = () => {
    scale.set(0.96);
  };

  const handleMouseUp = () => {
    scale.set(1);
  };

  const baseClasses =
    variant === "primary"
      ? "bg-text text-background hover:bg-text-secondary"
      : "bg-card border border-border text-text hover:bg-surface";

  const glowColor =
    variant === "primary"
      ? "rgba(250,250,250,0.12)"
      : "rgba(250,250,250,0.06)";

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`relative inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-medium text-sm tracking-wide transition-colors duration-300 cursor-pointer select-none overflow-hidden ${baseClasses} ${className}`}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Glow layer */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          opacity: springGlow,
          boxShadow: `0 0 30px 4px ${glowColor}`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2.5 font-semibold">
        {children}
      </span>
    </motion.a>
  );
}
