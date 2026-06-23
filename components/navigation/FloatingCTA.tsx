"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { FiMessageSquare } from "react-icons/fi";

export default function FloatingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [ctaState, setCtaState] = useState<"initial" | "build" | "bottom">(
    "initial",
  );

  // Proximity values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-fidelity spring for attraction lag
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  // Handle contextual text transitions based on scroll & time
  useEffect(() => {
    // 1. Time-based transition: after 20s, switch to "build" (if still initial)
    const timer = setTimeout(() => {
      setCtaState((prev) => (prev === "initial" ? "build" : prev));
    }, 20000);

    // 2. Scroll-based transitions
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Scrolled to bottom / near contact section
      if (scrollY + windowHeight >= docHeight - 850) {
        setCtaState("bottom");
      }
      // Scrolled past Hero / into selected works
      else if (scrollY > 550) {
        setCtaState("build");
      }
      // Back at the top (under 550px)
      else {
        // Revert to initial if under 550px, unless 20s has passed (keep "build")
        setCtaState((prev) => (prev === "bottom" ? "build" : prev));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle magnetic attraction based on cursor proximity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      // Distance between cursor and button center
      const distance = Math.hypot(e.clientX - cX, e.clientY - cY);

      // Proximity pull threshold (180px)
      if (distance < 180) {
        const pull = (180 - distance) / 180; // 0 (far) to 1 (near)
        // Gentle pull towards the cursor (max 15px displacement)
        const deltaX = (e.clientX - cX) * 0.12 * pull;
        const deltaY = (e.clientY - cY) * 0.12 * pull;
        x.set(deltaX);
        y.set(deltaY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  // Click scroll handler targeting the contact section
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("worth-remembering");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // State content config
  const textOptions = {
    initial: "Hire Me",
    build: "Let's Build",
    bottom: "Work With Me",
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 pointer-events-auto"
    >
      {/* Nested container for isolated idle float animation */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center group"
      >
        {/* ═══════════════════════════════════════════════════════════
            CURVED SVG POINTER ARROW
            ═══════════════════════════════════════════════════════════ */}
        <div className="absolute top-[-38px] left-[-38px] md:top-[-48px] md:left-[-48px] w-9 h-8 md:w-18 md:h-16 text-text-subtle/75 pointer-events-none select-none">
          <svg
            viewBox="0 0 65 55"
            fill="none"
            className="w-full h-full transform -rotate-12"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dashed curved arrow path */}
            <motion.path
              d="M 5 5 Q 40 10 50 40"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [-20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Arrowhead */}
            <path
              d="M 43 33 L 50 40 L 53 30"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FLOATING CAPSULE BUTTON
            ═══════════════════════════════════════════════════════════ */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer select-none relative overflow-hidden"
          style={{
            backgroundColor: "rgba(23, 23, 23, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow:
              "0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Subtle hover background accent glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Active Status pulsing indicator */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          {/* Transition-controlled text copy */}
          <span className="font-sans font-semibold text-[13px] md:text-sm tracking-tight text-text flex items-center gap-1.5 z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={ctaState}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap"
              >
                {textOptions[ctaState]}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Icon indicator */}
          <FiMessageSquare className="w-3.5 h-3.5 text-text-secondary group-hover:text-text transition-colors duration-300 z-10 shrink-0" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
