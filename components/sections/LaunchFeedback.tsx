"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ═══════════════════════════════════════════════════════════
// COMPANY INLINE SVG LOGOS
// ═══════════════════════════════════════════════════════════

function StackdLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RidgewellLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M3 20h18M3 20l7-12 5 6 3-4 3 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IkhtiyaarLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M12 2L2 22h20L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V8M9 13l3-3 3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IronCladLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CineHiveLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.5" />
      <path
        d="M7 2v20M17 2v20M2 7h20M2 17h20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// DUAL CHECKMARK READ RECEIPT
// ═══════════════════════════════════════════════════════════
function ReadReceipt({ delay }: { delay: number }) {
  return (
    <div className="flex items-center select-none text-[10px] font-mono text-text-subtle/40">
      <span className="mr-1">Seen</span>
      <div className="flex text-emerald-500/80">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <motion.svg
          className="w-3 h-3 -ml-1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ANIMATED BACKGROUND COMMUNICATION NETWORK
// ═══════════════════════════════════════════════════════════
function BackgroundNetwork() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-[0.025]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="5%"
          y1="15%"
          x2="35%"
          y2="75%"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <line
          x1="35%"
          y1="75%"
          x2="65%"
          y2="25%"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="65%"
          y1="25%"
          x2="85%"
          y2="85%"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <line
          x1="25%"
          y1="10%"
          x2="75%"
          y2="65%"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <line
          x1="15%"
          y1="90%"
          x2="50%"
          y2="45%"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        <motion.circle
          r="2.5"
          fill="var(--text)"
          animate={{
            cx: ["5%", "35%"],
            cy: ["15%", "75%"],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="2"
          fill="var(--text)"
          animate={{
            cx: ["65%", "85%"],
            cy: ["25%", "85%"],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="2.5"
          fill="var(--text)"
          animate={{
            cx: ["25%", "75%"],
            cy: ["10%", "65%"],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DATA RECORDS
// ═══════════════════════════════════════════════════════════

interface Message {
  sender: "client" | "developer";
  avatarInitials: string;
  avatarGradient: string;
  senderName: string;
  role: string;
  time: string;
  content: string;
}

interface Thread {
  id: string;
  company: string;
  logo: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  projectRef: string;
  messages: Message[];
  reactions: { emoji: string; count: number }[];
}

const THREADS: Thread[] = [
  {
    id: "stackd",
    company: "Stackd",
    logo: StackdLogo,
    accentColor: "text-amber-400 border-amber-400/40 bg-amber-500/5",
    glowColor: "rgba(245, 158, 11, 0.08)",
    projectRef: "Burger Builder Configurators",
    messages: [
      {
        sender: "client",
        avatarInitials: "SS",
        avatarGradient: "from-amber-600 to-amber-950",
        senderName: "Subhan Shahid",
        role: "Founder, Stackd",
        time: "11:24 AM",
        content:
          "Ahmed, this looks incredible. The ordering experience is significantly smoother than what we had before.",
      },
      {
        sender: "developer",
        avatarInitials: "AH",
        avatarGradient: "from-zinc-500 to-zinc-800",
        senderName: "Ahmed",
        role: "Developer",
        time: "11:26 AM",
        content:
          "Thanks Subhan! Really glad you like the flow. How is the custom configurator performing?",
      },
      {
        sender: "client",
        avatarInitials: "SS",
        avatarGradient: "from-amber-600 to-amber-950",
        senderName: "Subhan Shahid",
        role: "Founder, Stackd",
        time: "11:27 AM",
        content:
          "The burger builder is honestly my favorite part. Already getting positive feedback from customers.",
      },
    ],
    reactions: [
      { emoji: "👍", count: 3 },
      { emoji: "🍔", count: 2 },
      { emoji: "🔥", count: 1 },
    ],
  },
  {
    id: "ridgewell",
    company: "Ridgewell Colorado",
    logo: RidgewellLogo,
    accentColor: "text-cyan-400 border-cyan-400/40 bg-cyan-500/5",
    glowColor: "rgba(6, 182, 212, 0.08)",
    projectRef: "Xeriscape Lead Platform",
    messages: [
      {
        sender: "client",
        avatarInitials: "MB",
        avatarGradient: "from-cyan-600 to-cyan-950",
        senderName: "Muhammad Bilal",
        role: "Operations Manager, Ridgewell",
        time: "09:05 AM",
        content:
          "We launched the landing page this morning and already received multiple inquiries. The conversion flow feels much stronger now.",
      },
      {
        sender: "developer",
        avatarInitials: "AH",
        avatarGradient: "from-zinc-500 to-zinc-800",
        senderName: "Ahmed",
        role: "Developer",
        time: "09:12 AM",
        content:
          "Awesome news, Muhammad! Let me know if you need help analyzing the entry path metrics next week.",
      },
      {
        sender: "client",
        avatarInitials: "MB",
        avatarGradient: "from-cyan-600 to-cyan-950",
        senderName: "Muhammad Bilal",
        role: "Operations Manager, Ridgewell",
        time: "09:15 AM",
        content:
          "Really happy with the final result. Speed difference is noticeable immediately.",
      },
    ],
    reactions: [
      { emoji: "👍", count: 2 },
      { emoji: "🔥", count: 2 },
      { emoji: "📈", count: 1 },
    ],
  },
  {
    id: "ikhtiyaar",
    company: "Ikhtiyaar",
    logo: IkhtiyaarLogo,
    accentColor: "text-emerald-400 border-emerald-400/40 bg-emerald-500/5",
    glowColor: "rgba(16, 185, 129, 0.08)",
    projectRef: "Lead Estimator Funnels",
    messages: [
      {
        sender: "client",
        avatarInitials: "SM",
        avatarGradient: "from-emerald-600 to-emerald-950",
        senderName: "Sarah Mitchell",
        role: "Marketing Director, Ikhtiyaar",
        time: "02:14 PM",
        content:
          "The UI quality exceeded expectations. Fast, responsive, and extremely polished.",
      },
      {
        sender: "developer",
        avatarInitials: "AH",
        avatarGradient: "from-zinc-500 to-zinc-800",
        senderName: "Ahmed",
        role: "Developer",
        time: "02:20 PM",
        content:
          "Appreciate it, Sarah! It was a pleasure mapping out the interactive lead estimator.",
      },
      {
        sender: "client",
        avatarInitials: "SM",
        avatarGradient: "from-emerald-600 to-emerald-950",
        senderName: "Sarah Mitchell",
        role: "Marketing Director, Ikhtiyaar",
        time: "02:22 PM",
        content:
          "Would absolutely work together again. The details really stand out.",
      },
    ],
    reactions: [
      { emoji: "👍", count: 3 },
      { emoji: "🚀", count: 2 },
    ],
  },
  {
    id: "ironclad",
    company: "IronClad Security",
    logo: IronCladLogo,
    accentColor: "text-slate-400 border-slate-400/40 bg-slate-500/5",
    glowColor: "rgba(148, 163, 184, 0.08)",
    projectRef: "Security Framework Portal",
    messages: [
      {
        sender: "client",
        avatarInitials: "JW",
        avatarGradient: "from-slate-600 to-slate-950",
        senderName: "James Walker",
        role: "Managing Director, IronClad",
        time: "04:30 PM",
        content:
          "This finally feels like a company people can trust online. The new website communicates professionalism instantly.",
      },
      {
        sender: "developer",
        avatarInitials: "AH",
        avatarGradient: "from-zinc-500 to-zinc-800",
        senderName: "Ahmed",
        role: "Developer",
        time: "04:35 PM",
        content:
          "Thanks James. Enforcing the strict accessible contrast and HTTPS security logs makes a huge difference.",
      },
      {
        sender: "client",
        avatarInitials: "JW",
        avatarGradient: "from-slate-600 to-slate-950",
        senderName: "James Walker",
        role: "Managing Director, IronClad",
        time: "04:37 PM",
        content: "Absolutely. It's clean, fast, and secure.",
      },
    ],
    reactions: [
      { emoji: "👍", count: 4 },
      { emoji: "🔒", count: 1 },
    ],
  },
  {
    id: "cinehive",
    company: "CineHive",
    logo: CineHiveLogo,
    accentColor: "text-violet-400 border-violet-400/40 bg-violet-500/5",
    glowColor: "rgba(139, 92, 246, 0.08)",
    projectRef: "CineHive Streaming API",
    messages: [
      {
        sender: "client",
        avatarInitials: "CL",
        avatarGradient: "from-violet-600 to-violet-950",
        senderName: "CineHive Lead",
        role: "Product Owner, CineHive",
        time: "10:10 AM",
        content:
          "The movie search experience is ridiculously fast. The attention to detail throughout the product is impressive.",
      },
      {
        sender: "developer",
        avatarInitials: "AH",
        avatarGradient: "from-zinc-500 to-zinc-800",
        senderName: "Ahmed",
        role: "Developer",
        time: "10:18 AM",
        content:
          "Awesome! The debounced query cache and virtualized grid seem to be holding up well.",
      },
      {
        sender: "client",
        avatarInitials: "CL",
        avatarGradient: "from-violet-600 to-violet-950",
        senderName: "CineHive Lead",
        role: "Product Owner, CineHive",
        time: "10:20 AM",
        content: "Definitely. Honestly, this is much better than I expected.",
      },
    ],
    reactions: [
      { emoji: "👍", count: 2 },
      { emoji: "🎬", count: 1 },
      { emoji: "❤️", count: 1 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function LaunchFeedback() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="feedback"
      className="relative w-full bg-background border-t border-border/40 overflow-hidden py-24 md:py-32"
    >
      <BackgroundNetwork />

      <div className="w-full max-w-[1450px] mx-auto px-6 md:px-10 flex flex-col gap-16 md:gap-24 relative z-10">
        {/* SECTION HEADER */}
        <div className="max-w-[750px] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-text animate-pulse" />
            <span className="text-[11px] text-text-subtle font-mono tracking-[0.25em] uppercase">
              CLIENT FEEDBACK
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold font-manrope text-text tracking-tight leading-[1.1]">
            What People Said After The Launch
          </h2>
          <p className="text-base sm:text-lg font-mono text-text-muted leading-relaxed">
            The best projects don't end at deployment. <br />
            They end when clients are excited about the result.
          </p>
        </div>

        {/* SOCIAL PROOF METRICS BOARD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-10 border-b border-border/30">
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-text tracking-tight">
              5+
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-subtle uppercase">
              // Products Shipped
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-text tracking-tight">
              4+
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-subtle uppercase">
              // Businesses Helped
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-text tracking-tight">
              100%
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-subtle uppercase">
              // Custom Built
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold font-manrope text-text tracking-tight">
              Countless
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-subtle uppercase">
              // Iterations & Improvements
            </div>
          </div>
        </div>

        {/* CONVERSATION MAP CONTAINER */}
        <div className="w-full flex flex-col gap-10 relative">
          {THREADS.map((thread, threadIdx) => {
            const isHovered = hoveredIdx === threadIdx;
            const LogoComponent = thread.logo;

            return (
              <div
                key={thread.id}
                onMouseEnter={() => setHoveredIdx(threadIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-full grid grid-cols-12 gap-6 md:gap-8 items-center"
              >
                {/* LEFT SIDE: Conversations Card */}
                <div
                  className={`col-span-12 lg:col-span-8 relative p-6 sm:p-8 bg-card/20 border rounded-2xl transition-all duration-300 flex flex-col gap-6 select-text cursor-default ${
                    isHovered
                      ? "border-text-secondary/60 bg-card/45 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
                      : "border-border/80"
                  }`}
                >
                  {/* Thread Top Header */}
                  <div className="flex items-center justify-between border-b border-border/30 pb-4">
                    <div className="flex items-center gap-3">
                      {/* Company logo inside card for mobile viewport context */}
                      <div
                        className={`lg:hidden w-8 h-8 rounded-lg border flex items-center justify-center ${thread.accentColor}`}
                      >
                        <LogoComponent className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-text-subtle tracking-wider uppercase block">
                          // workspace channel
                        </span>
                        <h4 className="text-[14px] font-mono font-bold text-text flex items-center gap-1.5">
                          #{thread.id}
                          <span className="text-text-muted text-[11px] font-normal">
                            ({thread.projectRef})
                          </span>
                        </h4>
                      </div>
                    </div>

                    {/* Desktop Hover State Highlight indicator */}
                    <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-text-subtle">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? "bg-text animate-pulse" : "bg-border"}`}
                      />
                      <span>{isHovered ? "LIVE_LINK" : "STANDBY"}</span>
                    </div>
                  </div>

                  {/* Message dialogue stream */}
                  <div className="flex flex-col gap-5">
                    {thread.messages.map((msg, msgIdx) => {
                      const isClient = msg.sender === "client";

                      return (
                        <motion.div
                          key={msgIdx}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: msgIdx * 0.12 }}
                          className="flex items-start gap-3.5"
                        >
                          {/* Profile Avatar */}
                          <div
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${msg.avatarGradient} border border-border/50 flex items-center justify-center shrink-0 shadow-md`}
                          >
                            <span className="text-[10.5px] font-mono font-bold text-text tracking-wide select-none">
                              {msg.avatarInitials}
                            </span>
                          </div>

                          {/* Message Bubble content */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[13px] font-bold text-text font-sans">
                                {msg.senderName}
                              </span>
                              <span className="text-[9.5px] text-text-subtle/70 font-mono tracking-tight select-none">
                                {msg.role}
                              </span>
                              <span className="text-[9px] text-text-subtle/50 font-mono ml-auto select-none">
                                {msg.time}
                              </span>
                            </div>
                            <div
                              className={`p-3.5 rounded-xl text-[14.5px] leading-relaxed font-sans font-normal border transition-colors duration-300 ${
                                isClient
                                  ? "bg-surface/60 border-border/40 text-text-secondary"
                                  : "bg-zinc-900/60 border-border/50 text-text shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)]"
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Thread Footer metadata (Emoji reactions & Read receipts) */}
                  <div className="flex items-center justify-between border-t border-border/20 pt-4 mt-1">
                    {/* Reactions tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {thread.reactions.map((react, i) => (
                        <button
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-surface border border-border/50 text-xs font-mono text-text hover:bg-zinc-800 hover:border-text-subtle/50 transition-all duration-200 cursor-pointer flex items-center gap-1 select-none"
                        >
                          <span>{react.emoji}</span>
                          <span className="text-[9.5px] font-bold text-text-secondary">
                            {react.count}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Status check read receipts */}
                    <ReadReceipt delay={threadIdx * 0.1} />
                  </div>
                </div>

                {/* MIDDLE: SVG Connection Line */}
                <div className="hidden lg:block col-span-1 relative h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-4 overflow-visible" fill="none">
                      <line
                        x1="0"
                        y1="8"
                        x2="100%"
                        y2="8"
                        stroke="var(--border)"
                        strokeWidth="1.5"
                        opacity={isHovered ? 0.8 : 0.3}
                        className="transition-opacity duration-300"
                      />
                      <motion.line
                        x1="0"
                        y1="8"
                        x2="100%"
                        y2="8"
                        stroke="var(--text-secondary)"
                        strokeWidth="2"
                        strokeDasharray="4 6"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          strokeDashoffset: isHovered ? [-20, 0] : 0,
                        }}
                        transition={{
                          opacity: { duration: 0.2 },
                          strokeDashoffset: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                        style={{
                          filter: "drop-shadow(0 0 2px rgba(250,250,250,0.15))",
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* RIGHT SIDE: Individual Logo Box */}
                <div className="hidden lg:flex col-span-3">
                  <div
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 select-none ${
                      isHovered
                        ? `${thread.accentColor} shadow-[0_0_20px_${thread.glowColor}] scale-102`
                        : "bg-card/10 border-border/60 text-text-subtle"
                    }`}
                  >
                    {/* Floating company logo icon box */}
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "scale-105 border-current"
                          : "border-border bg-background"
                      }`}
                    >
                      <LogoComponent className="w-6 h-6" />
                    </div>

                    {/* Client brand info details */}
                    <div className="flex-1">
                      <h5
                        className={`text-[14px] font-mono font-bold transition-colors duration-300 ${isHovered ? "text-text" : "text-text-secondary"}`}
                      >
                        {thread.company}
                      </h5>
                      <span className="text-[10px] font-mono text-text-subtle tracking-tight uppercase block mt-0.5">
                        {thread.id}.dev
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
