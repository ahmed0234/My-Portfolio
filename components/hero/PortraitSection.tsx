"use client";

import { motion } from "motion/react";
import Image from "next/image";

const FLOATING_LABELS = [
  { text: "Frontend Architecture", x: "-16%", y: "16%", delay: 0 },
  { text: "Performance Engineering", x: "74%", y: "10%", delay: 0.8 },
  { text: "Product Thinking", x: "78%", y: "70%", delay: 1.6 },
  { text: "API Design", x: "-10%", y: "74%", delay: 2.4 },
  { text: "Scalable Systems", x: "30%", y: "-4%", delay: 1.2 },
  { text: "User Experience", x: "35%", y: "94%", delay: 2.0 },
];

export default function PortraitSection() {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[480px] md:min-h-[580px]">
      {/* Ambient glow behind portrait */}
      <div
        className="absolute w-[460px] h-[460px] md:w-[580px] md:h-[580px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(250,250,250,0.05) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* SVG Orbit Lines & Blueprint Elements */}
      <svg
        className="absolute w-[480px] h-[480px] md:w-[620px] md:h-[620px]"
        viewBox="0 0 620 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer orbit ring */}
        <motion.circle
          cx="310"
          cy="310"
          r="300"
          stroke="var(--text-subtle)"
          strokeWidth="0.8"
          strokeDasharray="6 8"
          opacity="0.35"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        {/* Middle orbit */}
        <motion.circle
          cx="310"
          cy="310"
          r="240"
          stroke="var(--text-subtle)"
          strokeWidth="0.6"
          strokeDasharray="4 10"
          opacity="0.8"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        {/* Inner orbit */}
        <motion.circle
          cx="310"
          cy="310"
          r="190"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="3 14"
          opacity="0.25"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />

        {/* === OUTER RING ORBITING NODES === */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((startAngle, i) => (
          <motion.g
            key={`outer-${i}`}
            initial={{ rotate: startAngle }}
            animate={{ rotate: startAngle + 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "310px 310px" }}
          >
            <circle
              cx="610"
              cy="310"
              r={i % 2 === 0 ? 3.5 : 2.5}
              fill="var(--text)"
              opacity={i % 2 === 0 ? 0.85 : 0.6}
            />
            {i % 3 === 0 && (
              <circle
                cx="610"
                cy="310"
                r="6"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="0.6"
                opacity="0.3"
              />
            )}
          </motion.g>
        ))}

        {/* === MIDDLE RING ORBITING NODES === */}
        {[30, 80, 130, 180, 230, 280, 330].map((startAngle, i) => (
          <motion.g
            key={`mid-${i}`}
            initial={{ rotate: startAngle }}
            animate={{ rotate: startAngle - 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "310px 310px" }}
          >
            <circle
              cx="550"
              cy="310"
              r={i % 2 === 0 ? 3 : 2}
              fill="var(--text-secondary)"
              opacity={0.5 + (i % 3) * 0.15}
            />
          </motion.g>
        ))}

        {/* === INNER RING ORBITING NODES === */}
        {[15, 75, 135, 195, 255, 315].map((startAngle, i) => (
          <motion.g
            key={`inner-${i}`}
            initial={{ rotate: startAngle }}
            animate={{ rotate: startAngle + 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "310px 310px" }}
          >
            <circle
              cx="500"
              cy="310"
              r={2}
              fill="var(--text)"
              opacity={0.45 + (i % 2) * 0.25}
            />
          </motion.g>
        ))}

        {/* Blueprint axis crosshairs — subtle */}
        <line
          x1="4"
          y1="310"
          x2="70"
          y2="310"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="550"
          y1="310"
          x2="616"
          y2="310"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="310"
          y1="4"
          x2="310"
          y2="70"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="310"
          y1="550"
          x2="310"
          y2="616"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />

        {/* Diagonal wireframe lines */}
        <line
          x1="60"
          y1="60"
          x2="130"
          y2="130"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="490"
          y1="60"
          x2="560"
          y2="130"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="60"
          y1="560"
          x2="130"
          y2="490"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="490"
          y1="560"
          x2="560"
          y2="490"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />

        {/* Tick marks on crosshairs */}
        <line
          x1="35"
          y1="305"
          x2="35"
          y2="315"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="585"
          y1="305"
          x2="585"
          y2="315"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="305"
          y1="35"
          x2="315"
          y2="35"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="305"
          y1="585"
          x2="315"
          y2="585"
          stroke="var(--text-subtle)"
          strokeWidth="0.5"
          opacity="0.15"
        />

        {/* Corner bracket marks */}
        <line
          x1="70"
          y1="70"
          x2="105"
          y2="70"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="70"
          y1="70"
          x2="70"
          y2="105"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="515"
          y1="70"
          x2="550"
          y2="70"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="550"
          y1="70"
          x2="550"
          y2="105"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="70"
          y1="550"
          x2="105"
          y2="550"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="70"
          y1="515"
          x2="70"
          y2="550"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="515"
          y1="550"
          x2="550"
          y2="550"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />
        <line
          x1="550"
          y1="515"
          x2="550"
          y2="550"
          stroke="var(--text-subtle)"
          strokeWidth="0.7"
          opacity="0.2"
        />

        {/* Inner measurement tick marks */}
        <line
          x1="150"
          y1="308"
          x2="150"
          y2="312"
          stroke="var(--border)"
          strokeWidth="0.4"
          opacity="0.15"
        />
        <line
          x1="470"
          y1="308"
          x2="470"
          y2="312"
          stroke="var(--border)"
          strokeWidth="0.4"
          opacity="0.15"
        />
        <line
          x1="308"
          y1="150"
          x2="312"
          y2="150"
          stroke="var(--border)"
          strokeWidth="0.4"
          opacity="0.15"
        />
        <line
          x1="308"
          y1="470"
          x2="312"
          y2="470"
          stroke="var(--border)"
          strokeWidth="0.4"
          opacity="0.15"
        />
      </svg>

      {/* Minimal grid overlay behind portrait */}
      <div
        className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] opacity-[0.03] rounded-full overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-subtle) 0.5px, transparent 0.5px),
            linear-gradient(90deg, var(--text-subtle) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Portrait image — slightly larger */}
      <motion.div
        className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          scale: { duration: 1, delay: 0.5, type: "spring", stiffness: 100 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          boxShadow: "0 0 100px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Soft edge mask */}
        <div
          className="absolute inset-0 z-10 rounded-full pointer-events-none"
          style={{
            boxShadow: "inset 0 0 70px 35px var(--background)",
          }}
        />
        <Image
          src="/portrait1.png"
          alt="Portrait of a full-stack engineer"
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 768px) 300px, 380px"
          priority
        />
      </motion.div>

      {/* Floating labels — clean style with meaningful content */}
      {FLOATING_LABELS.map((label, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border/80 text-[11px] text-text-muted font-mono tracking-wide whitespace-nowrap"
          style={{
            left: label.x,
            top: label.y,
          }}
          initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
          animate={{
            opacity: 1,
            y: [0, -5, 0],
            filter: "blur(0px)",
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.2 + label.delay },
            filter: { duration: 0.8, delay: 1.2 + label.delay },
            y: {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: label.delay,
            },
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-text-subtle" />
          {label.text}
        </motion.div>
      ))}
    </div>
  );
}
