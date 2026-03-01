"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal, Download, Rocket } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { useCursorHover } from "@/hooks/useCursorHover";
import ScrambleText from "@/components/ui/ScrambleText";

// ─── Role Ticker ─────────────────────────────────────────────────────────────
const ROLES = [
  "AI & BIG DATA ENGINEER",
  "DATA SCIENTIST",
  "ML PRACTITIONER",
  "NEURAL ARCHITECT",
  "DATA ANALYST",
];

function useRoleTicker() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2000);
      return () => clearTimeout(t);
    }

    const currentRole = ROLES[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        const t = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 800 / currentRole.length);
        return () => clearTimeout(t);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        const t = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 400 / currentRole.length);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }
  }, [displayText, roleIndex, isDeleting, isPaused]);

  return displayText;
}

// ─── Stat chips data ──────────────────────────────────────────────────────────
const STAT_CHIPS = [
  { label: "10+ Projects", delay: "0s", top: "15%", left: "2%" },
  { label: "913K+ Records", delay: "0.8s", top: "70%", left: "3%" },
  { label: "5+ Certifications", delay: "1.6s", top: "20%", right: "2%" },
  { label: "1 Research Paper", delay: "2.4s", top: "75%", right: "3%" },
];

// ─── Terminal identity rows ───────────────────────────────────────────────────
const IDENTITY_ROWS: [string, string][] = [
  ["DESIGNATION", "Atharva Soundankar"],
  ["CLEARANCE", "AI & Big Data Engineer"],
  ["BASE", "SP Jain, Mumbai → Global"],
  ["STATUS", "OPEN FOR DEPLOYMENT"],
  ["SPECIALIZATION", "Neural Systems / Data Streams"],
  ["SIGNAL", "@ai.with.atharva"],
];

// ─── Hero Component ───────────────────────────────────────────────────────────
const Hero = React.memo(function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cursorProps = useCursorHover();
  const roleTicker = useRoleTicker();
  const [imgError, setImgError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section
      ref={scrollRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden"
    >
      {/* ── Floating Stat Chips (ELEMENT 3) ───────────────────────────────── */}
      {STAT_CHIPS.map((chip, i) => (
        <div
          key={i}
          className="absolute hidden xl:flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-amber/80 border border-amber/30 rounded-md"
          style={{
            background: "rgba(255,107,53,0.07)",
            backdropFilter: "blur(8px)",
            top: chip.top,
            left: (chip as any).left,
            right: (chip as any).right,
            animationName: "float-chip",
            animationDuration: "4s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: chip.delay,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber"
            style={{ boxShadow: "0 0 6px #FF6B35" }}
          />
          {chip.label}
        </div>
      ))}

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Left: Profile with HUD Rings */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center relative pointer-events-auto order-2 md:order-1"
        >
          <div className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
            {/* HUD Ring 1 — cyan */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan/40"
            />
            {/* HUD Ring 2 — amber */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-[-15px] rounded-full border-t border-b border-amber/50"
            />
            {/* HUD Ring 3 — singularity purple */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-[-30px] rounded-full border border-singularity/20 border-dashed"
            />
            {/* Conic gradient glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-[10px] rounded-full blur-sm opacity-40"
              style={{ background: "conic-gradient(from 0deg, #00F0FF, #FF6B35, #7B2FBE, #00F0FF)" }}
            />
            {/* Profile Image */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-void z-10 shadow-[0_0_50px_rgba(0,240,255,0.3)] bg-military flex items-center justify-center">
              {imgError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/20 to-amber/20">
                  <span className="text-4xl md:text-5xl font-display font-black text-white mix-blend-screen opacity-50">
                    AS
                  </span>
                </div>
              ) : (
                <img
                  src="/images/profile.png"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            {/* Crosshairs */}
            <svg
              className="absolute w-[130%] h-[130%] text-cyan/30 pointer-events-none animate-pulse"
              viewBox="0 0 100 100"
            >
              <path
                d="M50 0 L50 10 M50 90 L50 100 M0 50 L10 50 M90 50 L100 50"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                strokeDasharray="2 4"
              />
            </svg>
          </div>
        </motion.div>

        {/* Right: Text, Ticker, Terminal */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-10 order-1 md:order-2 min-w-0"
        >
          {/* Status badge */}
          <div className="tactical-panel px-4 py-1.5 flex items-center gap-2 rounded mb-6 border-cyan/50">
            <Terminal size={14} className="text-amber animate-pulse" />
            <span className="text-cyan text-[10px] md:text-xs uppercase font-terminal tracking-[0.3em]">
              SYS.STATUS: {PERSONAL_INFO.status.toUpperCase()}
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-cyber font-bold text-white mb-2 drop-shadow-2xl flex flex-col leading-none w-full overflow-hidden"
            style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.75rem)", letterSpacing: "0.03em" }}
          >
            <ScrambleText text={PERSONAL_INFO.name.split(" ")[0]} delay={200} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amber leading-tight pb-2">
              <ScrambleText text={PERSONAL_INFO.name.split(" ").slice(1).join(" ")} delay={500} />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-terminal text-white/70 text-xs md:text-sm max-w-sm mt-3 leading-relaxed bg-void/50 backdrop-blur-md p-3 rounded-lg border-l-2 border-amber">
            {PERSONAL_INFO.subtitle}
          </p>

          {/* ── ELEMENT 1: Role Ticker ─────────────────────────────────────── */}
          <div className="flex items-center gap-1 mt-4 font-mono text-sm md:text-base min-h-[28px]">
            <span className="text-amber/60">&gt;&nbsp;</span>
            <span className="text-amber font-bold tracking-wider">{roleTicker}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[2px] h-4 bg-amber ml-0.5"
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <a
              href={PERSONAL_INFO.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="px-6 py-3 bg-cyan text-void font-bold font-terminal text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors min-h-[44px]"
            >
              <Download size={16} /> EXTRACT_DATA
            </a>
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              {...cursorProps}
              className="px-6 py-3 border border-amber/50 text-amber hover:bg-amber/10 font-bold font-terminal text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <Rocket size={16} /> DEPLOY_MODULES
            </button>
          </div>

          {/* ── ELEMENT 2: Terminal Identity Block ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            {...cursorProps}
            className="glass-card font-mono text-sm p-4 border border-cyan/20 max-w-lg w-full mt-6"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-white/40 text-xs ml-2">identity.sh</span>
            </div>
            {/* Rows */}
            <div className="space-y-1 text-xs">
              {IDENTITY_ROWS.map(([key, value]) => (
                <div key={key} className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <span className="text-[#FF6B35] w-32 shrink-0">{key}</span>
                  <span className="text-white/30 hidden sm:inline">............</span>
                  <span
                    className={
                      key === "STATUS" ? "text-green-400 font-bold" : "text-[#00F0FF]"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdn.simpleicons.org/github/FFFFFF"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230A66C2'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdn.simpleicons.org/x/FFFFFF"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href={PERSONAL_INFO.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdn.simpleicons.org/kaggle/20BEFF"
                alt="Kaggle"
                width={24}
                height={24}
              />
            </a>
            <a
              href={PERSONAL_INFO.medium}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdn.simpleicons.org/medium/FFFFFF"
                alt="Medium"
                width={24}
                height={24}
              />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              {...cursorProps}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdn.simpleicons.org/instagram/E4405F"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>

          {/* ── ELEMENT 4: Green Status Beacon ────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-green-400 mt-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
            SYSTEM ONLINE · OPEN TO AI/DATA ROLES · INDIA → GLOBAL
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
