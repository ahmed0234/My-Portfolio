"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

// Code Icon SVG Component
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

// Navigation Links config
const NAV_LINKS = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Lab", href: "#lab" },
];

// Custom CTA Button Component
export function NavbarCTA() {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 450, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.12;
    const deltaY = (e.clientY - centerY) * 0.12;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseDown = () => {
    scale.set(0.96);
  };

  const handleMouseUp = () => {
    scale.set(1.02);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
      }}
      className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[13.5px] tracking-tight font-sans text-text transition-all duration-300 bg-surface/90 border border-border shadow-lg shadow-black/40 overflow-hidden cursor-pointer select-none"
    >
      {/* Premium inner glow & subtle border glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? "inset 0 0 12px rgba(250, 250, 250, 0.08), 0 0 0 1px rgba(250, 250, 250, 0.12)"
            : "inset 0 0 8px rgba(250, 250, 250, 0.02)",
        }}
      />

      <span className="relative z-10 flex items-center gap-2 font-medium">
        Book a Meeting
        {/* Arrow wrapper with hover transitions */}
        <span className="relative flex items-center justify-center">
          <AnimatePresence>
            {isHovered && (
              <motion.span
                layoutId="arrowGlow"
                className="absolute w-5 h-5 rounded-full bg-text/10 blur-[4px]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          <motion.svg
            className="w-3.5 h-3.5 text-text"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              x: isHovered ? 2.5 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </motion.svg>
        </span>
      </span>
    </motion.a>
  );
}

// Hamburger icon animation
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg className="w-5 h-5 text-text" viewBox="0 0 20 20" fill="currentColor">
      <motion.rect
        x="2"
        y="4"
        width="16"
        height="1.5"
        rx="0.75"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 5.25 : 0,
          transformOrigin: "center",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
      <motion.rect
        x="2"
        y="9.25"
        width="16"
        height="1.5"
        rx="0.75"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.rect
        x="2"
        y="14.5"
        width="16"
        height="1.5"
        rx="0.75"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -5.25 : 0,
          transformOrigin: "center",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </svg>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer for Active Navigation Spy
  useEffect(() => {
    const sections = ["work", "experience", "lab"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px",
          threshold: 0.15,
        },
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Scroll to link handler
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = targetId;
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center border-b font-sans transition-all duration-300"
      animate={{
        backgroundColor: isScrolled
          ? "rgba(13, 13, 13, 0.85)"
          : "rgba(13, 13, 13, 0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderColor: isScrolled ? "var(--border)" : "rgba(43, 43, 43, 0)",
        height: isScrolled ? 72 : 84,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between relative">
        {/* Left Side: Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
          className="flex items-center gap-2 group select-none"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-border text-[12px] font-mono text-text-secondary group-hover:text-text group-hover:border-text-subtle transition-all duration-300">
            <CodeIcon />
          </div>
          <span className="font-sans font-medium text-[16px] md:text-lg tracking-tight text-text">
            Ahmed.
          </span>
        </a>

        {/* Center: Empty space */}
        <div className="flex-1" />

        {/* Right Side: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href.slice(1))}
                className="relative py-2 font-sans font-medium text-[14px] md:text-base tracking-tight transition-colors duration-300 select-none cursor-pointer"
                style={{
                  color: isActive ? "var(--text)" : "var(--text-secondary)",
                }}
              >
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.span>

                {/* Animated Indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-text"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </a>
            );
          })}

          <div className="pl-4">
            <NavbarCTA />
          </div>
        </nav>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface/50 border border-border/80 focus:outline-none transition-all duration-300 hover:border-text-subtle"
          aria-label="Toggle menu"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>

        {/* Mobile Slide-Down Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[60px] left-6 right-6 z-40 bg-surface/95 border border-border backdrop-blur-lg rounded-2xl flex flex-col p-6 gap-4 lg:hidden shadow-2xl shadow-black/80"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleScrollTo(e, link.href.slice(1));
                    }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg font-sans font-medium text-[15px] tracking-tight hover:bg-card/50 transition-colors duration-300"
                    style={{
                      color: isActive ? "var(--text)" : "var(--text-secondary)",
                    }}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-text" />
                    )}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-border/60 flex justify-center">
                <NavbarCTA />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
