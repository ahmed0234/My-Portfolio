"use client";

import React from "react";
import { motion } from "motion/react";
import { FaWhatsapp, FaInstagram, FaGithub } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
import { FiMail } from "react-icons/fi";

// Same Code Icon SVG from Navbar
const CodeIcon = () => (
  <svg
    className="w-4 h-4 text-text"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/ahmed0234",
    icon: FaGithub,
    color: "rgba(255, 255, 255, 0.15)",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/apexsolace/",
    icon: FaInstagram,
    color: "rgba(225, 48, 108, 0.15)",
    glowColor: "rgba(225, 48, 108, 0.35)",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~014eb59df4fe5c0959?mp_source=share",
    icon: SiUpwork,
    color: "rgba(55, 160, 0, 0.15)",
    glowColor: "rgba(55, 160, 0, 0.35)",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/03355144371",
    icon: FaWhatsapp,
    color: "rgba(37, 211, 102, 0.15)",
    glowColor: "rgba(37, 211, 102, 0.35)",
  },
  {
    name: "Email",
    href: "mailto:ahmedkiller0234@gmail.com",
    icon: FiMail,
    color: "rgba(245, 158, 11, 0.15)",
    glowColor: "rgba(245, 158, 11, 0.35)",
  },
];

// Spring transition settings (no bounce, fast, refined)
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden pb-12 pt-8 z-40 bg-transparent flex flex-col items-center">
      {/* ═══════════════════════════════════════════════════════════
          ATMOSPHERIC DIVIDER
          ═══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1200px] px-6 md:px-10 mb-8 relative select-none pointer-events-none">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[8px] bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent blur-[4px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FLOATING GLASS CARD
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1200px] px-6 md:px-10"
      >
        <div 
          className="w-full px-6 py-6 md:py-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Logo (Left side on Desktop, Top centered on Mobile) */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group select-none cursor-pointer"
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] text-[12px] font-mono text-text-secondary group-hover:text-text group-hover:border-[rgba(255,255,255,0.2)] transition-all duration-300">
              <CodeIcon />
            </div>
            <span className="font-sans font-medium text-[16px] md:text-lg tracking-tight text-text">
              Ahmed.
            </span>
          </motion.a>

          {/* Social Links (Right side on Desktop, Underneath on Mobile) */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border relative overflow-hidden group select-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.01)",
                    borderColor: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                    borderColor: "rgba(255, 255, 255, 0.18)",
                    backgroundColor: link.color,
                    boxShadow: `0 0 15px ${link.glowColor}`,
                  }}
                  transition={springTransition}
                >
                  <motion.div
                    className="relative z-10"
                    whileHover={{
                      rotate: 2.5,
                      scale: 1.08,
                    }}
                    transition={springTransition}
                  >
                    <Icon className="w-[18px] h-[18px] md:w-5 md:h-5 text-text-secondary group-hover:text-text transition-colors duration-300" />
                  </motion.div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Centered signature text below the card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-[11px] font-mono tracking-widest text-amber-50 select-none uppercase text-center"
      >
        Designed & Developed by Ahmed
      </motion.div>
    </footer>
  );
}
