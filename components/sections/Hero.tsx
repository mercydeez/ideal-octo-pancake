"use client";

import { motion } from "framer-motion";
import { Terminal, Download, Rocket } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { useState, useEffect } from "react";
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

  // Typing animation state
  const ROLES = ["AI & Big Data Engineer", "Data Scientist", "Data Analyst", "ML Practitioner"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // Typing
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause at full word, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

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

          {/* Typing role pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 mb-2 inline-flex items-center gap-2 rounded-md border border-cyan/20 bg-black/50 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse flex-shrink-0" />
            <span className="font-terminal text-cyan text-xs md:text-sm tracking-widest whitespace-nowrap">
              {displayed}
              <span className="animate-[blink_1s_step-end_infinite] ml-0.5 text-cyan">|</span>
            </span>
          </motion.div>

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

          <div className="flex gap-3 mt-8 flex-wrap">
            {/* GitHub */}
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="GitHub">
              <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" width={24} height={24} />
            </a>
            {/* LinkedIn */}
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="LinkedIn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Twitter/X">
              <img src="https://cdn.simpleicons.org/x/FFFFFF" alt="Twitter" width={24} height={24} />
            </a>
            {/* Kaggle — official K logo */}
            <a href={PERSONAL_INFO.kaggle} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Kaggle">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#20BEFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v12.562l6.44-6.235c.15-.161.297-.241.449-.241h3.275c.149 0 .223.053.207.159-.015.101-.086.181-.196.247l-6.568 6.172 6.788 8.634c.149.186.186.365.117.494z" />
              </svg>
            </a>
            {/* Medium */}
            <a href={PERSONAL_INFO.medium} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Medium">
              <img src="https://cdn.simpleicons.org/medium/FFFFFF" alt="Medium" width={24} height={24} />
            </a>
            {/* Instagram */}
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" width={24} height={24} />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/atharva.soundankar.7/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Facebook">
              <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" width={24} height={24} />
            </a>
            {/* Threads */}
            <a href="https://www.threads.com/@ai.with.atharva" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Threads">
              <img src="https://cdn.simpleicons.org/threads/FFFFFF" alt="Threads" width={24} height={24} />
            </a>
            {/* Gmail */}
            <a href="mailto:atharva3895@gmail.com" className="opacity-80 hover:opacity-100 transition-opacity" title="Email">
              <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Gmail" width={24} height={24} />
            </a>
          </div>

        </motion.div>
      </motion.div>

    </section>
  );
}
