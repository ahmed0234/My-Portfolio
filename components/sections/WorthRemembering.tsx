"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaGithub } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

// ═══════════════════════════════════════════════════════════
// SOCIAL CHANNELS DEFINITIONS
// ═══════════════════════════════════════════════════════════
const SOCIAL_CHANNELS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    text: "Quickest way to reach me.",
    color: "#25D366",
    href: "https://wa.me/03355144371",
    icon: FaWhatsapp,
  },
  {
    id: "instagram",
    name: "Instagram",
    text: "Design inspiration and updates.",
    color: "#E1306C",
    href: "https://www.instagram.com/apexsolace/",
    icon: FaInstagram,
  },
  {
    id: "github",
    name: "GitHub",
    text: "Explore the code behind the work.",
    color: "#FFFFFF",
    href: "https://github.com/ahmed0234",
    icon: FaGithub,
  },
  {
    id: "upwork",
    name: "Upwork",
    text: "Available for freelance opportunities.",
    color: "#37a000",
    href: "https://www.upwork.com/freelancers/~014eb59df4fe5c0959?mp_source=share",
    icon: SiUpwork,
  },
  {
    id: "email",
    name: "Email",
    text: "For detailed project discussions.",
    color: "#F59E0B",
    href: "mailto:ahmedkiller0234@gmail.com",
    icon: FiMail,
  },
];

// ═══════════════════════════════════════════════════════════
// MAIN WORTH REMEMBERING COMPONENT
// ═══════════════════════════════════════════════════════════
export default function WorthRemembering() {
  // Navigation links/Refs for coordinates calculation
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const receiverRef = useRef<HTMLDivElement>(null);

  // States
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [paths, setPaths] = useState<
    { id: string; d: string; color: string }[]
  >([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [flickerActive, setFlickerActive] = useState(false);

  // Form handling
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectDetails: "",
    website: "", // Honeypot field
  });

  // Cursor tracker variables
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringSection, setIsHoveringSection] = useState(false);

  // Button magnetic positions
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  // Check desktop viewport width
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Compute SVG bezier curve connection lines dynamically
  const calculatePaths = () => {
    if (!containerRef.current || !receiverRef.current || !isDesktop) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const receiverRect = receiverRef.current.getBoundingClientRect();

    // Receiver node center relative to parent container
    const rx = receiverRect.left + receiverRect.width / 2 - parentRect.left;
    const ry = receiverRect.top + receiverRect.height / 2 - parentRect.top;

    const newPaths = cardRefs.current
      .map((card, idx) => {
        if (!card) return null;
        const cardRect = card.getBoundingClientRect();

        // Right edge center of card relative to parent container
        const cx = cardRect.right - parentRect.left;
        const cy = cardRect.top + cardRect.height / 2 - parentRect.top;

        // Custom S-curve Bezier control points
        const cp1x = cx + (rx - cx) * 0.45;
        const cp1y = cy;
        const cp2x = cx + (rx - cx) * 0.55;
        const cp2y = ry;

        return {
          id: SOCIAL_CHANNELS[idx].id,
          d: `M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${rx} ${ry}`,
          color: SOCIAL_CHANNELS[idx].color,
        };
      })
      .filter(Boolean) as { id: string; d: string; color: string }[];

    setPaths(newPaths);
  };

  // Trigger path calculation on dimensions changes
  useEffect(() => {
    if (isDesktop) {
      calculatePaths();
      // Execute with a slight delay to allow page layouts to settle
      const t = setTimeout(calculatePaths, 400);
      window.addEventListener("resize", calculatePaths);
      return () => {
        window.removeEventListener("resize", calculatePaths);
        clearTimeout(t);
      };
    } else {
      setPaths([]);
    }
  }, [isDesktop]);

  // Mouse movement on whole section (spotlight effect)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Trigger lightning background energy flicker on hover start
  const handleCardHoverStart = (idx: number) => {
    setHoveredIdx(idx);
    setFlickerActive(true);
    const t = setTimeout(() => setFlickerActive(false), 180);
    return () => clearTimeout(t);
  };

  const handleCardHoverEnd = () => {
    setHoveredIdx(null);
  };

  // Button Magnetic Hover tracking
  const handleButtonMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Dynamic magnetic pull limits
    setButtonPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleButtonMouseLeave = () => {
    setButtonPos({ x: 0, y: 0 });
  };

  // Input events
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === "sending") return;

    if (!turnstileToken) {
      setErrorMessage("Please complete verification before submitting.");
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setFormStatus("error");
        setErrorMessage(
          data.message ||
            "Failed to send message. Please try again in a few moments.",
        );
        // Reset turnstile on error to enforce fresh verification
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      } else {
        setFormStatus("success");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormStatus("error");
      setErrorMessage("Server unavailable. Please try again later.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  // Animation configurations
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const activeColor =
    hoveredIdx !== null ? SOCIAL_CHANNELS[hoveredIdx].color : "var(--border)";

  return (
    <section
      id="worth-remembering"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => {
        setIsHoveringSection(false);
        setHoveredIdx(null);
      }}
      className="relative w-full bg-background border-t border-border/40 overflow-hidden py-24 md:py-32"
    >
      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: CINEMATIC ATMOSPHERIC MOOD BACKGROUND
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen select-none">
        <Image
          src="/Form/BackgorundOrOnFormAtmosphere.png"
          alt="Cinematic Atmosphere"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: SVG COMMUNICATION NETWORK CANVAS
          ═══════════════════════════════════════════════════════════ */}
      {isDesktop && paths.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, idx) => {
            const isActive = hoveredIdx === idx;
            return (
              <g key={path.id}>
                {/* Underlay passive path */}
                <path
                  d={path.d}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                  opacity="0.15"
                  className="transition-opacity duration-300"
                />

                {/* Active glowing path */}
                <motion.path
                  d={path.d}
                  fill="none"
                  stroke={path.color}
                  strokeWidth="2.2"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={
                    isActive
                      ? { opacity: 0.75, pathLength: 1 }
                      : { opacity: 0, pathLength: 0 }
                  }
                  transition={{
                    opacity: { duration: 0.35 },
                    pathLength: { duration: 0.45, ease: "easeOut" },
                  }}
                  style={{
                    filter: `drop-shadow(0 0 6px ${path.color}b0)`,
                  }}
                />

                {/* Progressive running spark dots flow */}
                {isActive && (
                  <motion.path
                    d={path.d}
                    fill="none"
                    stroke={path.color}
                    strokeWidth="3.2"
                    strokeDasharray="6 12"
                    animate={{ strokeDashoffset: [-36, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      filter: `drop-shadow(0 0 8px ${path.color})`,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      )}

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: THUNDERSTORM ENERGY OVERLAYS
          ═══════════════════════════════════════════════════════════ */}
      {/* Spark behind form card */}
      <motion.div
        animate={{
          opacity: flickerActive
            ? [0.12, 0.45, 0.22, 0.38, 0.12]
            : [0.12, 0.16, 0.12],
          scale: flickerActive ? [1, 1.03, 0.99, 1.01, 1] : 1,
        }}
        transition={{
          duration: flickerActive ? 0.32 : 6,
          repeat: flickerActive ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-16 w-[550px] h-[550px] pointer-events-none mix-blend-screen z-20 select-none"
      >
        <Image
          src="/Form/Thunder.png"
          alt="Thunderstorm Ambient Sparks"
          fill
          className="object-contain object-right"
        />
      </motion.div>

      {/* Spark around the CTA / Left hub */}
      <motion.div
        animate={{
          opacity: flickerActive
            ? [0.08, 0.35, 0.18, 0.3, 0.08]
            : [0.08, 0.11, 0.08],
        }}
        transition={{
          duration: flickerActive ? 0.32 : 8,
          repeat: flickerActive ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-150px] bottom-10 w-[450px] h-[450px] pointer-events-none mix-blend-screen z-20 select-none"
      >
        <Image
          src="/Form/Thunder2.png"
          alt="Thunderstorm Ambient Energy"
          fill
          className="object-contain object-left"
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 6: CURSOR INTERACTIONS SPOTLIGHT OVERLAY
          ═══════════════════════════════════════════════════════════ */}
      {isDesktop && isHoveringSection && (
        <div
          className="absolute pointer-events-none rounded-full blur-[110px] z-50 opacity-40 transition-all duration-300"
          style={{
            width: "450px",
            height: "450px",
            left: mousePos.x - 225,
            top: mousePos.y - 225,
            background:
              hoveredIdx !== null
                ? `radial-gradient(circle, ${SOCIAL_CHANNELS[hoveredIdx].color}26 0%, transparent 70%)`
                : "radial-gradient(circle, rgba(250, 250, 250, 0.03) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════
          MAIN WRAPPER & GRID CONTAINER (LAYERS 4 & 5)
          ═══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col gap-16 md:gap-24 relative z-30">
        {/* SECTION HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-[760px] space-y-4"
        >
          <div className="flex items-center gap-2 select-none">
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: activeColor,
                boxShadow:
                  hoveredIdx !== null ? `0 0 8px ${activeColor}` : "none",
              }}
            />
            <span className="text-[11px] text-text-subtle font-mono tracking-[0.25em] uppercase">
              START A CONVERSATION
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[3.6rem] font-bold font-manrope text-text tracking-tight leading-[1.1]">
            Let's Build Something Worth Remembering
          </h2>

          <p className="text-base sm:text-lg font-sans text-text-secondary leading-relaxed max-w-[700px]">
            Whether it's a product, a business, a landing page, or an ambitious
            idea I'm always interested in building experiences that people
            genuinely enjoy using.
          </p>
        </motion.div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT SIDE: Connection Hub */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-5 order-1 lg:order-none"
          >
            <div className="mb-2 select-none">
              <span className="text-[10px] font-mono tracking-widest text-text-subtle uppercase">
                // connection hub
              </span>
              <h3 className="text-sm font-semibold text-text-muted mt-1">
                Choose your preferred channel
              </h3>
            </div>

            {SOCIAL_CHANNELS.map((channel, idx) => {
              const Icon = channel.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleCardHoverStart(idx)}
                  onMouseLeave={handleCardHoverEnd}
                  className="relative flex items-center gap-5 p-5 bg-card/10 backdrop-blur-md border border-border/50 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group select-none"
                  style={{
                    borderColor: isHovered ? channel.color : "var(--border)",
                  }}
                  variants={cardItemVariants}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 30px ${channel.color}14`,
                  }}
                >
                  {/* Glowing background card mesh */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 10% 20%, ${channel.color}08 0%, transparent 60%)`,
                    }}
                  />

                  {/* SUBSTANTIAL ICON CONTAINER */}
                  <div
                    className="w-14 h-14 rounded-xl border border-border/60 flex items-center justify-center bg-zinc-950/40 transition-all duration-300 shrink-0 relative z-10"
                    style={{
                      borderColor: isHovered ? channel.color : "var(--border)",
                      backgroundColor: isHovered
                        ? `${channel.color}0a`
                        : "rgba(9, 9, 11, 0.4)",
                    }}
                  >
                    <Icon
                      className="w-6.5 h-6.5 transition-all duration-300"
                      style={{
                        color: isHovered
                          ? channel.color
                          : "var(--text-secondary)",
                        transform: isHovered
                          ? "scale(1.12) rotate(2deg)"
                          : "scale(1) rotate(0deg)",
                      }}
                    />
                  </div>

                  {/* CARD TEXT */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <span
                      className="text-[13px] font-mono font-bold tracking-wider uppercase block transition-colors duration-300"
                      style={{
                        color: isHovered ? channel.color : "var(--text)",
                      }}
                    >
                      {channel.name}
                    </span>
                    <p className="text-[12px] text-text-muted mt-1 leading-normal font-sans">
                      {channel.text}
                    </p>
                  </div>

                  {/* CONNECTING NODE PIN (Only on desktop) */}
                  {isDesktop && (
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border transition-all duration-300"
                      style={{
                        backgroundColor: isHovered
                          ? channel.color
                          : "transparent",
                        borderColor: isHovered
                          ? channel.color
                          : "var(--border)",
                        boxShadow: isHovered
                          ? `0 0 10px ${channel.color}`
                          : "none",
                        transform: "translateX(50%)",
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </motion.div>

          {/* RIGHT SIDE: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="lg:col-span-7 relative order-2 lg:order-none"
          >
            {/* CONNECTION RECEIVER NODE (Only on desktop) */}
            {isDesktop && (
              <div
                ref={receiverRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border transition-all duration-300 z-40"
                style={{
                  backgroundColor:
                    hoveredIdx !== null
                      ? SOCIAL_CHANNELS[hoveredIdx].color
                      : "var(--border)",
                  borderColor:
                    hoveredIdx !== null
                      ? SOCIAL_CHANNELS[hoveredIdx].color
                      : "var(--border)",
                  boxShadow:
                    hoveredIdx !== null
                      ? `0 0 14px ${SOCIAL_CHANNELS[hoveredIdx].color}`
                      : "none",
                  transform: "translateX(-50%)",
                }}
              />
            )}

            {/* FORM CONTAINER CARD */}
            <div className="w-full bg-[#121212]/50 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  background:
                    hoveredIdx !== null
                      ? `radial-gradient(circle at 0% 50%, ${SOCIAL_CHANNELS[hoveredIdx].color}06 0%, transparent 50%)`
                      : "none",
                }}
              />

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  /* SUCCESS ANIMATED VIEW */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-10 md:py-16 min-h-[380px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        delay: 0.15,
                      }}
                      className="w-16 h-16 rounded-full bg-text text-background flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(250,250,250,0.25)] select-none shrink-0"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-2xl font-bold font-manrope text-text mb-3">
                      Message Received
                    </h3>

                    <p className="text-[13.5px] font-mono text-text-muted max-w-[360px] leading-relaxed mb-8">
                      Thanks, {formState.name}. I've received your details and
                      will get back to you shortly. Let's make this memorable.
                    </p>

                    <button
                      onClick={() => {
                        setFormState({
                          name: "",
                          email: "",
                          projectDetails: "",
                          website: "",
                        });
                        setTurnstileToken(null);
                        setErrorMessage(null);
                        setFormStatus("idle");
                        // Reset Turnstile widget
                        turnstileRef.current?.reset();
                      }}
                      className="px-6 py-3 rounded-xl border border-border text-[11px] font-mono font-medium text-text-muted hover:text-text hover:border-text-secondary transition-all duration-300 cursor-pointer"
                    >
                      // Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* FORM ELEMENTS VIEW */
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-border/30 pb-4 select-none">
                      <span className="text-[10px] font-mono tracking-widest text-text-subtle uppercase">
                        // contact form
                      </span>
                      <h4 className="text-[15px] font-mono font-bold text-text mt-0.5">
                        Start your project brief
                      </h4>
                    </div>

                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-red-950/10 border border-red-500/20 rounded-xl flex flex-col gap-1 select-none"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                          // Submission Error
                        </span>
                        <p className="text-xs font-sans text-red-200/90 leading-relaxed whitespace-pre-line">
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}

                    {/* NAME FIELD */}
                    <div className="flex flex-col group">
                      <label className="font-mono text-[14px] text-amber-50 tracking-widest uppercase mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          disabled={formStatus === "sending"}
                          value={formState.name}
                          onChange={handleInputChange}
                          className="w-full h-14 px-5 bg-zinc-950/40 border border-border/80 rounded-xl text-text font-sans text-[14.5px] focus:outline-none transition-all duration-300 focus:border-text-secondary focus:bg-zinc-950/70 disabled:opacity-50"
                          placeholder="Your name"
                        />
                        <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-focus-within:shadow-[0_0_20px_rgba(250,250,250,0.025)]" />
                      </div>
                    </div>

                    {/* EMAIL FIELD */}
                    <div className="flex flex-col group">
                      <label className="font-mono text-[14px] text-amber-50 tracking-widest uppercase mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          disabled={formStatus === "sending"}
                          value={formState.email}
                          onChange={handleInputChange}
                          className="w-full h-14 px-5 bg-zinc-950/40 border border-border/80 rounded-xl text-text font-sans text-[14.5px] focus:outline-none transition-all duration-300 focus:border-text-secondary focus:bg-zinc-950/70 disabled:opacity-50"
                          placeholder="Your email address"
                        />
                        <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-focus-within:shadow-[0_0_20px_rgba(250,250,250,0.025)]" />
                      </div>
                    </div>

                    {/* PROJECT DETAILS FIELD (HERO) */}
                    <div className="flex flex-col group">
                      <label className="font-mono text-[14px] text-amber-50 tracking-widest uppercase mb-2">
                        Tell me about your project
                      </label>
                      <div className="relative">
                        <textarea
                          name="projectDetails"
                          required
                          rows={5}
                          disabled={formStatus === "sending"}
                          value={formState.projectDetails}
                          onChange={handleInputChange}
                          className="w-full min-h-[160px] py-4.5 px-5 bg-zinc-950/40 border border-border/80 rounded-xl text-text font-sans text-[14.5px] focus:outline-none transition-all duration-300 focus:border-text-secondary focus:bg-zinc-950/70 disabled:opacity-50 resize-none leading-relaxed"
                          placeholder="What are you building?&#10;What problem are you trying to solve?&#10;What would success look like?"
                        />
                        <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-focus-within:shadow-[0_0_25px_rgba(250,250,250,0.028)]" />
                      </div>
                    </div>

                    {/* HONEYPOT FIELD */}
                    <div
                      style={{
                        position: "absolute",
                        opacity: 0,
                        width: 0,
                        height: 0,
                        zIndex: -10,
                        pointerEvents: "none",
                      }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formState.website}
                        onChange={handleInputChange}
                      />
                    </div>

                     {/* CLOUDFLARE TURNSTILE CAPTCHA */}
                    <div className="flex justify-center py-2">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={
                          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
                        }
                        options={{
                          theme: "dark",
                        }}
                        onSuccess={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken(null)}
                        onError={() => setTurnstileToken(null)}
                      />
                    </div>

                    {/* PREMIUM SEND BUTTON */}
                    <div className="pt-2">
                      <motion.button
                        ref={buttonRef}
                        type="submit"
                        disabled={formStatus === "sending"}
                        onMouseMove={handleButtonMouseMove}
                        onMouseLeave={handleButtonMouseLeave}
                        animate={{ x: buttonPos.x, y: buttonPos.y }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          mass: 0.8,
                        }}
                        className="w-full h-14 rounded-xl bg-text text-background font-sans font-semibold tracking-wide flex items-center justify-center gap-3 transition-colors duration-300 hover:bg-text-secondary cursor-pointer shadow-[0_4px_20px_rgba(250,250,250,0.12)] relative overflow-hidden group disabled:opacity-75 disabled:cursor-not-allowed"
                        initial="initial"
                        whileHover="hover"
                      >
                        {formStatus === "sending" ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                            <span>Sending Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <motion.span
                              variants={{
                                initial: { x: 0 },
                                hover: { x: 4 },
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                              }}
                            >
                              <FiArrowRight className="w-4 h-4" />
                            </motion.span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
