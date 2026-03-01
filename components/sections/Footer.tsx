"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { Github, Linkedin, Twitter, Database, BookOpen, Instagram, ArrowUp } from "lucide-react";

const FOOTER_SOCIALS = [
  { name: "GitHub", icon: Github, href: "https://github.com/mercydeez" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/atharva-soundankar/" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/Atharva3895" },
  { name: "Kaggle", icon: Database, href: "https://www.kaggle.com/atharvasoundankar" },
  { name: "Medium", icon: BookOpen, href: "https://medium.com/@atharva3895" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ai.with.atharva/" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-6 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Left: Branding */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(0,240,255,0.2))',
                border: '1px solid rgba(255,107,53,0.3)',
                color: '#FF6B35',
              }}
            >
              AS
            </div>
            <div>
              <p className="text-white font-display font-bold text-xs uppercase tracking-widest">{PERSONAL_INFO.name}</p>
              <p className="text-white/30 font-mono text-[9px]">Architecting intelligence</p>
            </div>
          </div>

          {/* Center: Socials */}
          <div className="flex gap-4 items-center flex-wrap justify-center">
            {FOOTER_SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-amber-500/30 transition-all group min-h-[44px]"
                title={s.name}
              >
                <s.icon size={20} className="text-white/60 group-hover:text-amber-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-white/20 font-mono text-[9px] uppercase tracking-[0.2em]">
            Built with ❤️ using Next.js, Three.js &amp; TailwindCSS
          </p>
          <p className="text-amber-400/60 font-mono text-[9px] uppercase tracking-widest">
            Actively seeking AI Engineering &amp; Data Science roles
          </p>
          <p className="text-white/20 font-mono text-[9px] uppercase tracking-[0.2em]">
            © 2025 {PERSONAL_INFO.name}
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all z-40 min-h-[44px]"
        style={{
          background: 'rgba(255,107,53,0.15)',
          border: '1px solid rgba(255,107,53,0.4)',
          color: '#FF6B35',
        }}
        whileHover={{ y: -3, boxShadow: '0 0 20px rgba(255,107,53,0.4)' }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
