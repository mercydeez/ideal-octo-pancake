"use client";

import { motion } from "framer-motion";
import { Terminal, Download, Rocket } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center px-6 md:px-24 overflow-hidden pointer-events-none">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: Profile with Glow-Ring */}
        <motion.div variants={itemVariants} className="flex justify-center md:justify-end relative pointer-events-auto">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
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
            {/* Image */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-void z-10 shadow-[0_0_50px_rgba(0,240,255,0.3)] bg-military">
              <img
                src="/images/profile.png"
                alt={PERSONAL.name}
                className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
              />
            </div>

            {/* Crosshairs */}
            <svg className="absolute w-[130%] h-[130%] text-cyan/30 pointer-events-none animate-pulse" viewBox="0 0 100 100">
              <path d="M50 0 L50 10 M50 90 L50 100 M0 50 L10 50 M90 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
            </svg>
          </div>
        </motion.div>

        {/* Right: Typing & Tactical Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-10">

          <div className="tactical-panel px-4 py-1.5 flex items-center gap-2 rounded mb-6 border-cyan/50">
            <Terminal size={14} className="text-amber animate-pulse" />
            <span className="text-cyan text-[10px] md:text-xs uppercase font-terminal tracking-[0.3em]">
              SYS.STATUS: OPTIMAL
            </span>
          </div>

          {/* Glitch-like typography */}
          <h1 className="text-cyber text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tighter drop-shadow-2xl flex flex-col">
            <span>{PERSONAL.name.split(" ")[0]}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amber leading-tight pb-2">
              {PERSONAL.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="font-terminal text-white/70 text-xs sm:text-sm md:text-base max-w-md mt-4 leading-relaxed bg-void/50 backdrop-blur-md p-4 rounded-lg border-l-2 border-amber">
            Transforming raw data into architectural intelligence. Specialized in deep neural networks and scalable cloud pipelines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <a
              href={PERSONAL.resumeDirectDownload}
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

        </motion.div>
      </motion.div>

    </section>
  );
}
