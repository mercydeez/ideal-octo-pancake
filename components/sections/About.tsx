"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { PERSONAL_INFO, CURRENTLY_LEARNING, EDUCATION, BIO, BIO_HIGHLIGHTED_WORDS } from "@/lib/constants";
import { Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const sectionRef = useScrollReveal();
  const getHighlightedBio = (text: string) => {
    let highlightedText = text;
    // We sort by length descending so that longer phrases like "SP Jain School of Global Management"
    // are replaced before their singular words if any overlaps exist.
    const sortedWords = [...BIO_HIGHLIGHTED_WORDS].sort((a, b) => b.length - a.length);

    // A better approach for React to highlight specific words in a string without setting dangerouslySetInnerHTML
    const parts = text.split(new RegExp(`(${sortedWords.join('|')})`, 'gi'));

    return parts.map((part, i) => {
      const isHighlighted = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
      if (isHighlighted) {
        return <span key={i} style={{ color: '#FF6B35', fontWeight: 600 }}>{part}</span>;
      }
      return part;
    });
  };

  // 3D Tilt Logic variables setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section ref={sectionRef} id="about" className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden" style={{ perspective: 1000 }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bio Card - Takes up 2 columns now to leave room for Social Signal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: 0, y: 0, rotateX, rotateY, z: 100 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-2 tactical-panel rounded-3xl p-6 md:p-8 flex flex-col justify-center will-change-transform transform-gpu"
        >
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="h-px w-12 bg-amber-500/50" />
            <p className="text-amber-400 font-mono text-xs tracking-widest uppercase">[ THE_ARCHITECT ]</p>
          </div>

          {BIO.map((paragraph, index) => (
            <p key={index} className="text-sm md:text-base leading-relaxed text-white/70 font-mono mb-6">
              {getHighlightedBio(paragraph)}
            </p>
          ))}

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl inline-block w-fit">
            <p className="text-amber-400 font-mono text-[10px] md:text-xs">
              &gt; SYS.AWAITING_COMMAND: {PERSONAL_INFO.status}.
            </p>
          </div>
        </motion.div>

        {/* Social Signal Pulsing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-1 tactical-panel rounded-3xl p-6 md:p-8 border border-pink/30 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-pink transition-colors cursor-pointer"
          onClick={() => window.open((PERSONAL_INFO as any).instagramBrand || PERSONAL_INFO.instagram, "_blank")}
        >
          {/* Heartbeat Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border border-pink/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute w-32 h-32 border border-pink/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000" />
          </div>

          <div className="p-4 bg-pink/10 rounded-2xl mb-4 relative z-10 group-hover:scale-110 transition-transform">
            <Instagram size={32} className="text-pink drop-shadow-[0_0_15px_rgba(255,107,255,0.8)]" />
          </div>

          <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 relative z-10">
            @ai.with.atharva
          </h3>
          <p className="font-mono text-xs text-white/50 relative z-10">
            [ SOCIAL_SIGNAL_BROADCAST ]
          </p>
          <p className="font-mono text-[10px] text-pink/80 mt-4 leading-relaxed relative z-10 px-4">
            Distilling complex Machine Learning architectures into accessible intelligence for the digital grid.
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex items-start gap-4 transition-colors hover:border-white/20"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0 overflow-hidden"
                style={{ background: `${edu.color}20`, border: `1px solid ${edu.color}40` }}
              >
                {edu.logo ? (
                  <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain p-1" />
                ) : (
                  <span style={{ color: edu.color }}>{edu.monogram}</span>
                )}
              </div>
              <div>
                <p className="text-white/80 font-bold text-sm leading-tight mb-1">{edu.school}</p>
                <p className="text-white/40 font-mono text-xs mb-1">{edu.degree}</p>
                <p className="text-white/30 font-mono text-[10px]">{edu.duration}</p>
                <span
                  className="text-[9px] font-mono px-2 py-0.5 rounded mt-2 inline-block"
                  style={{ background: `${edu.color}20`, color: edu.color }}
                >
                  {edu.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
