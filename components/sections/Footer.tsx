"use client";
import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { useCursorHover } from "@/hooks/useCursorHover";
import { ArrowUp } from "lucide-react";

// Social links — using brand-accurate logos for all platforms
const FOOTER_SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/mercydeez",
    imgSrc: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/atharva-soundankar/",
    imgSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230A66C2'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/Atharva3895",
    imgSrc: "https://cdn.simpleicons.org/x/FFFFFF",
  },
  {
    name: "Kaggle",
    href: "https://www.kaggle.com/atharvasoundankar",
    imgSrc: "https://cdn.simpleicons.org/kaggle/20BEFF",
  },
  {
    name: "Medium",
    href: "https://medium.com/@atharva3895",
    imgSrc: "https://cdn.simpleicons.org/medium/FFFFFF",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ai.with.atharva/",
    imgSrc: "https://cdn.simpleicons.org/instagram/E4405F",
  },
];

const Footer = React.memo(function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const cursorProps = useCursorHover();

  return (
    <footer className="relative py-6 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Left: Branding */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
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
              <p className="text-white/50 font-mono text-[9px]">Architecting intelligence</p>
            </div>
          </div>

          {/* Center: Socials with brand-accurate icons */}
          <div className="flex gap-3 items-center flex-wrap justify-center">
            {FOOTER_SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                {...cursorProps}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-amber-500/30 transition-all group min-h-[44px]"
                title={s.name}
              >
                <img
                  src={s.imgSrc}
                  alt={s.name}
                  width={20}
                  height={20}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>

          {/* Right: Back to top — inline to avoid overlap */}
          <motion.button
            onClick={scrollToTop}
            {...cursorProps}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all min-h-[44px] flex-shrink-0"
            style={{
              background: 'rgba(255,107,53,0.15)',
              border: '1px solid rgba(255,107,53,0.4)',
              color: '#FF6B35',
            }}
            whileHover={{ y: -3, boxShadow: '0 0 20px rgba(255,107,53,0.4)' }}
            whileTap={{ scale: 0.9 }}
            title="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-white/50 font-mono text-[9px] uppercase tracking-[0.2em]">
            Built with ❤️ using Next.js, Three.js &amp; TailwindCSS
          </p>
          <p className="text-amber-400/80 font-mono text-[9px] uppercase tracking-widest">
            Actively seeking AI Engineering &amp; Data Science roles
          </p>
          <p className="text-white/50 font-mono text-[9px] uppercase tracking-[0.2em]">
            © 2025 {PERSONAL_INFO.name}
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
