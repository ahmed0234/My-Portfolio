"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiTrendingUp,
  FiSettings,
  FiAward,
  FiZap,
  FiLayout,
  FiActivity,
  FiCpu
} from "react-icons/fi";

// ═══════════════════════════════════════════════════════════
// DYNAMIC SVG ILLUSTRATIONS FOR EACH YEAR
// ═══════════════════════════════════════════════════════════

// 2019: Small blueprint-style website wireframes
function BlueprintVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70" viewBox="0 0 200 150" fill="none">
      {/* Blueprint Grid lines */}
      <line x1="20" y1="20" x2="180" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="20" y1="50" x2="180" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="20" y1="130" x2="180" y2="130" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="20" y1="20" x2="20" y2="135" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="180" y1="20" x2="180" y2="135" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />

      {/* Wireframe browser container */}
      <rect x="25" y="25" width="150" height="100" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="42" x2="175" y2="42" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="34" cy="33" r="2" fill="currentColor" />
      <circle cx="42" cy="33" r="2" fill="currentColor" />
      <circle cx="50" cy="33" r="2" fill="currentColor" />

      {/* Grid columns */}
      <rect x="35" y="52" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="80" y="52" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="125" y="52" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

      <line x1="35" y1="95" x2="165" y2="95" stroke="currentColor" strokeWidth="1" />
      <line x1="35" y1="105" x2="130" y2="105" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />

      {/* Technical marks */}
      <text x="145" y="118" fill="var(--text-subtle)" fontSize="6" fontFamily="monospace">w: 100%</text>
    </svg>
  );
}

// 2020: Animated DOM / UI components
function DOMVisual() {
  const [sliderVal, setSliderVal] = useState(40);

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderVal((prev) => (prev >= 90 ? 30 : prev + 10));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      {/* Slider console box */}
      <rect x="30" y="35" width="140" height="80" rx="8" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" fillOpacity="0.3" />
      
      {/* DOM Tag label */}
      <text x="42" y="54" fill="var(--text)" fontSize="8" fontFamily="monospace">&lt;input type="range" /&gt;</text>
      
      {/* Slider Track */}
      <line x1="45" y1="75" x2="155" y2="75" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
      <line x1="45" y1="75" x2={`${45 + (sliderVal / 100) * 110}`} y2="75" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      
      {/* Slider Thumb */}
      <circle cx={`${45 + (sliderVal / 100) * 110}`} cy="75" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
      
      {/* Value Indicator bubble */}
      <rect x="85" y="93" width="30" height="14" rx="3" stroke="currentColor" strokeWidth="1" />
      <text x="100" y="103" textAnchor="middle" fill="var(--text)" fontSize="7" fontFamily="monospace">VAL: {sliderVal}%</text>
    </svg>
  );
}

// 2021: Component network diagrams
function ComponentTreeVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      {/* Nodes mapping */}
      {/* Parent node */}
      <rect x="80" y="25" width="40" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" fill="var(--surface)" fillOpacity="0.4" />
      <text x="100" y="37" textAnchor="middle" fill="var(--text)" fontSize="7" fontFamily="monospace">&lt;App /&gt;</text>

      {/* Child nodes */}
      <rect x="35" y="75" width="50" height="20" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <text x="60" y="87" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.5" fontFamily="monospace">&lt;Sidebar /&gt;</text>

      <rect x="115" y="75" width="50" height="20" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <text x="140" y="87" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.5" fontFamily="monospace">&lt;Feed /&gt;</text>

      {/* Grandchildren */}
      <circle cx="140" cy="125" r="6" stroke="currentColor" strokeWidth="1" />
      <line x1="140" y1="95" x2="140" y2="119" stroke="var(--border)" strokeWidth="1" />
      
      {/* Connecting paths */}
      <path d="M100 45 L60 75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M100 45 L140 75" stroke="currentColor" strokeWidth="1" />

      {/* Pulsing signal on lines */}
      <motion.circle
        r="2"
        fill="currentColor"
        animate={{ cx: [100, 140], cy: [45, 75] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

// 2022: Browser mockup shell
function BrowserVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      <rect x="25" y="25" width="150" height="100" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="42" x2="175" y2="42" stroke="currentColor" strokeWidth="1" />
      
      {/* dots */}
      <circle cx="34" cy="33" r="1.8" fill="currentColor" />
      <circle cx="41" cy="33" r="1.8" fill="currentColor" />
      <circle cx="48" cy="33" r="1.8" fill="currentColor" />

      {/* Technical coordinate grids */}
      <path d="M 60 52 L 140 52 L 140 100 L 60 100 Z" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="2 2" />
      <circle cx="100" cy="76" r="16" stroke="currentColor" strokeWidth="1" />
      <motion.circle
        cx="100"
        cy="76"
        r="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 12"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <text x="100" y="79" textAnchor="middle" fill="var(--text)" fontSize="6" fontFamily="monospace">60fps</text>
    </svg>
  );
}

// 2023: Connected frontend and backend system
function ConnectedPortalVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      {/* Client block */}
      <rect x="25" y="45" width="45" height="50" rx="4" stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" fillOpacity="0.2" />
      <text x="47.5" y="65" textAnchor="middle" fill="var(--text)" fontSize="7" fontFamily="monospace">CLIENT</text>
      <text x="47.5" y="78" textAnchor="middle" fill="var(--text-subtle)" fontSize="6" fontFamily="monospace">Next.js</text>

      {/* Network channel */}
      <path d="M 70 70 L 130 70" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
      <motion.circle
        r="3"
        fill="currentColor"
        animate={{ cx: [70, 130] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ cy: 70 }}
      />

      {/* Server block */}
      <rect x="130" y="45" width="45" height="50" rx="4" stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" fillOpacity="0.2" />
      <text x="152.5" y="65" textAnchor="middle" fill="var(--text)" fontSize="7" fontFamily="monospace">SERVER</text>
      <text x="152.5" y="78" textAnchor="middle" fill="var(--text-subtle)" fontSize="6" fontFamily="monospace">API Gateway</text>

      <rect x="80" y="85" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="0.8" />
      <text x="100" y="93" textAnchor="middle" fill="var(--text-secondary)" fontSize="5.5" fontFamily="monospace">200_OK</text>
    </svg>
  );
}

// 2024: Backend pipelines and requests
function RequestFlowVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      <rect x="35" y="30" width="130" height="90" rx="6" stroke="var(--border)" strokeWidth="1" />
      
      {/* Pipeline server steps */}
      <g transform="translate(45, 45)">
        <rect width="110" height="18" rx="2" stroke="currentColor" strokeWidth="1" fill="var(--surface)" fillOpacity="0.3" />
        <text x="8" y="11" fill="var(--text)" fontSize="6.5" fontFamily="monospace">GET /api/v1/users</text>
        <circle cx="98" cy="9" r="3" fill="var(--text-subtle)" />
      </g>

      <g transform="translate(45, 68)">
        <rect width="110" height="18" rx="2" stroke="currentColor" strokeWidth="1" fill="var(--surface)" fillOpacity="0.3" />
        <text x="8" y="11" fill="var(--text)" fontSize="6.5" fontFamily="monospace">Auth: Bearer token</text>
        <circle cx="98" cy="9" r="3" fill="currentColor" className="animate-pulse" />
      </g>

      <g transform="translate(45, 91)">
        <rect width="110" height="18" rx="2" stroke="currentColor" strokeWidth="1" fill="var(--surface)" fillOpacity="0.3" />
        <text x="8" y="11" fill="var(--text-secondary)" fontSize="6.5" fontFamily="monospace">DB Query: resolved</text>
        <circle cx="98" cy="9" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}

// 2025: Lead generation / metrics dashboard
function MetricsVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      <rect x="30" y="30" width="140" height="90" rx="8" stroke="currentColor" strokeWidth="1.2" fill="var(--surface)" fillOpacity="0.2" />
      
      <line x1="30" y1="65" x2="170" y2="65" stroke="var(--border)" strokeWidth="0.8" />
      
      {/* Metric values */}
      <text x="45" y="50" fill="var(--text)" fontSize="14" fontFamily="monospace" fontWeight="bold">+42%</text>
      <text x="45" y="58" fill="var(--text-subtle)" fontSize="6" fontFamily="sans-serif" letterSpacing="0.5">CONVERSION RATE</text>

      <text x="110" y="50" fill="var(--text)" fontSize="14" fontFamily="monospace" fontWeight="bold">&lt;1.2s</text>
      <text x="110" y="58" fill="var(--text-subtle)" fontSize="6" fontFamily="sans-serif" letterSpacing="0.5">LOAD BOUNDS</text>

      {/* Small sparkline graphic at the bottom */}
      <path d="M 45 105 Q 70 80 100 95 T 155 80" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="155" cy="80" r="3" fill="currentColor" />
    </svg>
  );
}

// 2026: Technical command center visualization
function CommandCenterVisual() {
  return (
    <svg className="w-full h-full max-h-[220px] stroke-text-secondary/70 text-text-secondary" viewBox="0 0 200 150" fill="none">
      {/* Scanning radar target screen */}
      <circle cx="100" cy="75" r="45" stroke="var(--border)" strokeWidth="1" />
      <circle cx="100" cy="75" r="30" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="100" cy="75" r="15" stroke="var(--border)" strokeWidth="0.8" />

      {/* Axis crosshair */}
      <line x1="50" y1="75" x2="150" y2="75" stroke="var(--border)" strokeWidth="0.5" />
      <line x1="100" y1="25" x2="100" y2="125" stroke="var(--border)" strokeWidth="0.5" />

      {/* Radar scanning arm */}
      <motion.line
        x1="100"
        y1="75"
        x2="140"
        y2="75"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 75px" }}
        opacity="0.6"
      />

      {/* Target locked signals */}
      <circle cx="120" cy="55" r="3" fill="currentColor" />
      <circle cx="80" cy="95" r="3" fill="currentColor" />
      <motion.circle
        cx="120"
        cy="55"
        r="7"
        stroke="currentColor"
        strokeWidth="0.5"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        fill="none"
      />

      {/* Tech labels */}
      <text x="100" y="136" textAnchor="middle" fill="var(--text)" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">FULL_STACK_DEV</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// MILESTONE DATA RECORDS
// ═══════════════════════════════════════════════════════════

interface Milestone {
  year: string;
  title: string;
  focus: string;
  description: string;
  milestones: string[];
  techs: string[];
  visual: React.ComponentType;
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: Milestone[] = [
  {
    year: "2019",
    title: "The Beginning",
    focus: "Fundamentals",
    description: "This was the year I discovered how websites are built and developed a fascination for turning ideas into digital experiences.",
    milestones: ["Website structure concepts", "Responsive layouts design", "Typography hierarchy foundations"],
    techs: ["HTML5", "CSS3", "Responsive Design", "Flexbox / Grid", "Design Ticks"],
    visual: BlueprintVisual,
    icon: FiBookOpen
  },
  {
    year: "2020",
    title: "Learning To Build Interfaces",
    focus: "Interactive UIs",
    description: "Moved beyond static websites and started creating interactive experiences that responded to user actions dynamically.",
    milestones: ["DOM action controls", "Event handlers workflow", "Condition rendering logic"],
    techs: ["JavaScript (ES6+)", "DOM Manipulation", "Interactive Components", "UI Controls"],
    visual: DOMVisual,
    icon: FiSettings
  },
  {
    year: "2021",
    title: "Falling In Love With React",
    focus: "Modular Systems",
    description: "Learned how modern applications are structured and began thinking in reusable components rather than isolated pages.",
    milestones: ["Component tree nesting", "State orchestration variables", "Reusable template modules"],
    techs: ["React.js", "State Hooks", "Props Pipelines", "CSS Modules", "System Layouts"],
    visual: ComponentTreeVisual,
    icon: FiZap
  },
  {
    year: "2022",
    title: "Modern Frontend Development",
    focus: "Scalability & Polish",
    description: "Focused on creating fast, scalable, visually polished user experiences with modern type safety and motion systems.",
    milestones: ["Server-rendered structure", "Hardware animations optimization", "Compile-time strict validation"],
    techs: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Shadcn/UI"],
    visual: BrowserVisual,
    icon: FiLayout
  },
  {
    year: "2023",
    title: "Building Complete Products",
    focus: "Integrations & Fetching",
    description: "Started building complete applications that solved real problems rather than writing isolated frontend layouts.",
    milestones: ["Asynchronous API fetching", "Secure user authentication logs", "Client-side caching optimization"],
    techs: ["Custom APIs", "Data Fetching", "User Auth Profiles", "Caching Layers", "Vercel SDK"],
    visual: ConnectedPortalVisual,
    icon: FiActivity
  },
  {
    year: "2024",
    title: "Full-Stack Expansion",
    focus: "Server Infrastructure",
    description: "Expanded beyond browser interfaces and started building the high-performance logic systems powering applications behind the scenes.",
    milestones: ["RESTful backend paths", "Server controller middlewares", "Environment execution tasks"],
    techs: ["Node.js", "Bun.js", "Express.js", "REST APIs", "Server Architecture"],
    visual: RequestFlowVisual,
    icon: FiCpu
  },
  {
    year: "2025",
    title: "Working With Real Businesses",
    focus: "Freelance & Client Value",
    description: "Moved from building personal projects to creating products and platforms that generated direct business value and resolved client bottlenecks.",
    milestones: ["Lead funnel conversions", "High-fidelity portfolio sites", "Secure infrastructure deployment"],
    techs: ["Stackd", "Ikhtiyaar", "Ridgewell Colorado", "IronClad Security", "SEO Optimization"],
    visual: MetricsVisual,
    icon: FiTrendingUp
  },
  {
    year: "2026",
    title: "Product-Focused Engineer",
    focus: "Full-Stack Outcomes",
    description: "Today my focus is building products that combine engineering quality, robust user experiences, page performance, and business outcomes.",
    milestones: ["High-throughput fullstack systems", "Premium product interactions", "Optimized loading speed targets"],
    techs: ["CineHive", "Full-Stack Systems", "Edge Delivery Network", "UX & Conversion Optimization"],
    visual: CommandCenterVisual,
    icon: FiAward
  }
];

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  // Keyboard navigation controls
  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : prev));
  };

  // Find dynamic horizontal path completion percentage for the animated SVG line
  const activePercent = (activeIdx / (MILESTONES.length - 1)) * 100;

  const currentMilestone = MILESTONES[activeIdx];
  const VisualComponent = currentMilestone.visual;

  return (
    <section
      id="journey"
      className="relative w-full bg-background border-t border-border/40 overflow-hidden py-24 md:py-32"
    >
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Subtle marks in corner */}
        <div className="absolute top-6 left-6 text-[8px] font-mono text-text-subtle/30 tracking-widest">
          EVOLUTION_PATH // REF_08
        </div>
        <div className="absolute bottom-6 left-6 text-[8px] font-mono text-text-subtle/20 tracking-widest">
          GROWTH_PROGRESS_MONITOR
        </div>
      </div>

      <div className="w-full max-w-[1250px] mx-auto px-6 md:px-10 flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="max-w-[750px] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-text animate-pulse" />
            <span className="text-[11px] text-text-subtle font-mono tracking-[0.25em] uppercase">
              THE JOURNEY
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold font-manrope text-text tracking-tight leading-[1.1]">
            From Curiosity To Building Products People Use
          </h2>
          <p className="text-base sm:text-lg font-mono text-text-muted leading-relaxed">
            Every year added a new layer of capability. <br />
            From learning fundamentals to building full-stack products and helping businesses grow online.
          </p>
        </div>

        {/* DESKTOP PIPELINE TIMELINE TRACK */}
        <div ref={containerRef} className="hidden lg:flex flex-col gap-10 w-full">
          
          {/* Interaction Instruction helper */}
          <div className="flex items-center justify-between px-10 text-[10px] font-mono text-text-subtle/50 tracking-[0.15em] uppercase select-none">
            <span>// timeline index</span>
            <span className="flex items-center text-[11px] font-semibold gap-2 text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-text-secondary"></span>
              </span>
              Click any year checkpoint to inspect growth details
            </span>
          </div>

          {/* Horizontal connecting SVG line and nodes */}
          <div className="relative w-full h-[60px] flex items-center justify-between px-10">
            
            {/* SVG Path drawing */}
            <div className="absolute inset-x-10 top-[28px] h-[4px] z-0">
              <svg className="w-full h-[6px] overflow-visible" fill="none">
                {/* Background path line */}
                <line x1="0" y1="3" x2="100%" y2="3" stroke="var(--border)" strokeWidth="2.5" />
                
                {/* Drawn active progress path */}
                <motion.line
                  x1="0"
                  y1="3"
                  x2={`${activePercent}%`}
                  y2="3"
                  stroke="var(--text-secondary)"
                  strokeWidth="3.5"
                  animate={{ x2: `${activePercent}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(250,250,250,0.2))",
                  }}
                />

                {/* Looping pulse dash */}
                <line
                  x1="0"
                  y1="3"
                  x2={`${activePercent}%`}
                  y2="3"
                  stroke="var(--text)"
                  strokeWidth="2.5"
                  strokeDasharray="8 20"
                  style={{
                    animation: "dashOffsetFlow 3.5s linear infinite",
                  }}
                  opacity="0.75"
                />
              </svg>
            </div>

            {/* Step Nodes Row */}
            {MILESTONES.map((milestone, idx) => {
              const isActive = activeIdx === idx;
              const StepIcon = milestone.icon;
              
              return (
                <button
                  key={milestone.year}
                  onClick={() => setActiveIdx(idx)}
                  className="group relative z-10 flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-[48px] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 flex flex-col items-center whitespace-nowrap z-30">
                    <div className="bg-zinc-950 border border-border text-[10px] font-mono text-text px-2.5 py-1 rounded shadow-xl tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse" />
                      <span>{milestone.focus}</span>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="w-1.5 h-1.5 bg-zinc-950 border-r border-b border-border rotate-45 -mt-[4px]" />
                  </div>

                  {/* Node Circle */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
                      isActive
                        ? "bg-card border-text text-text shadow-[0_0_15px_rgba(250,250,250,0.08)]"
                        : "bg-surface border-border text-text-subtle hover:text-text-secondary hover:border-text-subtle/50"
                    }`}
                  >
                    <StepIcon className="w-4.5 h-4.5" />
                  </div>

                  {/* Year text */}
                  <span
                    className={`absolute top-[48px] font-mono text-[13px] font-bold tracking-wider transition-colors duration-300 ${
                      isActive ? "text-text" : "text-text-subtle group-hover:text-text-secondary"
                    }`}
                  >
                    {milestone.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE MILESTONE CARD VIEW (Dual columns: text description vs visual svg) */}
          <div className="w-full mt-10 min-h-[420px] grid grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE: Text Details */}
            <div className="col-span-7 bg-card/25 border border-border/80 rounded-2xl p-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-mono font-bold px-3 py-1 rounded bg-surface border border-border text-text tracking-widest uppercase">
                    YEAR {currentMilestone.year}
                  </span>
                  <span className="text-[11px] font-mono text-text-subtle tracking-wider uppercase">
                    FOCUS: {currentMilestone.focus}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-manrope text-text tracking-tight">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-[14.5px] text-text-muted leading-relaxed font-sans font-normal">
                    {currentMilestone.description}
                  </p>
                </div>

                {/* Milestones checklists */}
                <div className="space-y-3 pt-5 border-t border-border/30">
                  <span className="text-[12px] font-mono text-text-subtle tracking-widest uppercase block mb-1">// key achievements</span>
                  <div className="grid grid-cols-1 gap-3">
                    {currentMilestone.milestones.map((m, i) => (
                      <div key={i} className="flex items-start gap-3.5 text-[15px] text-text-secondary font-sans leading-relaxed">
                        <FiCheckCircle className="w-4.5 h-4.5 text-text mt-0.5 shrink-0" />
                        <span className="font-normal">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies horizontal list */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/20">
                {currentMilestone.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded bg-surface/90 border border-border/75 text-[12px] font-mono text-text-secondary tracking-normal hover:text-text hover:border-text-subtle transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

            {/* RIGHT SIDE: Interactive Visual Canvas */}
            <div className="col-span-5 bg-card/15 border border-border/70 rounded-2xl p-8 flex flex-col justify-between items-center relative overflow-hidden">
              {/* Technical label overlay */}
              <div className="absolute top-4 left-6 text-[8px] font-mono text-text-subtle/30 uppercase tracking-widest">
                VISUAL_SIMULATION_RENDER // YEAR_{currentMilestone.year}
              </div>

              <div className="flex-1 w-full flex items-center justify-center mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex items-center justify-center"
                  >
                    <VisualComponent />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step navigators controls */}
              <div className="flex items-center gap-4.5 w-full justify-between pt-6 border-t border-border/10 mt-4 relative z-10">
                <button
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                    activeIdx === 0
                      ? "text-text-subtle/20 border-border/30 cursor-not-allowed"
                      : "text-text-secondary border-border hover:border-text-subtle hover:text-text cursor-pointer"
                  }`}
                  aria-label="Previous step"
                >
                  <FiArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-1">
                  {MILESTONES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIdx === i ? "w-4 bg-text" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={activeIdx === MILESTONES.length - 1}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                    activeIdx === MILESTONES.length - 1
                      ? "text-text-subtle/20 border-border/30 cursor-not-allowed"
                      : "text-text-secondary border-border hover:border-text-subtle hover:text-text cursor-pointer"
                  }`}
                  aria-label="Next step"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* MOBILE VIEWPORT: SWIPEABLE CAROUSEL CARD BLOCK (Horizontal drag swiper) */}
        <div className="lg:hidden flex flex-col gap-8 w-full overflow-hidden">
          
          {/* Scroll Navigation pills */}
          <div className="flex items-center justify-between bg-surface/30 p-2 border border-border/60 rounded-xl">
            <button
              onClick={handlePrev}
              disabled={activeIdx === 0}
              className={`p-2.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide uppercase transition-all duration-300 ${
                activeIdx === 0
                  ? "text-text-subtle/20 border-border/30 cursor-not-allowed"
                  : "text-text border-border hover:bg-surface/50 cursor-pointer"
              }`}
            >
              PREV
            </button>
            
            <span className="font-mono text-[12px] font-bold text-text select-none">
              YEAR {currentMilestone.year}
            </span>

            <button
              onClick={handleNext}
              disabled={activeIdx === MILESTONES.length - 1}
              className={`p-2.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide uppercase transition-all duration-300 ${
                activeIdx === MILESTONES.length - 1
                  ? "text-text-subtle/20 border-border/30 cursor-not-allowed"
                  : "text-text border-border hover:bg-surface/50 cursor-pointer"
              }`}
            >
              NEXT
            </button>
          </div>

          {/* Swipeable container panel utilizing AnimatePresence */}
          <div className="relative min-h-[460px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-card border border-border p-6 rounded-2xl flex flex-col gap-6 shadow-2xl"
              >
                
                {/* Year tag & Focus */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-[11.5px] font-mono font-bold text-text-subtle uppercase">
                    STAGE {currentMilestone.year}
                  </span>
                  <span className="text-[10px] font-mono text-text-subtle font-bold uppercase">
                    {currentMilestone.focus}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-manrope text-text tracking-tight">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-[12.5px] text-text-muted leading-relaxed font-sans font-normal">
                    {currentMilestone.description}
                  </p>
                </div>

                {/* Visual SVG Box */}
                <div className="w-full h-[120px] bg-background/50 border border-border/60 rounded-xl flex items-center justify-center p-3">
                  <VisualComponent />
                </div>

                {/* Key achievements */}
                <div className="space-y-2.5 pt-3.5 border-t border-border/30">
                  <span className="text-[11px] font-mono text-text-subtle tracking-widest uppercase block mb-0.5">// achievements</span>
                  <div className="grid grid-cols-1 gap-2">
                    {currentMilestone.milestones.slice(0, 2).map((m, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-[14px] text-text-secondary leading-normal">
                        <FiCheckCircle className="w-4 h-4 text-text mt-0.5 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech flags list */}
                <div className="flex flex-wrap gap-2 pt-3.5 border-t border-border/20">
                  {currentMilestone.techs.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded bg-surface border border-border text-[11px] font-mono text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dot Nav Indicators */}
          <div className="flex items-center justify-center gap-1.5 pt-2 select-none">
            {MILESTONES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIdx === i ? "w-5 bg-text" : "w-1.5 bg-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
