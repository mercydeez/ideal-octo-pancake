"use client";

import { motion } from "framer-motion";
import { Terminal, Download, Rocket } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { useState } from "react";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden pointer-events-none">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
      >
        {/* Left: Profile with Glow-Ring */}
        <motion.div variants={itemVariants} className="flex justify-center md:justify-center relative pointer-events-auto order-2 md:order-1">
          <div className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
            {/* HUD Rings using Framer Motion for mechanical complexity */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-[-15px] rounded-full border-t border-b border-amber/50"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-[10px] rounded-full blur-sm opacity-50"
              style={{ background: 'conic-gradient(from 0deg, #00F0FF, #FF6B35, #00F0FF)' }}
            />
            {/* Image OR Fallback Monogram */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-void z-10 shadow-[0_0_50px_rgba(0,240,255,0.3)] bg-military flex items-center justify-center">
              {imgError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/20 to-amber/20">
                  <span className="text-4xl md:text-5xl font-display font-black text-white mix-blend-screen opacity-50">AS</span>
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
            <svg className="absolute w-[130%] h-[130%] text-cyan/30 pointer-events-none animate-pulse" viewBox="0 0 100 100">
              <path d="M50 0 L50 10 M50 90 L50 100 M0 50 L10 50 M90 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
            </svg>
          </div>
        </motion.div>

        {/* Right: Typing & Tactical Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-10 order-1 md:order-2 min-w-0">

          <div className="tactical-panel px-4 py-1.5 flex items-center gap-2 rounded mb-6 border-cyan/50">
            <Terminal size={14} className="text-amber animate-pulse" />
            <span className="text-cyan text-[10px] md:text-xs uppercase font-terminal tracking-[0.3em]">
              SYS.STATUS: {PERSONAL_INFO.status.toUpperCase()}
            </span>
          </div>

          {/* Glitch-like typography — fluid clamp so it never overflows */}
          <h1
            className="text-cyber font-bold text-white mb-2 drop-shadow-2xl flex flex-col leading-none w-full overflow-hidden"
            style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.75rem)', letterSpacing: '0.03em' }}
          >
            <ScrambleText text={PERSONAL_INFO.name.split(" ")[0]} delay={200} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amber leading-tight pb-2">
              <ScrambleText text={PERSONAL_INFO.name.split(" ").slice(1).join(" ")} delay={500} />
            </span>
          </h1>

          <p className="font-terminal text-white/70 text-xs md:text-sm max-w-sm mt-3 leading-relaxed bg-void/50 backdrop-blur-md p-3 rounded-lg border-l-2 border-amber">
            {PERSONAL_INFO.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <a
              href={PERSONAL_INFO.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-cyan text-void font-bold font-terminal text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors min-h-[44px]"
            >
              <Download size={16} /> EXTRACT_DATA
            </a>

            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-amber/50 text-amber hover:bg-amber/10 font-bold font-terminal text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <Rocket size={16} /> DEPLOY_MODULES
            </button>
          </div>

          <div className="flex gap-4 mt-8">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" width={24} height={24} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/linkedin/0A66C2" alt="LinkedIn" width={24} height={24} />
            </a>
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/x/FFFFFF" alt="Twitter" width={24} height={24} />
            </a>
            <a href={PERSONAL_INFO.kaggle} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/kaggle/20BEFF" alt="Kaggle" width={24} height={24} />
            </a>
            <a href={PERSONAL_INFO.medium} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/medium/FFFFFF" alt="Medium" width={24} height={24} />
            </a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
              <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" width={24} height={24} />
            </a>
          </div>

        </motion.div>
      </motion.div>

    </section>
  );
}
