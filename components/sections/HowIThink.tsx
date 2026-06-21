"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

// Check Icon Component
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-text"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// -----------------------------------------------------------------
// Sub-component 1: SVG Path Drawing Discovery Diagram (Principle 01)
// -----------------------------------------------------------------
function DiscoveryDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    { label: "1. Problem Discovery", desc: "User Interviews & Business Constraints", x: 100, y: 110 },
    { label: "2. Constraints Analysis", desc: "API Limits, Edge Bottlenecks", x: 280, y: 50 },
    { label: "3. Interactive Concept", desc: "User Validation & Wireframing", x: 280, y: 170 },
    { label: "4. Modular Clean Code", desc: "Scalable Architecture & Tests", x: 460, y: 110 },
  ];

  return (
    <div className="relative w-full h-[280px] bg-card/40 border border-border/60 rounded-2xl flex items-center justify-center overflow-hidden p-4">
      {/* SVG Canvas for lines */}
      <svg
        ref={ref}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 560 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paths connecting nodes */}
        <motion.path
          d="M 100 110 L 280 50"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.path
          d="M 100 110 L 280 170"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.path
          d="M 280 50 L 460 110"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.6 }}
        />
        <motion.path
          d="M 280 170 L 460 110"
          fill="none"
          stroke="var(--text-subtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* Dynamic pulsing signal flows */}
        {isInView && (
          <>
            <motion.circle
              r="4"
              fill="var(--text-secondary)"
              initial={{ offset: 0 }}
              animate={{ cx: [100, 280], cy: [110, 50] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              r="4"
              fill="var(--text-secondary)"
              initial={{ offset: 0 }}
              animate={{ cx: [100, 280], cy: [110, 170] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.circle
              r="4"
              fill="var(--text-secondary)"
              initial={{ offset: 0 }}
              animate={{ cx: [280, 460], cy: [50, 110] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
            <motion.circle
              r="4"
              fill="var(--text-secondary)"
              initial={{ offset: 0 }}
              animate={{ cx: [280, 460], cy: [170, 110] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </>
        )}

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const isHovered = hoveredNode === idx;
          return (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode(idx)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pulsing indicator ring on hover */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="16"
                fill="none"
                stroke="var(--text-subtle)"
                strokeWidth="0.5"
                animate={isHovered ? { scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {/* Inner Node Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="var(--surface)"
                stroke={isHovered ? "var(--text)" : "var(--border)"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Info Overlays for Hovered Node */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center min-h-[50px]">
        <AnimatePresence mode="wait">
          {hoveredNode !== null ? (
            <motion.div
              key={hoveredNode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-[12px] font-semibold font-sans text-text tracking-wide uppercase">
                {nodes[hoveredNode].label}
              </p>
              <p className="text-[11px] font-mono text-text-muted mt-0.5">
                {nodes[hoveredNode].desc}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-mono text-text-subtle tracking-wider uppercase"
            >
              Hover nodes to trace the discovery path
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 2: Interactive UI Comparison Widget (Principle 02)
// -----------------------------------------------------------------
function InteractiveUISwitcher() {
  const [mode, setMode] = useState<"complexity" | "clarity">("clarity");

  return (
    <div className="relative w-full min-h-[280px] bg-card/40 border border-border/60 rounded-2xl flex flex-col overflow-hidden p-6 gap-4 select-none">
      {/* Mode Buttons */}
      <div className="flex gap-2.5 p-1 rounded-xl bg-surface border border-border/60 self-start">
        <button
          onClick={() => setMode("complexity")}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium tracking-wide transition-all duration-300 ${
            mode === "complexity"
              ? "bg-card text-text border border-border shadow-md"
              : "text-text-muted hover:text-text"
          }`}
        >
          Complex Flow
        </button>
        <button
          onClick={() => setMode("clarity")}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium tracking-wide transition-all duration-300 ${
            mode === "clarity"
              ? "bg-card text-text border border-border shadow-md"
              : "text-text-muted hover:text-text"
          }`}
        >
          Clear Experience
        </button>
      </div>

      {/* Screen Interface Wrapper */}
      <div className="flex-1 flex flex-col justify-center relative min-h-[160px] border border-border/40 rounded-xl p-4 bg-background/50">
        <AnimatePresence mode="wait">
          {mode === "complexity" ? (
            <motion.div
              key="complexity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-text-subtle border-b border-border/40 pb-2">
                <span>WIDGET_CONFIG_STEP_1.JSON</span>
                <span className="text-red-500 font-bold">● ERRORS PRESENT (3)</span>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter token payload (base64 string only)"
                  disabled
                  className="w-full px-3 py-1.5 text-[11px] font-mono bg-surface border border-red-500/50 rounded text-red-400 placeholder-red-500/30"
                />
                <span className="text-[9px] font-mono text-red-500 block -mt-1.5 px-1">
                  * Token parsing failed. Payload contains invalid characters.
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="password"
                    placeholder="Enter database port"
                    disabled
                    className="w-full px-3 py-1.5 text-[11px] font-mono bg-surface border border-border rounded text-text-muted placeholder-text-subtle/50"
                  />
                  <input
                    type="text"
                    placeholder="Validation regex"
                    disabled
                    className="w-full px-3 py-1.5 text-[11px] font-mono bg-surface border border-border rounded text-text-muted placeholder-text-subtle/50"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="clarity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 flex flex-col justify-center"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-text-subtle border-b border-border/40 pb-2">
                <span>Single-Click Deploy</span>
                <span className="text-text font-bold">● READY</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface border border-border/80 shadow-inner">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-semibold text-text">Instant Authentication</span>
                  <span className="text-[10px] font-mono text-text-muted">Resolves payload & configurations automatically</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-text text-background flex items-center justify-center">
                  <CheckIcon />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[10px] font-mono text-text-subtle text-center">
        {mode === "complexity"
          ? "Exposes system implementation details, leading to cognitive fatigue."
          : "Hides system complexities. Smooth interface delivers immediate task completion."}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 3: Metrics & Lighthouse Dial Dashboard (Principle 03)
// -----------------------------------------------------------------
function PerformanceDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [scores, setScores] = useState({ lighthouse: 0, speed: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        setScores({
          lighthouse: Math.min(Math.round((step / steps) * 99), 99),
          speed: parseFloat(Math.max(0.5 - (step / steps) * 0.42, 0.08).toFixed(2)),
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[280px] bg-card/40 border border-border/60 rounded-2xl flex flex-col md:flex-row items-center justify-around p-6 gap-6"
    >
      {/* Lighthouse Circular Dial */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Dial Circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="var(--border)"
              strokeWidth="5"
            />
            {/* Foreground Fill Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="var(--text)"
              strokeWidth="5.5"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={isInView ? { strokeDashoffset: 2 * Math.PI * 42 * (1 - scores.lighthouse / 100) } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div className="text-center">
            <span className="text-[28px] font-bold font-manrope text-text tracking-tighter">
              {scores.lighthouse}
            </span>
            <span className="text-[10px] text-text-subtle font-mono block -mt-1 uppercase">Score</span>
          </div>
        </div>
        <p className="text-[11px] font-mono text-text-secondary tracking-wider uppercase">Lighthouse Audit</p>
      </div>

      {/* Numerical Metrics Dashboard */}
      <div className="flex-1 flex flex-col gap-4 max-w-[240px] w-full border border-border/50 rounded-xl p-4 bg-surface/30">
        <div className="flex items-center justify-between border-b border-border/30 pb-2">
          <span className="text-[10px] font-mono text-text-subtle uppercase">Metric</span>
          <span className="text-[10px] font-mono text-text-subtle uppercase">Value</span>
        </div>
        
        {/* Core Web Vitals Status */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-text-secondary">Core Web Vitals</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface border border-border text-[9px] text-text font-semibold uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-text animate-pulse" />
            Excellent
          </span>
        </div>

        {/* First Contentful Paint */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-text-secondary">TTFB</span>
          <span className="text-[11px] font-mono font-bold text-text">0.02s</span>
        </div>

        {/* Load Time */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-text-secondary">Page Speed</span>
          <span className="text-[11px] font-mono font-bold text-text">{scores.speed}s</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 4: SVG Component Architecture diagram (Principle 04)
// -----------------------------------------------------------------
function ArchitectureMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] bg-card/40 border border-border/60 rounded-2xl flex items-center justify-center overflow-hidden p-4"
    >
      <svg className="w-full h-full" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Animated connection lines */}
        <motion.path
          d="M100 110 H 220"
          stroke="var(--border)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M220 110 L 380 50"
          stroke="var(--border)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        <motion.path
          d="M220 110 L 380 170"
          stroke="var(--border)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
        />

        {/* Glowing Data Packets Flow */}
        {isInView && (
          <>
            <motion.circle
              r="3.5"
              fill="var(--text)"
              animate={{ cx: [100, 220] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              style={{ cy: 110 }}
            />
            <motion.circle
              r="3"
              fill="var(--text-secondary)"
              animate={{ cx: [220, 380], cy: [110, 50] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            <motion.circle
              r="3"
              fill="var(--text-secondary)"
              animate={{ cx: [220, 380], cy: [110, 170] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </>
        )}

        {/* Client App Node */}
        <g transform="translate(40, 85)">
          <rect width="80" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="40" y="24" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="monospace">Client</text>
          <text x="40" y="36" textAnchor="middle" fill="var(--text-subtle)" fontSize="8" fontFamily="monospace">Core App</text>
        </g>

        {/* Edge Handler Node */}
        <g transform="translate(195, 85)">
          <rect width="80" height="50" rx="8" fill="var(--surface)" stroke="var(--text-subtle)" strokeWidth="1.5" />
          <text x="40" y="24" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="monospace">Edge Routing</text>
          <text x="40" y="36" textAnchor="middle" fill="var(--text-subtle)" fontSize="8" fontFamily="monospace">Fast Path</text>
        </g>

        {/* API Microservice Node */}
        <g transform="translate(350, 25)">
          <rect width="110" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="55" y="24" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="monospace">API Server</text>
          <text x="55" y="36" textAnchor="middle" fill="var(--text-subtle)" fontSize="8" fontFamily="monospace">Express / Bun.js</text>
        </g>

        {/* Database Node */}
        <g transform="translate(350, 145)">
          <rect width="110" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="55" y="24" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="monospace">Database Cluster</text>
          <text x="55" y="36" textAnchor="middle" fill="var(--text-subtle)" fontSize="8" fontFamily="monospace">Postgres / Redis</text>
        </g>
      </svg>
      <div className="absolute bottom-4 text-center">
        <span className="text-[10px] font-mono text-text-subtle tracking-wider uppercase">Loose Coupling & Clean Isolation</span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 5: Decision Matrix Bar Graph Component
// -----------------------------------------------------------------
function DecisionMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { label: "User Experience", level: 100, color: "var(--text)" },
    { label: "Performance", level: 100, color: "var(--text)" },
    { label: "Maintainability", level: 100, color: "var(--text)" },
    { label: "Accessibility", level: 90, color: "var(--text-secondary)" },
    { label: "SEO", level: 90, color: "var(--text-secondary)" },
    { label: "Animations", level: 60, color: "var(--text-muted)" },
    { label: "Trendiness", level: 30, color: "var(--text-subtle)" },
  ];

  return (
    <div
      ref={ref}
      className="w-full max-w-[800px] mx-auto p-6 md:p-10 bg-surface/30 border border-border/80 rounded-2xl shadow-xl space-y-8"
    >
      <div className="flex flex-col gap-1 border-b border-border/50 pb-5">
        <span className="text-[10px] font-mono text-text-subtle tracking-[0.2em] uppercase">Decision Matrix</span>
        <h3 className="text-xl md:text-2xl font-bold font-manrope text-text tracking-tight">What I Optimize For</h3>
        <p className="text-[12px] font-mono text-text-muted mt-1">Establishing clear, non-arbitrary priorities when making architectural decisions.</p>
      </div>

      <div className="space-y-4 md:space-y-5 select-none">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-4 items-center">
            {/* Label */}
            <span className="md:col-span-3 text-[14px] md:text-[15px] font-mono font-semibold tracking-tight text-text">
              {metric.label}
            </span>

            {/* Block Segmented Bar */}
            <div className="md:col-span-8 flex gap-1 bg-surface border border-border/30 p-1.5 rounded-lg overflow-hidden">
              {Array.from({ length: 10 }).map((_, segmentIdx) => {
                const isActive = segmentIdx * 10 < metric.level;
                return (
                  <motion.div
                    key={segmentIdx}
                    className="flex-1 h-3 rounded-[3px] transition-colors"
                    style={{
                      backgroundColor: isActive ? metric.color : "rgba(43,43,43,0.15)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08 + segmentIdx * 0.03,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Numeric Percentage */}
            <span className="md:col-span-1 text-right text-[11px] font-mono text-text-muted font-semibold">
              {metric.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 6: Minimalist Philosophy Sequential Fade (Things I Believe)
// -----------------------------------------------------------------
function PhilosophyShowcase() {
  const statements = [
    "Clarity beats complexity.",
    "Fast is a feature.",
    "Good UX feels invisible.",
    "Every animation should have a purpose.",
    "Maintainable code scales better than clever code.",
    "Users don't care about technology. They care about outcomes.",
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-1 space-y-12 select-none border-t border-b border-border/30 ">
      <div className="text-center space-y-1">
        <span className="text-[12px] font-mono text-text-subtle tracking-[0.2em] uppercase">Core Philosophy</span>
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold font-manrope text-text">Things I Believe</h3>
      </div>

      <div className="flex flex-col gap-10 md:gap-14 px-4 md:px-0">
        {statements.map((statement, idx) => {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-4 md:gap-6 border-l-2 border-border pl-6 group hover:border-text transition-colors duration-300"
            >
              <span className="text-[11px] font-mono text-text-subtle mt-1 font-bold">
                0{idx + 1}
              </span>
              <p className="text-lg md:text-xl font-manrope font-medium text-text-secondary leading-relaxed group-hover:text-text transition-colors duration-300">
                {statement}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component 7: Product Evaluation Framework OS Panel Module
// -----------------------------------------------------------------
function ProductFramework() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    // Sequentially check off items after scroll-in view
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setCheckedItems((prev) => {
          const next = [...prev];
          const uncheckedIdx = next.indexOf(false);
          if (uncheckedIdx !== -1) {
            next[uncheckedIdx] = true;
            return next;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 350);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const items = [
    { label: "Is it useful?", desc: "Identifies real user value, avoiding arbitrary features." },
    { label: "Is it intuitive?", desc: "Reduces interface friction. Features are logical and discoverable." },
    { label: "Is it fast?", desc: "Maintains optimal TTFB, Lighthouse scores, and loading limits." },
    { label: "Is it accessible?", desc: "Conforms to semantic HTML rules and screen-reader requirements." },
    { label: "Is it maintainable?", desc: "Ensures future developers can extend code seamlessly." },
    { label: "Does it achieve business goals?", desc: "Aligns user experiences directly with company conversions." },
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto p-1.5 bg-card border border-border rounded-2xl shadow-2xl relative overflow-hidden select-none">
      {/* Operating System Header bar styling */}
      <div className="w-full h-8 px-4 flex items-center border-b border-border/80 bg-surface/50 justify-between">
        <div className="flex gap-1.5 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
        <span className="text-[10px] font-mono text-text-subtle uppercase tracking-wider">operating_framework.sh</span>
        <div className="w-6" /> {/* spacer balance */}
      </div>

      {/* Main Framework Card body */}
      <div className="p-6 md:p-8 space-y-6 bg-surface/20">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-text-subtle tracking-[0.2em] uppercase">Architecture Pre-Flight</span>
          <h3 className="text-xl md:text-2xl font-bold font-manrope text-text">How I Evaluate Products</h3>
        </div>

        {/* Checklist */}
        <div className="space-y-4 border border-border/60 rounded-xl p-4 bg-background/30">
          {items.map((item, idx) => {
            const isChecked = checkedItems[idx];
            return (
              <div key={idx} className="flex gap-4 items-start select-none">
                {/* Custom Checkbox circle */}
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                    isChecked
                      ? "bg-text border-text text-background"
                      : "bg-surface border-border text-transparent"
                  }`}
                >
                  <CheckIcon />
                </div>
                {/* Label & Description */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] md:text-lg font-semibold text-text tracking-wide">{item.label}</span>
                  <span className="text-[11px] md:text-base  font-mono text-text-muted">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Banner */}
        <div className="border border-border/80 bg-surface p-4 rounded-xl text-center">
          <p className="text-[13px] md:text-base font-semibold text-text-secondary leading-relaxed font-sans uppercase tracking-wide">
            Only after these questions are answered do I start writing code.
          </p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Main Operating Section Component
// -----------------------------------------------------------------
export default function HowIThink() {
  const [activeIndex, setActiveIndex] = useState(0);

  const principles = [
    {
      idx: "01",
      title: "Understand Before Building",
      headline: "I don't start with code. I start with the problem.",
      desc: "Before touching a single component, I focus on understanding users, business goals, constraints, and bottlenecks. Building the wrong thing perfectly is still failure.",
      visual: <DiscoveryDiagram />,
      tags: ["Discovery", "Research", "User Needs", "Business Goals"],
    },
    {
      idx: "02",
      title: "Design For Humans",
      headline: "Users shouldn't have to think.",
      desc: "Good interfaces disappear. Every interaction should feel obvious, intuitive, fast, and effortless.",
      visual: <InteractiveUISwitcher />,
      tags: ["Frictionless UX", "Invisible UI", "Fast Interaction", "Predictability"],
    },
    {
      idx: "03",
      title: "Performance Is A Feature",
      headline: "Fast products win.",
      desc: "A beautiful website that feels slow is still a bad experience. Performance directly impacts trust, engagement, retention, and conversion.",
      visual: <PerformanceDashboard />,
      tags: ["Lighthouse Audit", "TTFB Optimization", "Core Web Vitals", "Page Load Speed"],
    },
    {
      idx: "04",
      title: "Build For Growth",
      headline: "The first version is never the last version.",
      desc: "I build systems that are scalable, maintainable, and easy for future developers to extend. Good architecture makes future growth easier.",
      visual: <ArchitectureMap />,
      tags: ["Scalability", "Clean Architecture", "Decoupled Code", "Maintainability"],
    },
  ];

  return (
    <section id="lab" className="relative w-full bg-background border-t border-border/30 overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col gap-20 md:gap-24">
        
        {/* Upper layout: Slider control panel */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Header + Index Indicator & Slider Tabs */}
          <div className="w-full lg:w-[38%] flex flex-col justify-between self-stretch">
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                  <span className="text-[11px] text-text-subtle font-mono tracking-[0.2em] uppercase">Operating System</span>
                </div>
                <h2 className="text-[2.8rem] sm:text-5xl md:text-[3.5rem] font-bold font-manrope text-text tracking-tight leading-[1.1]">
                  How I Think
                </h2>
                <p className="text-[14px] sm:text-base font-mono text-text-muted">
                  Technology changes. Good product decisions don't.
                </p>
              </div>

              {/* Vertical progress link tabs */}
              <nav className="hidden lg:flex flex-col gap-5 pt-4 border-t border-border/20" aria-label="Principles tabs">
                {principles.map((p, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={p.idx}
                      onClick={() => setActiveIndex(idx)}
                      className="flex items-center gap-4 text-left group transition-all duration-300 focus:outline-none"
                    >
                      <span className={`font-mono text-[16px] md:text-[18px] font-bold transition-colors duration-300 ${
                        isActive ? "text-text" : "text-text-subtle group-hover:text-text-muted"
                      }`}>
                        {p.idx}
                      </span>
                      <div className="flex flex-col gap-0.5 relative pl-4 border-l border-border/40">
                        {isActive && (
                          <motion.div
                            layoutId="activeProgressTrack"
                            className="absolute left-[-1px] top-0 bottom-0 w-[1.5px] bg-text"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className={`font-manrope text-[16px] md:text-[18px] font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-text" : "text-text-muted group-hover:text-text-secondary"
                        }`}>
                          {p.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Slider control buttons */}
            <div className="flex items-center gap-5 mt-8 lg:mt-0 pt-4 border-t border-border/20 lg:border-t-0">
              <span className="font-mono text-[14px] md:text-[15px] text-text-muted">
                <span className="text-text text-[16px] md:text-[18px] font-bold">0{activeIndex + 1}</span> / 0{principles.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : principles.length - 1))}
                  className="w-10 h-10 rounded-xl bg-surface border border-border/80 flex items-center justify-center text-text hover:border-text-subtle transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none"
                  aria-label="Previous Principle"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev < principles.length - 1 ? prev + 1 : 0))}
                  className="w-10 h-10 rounded-xl bg-surface border border-border/80 flex items-center justify-center text-text hover:border-text-subtle transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none"
                  aria-label="Next Principle"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Large Interactive Principle Card */}
          <div className="w-full lg:w-[62%] min-h-[520px] flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -15, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-6 border border-border/60 rounded-3xl p-6 md:p-8 bg-surface/10 hover:border-border transition-colors duration-300"
              >
                {/* Category Heading & Title */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] md:text-[15px] font-mono text-text-muted font-bold">
                      {principles[activeIndex].idx}
                    </span>
                    <span className="text-[12px] md:text-[13px] font-mono tracking-[0.12em] font-bold text-text-secondary uppercase">
                      {principles[activeIndex].title}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-bold font-manrope text-text tracking-tight leading-tight">
                    {principles[activeIndex].headline}
                  </h3>
                  
                  <p className="text-[13.5px] md:text-[14.5px] text-text-secondary leading-relaxed max-w-2xl">
                    {principles[activeIndex].desc}
                  </p>
                </div>

                {/* Capability Indicators */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border/20" aria-label="Capabilities">
                  {principles[activeIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10.5px] md:text-[11.5px] font-mono tracking-wide rounded-md bg-surface border border-border/60 text-text-secondary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Embedded SVG Visualization */}
                <div className="w-full flex items-center justify-center mt-2">
                  {principles[activeIndex].visual}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Decision Matrix priorities */}
        <DecisionMatrix />

        {/* Philosophy Showcase list */}
        <PhilosophyShowcase />

        {/* Product Framework operating card */}
        <ProductFramework />

      </div>
    </section>
  );
}
