"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import {
  FiExternalLink,
  FiBookOpen,
  FiCpu,
  FiTrendingUp,
  FiLayers,
  FiShield,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

// ═══════════════════════════════════════════════════════════
// DATA STRUCTURES
// ═══════════════════════════════════════════════════════════
interface MetricItem {
  label: string;
  value: string;
}

interface Project {
  id: string;
  num: string;
  name: string;
  industry: string;
  impact: string;
  role: string;
  challenge: string;
  solution: string;
  tech: string[];
  decisions: string[];
  metrics: MetricItem[];
  image: string;
  liveUrl: string;
  caseStudyUrl: string;
  accentColor: string; // Tailwind tint/glow class
  glowColor: string; // Radial gradient color representation
  metricHighlight: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROJECTS: Project[] = [
  {
    id: "stackd",
    num: "01",
    name: "Stackd",
    industry: "Restaurant & Food Ordering",
    impact:
      "Helping customers build and order their perfect burger experience while increasing online engagement and order volume.",
    role: "Lead Frontend Engineer",
    challenge:
      "The restaurant needed an ordering experience that felt tactile, memorable, and visually straightforward.",
    solution:
      "Designed and built an interactive system where users visually construct custom burgers, order from a digitized menu, and checkout effortlessly.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "NextJS API Routes",
      "Express.js",
    ],
    decisions: [
      "Custom Burger Configurator",
      "Tactile Mobile Flow",
      "Optimized Asset Pipeline",
      "Real-Time Order State",
    ],
    metrics: [
      { label: "Engagement", value: "+42%" },
      { label: "Online Orders", value: "+31%" },
      { label: "Lighthouse Score", value: "98" },
    ],
    image: "/projects/stackd.png",
    liveUrl: "https://stackd-delta.vercel.app",
    caseStudyUrl: "#",
    accentColor: "border-amber-500/20 text-amber-400",
    glowColor: "rgba(245,158,11,0.06)",
    metricHighlight: "+42% Engagement",
    icon: FiLayers,
  },
  {
    id: "cinehive",
    num: "02",
    name: "CineHive",
    industry: "Movie Discovery & Exploration Platform",
    impact:
      "Simplifying movie discovery with a fast, engaging interface that allows users to search, explore curated categories, and dive into detailed cinematic information.",
    role: "Core Frontend Developer",
    challenge:
      "Cluttered movie databases and sluggish search interfaces often frustrate users looking for quick recommendations or comprehensive details.",
    solution:
      "Built a sleek movie discovery app with categorized landing sections (Trending, Popular, Top Rated) for easy browsing, an instant debounced search engine, dynamic cast profiles, and rich movie details powered by live TMDB endpoints.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Shadcn UI",
      "TMDB APIs",
      "Framer Motion",
      "Debounced Search",
    ],
    decisions: [
      "Instant Debounced Search",
      "Curated Category Shelves",
      "Hydrated Detail Overlays",
      "Responsive Card Grids",
    ],
    metrics: [
      { label: "Search Latency", value: "<150ms" },
      { label: "Genre Shelves", value: "Curated" },
      { label: "API Fetching", value: "On-demand" },
    ],
    image: "/projects/cinehive.png",
    liveUrl: "https://cinehive-alpha.vercel.app/",
    caseStudyUrl: "#",
    accentColor: "border-violet-500/20 text-violet-400",
    glowColor: "rgba(139,92,246,0.05)",
    metricHighlight: "Instant Movie Search",
    icon: FiActivity,
  },
  {
    id: "ikhtiyaar",
    num: "03",
    name: "Ikhtiyaar",
    industry: "Digital Marketing Agency",
    impact:
      "Helping an agency convert more visitors into qualified leads through trust-based digital touchpoints.",
    role: "UI & Lead Engineer",
    challenge:
      "The agency lacked a high converting channel to clearly articulate case studies and attract enterprise contracts.",
    solution:
      "Designed responsive conversion focused landing and showcase pages optimized for quick lead capture and user authority.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "Node Mailer",
      "Formik / Yup",
    ],
    decisions: [
      "Structured Value Sections",
      "Frictionless Lead Funnel",
      "Interactive Estimator",
      "SEO Architecture",
    ],
    metrics: [
      { label: "Lead Funnel Rate", value: "+28%" },
      { label: "Interactive CTR", value: "+19%" },
      { label: "Page Load", value: "<1.2s" },
    ],
    image: "/projects/ikhtiyaar.png",
    liveUrl: "https://ikhtiyaar.com",
    caseStudyUrl: "#",
    accentColor: "border-emerald-500/20 text-emerald-400",
    glowColor: "rgba(16,185,129,0.05)",
    metricHighlight: "Optimized Conversion",
    icon: FiTrendingUp,
  },
  {
    id: "ridgewell",
    num: "04",
    name: "Ridgewell Colorado",
    industry: "Xeriscaping & Hardscaping",
    impact:
      "Helping a local service business generate more qualified leads through a clean, architectural landing experience.",
    role: "Frontend Architect",
    challenge:
      "Traditional landscaping platforms present portfolios as cluttered grids with slow project discovery.",
    solution:
      "Built a high-fidelity visual showroom showing structural blueprint phases, site overlays, and local landscape estimation.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "NextJS Serverless Functions",
    ],
    decisions: [
      "Structural Showroom Grid",
      "Preloaded Project Galleries",
      "Blueprint Estimator",
      "Local Search Target",
    ],
    metrics: [
      { label: "Inquiry Volume", value: "+37%" },
      { label: "Mobile Duration", value: "+45%" },
      { label: "SEO Indexing", value: "100%" },
    ],
    image: "/projects/ridgewell.png",
    liveUrl: "https://xeriscaping.ridgewellcolorado.com/",
    caseStudyUrl: "#",
    accentColor: "border-cyan-500/20 text-cyan-400",
    glowColor: "rgba(6,182,212,0.05)",
    metricHighlight: "+37% Inquiries",
    icon: FiTarget,
  },
  {
    id: "ironclad",
    num: "05",
    name: "IronClad Security",
    industry: "Security Infrastructure",
    impact:
      "Establishing enterprise credibility and growing lead opportunities for an industrial security contractor.",
    role: "Lead Frontend Engineer",
    challenge:
      "Security providers need strict digital indicators of trust, compliance records, and direct response avenues.",
    solution:
      "Created a dark corporate web platform focusing on trust frameworks, connection compliance, and secure service request logs.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "Cryptographic Validation",
      "PostgreSQL",
    ],
    decisions: [
      "Compliance Vault Interface",
      "Encrypted Lead Logging",
      "Strict Accessible Contrast",
      "Fast CDN Mirroring",
    ],
    metrics: [
      { label: "Trust Signals", value: "Verified" },
      { label: "Enterprise Leads", value: "+22%" },
      { label: "Asset Protection", value: "Secure" },
    ],
    image: "/projects/ironclad.png",
    liveUrl: "https://ironcladservices.vercel.app",
    caseStudyUrl: "#",
    accentColor: "border-slate-500/20 text-slate-400",
    glowColor: "rgba(148,163,184,0.06)",
    metricHighlight: "Defensive Trust Grid",
    icon: FiShield,
  },
];

// ═══════════════════════════════════════════════════════════
// SVG STORYTELLING ANIMATIONS (Layer 2)
// ═══════════════════════════════════════════════════════════

function StackdSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Conveyor Belt Path across the bottom under browser preview */}
      <motion.path
        d="M 50 520 L 950 520"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="8 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -120 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        opacity="0.4"
      />

      {/* LEFT SIDE: Ingredient Silo & Dispenser Pipeline */}
      <g opacity="0.8">
        {/* Silo Frame */}
        <rect
          x="60"
          y="100"
          width="140"
          height="280"
          rx="16"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <line
          x1="60"
          y1="140"
          x2="200"
          y2="140"
          stroke="var(--border)"
          strokeWidth="1.2"
        />
        <text
          x="130"
          y="125"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          INGREDIENT_SILO
        </text>

        {/* Silo Pipes */}
        <path
          d="M 130 380 L 130 520"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <rect
          x="110"
          y="430"
          width="40"
          height="30"
          rx="4"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
        />
        <text
          x="130"
          y="448"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
        >
          VALVE_A
        </text>

        {/* Dynamic Ingredient Drops inside Left Silo */}
        {[
          {
            label: "BUN_TOP",
            y: 180,
            delay: 0.1,
            color: "var(--text-secondary)",
          },
          { label: "TOMATO", y: 230, delay: 0.3, color: "var(--text-muted)" },
          {
            label: "PATTY_MAX",
            y: 280,
            delay: 0.5,
            color: "var(--text-muted)",
          },
          {
            label: "BUN_BOT",
            y: 330,
            delay: 0.7,
            color: "var(--text-secondary)",
          },
        ].map((ing, i) => (
          <g key={i}>
            <motion.rect
              x="75"
              y={ing.y - 12}
              width="110"
              height="20"
              rx="6"
              fill="var(--background)"
              stroke={ing.color}
              strokeWidth="1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 75, opacity: 0.7 }}
              transition={{ type: "spring", damping: 15, delay: ing.delay }}
            />
            <text
              x="130"
              y={ing.y}
              textAnchor="middle"
              fill="var(--text-subtle)"
              fontSize="8"
              fontFamily="monospace"
            >
              {ing.label}
            </text>
          </g>
        ))}
      </g>

      {/* RIGHT SIDE: Interactive Assembly Stack */}
      <g opacity="0.8">
        {/* Assembly Rig */}
        <rect
          x="800"
          y="100"
          width="140"
          height="280"
          rx="16"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <line
          x1="800"
          y1="140"
          x2="940"
          y2="140"
          stroke="var(--border)"
          strokeWidth="1.2"
        />
        <text
          x="870"
          y="125"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          PRODUCT_BUILD
        </text>

        {/* Stack Assembly Blueprint Lines */}
        <path
          d="M 870 380 L 870 520"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Falling/Assembling Layers */}
        {[
          { name: "Bun Top", w: 90, y: 180, delay: 0.8 },
          { name: "Lettuce", w: 80, y: 220, delay: 0.6 },
          { name: "Patty", w: 85, y: 260, delay: 0.4 },
          { name: "Cheese", w: 75, y: 300, delay: 0.2 },
          { name: "Bun Bottom", w: 90, y: 340, delay: 0.0 },
        ].map((layer, i) => (
          <g key={i}>
            <motion.rect
              x={870 - layer.w / 2}
              y={layer.y - 10}
              width={layer.w}
              height="16"
              rx="4"
              fill="var(--background)"
              stroke="var(--text-secondary)"
              strokeWidth="1.2"
              initial={{ y: layer.y - 60, opacity: 0 }}
              animate={{ y: layer.y, opacity: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: layer.delay,
              }}
            />
            <text
              x="870"
              y={layer.y}
              textAnchor="middle"
              fill="var(--text-muted)"
              fontSize="7"
              fontFamily="monospace"
            >
              {layer.name.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Real-time building readouts */}
        <text
          x="870"
          y="415"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
        >
          BUILD_READY
        </text>
        <motion.text
          x="870"
          y="435"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="8"
          fontFamily="monospace"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SYS_ACTIVE: 100%
        </motion.text>
      </g>

      {/* Ingredient dots entering the pipeline & flowing to stack */}
      <motion.circle
        r="5"
        fill="var(--text-secondary)"
        animate={{
          cx: [130, 130, 870, 870],
          cy: [380, 520, 520, 380],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r="3"
        fill="var(--text-subtle)"
        animate={{
          cx: [130, 130, 870, 870],
          cy: [380, 520, 520, 380],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />
    </motion.svg>
  );
}

function CineHiveSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connecting networks behind screen */}
      <motion.path
        d="M 180 300 Q 500 150 820 300"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="6 12"
        opacity="0.3"
      />
      <motion.path
        d="M 180 300 Q 500 450 820 300"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="6 12"
        opacity="0.3"
      />

      {/* LEFT SIDE: Media Discovery Constellation Network */}
      <g opacity="0.8">
        <circle
          cx="160"
          cy="300"
          r="8"
          stroke="var(--text-secondary)"
          strokeWidth="2"
          fill="var(--background)"
        />
        <motion.circle
          cx="160"
          cy="300"
          r="16"
          stroke="var(--text-secondary)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <text
          x="160"
          y="275"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          DISCOVERY_HUB
        </text>

        {/* Nodes radiating outwards */}
        {[
          { x: 90, y: 220, label: "ACTION" },
          { x: 230, y: 220, label: "DRAMA" },
          { x: 90, y: 380, label: "COMEDY" },
          { x: 230, y: 380, label: "SCI-FI" },
        ].map((node, i) => (
          <g key={i}>
            <motion.line
              x1="160"
              y1="300"
              x2={node.x}
              y2={node.y}
              stroke="var(--border)"
              strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.15 }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              stroke="var(--text-muted)"
              strokeWidth="1.5"
              fill="var(--background)"
            />
            <text
              x={node.x}
              y={node.y + 16}
              textAnchor="middle"
              fill="var(--text-subtle)"
              fontSize="8"
              fontFamily="monospace"
            >
              {node.label}
            </text>

            {/* Flowing packet towards target */}
            <motion.circle
              r="2.5"
              fill="var(--text-secondary)"
              animate={{
                cx: [160, node.x],
                cy: [300, node.y],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          </g>
        ))}
      </g>

      {/* RIGHT SIDE: Cinematic Spotlight / Orbital System */}
      <g opacity="0.8">
        <circle
          cx="840"
          cy="300"
          r="100"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="840"
          cy="300"
          r="60"
          stroke="var(--border)"
          strokeWidth="0.8"
          strokeDasharray="3 6"
        />
        <circle
          cx="840"
          cy="300"
          r="6"
          stroke="var(--text-secondary)"
          strokeWidth="2"
          fill="var(--background)"
        />
        <text
          x="840"
          y="180"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          ORBITAL_SEARCH
        </text>

        {/* Orbiting Movie Elements */}
        {[
          { r: 100, speed: 12, delay: 0 },
          { r: 60, speed: 8, delay: 2 },
        ].map((orbit, i) => (
          <motion.circle
            key={i}
            r="4.5"
            fill="var(--text-secondary)"
            animate={{
              cx: Array.from({ length: 9 }, (_, step) => {
                const theta = (step * Math.PI) / 4;
                return 840 + orbit.r * Math.cos(theta);
              }),
              cy: Array.from({ length: 9 }, (_, step) => {
                const theta = (step * Math.PI) / 4;
                return 300 + orbit.r * Math.sin(theta);
              }),
            }}
            transition={{
              duration: orbit.speed,
              repeat: Infinity,
              ease: "linear",
              delay: orbit.delay,
            }}
          />
        ))}

        {/* Radar Sweep Line */}
        <motion.line
          x1="840"
          y1="300"
          x2="940"
          y2="300"
          stroke="var(--text-secondary)"
          strokeWidth="1.2"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "840px 300px" }}
        />

        {/* Index speed indicators */}
        <text
          x="840"
          y="425"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
        >
          INDEXED: 10K+ TITLES
        </text>
        <text
          x="840"
          y="440"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="8"
          fontFamily="monospace"
        >
          SPEED: &lt;150ms
        </text>
      </g>
    </motion.svg>
  );
}

function IkhtiyaarSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wave charts flowing behind browser screen */}
      <motion.path
        d="M 50 480 Q 250 380 500 450 T 950 350"
        stroke="var(--border)"
        strokeWidth="1"
        opacity="0.25"
      />
      <motion.path
        d="M 50 510 Q 300 410 500 480 T 950 400"
        stroke="var(--border)"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        opacity="0.2"
      />

      {/* LEFT SIDE: Marketing Traffic Channels */}
      <g opacity="0.8">
        <rect
          x="60"
          y="120"
          width="130"
          height="240"
          rx="14"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <text
          x="125"
          y="142"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          ACQUISITION
        </text>
        <line
          x1="60"
          y1="155"
          x2="190"
          y2="155"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {[
          { label: "ORGANIC", y: 190, ctr: "+19%" },
          { label: "REFERRAL", y: 230, ctr: "+25%" },
          { label: "PAID_ADS", y: 270, ctr: "+12%" },
          { label: "SOCIAL", y: 310, ctr: "+34%" },
        ].map((channel, i) => (
          <g key={i}>
            <circle cx="85" cy={channel.y} r="3" fill="var(--text-secondary)" />
            <text
              x="96"
              y={channel.y + 3}
              fill="var(--text-muted)"
              fontSize="8"
              fontFamily="monospace"
            >
              {channel.label}
            </text>
            <text
              x="180"
              y={channel.y + 3}
              textAnchor="end"
              fill="var(--text-secondary)"
              fontSize="8"
              fontFamily="monospace"
            >
              {channel.ctr}
            </text>

            {/* Dynamic visual indicator dot */}
            <motion.circle
              r="1.5"
              fill="var(--text-secondary)"
              animate={{
                cx: [85, 180],
                opacity: [0, 0.8, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
          </g>
        ))}
      </g>

      {/* RIGHT SIDE: Marketing Conversion Funnel */}
      <g opacity="0.8">
        <text
          x="860"
          y="130"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          LEAD_CONVERSION
        </text>

        {/* Funnel Outline */}
        <path
          d="M 780 150 L 940 150 L 890 380 L 830 380 Z"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
          fillOpacity="0.3"
        />

        {/* Funnel Stages */}
        {[
          { y: 200, label: "AWARENESS (100%)", w: 140 },
          { y: 270, label: "ENGAGED (45%)", w: 100 },
          { y: 340, label: "CONVERTED (28%)", w: 70 },
        ].map((stage, i) => (
          <g key={i}>
            <line
              x1={860 - stage.w / 2}
              y1={stage.y}
              x2={860 + stage.w / 2}
              y2={stage.y}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="860"
              y={stage.y - 6}
              textAnchor="middle"
              fill="var(--text-subtle)"
              fontSize="7"
              fontFamily="monospace"
            >
              {stage.label}
            </text>
          </g>
        ))}

        {/* Glowing converted nodes exiting funnel base */}
        <motion.circle
          r="4.5"
          fill="var(--text-secondary)"
          animate={{
            cx: [860, 860],
            cy: [160, 390, 440],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeIn" }}
        />
        <text
          x="860"
          y="420"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="9"
          fontFamily="monospace"
        >
          CTR: +19%
        </text>
        <text
          x="860"
          y="435"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="8"
          fontFamily="monospace"
        >
          LEADS_LOCKED
        </text>
      </g>
    </motion.svg>
  );
}

function RidgewellSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Full-size structural architectural background blueprint grid */}
      {[50, 150, 250, 350, 450, 550].map((y, i) => (
        <line
          key={`h-${i}`}
          x1="20"
          y1={y}
          x2="980"
          y2={y}
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.25"
          strokeDasharray="2 12"
        />
      ))}
      {[80, 240, 400, 560, 720, 880].map((x, i) => (
        <line
          key={`v-${i}`}
          x1={x}
          y1="20"
          x2={x}
          y2="580"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.25"
          strokeDasharray="2 12"
        />
      ))}

      {/* LEFT SIDE: Architectural Site Section Drawing */}
      <g opacity="0.8">
        <rect
          x="50"
          y="100"
          width="160"
          height="280"
          rx="4"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <text
          x="130"
          y="122"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          ELEVATION_SECTION
        </text>
        <line
          x1="50"
          y1="135"
          x2="210"
          y2="135"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Stone / Landscape Blueprint Lines */}
        <path
          d="M 60 300 Q 100 240 140 280 T 200 220"
          stroke="var(--text-muted)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 60 330 Q 110 280 150 310 T 200 270"
          stroke="var(--text-subtle)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
        />

        {/* Stone Grid Hatching */}
        <rect
          x="70"
          y="315"
          width="20"
          height="15"
          stroke="var(--border)"
          strokeWidth="0.8"
        />
        <rect
          x="90"
          y="325"
          width="25"
          height="12"
          stroke="var(--border)"
          strokeWidth="0.8"
        />
        <rect
          x="130"
          y="310"
          width="22"
          height="18"
          stroke="var(--border)"
          strokeWidth="0.8"
        />

        {/* Blueprint compass drawing */}
        <motion.circle
          cx="130"
          cy="200"
          r="30"
          stroke="var(--text-subtle)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <line
          x1="130"
          y1="170"
          x2="130"
          y2="230"
          stroke="var(--border)"
          strokeWidth="0.8"
        />
        <line
          x1="100"
          y1="200"
          x2="160"
          y2="200"
          stroke="var(--border)"
          strokeWidth="0.8"
        />

        <text
          x="130"
          y="360"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
        >
          SCALE: 1:25
        </text>
      </g>

      {/* RIGHT SIDE: Landscaping Layout & Grid Blueprint */}
      <g opacity="0.8">
        <rect
          x="790"
          y="100"
          width="160"
          height="280"
          rx="4"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <text
          x="870"
          y="122"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          SITE_PLAN_GRID
        </text>
        <line
          x1="790"
          y1="135"
          x2="950"
          y2="135"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* 3D Isometric Projection Plot box */}
        <motion.polygon
          points="830,220 910,190 910,260 830,290"
          stroke="var(--text-muted)"
          strokeWidth="1.2"
          fill="none"
          animate={{ strokeDashoffset: [0, 80] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          strokeDasharray="4 4"
        />
        <polygon
          points="830,220 870,170 950,170 910,220"
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
        />

        {/* Isometric details */}
        <line
          x1="870"
          y1="170"
          x2="870"
          y2="240"
          stroke="var(--border)"
          strokeWidth="0.8"
        />
        <line
          x1="950"
          y1="170"
          x2="950"
          y2="240"
          stroke="var(--border)"
          strokeWidth="0.8"
        />

        {/* Dimensions */}
        <line
          x1="830"
          y1="305"
          x2="910"
          y2="275"
          stroke="var(--text-secondary)"
          strokeWidth="0.8"
        />
        <path
          d="M 830 302 L 830 308 M 910 272 L 910 278"
          stroke="var(--text-secondary)"
          strokeWidth="0.8"
        />
        <text
          x="870"
          y="315"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="monospace"
          transform="rotate(-18 870 315)"
        >
          W_BOUND: 24.50'
        </text>

        <text
          x="870"
          y="360"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
        >
          ZONE_B_HARDSCAPE
        </text>
      </g>
    </motion.svg>
  );
}

function IronCladSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Global scanning laser beam line across left/right */}
      <motion.line
        x1="20"
        y1="100"
        x2="980"
        y2="100"
        stroke="var(--text-secondary)"
        strokeWidth="1.2"
        opacity="0.15"
        animate={{ y1: [100, 500, 100], y2: [100, 500, 100] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LEFT SIDE: Cryptographic Security Firewall */}
      <g opacity="0.8">
        <rect
          x="50"
          y="110"
          width="150"
          height="260"
          rx="12"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <text
          x="125"
          y="132"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          SECURITY_VAULT
        </text>
        <line
          x1="50"
          y1="145"
          x2="200"
          y2="145"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Encryption Gate Layers */}
        {[
          { label: "GATE_A: TRUSTED", y: 180, color: "var(--text-secondary)" },
          { label: "GATE_B: SHARED", y: 230, color: "var(--text-muted)" },
          { label: "GATE_C: ACCESS", y: 280, color: "var(--text-subtle)" },
        ].map((gate, i) => (
          <g key={i}>
            <rect
              x="65"
              y={gate.y - 12}
              width="120"
              height="22"
              rx="4"
              stroke="var(--border)"
              strokeWidth="1"
              fill="var(--background)"
            />
            <text
              x="125"
              y={gate.y + 2}
              textAnchor="middle"
              fill={gate.color}
              fontSize="8"
              fontFamily="monospace"
            >
              {gate.label}
            </text>
            <circle
              cx="172"
              cy={gate.y - 1}
              r="3.5"
              fill="var(--text-secondary)"
            />
          </g>
        ))}

        <motion.text
          x="125"
          y="340"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="monospace"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          SYS_SECURE: PASS
        </motion.text>
      </g>

      {/* RIGHT SIDE: Security Infrastructure Node Shield Map */}
      <g opacity="0.8">
        <rect
          x="800"
          y="110"
          width="150"
          height="260"
          rx="12"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="var(--background)"
          fillOpacity="0.4"
        />
        <text
          x="875"
          y="132"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
        >
          INFRA_SHIELD
        </text>
        <line
          x1="800"
          y1="145"
          x2="950"
          y2="145"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Central Shield Network Rings */}
        <circle
          cx="875"
          cy="225"
          r="45"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle
          cx="875"
          cy="225"
          r="30"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Hexagon Nodes */}
        <polygon
          points="875,190 910,210 910,240 875,260 840,240 840,210"
          stroke="var(--text-secondary)"
          strokeWidth="1.5"
          fill="none"
        />

        <circle
          cx="875"
          cy="225"
          r="6"
          stroke="var(--text-secondary)"
          strokeWidth="1.5"
          fill="var(--background)"
        />

        {/* Live Hex Encryption output log */}
        <motion.text
          x="875"
          y="310"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="monospace"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          MD5_CHECK: OK
        </motion.text>
        <text
          x="875"
          y="330"
          textAnchor="middle"
          fill="var(--text-subtle)"
          fontSize="7"
          fontFamily="monospace"
        >
          CIPHER: AES-GCM-256
        </text>
      </g>
    </motion.svg>
  );
}

interface SVGOverlayProps {
  activeIndex: number;
}

function ProjectSVGOverlay({ activeIndex }: SVGOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.45] xl:opacity-[0.55]">
      <AnimatePresence mode="wait">
        {activeIndex === 0 && <StackdSVG key="svg-stackd" />}
        {activeIndex === 1 && <CineHiveSVG key="svg-cinehive" />}
        {activeIndex === 2 && <IkhtiyaarSVG key="svg-ikhtiyaar" />}
        {activeIndex === 3 && <RidgewellSVG key="svg-ridgewell" />}
        {activeIndex === 4 && <IronCladSVG key="svg-ironclad" />}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BACKGROUND ATMOSPHERE (Layer 1)
// ═══════════════════════════════════════════════════════════

interface AtmosphereProps {
  activeIndex: number;
  spotlightPos: { x: number; y: number };
}

function Atmosphere({ activeIndex, spotlightPos }: AtmosphereProps) {
  const currentProject = PROJECTS[activeIndex];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern Layer */}
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
      {/* Cursor Spotlight on background */}
      <div
        className="absolute inset-0 transition-opacity duration-700 opacity-100"
        style={{
          background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.015), transparent 75%)`,
        }}
      />
      {/* Ambient project glow color */}
      <motion.div
        className="absolute w-[900px] h-[900px] top-1/2 left-1/2"
        animate={{
          background: `radial-gradient(circle, ${currentProject.glowColor} 0%, transparent 65%)`,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MACOS MAGNIFIED DOCK NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════

interface DockItemProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  mouseX: any;
}

function DockItem({ project, isActive, onClick, mouseX }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = project.icon;

  // Real macOS magnification: calculate distance from mouse X center
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return Infinity;
    const bounds = ref.current.getBoundingClientRect();
    const elementCenter = bounds.left + bounds.width / 2;
    return val - elementCenter;
  });

  // Bell-curve scale mapping: scales between 1.0 and 1.35 within a 180px radius
  const scaleTransform = useTransform(distance, [-180, 0, 180], [1, 1.35, 1]);
  const scale = useSpring(scaleTransform, {
    stiffness: 450,
    damping: 28,
    mass: 0.1,
  });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ scale }}
      className={`relative flex items-center gap-3 px-4.5 py-3 rounded-2xl border transition-[background-color,border-color,color] duration-150 select-none cursor-pointer focus:outline-none shrink-0 ${
        isActive
          ? "bg-zinc-100 border-zinc-200 text-zinc-950 shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
      }`}
    >
      {/* Slider pill overlay for active states (adds organic sliding motion) */}
      {isActive && (
        <motion.div
          layoutId="activeDockHighlight"
          className="absolute inset-0 bg-zinc-100 rounded-2xl -z-10"
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}

      {/* Dynamic Project Icon */}
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors duration-300 ${
          isActive
            ? "bg-zinc-950 border-zinc-900 text-zinc-100"
            : "bg-zinc-950/40 border-zinc-800/60 text-zinc-500"
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
      </span>

      {/* Numeric Indicator */}
      <span className="text-[10px] font-mono tracking-wider opacity-60">
        {project.num}
      </span>

      {/* Name Label */}
      <span className="font-sans font-semibold tracking-tight text-[13px] pr-1">
        {project.name}
      </span>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SELECTED WORK COMPONENT
// ═══════════════════════════════════════════════════════════

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);

  // Card reference endpoints for SVG connection coordinate mapping
  const cardLeftTopRef = useRef<HTMLDivElement>(null);
  const cardLeftBottomRef = useRef<HTMLDivElement>(null);
  const cardRightTopRef = useRef<HTMLDivElement>(null);
  const cardRightBottomRef = useRef<HTMLDivElement>(null);

  // Mouse / Spotlight / Parallax motion values
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    specs: false,
    stack: false,
    decisions: false,
  });

  const toggleSection = useCallback((key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const tabContainerRef = useRef<HTMLDivElement>(null);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  // macOS dock mouse tracking X coordinate
  const mouseX = useMotionValue<number>(Infinity);

  // SVG Connection coordinates
  const [coords, setCoords] = useState({
    leftTop: { x1: 0, y1: 0, x2: 0, y2: 0 },
    leftBottom: { x1: 0, y1: 0, x2: 0, y2: 0 },
    rightTop: { x1: 0, y1: 0, x2: 0, y2: 0 },
    rightBottom: { x1: 0, y1: 0, x2: 0, y2: 0 },
  });

  const activeProject = PROJECTS[activeIndex];

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); // Switch to grid/stack layout below xl (1280px)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll active horizontal navigation pill to center within container
  useEffect(() => {
    if (tabContainerRef.current) {
      const activeTab = tabContainerRef.current.children[
        activeIndex
      ] as HTMLElement;
      if (activeTab) {
        const container = tabContainerRef.current;
        const containerWidth = container.clientWidth;
        const activeTabLeft = activeTab.offsetLeft;
        const activeTabWidth = activeTab.clientWidth;

        // Calculate the target scrollLeft to center the activeTab
        const targetScrollLeft =
          activeTabLeft - containerWidth / 2 + activeTabWidth / 2;

        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  // Update SVG Connection line coordinates dynamically
  const updateCoordinates = useCallback(() => {
    if (!mainRef.current || !browserRef.current || isMobile) return;

    const mainRect = mainRef.current.getBoundingClientRect();
    const browserRect = browserRef.current.getBoundingClientRect();

    const getRelativeRightCenter = (el: HTMLElement | null) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.right - mainRect.left,
        y: r.top + r.height / 2 - mainRect.top,
      };
    };

    const getRelativeLeftCenter = (el: HTMLElement | null) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - mainRect.left,
        y: r.top + r.height / 2 - mainRect.top,
      };
    };

    // Calculate browser bounds
    const bLeft = browserRect.left - mainRect.left;
    const bRight = browserRect.right - mainRect.left;
    const bTop = browserRect.top - mainRect.top;
    const bHeight = browserRect.height;

    // Get right margins for left cards
    const pLeftTop = getRelativeRightCenter(cardLeftTopRef.current);
    const pLeftBottom = getRelativeRightCenter(cardLeftBottomRef.current);

    // Get left margins for right cards
    const pRightTop = getRelativeLeftCenter(cardRightTopRef.current);
    const pRightBottom = getRelativeLeftCenter(cardRightBottomRef.current);

    setCoords({
      leftTop: {
        x1: pLeftTop.x,
        y1: pLeftTop.y,
        x2: bLeft,
        y2: bTop + bHeight * 0.25,
      },
      leftBottom: {
        x1: pLeftBottom.x,
        y1: pLeftBottom.y,
        x2: bLeft,
        y2: bTop + bHeight * 0.75,
      },
      rightTop: {
        x1: pRightTop.x,
        y1: pRightTop.y,
        x2: bRight,
        y2: bTop + bHeight * 0.25,
      },
      rightBottom: {
        x1: pRightBottom.x,
        y1: pRightBottom.y,
        x2: bRight,
        y2: bTop + bHeight * 0.75,
      },
    });
  }, [isMobile]);

  // Handle index switching coordinate recalculations
  useEffect(() => {
    updateCoordinates();
    window.addEventListener("resize", updateCoordinates);
    const timer = setTimeout(updateCoordinates, 250); // Timeout allows transitions to settle
    return () => {
      window.removeEventListener("resize", updateCoordinates);
      clearTimeout(timer);
    };
  }, [activeIndex, updateCoordinates, isMobile]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();

      // Spotlight position
      setSpotlightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      if (isMobile) return;

      // Normalized coordinates (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCursor({ x, y });
    },
    [isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    setCursor({ x: 0, y: 0 });
    mouseX.set(Infinity); // Reset dock magnification
  }, [mouseX]);

  // Dynamic 3D tilt calculation
  const tiltX = useMemo(
    () => (isMobile ? 0 : -cursor.y * 10),
    [cursor.y, isMobile],
  );
  const tiltY = useMemo(
    () => (isMobile ? 0 : cursor.x * 10),
    [cursor.x, isMobile],
  );

  return (
    <section
      id="work"
      ref={mainRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-background border-t border-border/30 overflow-hidden py-16 md:py-18 select-none"
      aria-label="Selected Work"
    >
      {/* Layer 1 & 2 */}
      <Atmosphere activeIndex={activeIndex} spotlightPos={spotlightPos} />
      <ProjectSVGOverlay activeIndex={activeIndex} />

      {/* Layer 2: SVG Control Center Connection Wires (Only rendered on desktop xl viewports to guarantee 0 overlap) */}
      {!isMobile && coords.leftTop.x1 > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 xl:block hidden">
          {[
            coords.leftTop,
            coords.leftBottom,
            coords.rightTop,
            coords.rightBottom,
          ].map((c, i) => {
            const isLeft = i < 2;
            const controlOffset = isLeft ? 60 : -60;
            // Generate horizontal bezier curves
            const pathData = `M ${c.x1} ${c.y1} C ${c.x1 + controlOffset} ${c.y1}, ${c.x2 - controlOffset} ${c.y2}, ${c.x2} ${c.y2}`;

            return (
              <g key={i}>
                {/* Static Background Wire */}
                <path
                  d={pathData}
                  stroke="var(--border)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 6"
                  opacity="0.3"
                />
                {/* Active Glowing Flow Stream */}
                <motion.path
                  d={pathData}
                  stroke="var(--text-subtle)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="6 30"
                  animate={{ strokeDashoffset: [-120, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  opacity="0.65"
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Primary Layout Frame */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 md:px-10 flex flex-col items-center">
        {/* Layer 5: Typography Headers */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 border border-border/40 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse" />
            <span className="text-[10px] text-text-subtle font-mono tracking-[0.2em] uppercase">
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-text tracking-tight"
          >
            Products I've Helped Build
          </motion.h2>

          <div className="h-10 mt-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeProject.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="text-sm md:text-base text-text-secondary font-sans leading-relaxed text-center font-normal"
              >
                {activeProject.industry}: {activeProject.impact}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Horizontal Navigation Pills */}
        <div className="xl:hidden w-full overflow-hidden mt-2 mb-4">
          <div
            ref={tabContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none snap-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`snap-center px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-150 cursor-pointer ${
                  activeIndex === idx
                    ? "bg-zinc-100 border-zinc-200 text-zinc-950 shadow-md font-bold"
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {proj.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipeable Project Card */}
        <div className="xl:hidden w-full flex flex-col gap-5">
          {/* Active project screenshot - Hero-First */}
          <motion.div
            key={`mobile-hero-${activeProject.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              if (info.offset.x > 70) {
                prevProject();
              } else if (info.offset.x < -70) {
                nextProject();
              }
            }}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black/95 cursor-grab active:cursor-grabbing"
          >
            {/* Browser top bar simulation */}
            <div className="h-8 bg-surface/75 border-b border-border/40 flex items-center px-3 gap-1.5 select-none relative z-20">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 py-0.5 rounded-md bg-background/50 border border-border/20 text-[8px] font-mono text-text-subtle tracking-tight truncate max-w-[150px] text-center">
                  https://{activeProject.id}.dev
                </div>
              </div>
              <div className="w-5 text-[9px] font-mono text-text-subtle text-right">
                {activeProject.num}
              </div>
            </div>

            {/* Viewport screenshot */}
            <div className="relative w-full h-[calc(100%-32px)] overflow-hidden bg-background">
              <Image
                src={activeProject.image}
                alt={`${activeProject.name} mobile preview`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-top pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 pointer-events-none mix-blend-multiply" />
            </div>

            {/* Swipe instruction helper tag */}
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded text-[8px] font-mono text-text-muted select-none pointer-events-none">
              ← Swipe to Navigate →
            </div>
          </motion.div>

          {/* Project Header Info */}
          <div className="flex flex-col gap-1.5 mt-1 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-text-subtle uppercase tracking-wider">
                {activeProject.num}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                {activeProject.industry}
              </span>
            </div>
            <h3 className="text-2xl font-black text-text tracking-tight font-manrope">
              {activeProject.name}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {activeProject.impact}
            </p>
          </div>

          {/* Visual Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5 w-full mt-1">
            {activeProject.metrics.map((m, i) => (
              <div
                key={i}
                className="bg-zinc-950/75 border border-zinc-900/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1.5 shadow-md"
              >
                <span className="text-xl font-black text-text tracking-tight font-manrope leading-tight">
                  {m.value}
                </span>
                <span className="text-[8px] font-mono text-text-subtle uppercase tracking-wider text-center leading-normal break-words w-full">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Expandable Accordions */}
          <div className="flex flex-col gap-2.5 mt-2">
            {/* Accordion 1: Blueprint */}
            <div className="bg-zinc-950/70 border border-zinc-900/80 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("specs")}
                className="w-full flex items-center justify-between p-4.5 text-left font-bold text-xs uppercase tracking-wider text-text font-mono transition-colors duration-150 cursor-pointer active:bg-zinc-900/40"
              >
                <span className="flex items-center gap-2">
                  <FiLayers className="w-4 h-4 text-text-secondary" />
                  Project Specification
                </span>
                <span
                  className="text-text-muted transition-transform duration-200"
                  style={{
                    transform: expandedSections.specs
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.specs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-4.5 pt-0 border-t border-border/10 space-y-4 text-[12.5px] leading-relaxed text-text-secondary">
                      <div className="pt-3">
                        <span className="text-[9px] font-mono text-text-subtle uppercase block tracking-wider mb-0.5">
                          Developer Role
                        </span>
                        <span className="text-[13px] font-bold text-text">
                          {activeProject.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-text-subtle uppercase block mb-1 tracking-wider">
                          The Challenge
                        </span>
                        <p>{activeProject.challenge}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-text-subtle uppercase block mb-1 tracking-wider">
                          Solution
                        </span>
                        <p>{activeProject.solution}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Technology Stack */}
            <div className="bg-zinc-950/70 border border-zinc-900/80 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("stack")}
                className="w-full flex items-center justify-between p-4.5 text-left font-bold text-xs uppercase tracking-wider text-text font-mono transition-colors duration-150 cursor-pointer active:bg-zinc-900/40"
              >
                <span className="flex items-center gap-2">
                  <FiCpu className="w-4 h-4 text-text-secondary" />
                  Compliance & Stack
                </span>
                <span
                  className="text-text-muted transition-transform duration-200"
                  style={{
                    transform: expandedSections.stack
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.stack && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-4.5 pt-0 border-t border-border/10 flex flex-col gap-4">
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {activeProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-[10px] font-mono text-text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-[12px] leading-relaxed text-text-secondary pb-1">
                        Built prioritizing strict load bounds, package audits,
                        and low layout-shift ratings.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Decision Logs */}
            <div className="bg-zinc-950/70 border border-zinc-900/80 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("decisions")}
                className="w-full flex items-center justify-between p-4.5 text-left font-bold text-xs uppercase tracking-wider text-text font-mono transition-colors duration-150 cursor-pointer active:bg-zinc-900/40"
              >
                <span className="flex items-center gap-2">
                  <FiTarget className="w-4 h-4 text-text-secondary" />
                  Decision Logs
                </span>
                <span
                  className="text-text-muted transition-transform duration-200"
                  style={{
                    transform: expandedSections.decisions
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.decisions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-4.5 pt-0 border-t border-border/10">
                      <ul className="space-y-2.5 pt-3">
                        {activeProject.decisions.map((dec, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 text-[12px] leading-relaxed text-text-secondary"
                          >
                            <span className="text-text-subtle font-mono text-[10px] mt-0.5 select-none">
                              [{idx + 1}]
                            </span>
                            <span>{dec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Full-width CTA Action Drawers */}
          <div className="mt-4 mb-2">
            <a
              href={activeProject.liveUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-bold uppercase tracking-normal bg-zinc-100 text-zinc-950 border border-zinc-100 shadow-md active:scale-98 transition-all duration-150 cursor-pointer select-none"
            >
              <span>Visit Website</span>
              <FiExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3-Column Control Center Architecture */}
        <div className="hidden xl:grid w-full xl:grid-cols-[340px_1fr_340px] gap-8 xl:gap-12 items-center relative min-h-[680px]">
          {/* ──── LEFT PANEL (System Parameters) ──── */}
          <div className="flex flex-col gap-6 w-full z-10 order-2 xl:order-1">
            {/* Card 1: Business Metrics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${activeProject.id}`}
                ref={cardLeftTopRef}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.45 }}
                className="bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl p-6.5 md:p-8 rounded-[24px] shadow-2xl flex flex-col gap-4 md:gap-5"
              >
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="text-[10px] md:text-[11px] font-mono text-text-subtle tracking-wider uppercase flex items-center gap-1.5">
                    <FiTrendingUp className="w-3.5 h-3.5 text-text-secondary" />
                    SYSTEM METRIC OVERVIEW
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="text-[28px] md:text-[32px] font-black font-manrope text-text tracking-tight leading-tight">
                    {activeProject.metricHighlight}
                  </div>
                  <p className="text-[12px] md:text-[13px] leading-relaxed text-text-secondary">
                    Primary operational performance post deployment.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/20">
                  {activeProject.metrics.slice(1).map((m, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <span className="text-base md:text-[17px] font-bold text-text tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-mono text-text-subtle uppercase tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Card 2: Specifications & Role */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`specs-${activeProject.id}`}
                ref={cardLeftBottomRef}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl p-6.5 md:p-8 rounded-[24px] shadow-2xl flex flex-col gap-4 md:gap-5"
              >
                <div className="flex items-center gap-1.5 border-b border-border/30 pb-3">
                  <FiLayers className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-[10px] md:text-[11px] font-mono text-text-subtle tracking-wider uppercase">
                    PROJECT SPECIFICATION
                  </span>
                </div>

                <div className="space-y-4 text-[12.5px] md:text-[13.5px] leading-relaxed text-text-secondary">
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono text-text-subtle uppercase block tracking-wider mb-0.5">
                      Developer Role
                    </span>
                    <span className="text-[14px] md:text-[15px] font-bold text-text">
                      {activeProject.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono text-text-subtle uppercase block mb-1 tracking-wider">
                      The Challenge
                    </span>
                    <p className="leading-relaxed">{activeProject.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono text-text-subtle uppercase block mb-1 tracking-wider">
                      Solution
                    </span>
                    <p className="leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ──── CENTER PANEL (Massive Project Preview Hero) ──── */}
          <div className="flex items-center justify-center w-full z-10 order-1 xl:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                ref={browserRef}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(20px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  rotateX: tiltX,
                  rotateY: tiltY,
                }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.9)] border border-white/5 bg-black/95 group/preview shrink-0 cursor-default"
                style={{
                  perspective: 1200,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Browser bar */}
                <div className="h-10 bg-surface/75 border-b border-border/40 flex items-center px-4 gap-2 select-none z-20 backdrop-blur-md relative shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-6 py-0.5 rounded-md bg-background/50 border border-border/30 text-[9px] font-mono text-text-subtle tracking-tight max-w-[240px] truncate text-center">
                      https://{activeProject.id}.dev
                    </div>
                  </div>
                  <div className="w-8 text-[11px] font-mono text-text-subtle text-right">
                    {activeProject.num}
                  </div>
                </div>

                {/* Screenshot viewport */}
                <div className="relative w-full h-[calc(100%-40px)] overflow-hidden bg-background">
                  <Image
                    src={activeProject.image}
                    alt={`${activeProject.name} product preview`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-top transition-transform duration-[1.5s] ease-out group-hover/preview:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 pointer-events-none mix-blend-multiply" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ──── RIGHT PANEL (Compliance & Operations Logs) ──── */}
          <div className="flex flex-col gap-6 w-full z-10 order-3">
            {/* Card 3: Stack Compliance */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stack-${activeProject.id}`}
                ref={cardRightTopRef}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.45 }}
                className="bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl p-6.5 md:p-8 rounded-[24px] shadow-2xl flex flex-col gap-4 md:gap-5"
              >
                <div className="flex items-center gap-1.5 border-b border-border/30 pb-3">
                  <FiCpu className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-[10px] md:text-[11px] font-mono text-text-subtle tracking-wider uppercase">
                    COMPLIANCE & STACK
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-[10.5px] md:text-[11.5px] font-mono text-text-secondary tracking-tight"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-[12px] md:text-[13px] leading-relaxed text-text-secondary pt-2 border-t border-border/20">
                  Built prioritizing strict load bounds, package audits, and low
                  layout-shift ratings.
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Card 4: Decision Logs & CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`decisions-${activeProject.id}`}
                ref={cardRightBottomRef}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl p-6.5 md:p-8 rounded-[24px] shadow-2xl flex flex-col gap-4 md:gap-5"
              >
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="text-[10px] md:text-[11px] font-mono text-text-subtle tracking-wider uppercase flex items-center gap-1.5">
                    <FiTarget className="w-3.5 h-3.5 text-text-secondary" />
                    DECISION LOGS
                  </span>
                  <span className="text-[10px] md:text-[11px] font-mono text-text-subtle">
                    LOGS
                  </span>
                </div>

                <ul className="space-y-3">
                  {activeProject.decisions.map((dec, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2.5 text-[12px] md:text-[13px] leading-relaxed text-text-secondary"
                    >
                      <span className="text-text-subtle font-mono text-[10px] md:text-[11px] mt-0.5 select-none">
                        [{idx + 1}]
                      </span>
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>

                {/* Launch Action Drawers */}
                <div className="pt-3 border-t border-border/20">
                  <a
                    target="_blank"
                    href={activeProject.liveUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs md:text-sm font-bold uppercase tracking-normal bg-zinc-100 text-zinc-950 border border-zinc-100 hover:bg-white hover:border-white hover:scale-[1.02] shadow-[0_4px_20px_rgba(255,255,255,0.12)] transition-all duration-200 cursor-pointer select-none"
                  >
                    <span>Visit Website</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ──── MACOS MAGNIFIED DOCK NAVIGATION DOCK (Layer 5 Controls) ──── */}
        <div className="hidden xl:block relative mt-20 z-30">
          <div
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-center gap-4.5 px-6 py-3.5 bg-zinc-950/60 border border-zinc-800/70 backdrop-blur-2xl rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)] max-w-full overflow-x-auto scrollbar-none"
          >
            {PROJECTS.map((proj, idx) => (
              <DockItem
                key={proj.id}
                project={proj}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                mouseX={mouseX}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
