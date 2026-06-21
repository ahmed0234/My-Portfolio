"use client";

import { motion } from "motion/react";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <motion.span
        className="text-[11px] text-text-subtle font-mono tracking-[0.2em] uppercase"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to explore
      </motion.span>

      {/* Custom SVG scroll indicator */}
      <motion.svg
        width="18"
        height="28"
        viewBox="0 0 18 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-subtle"
        aria-hidden="true"
      >
        {/* Mouse/scroll outline */}
        <rect
          x="1"
          y="1"
          width="16"
          height="26"
          rx="8"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Animated scroll dot */}
        <motion.circle
          cx="9"
          cy="8"
          r="2"
          fill="currentColor"
          animate={{ cy: [8, 18, 8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          opacity="0.7"
        />
      </motion.svg>
    </motion.div>
  );
}
