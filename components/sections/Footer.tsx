"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import { Github, Linkedin, Twitter, ArrowUp, Instagram } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 font-mono text-xs">
            {PERSONAL.monogram}
          </div>
          <div>
            <p className="text-white font-display font-bold text-xs uppercase tracking-widest">{PERSONAL.name}</p>
            <p className="text-white/20 font-mono text-[9px] uppercase tracking-widest">Architecting intelligence since 2022</p>
          </div>
        </div>

        {/* Center: Copyright */}
        <p className="text-white/20 font-mono text-[9px] uppercase tracking-[0.3em] order-3 md:order-2">
          © 2025 {PERSONAL.name.toUpperCase()} · ALL SYSTEMS NOMINAL
        </p>

        {/* Right: Socials */}
        <div className="flex gap-6 items-center order-2 md:order-3">
          <a href="#" className="text-white/40 hover:text-cyan transition-colors"><Github size={18} /></a>
          <a href="#" className="text-white/40 hover:text-cyan transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="text-white/40 hover:text-cyan transition-colors"><Twitter size={18} /></a>
          <a href="#" className="text-white/40 hover:text-cyan transition-colors"><Instagram size={18} /></a>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-cyan/50 transition-all z-40 group"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={20} className="group-hover:animate-bounce" />
      </motion.button>
    </footer>
  );
}
