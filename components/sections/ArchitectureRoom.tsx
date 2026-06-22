"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  FiArrowRight,
  FiArrowDown,
  FiCode,
  FiLayout,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiShield,
  FiActivity
} from "react-icons/fi";

// ═══════════════════════════════════════════════════════════
// HIGH-FIDELITY BRAND LOGO SVG COMPONENTS
// ═══════════════════════════════════════════════════════════

const NextjsLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" />
    <path d="M136.2 138.8L74.8 61.2H61.2V118.8H72.1V74.9L125.1 138.8H136.2Z" fill="currentColor" />
    <rect x="110" y="61.2" width="10.9" height="57.6" fill="currentColor" />
  </svg>
);

const ReactLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <g stroke="currentColor" strokeWidth="2">
      <ellipse cx="50" cy="50" rx="9" ry="24" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="50" rx="9" ry="24" transform="rotate(90 50 50)" />
      <ellipse cx="50" cy="50" rx="9" ry="24" transform="rotate(150 50 50)" />
    </g>
    <circle cx="50" cy="50" r="4.5" fill="currentColor" />
  </svg>
);

const TailwindLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M50 33C40 33 34 38 32 48C35 43 39 41 44 41C48 41 51 44 54 47C59 52 65 57 76 57C86 57 92 52 94 42C91 47 87 49 82 49C78 49 75 46 72 43C67 38 61 33 50 33ZM32 57C22 57 16 62 14 72C17 67 21 65 26 65C30 65 33 68 36 71C41 76 47 81 58 81C68 81 74 76 76 66C73 71 69 73 64 73C60 73 57 70 54 67C49 62 43 57 32 57Z" fill="currentColor" />
  </svg>
);

const MotionLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M25 25L50 50L25 75V25Z" fill="currentColor" />
    <path d="M50 25L75 50L50 75V25Z" fill="currentColor" />
  </svg>
);

const TypescriptLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="16" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" />
    <path d="M38 72H32V42H22V36H48V42H38V72Z" fill="currentColor" />
    <path d="M54 62C54 68 59 72 66 72C73 72 78 67 78 61C78 55 73 52 65 49C57 46 54 43 54 38C54 33 58 30 65 30C72 30 76 34 76 40H70C70 36 67 34 64 34C60 34 58 36 58 39C58 43 61 45 69 48C77 51 84 54 84 62C84 69 77 76 66 76C55 76 48 70 48 62H54Z" fill="currentColor" />
  </svg>
);

const ShadcnLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M25 75L75 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>
);

const NodejsLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M50 18L78 34V66L50 82L22 66V34L50 18Z" stroke="currentColor" strokeWidth="2.5" />
    <path d="M50 28L68 38V62L50 72L32 62V38L50 28Z" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

const BunLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M50 28C38 28 32 34 32 44C32 46 33 48 35 49C32 50 30 52 30 55C30 62 40 68 50 68C60 68 70 62 70 55C70 52 68 50 65 49C67 48 68 46 68 44C68 34 62 28 50 28Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="42" cy="42" r="2.5" fill="currentColor" />
    <circle cx="58" cy="42" r="2.5" fill="currentColor" />
    <path d="M46 54C48 56 52 56 54 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExpressLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="monospace" fontWeight="bold">ex.</text>
  </svg>
);

const RestApiLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <circle cx="30" cy="50" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="70" cy="35" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="70" cy="65" r="8" stroke="currentColor" strokeWidth="2" />
    <line x1="38" y1="50" x2="62" y2="38" stroke="currentColor" strokeWidth="2" />
    <line x1="38" y1="50" x2="62" y2="62" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AuthLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <path d="M50 25L72 32V50C72 63.8 62.6 72 50 75C37.4 72 28 63.8 28 50V32L50 25Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M44 48L48 52L56 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ServerLogicLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    <rect x="28" y="28" width="44" height="44" rx="6" stroke="currentColor" strokeWidth="2" />
    <line x1="28" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="58" x2="72" y2="58" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="38" cy="35" r="2" fill="currentColor" />
    <circle cx="38" cy="50" r="2" fill="currentColor" />
    <circle cx="38" cy="67" r="2" fill="currentColor" />
  </svg>
);

const PostgresLogo = ({ colorClass }: { colorClass: string }) => (
  <svg className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
    {/* Elephant Ear */}
    <path d="M48 26C35 26 30 35 30 45C30 55 42 63 50 63" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Forehead & Trunk */}
    <path d="M48 26C58 26 66 32 68 42C70 52 62 60 54 63C54 68 58 70 62 70" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="56" cy="40" r="2" fill="currentColor" />
    {/* Tusk */}
    <path d="M60 48H66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const EdgeLogo = ({ colorClass }: { colorClass: string }) => (
  <FiGlobe className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} />
);

const PerformanceLogo = ({ colorClass }: { colorClass: string }) => (
  <FiActivity className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} />
);

const AccessLogo = ({ colorClass }: { colorClass: string }) => (
  <FiShield className={`w-8 h-8 transition-colors duration-300 ${colorClass}`} />
);

// ═══════════════════════════════════════════════════════════
// DATA DEFINITIONS & TYPES
// ═══════════════════════════════════════════════════════════

interface TechItem {
  name: string;
  copy: string;
  brandColor: string;
  logo: React.ComponentType<{ colorClass: string }>;
}

interface PipelineStage {
  num: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  techs: TechItem[];
}

const STAGES: PipelineStage[] = [
  {
    num: "01",
    title: "Strategy & UX",
    description: "Setting design systems foundation bounds and establishing strict compile-time types contract.",
    icon: FiCode,
    techs: [
      {
        name: "TypeScript",
        copy: "Enforcing type safety to catch bugs before they reach production users.",
        brandColor: "group-hover:text-[#3178C6] group-hover:drop-shadow-[0_0_8px_rgba(49,120,198,0.3)]",
        logo: TypescriptLogo
      },
      {
        name: "Shadcn/UI",
        copy: "Assembling accessible, modular component foundations following Radix specifications.",
        brandColor: "group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
        logo: ShadcnLogo
      }
    ]
  },
  {
    num: "02",
    title: "Frontend Experience",
    description: "Architecting interactive visual layout templates, search performance routes, and tactile logic screens.",
    icon: FiLayout,
    techs: [
      {
        name: "Next.js",
        copy: "Building fast, SEO-friendly experiences that render page structures instantly.",
        brandColor: "group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]",
        logo: NextjsLogo
      },
      {
        name: "React.js",
        copy: "Creating responsive, state-driven interfaces with highly predictable reactivity tree cycles.",
        brandColor: "group-hover:text-[#61DAFB] group-hover:drop-shadow-[0_0_8px_rgba(97,218,251,0.3)]",
        logo: ReactLogo
      },
      {
        name: "TailwindCSS",
        copy: "Creating clean, scalable interfaces without carrying legacy stylesheet design debt.",
        brandColor: "group-hover:text-[#06B6D4] group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]",
        logo: TailwindLogo
      },
      {
        name: "Motion",
        copy: "Adding meaningful interaction events that guide visitor attention and improve usability.",
        brandColor: "group-hover:text-[#FF007F] group-hover:drop-shadow-[0_0_8px_rgba(255,0,127,0.3)]",
        logo: MotionLogo
      }
    ]
  },
  {
    num: "03",
    title: "Backend Logic",
    description: "Formulating lightweight servers, transactional boundary constraints, and execution triggers.",
    icon: FiCpu,
    techs: [
      {
        name: "Node.js",
        copy: "Powering the asynchronous runtime logic behind backend systems workflows.",
        brandColor: "group-hover:text-[#339933] group-hover:drop-shadow-[0_0_8px_rgba(51,153,51,0.3)]",
        logo: NodejsLogo
      },
      {
        name: "Bun",
        copy: "Executing server scripts and package compilation tasks with zero tool overhead.",
        brandColor: "group-hover:text-[#FBF0D9] group-hover:drop-shadow-[0_0_8px_rgba(251,240,217,0.3)]",
        logo: BunLogo
      },
      {
        name: "Express.js",
        copy: "Routing HTTP actions smoothly through modular endpoint controller pipelines.",
        brandColor: "group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
        logo: ExpressLogo
      }
    ]
  },
  {
    num: "04",
    title: "Data Layer",
    description: "Managing payloads securely, indexing entities, and standardizing uniform data structures.",
    icon: FiDatabase,
    techs: [
      {
        name: "REST APIs",
        copy: "Connecting products to the remote databases and data feeds they depend on.",
        brandColor: "group-hover:text-[#00FFCC] group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.3)]",
        logo: RestApiLogo
      },
      {
        name: "PostgreSQL",
        copy: "Managing structured relational tables and query transactional safety.",
        brandColor: "group-hover:text-[#336791] group-hover:drop-shadow-[0_0_8px_rgba(51,103,145,0.3)]",
        logo: PostgresLogo
      },
      {
        name: "Authentication",
        copy: "Securing identity parameters and protecting request channels via encrypted checks.",
        brandColor: "group-hover:text-[#FF5D5D] group-hover:drop-shadow-[0_0_8px_rgba(255,93,93,0.3)]",
        logo: AuthLogo
      },
      {
        name: "Server Logic",
        copy: "Orchestrating background business rules and parsing payload normalizations.",
        brandColor: "group-hover:text-[#A855F7] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]",
        logo: ServerLogicLogo
      }
    ]
  },
  {
    num: "05",
    title: "Optimized Delivery",
    description: "Deploying secure serverless assets, tuning loading speed, and scaling systems global availability.",
    icon: FiGlobe,
    techs: [
      {
        name: "Edge Delivery",
        copy: "Configuring edge networks to host static templates closer to the client viewport location.",
        brandColor: "group-hover:text-[#00DF89] group-hover:drop-shadow-[0_0_8px_rgba(0,223,137,0.3)]",
        logo: EdgeLogo
      },
      {
        name: "Performance Log",
        copy: "Auditing Core Web Vitals, speed index limits, and layout shifts dynamically.",
        brandColor: "group-hover:text-[#F59E0B] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]",
        logo: PerformanceLogo
      },
      {
        name: "Access Control",
        copy: "Deploying perimeter shielding gates to safeguard database transactional streams.",
        brandColor: "group-hover:text-[#3B82F6] group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]",
        logo: AccessLogo
      }
    ]
  }
];

export default function ArchitectureRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      id="architecture"
      className="relative w-full bg-background border-t border-border/40 overflow-hidden py-24 md:py-32"
    >
      {/* Layer 1: Background engineering grid overlay */}
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
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(var(--text-subtle) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* System layout codes */}
        <div className="absolute top-6 left-6 text-[8px] font-mono text-text-subtle/30 tracking-widest">
          PIPELINE_ORCHESTRATOR // ENGINE_V4
        </div>
        <div className="absolute bottom-6 left-6 text-[8px] font-mono text-text-subtle/20 tracking-widest">
          AHMED_PORTFOLIO_SYSTEMS // VER_1.0.4
        </div>
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-10 flex flex-col gap-20 relative z-10">
        
        {/* HEADER DESIGN */}
        <div className="max-w-[850px] space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-text animate-pulse" />
            <span className="text-[12.5px] text-text-subtle font-mono tracking-[0.25em] uppercase">
              ENGINEERING SYSTEMS
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-[4rem] lg:text-[4.5rem] font-bold font-manrope text-text tracking-tight leading-[1.05]">
            The Architecture Room
          </h2>
          <p className="text-lg sm:text-xl lg:text-[22px] font-mono text-text-muted leading-relaxed">
            I don't think in pages. <br />
            I think in systems, data flows, performance, and user experiences. <br />
            Every product is a collection of connected parts working together to solve a problem.
          </p>
        </div>

        {/* PIPELINE CONTAINER */}
        <div ref={containerRef} className="w-full">
          
          {/* DESKTOP PIPELINE EXPERIENCE (Horizontal Grid Flow) */}
          <div className="hidden lg:flex flex-col gap-12 relative">
            
            {/* SVG Progress Pipeline Connector (Connecting the 5 stages horizontally) */}
            <div className="absolute top-[40px] left-[5%] right-[5%] h-[4px] z-0">
              <svg className="w-full h-[6px] overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Line */}
                <line x1="0" y1="3" x2="100%" y2="3" stroke="var(--border)" strokeWidth="2.5" strokeDasharray="6 6" />
                
                {/* Active Path Line */}
                <motion.line
                  x1="0"
                  y1="3"
                  x2="100%"
                  y2="3"
                  stroke="var(--text-secondary)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(250,250,250,0.25))",
                  }}
                />

                {/* Flowing Dash Line Overlay */}
                {isInView && (
                  <line
                    x1="0"
                    y1="3"
                    x2="100%"
                    y2="3"
                    stroke="var(--text)"
                    strokeWidth="2.2"
                    strokeDasharray="8 24"
                    style={{
                      animation: "dashOffsetFlow 4s linear infinite",
                    }}
                  />
                )}
              </svg>
            </div>

            {/* Stages Row Grid */}
            <div className="grid grid-cols-5 gap-6 relative z-10">
              {STAGES.map((stage, sIdx) => {
                const StageIcon = stage.icon;
                const isStageActive = activeStage === sIdx;
                
                return (
                  <div
                    key={stage.num}
                    onMouseEnter={() => setActiveStage(sIdx)}
                    onMouseLeave={() => setActiveStage(null)}
                    className="flex flex-col gap-6"
                  >
                    {/* Pipeline Stage Head Indicator */}
                    <div className="flex items-center gap-3 relative">
                      <div
                        className={`w-[46px] h-[46px] rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                          isStageActive
                            ? "bg-card border-text text-text shadow-[0_0_15px_rgba(250,250,250,0.06)]"
                            : "bg-surface border-border text-text-subtle"
                        }`}
                      >
                        <StageIcon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex flex-col gap-0.5 select-none">
                        <span className="text-[11.5px] font-mono font-bold text-text-subtle">
                          STAGE {stage.num}
                        </span>
                        <h3 className="text-[14.5px] font-mono font-bold tracking-tight text-text-secondary uppercase">
                          {stage.title}
                        </h3>
                      </div>

                      {/* Directional arrow between stages */}
                      {sIdx < 4 && (
                        <div className="absolute right-[-14px] top-[14px] text-border">
                          <FiArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Stage Details Block */}
                    <div
                      className={`flex-1 p-6 rounded-2xl border transition-all duration-300 min-h-[420px] flex flex-col gap-6 ${
                        isStageActive
                          ? "bg-card/50 border-text-subtle shadow-[0_15px_30px_-10px_rgba(0,0,0,0.45)]"
                          : "bg-surface/30 border-border/80"
                      }`}
                    >
                      <p className="text-[14px] font-mono text-text-muted leading-relaxed pb-3 border-b border-border/40">
                        {stage.description}
                      </p>

                      {/* Tech stack elements inside stage */}
                      <div className="flex-1 flex flex-col gap-4">
                        {stage.techs.map((tech) => {
                          const LogoComponent = tech.logo;
                          const isTechHovered = hoveredTech === tech.name;
                          
                          return (
                            <div
                              key={tech.name}
                              onMouseEnter={() => setHoveredTech(tech.name)}
                              onMouseLeave={() => setHoveredTech(null)}
                              className="group flex flex-col gap-3 p-4.5 rounded-xl bg-background/40 hover:bg-card border border-border/60 hover:border-text-subtle/50 transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-text-subtle group-hover:text-text">
                                  <LogoComponent colorClass={tech.brandColor} />
                                </div>
                                <span className="text-[16px] font-mono font-bold text-text-secondary group-hover:text-text tracking-wide transition-colors duration-200">
                                  {tech.name}
                                </span>
                              </div>
                              
                              <p className="text-[14px] text-text-muted group-hover:text-text-secondary leading-relaxed font-sans tracking-wide transition-colors duration-200 pl-0.5">
                                {tech.copy}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* TABLET & MOBILE TIMELINE VIEWPORT (Vertical Flow Pipeline) */}
          <div className="lg:hidden flex flex-col gap-12 relative pl-8">
            
            {/* Vertical Line Connector */}
            <div className="absolute left-[16px] top-[10px] bottom-[10px] w-[2px]">
              <svg className="w-[4px] h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
                
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="var(--text-secondary)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />

                {isInView && (
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="var(--text)"
                    strokeWidth="2"
                    strokeDasharray="6 20"
                    style={{
                      animation: "dashOffsetFlow 4s linear infinite",
                    }}
                  />
                )}
              </svg>
            </div>

            {STAGES.map((stage, sIdx) => {
              const StageIcon = stage.icon;
              
              return (
                <div key={stage.num} className="relative flex flex-col gap-4">
                  
                  {/* Step Dot Header */}
                  <div className="absolute left-[-32px] top-[2px] z-10 flex items-center justify-center">
                    <div className="w-[18px] h-[18px] rounded-full bg-background border-2 border-text flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-text animate-ping" />
                    </div>
                  </div>

                  {/* Stage Headline info */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary">
                      <StageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-mono font-bold text-text-subtle uppercase">
                        STAGE {stage.num}
                      </span>
                      <h3 className="text-[16px] font-mono font-bold text-text tracking-wide uppercase">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  {/* Step Body Card */}
                  <div className="bg-card/30 border border-border/80 rounded-2xl p-6 space-y-5">
                    <p className="text-[14px] font-mono text-text-muted leading-relaxed pb-3 border-b border-border/40">
                      {stage.description}
                    </p>

                    {/* Tech details stack */}
                    <div className="grid grid-cols-1 gap-4">
                      {stage.techs.map((tech) => {
                        const LogoComponent = tech.logo;
                        
                        return (
                          <div
                            key={tech.name}
                            className="group flex flex-col gap-2 p-3.5 rounded-xl bg-surface/50 border border-border/60"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-text">
                                <LogoComponent colorClass={tech.brandColor} />
                              </div>
                              <span className="text-[14px] font-mono font-bold text-text">
                                {tech.name}
                              </span>
                            </div>
                            
                            <p className="text-[13px] text-text-muted leading-relaxed font-sans pl-0.5">
                              {tech.copy}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Global style tag for keyframe animations without hydration mismatches */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dashOffsetFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -96px;
          }
        }
      `}} />
    </section>
  );
}
