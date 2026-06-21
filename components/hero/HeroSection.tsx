"use client";

import { motion } from "motion/react";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { TbApi } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";
import { LuCalendarDays } from "react-icons/lu";

import HeroBackground from "./HeroBackground";
import MagneticButton from "./MagneticButton";
import PortraitSection from "./PortraitSection";
import ScrollIndicator from "./ScrollIndicator";

const TRUST_ITEMS = [
  { label: "Next.js", icon: SiNextdotjs },
  { label: "React", icon: SiReact },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "TypeScript", icon: SiTypescript },
  { label: "APIs", icon: TbApi },
  { label: "Full Stack", icon: HiOutlineCommandLine },
];

// Stagger animation configuration
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeBlurUp = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <HeroBackground />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-24 md:pt-28 lg:pt-0 lg:items-center">
          {/* Left side: Copy + CTAs + Trust */}
          <motion.div
            className="flex-1 flex flex-col justify-center space-y-7 max-w-xl lg:max-w-none order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small label */}
            <motion.div
              className="inline-flex items-center gap-2 self-start"
              variants={fadeBlurUp}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-[12px] text-text-subtle font-mono tracking-[0.12em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                Frontend First Full-Stack Engineer
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div className="space-y-2" variants={fadeBlurUp}>
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold font-manrope text-text tracking-tight leading-[1.1]">
               Where great design meets great
                <span className="text-text-secondary italic"> engineering</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-manrope font-medium text-text-muted tracking-tight">
                Fast. Scalable. Designed to be used.
              </p>
            </motion.div>

            {/* Subheading */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-text-secondary leading-normal max-w-lg"
              variants={fadeBlurUp}
            >
              I help startups, businesses, and founders transform ideas into
              high performance web applications with exceptional user
              experiences, scalable architecture, and clean engineering.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1"
              variants={fadeBlurUp}
            >
              <MagneticButton variant="primary" href="#work">
                Explore My Work
                <GoArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton variant="secondary" href="#contact">
                Book a Meeting
                <LuCalendarDays className="w-4 h-4" />
              </MagneticButton>
            </motion.div>

            {/* Trust bar — with label and larger icons */}
            <motion.div className="pt-5 space-y-3.5" variants={fadeBlurUp}>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-text-subtle" />
                <span className="text-[10px] text-text-subtle font-mono tracking-[0.18em] uppercase">
                  Tech I Work With
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {TRUST_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="group relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface/50 border border-border/70 cursor-default"
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 1.2 + i * 0.1,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    whileHover={{
                      scale: 1.12,
                      backgroundColor: "var(--card)",
                      borderColor: "var(--text-subtle)",
                      transition: { duration: 0.25 },
                    }}
                    title={item.label}
                  >
                    <item.icon className="w-6 h-6 text-text-subtle transition-colors duration-300 group-hover:text-text-secondary" />

                    {/* Tooltip */}
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] text-text-muted font-mono tracking-wider bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: Portrait */}
          <motion.div
            className="flex-1 flex items-center justify-center min-h-[400px] sm:min-h-[480px] lg:min-h-0 lg:h-full order-2 relative"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <PortraitSection />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
}
