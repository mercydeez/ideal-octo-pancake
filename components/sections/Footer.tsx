"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { ArrowUp } from "lucide-react";

const FOOTER_SOCIALS = [
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF", href: "https://github.com/mercydeez" },
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2", href: "https://www.linkedin.com/in/atharva-soundankar/" },
  { name: "Twitter", logo: "https://cdn.simpleicons.org/x/FFFFFF", href: "https://x.com/Atharva3895" },
  { name: "Kaggle", logo: "https://cdn.simpleicons.org/kaggle/20BEFF", href: "https://www.kaggle.com/atharvasoundankar" },
  { name: "Medium", logo: "https://cdn.simpleicons.org/medium/FFFFFF", href: "https://medium.com/@atharva3895" },
  { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F", href: "https://www.instagram.com/ai.with.atharva/" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
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
                <img
                  src={s.logo}
                  alt={s.name}
                  width={20}
                  height={20}
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
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
