import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { PERSONAL_INFO, BIO, BIO_HIGHLIGHTED_WORDS } from "@/lib/constants";
import { Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const About = React.memo(function About() {
  const sectionRef = useScrollReveal();
  const getHighlightedBio = (text: string) => {
    const sortedWords = [...BIO_HIGHLIGHTED_WORDS].sort((a, b) => b.length - a.length);
    const parts = text.split(new RegExp(`(${sortedWords.join('|')})`, 'gi'));

    return parts.map((part, i) => {
      const isHighlighted = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
      if (isHighlighted) {
        return <span key={i} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{part}</span>;
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
        <ScrollReveal direction="left" delay={0.2}>
          <motion.div
            style={{ x: 0, y: 0, rotateX, rotateY, z: 100 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-2 tactical-panel rounded-3xl p-6 md:p-8 flex flex-col justify-center will-change-transform transform-gpu"
          >
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="h-px w-12 bg-secondary/50" />
              <p className="text-secondary font-mono text-xs tracking-widest uppercase">[ THE_ARCHITECT ]</p>
            </div>

            {BIO.map((paragraph, index) => (
              <p key={index} className="text-sm md:text-base leading-relaxed text-text-2 font-mono mb-6">
                {getHighlightedBio(paragraph)}
              </p>
            ))}

            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-xl inline-block w-fit">
              <p className="text-secondary font-mono text-[10px] md:text-xs">
                &gt; SYS.AWAITING_COMMAND: {PERSONAL_INFO.status}.
              </p>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Social Signal Pulsing Card */}
        <ScrollReveal direction="right" delay={0.35}>
          <motion.div
            className="lg:col-span-1 tactical-panel rounded-3xl p-6 md:p-8 border border-primary/30 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-primary transition-colors cursor-pointer h-full"
            onClick={() => window.open((PERSONAL_INFO as unknown as Record<string, string>).instagramBrand || PERSONAL_INFO.instagram, "_blank")}
          >
            {/* Heartbeat Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border border-primary/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute w-32 h-32 border border-primary/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000" />
            </div>

            <div className="p-4 bg-primary/10 rounded-2xl mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <Instagram size={32} className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            </div>

            <h3 className="font-display font-bold text-xl md:text-2xl text-text-1 mb-2 relative z-10">
              @ai.with.atharva
            </h3>
            <p className="font-mono text-xs text-text-3 relative z-10">
              [ SOCIAL_SIGNAL_BROADCAST ]
            </p>
            <p className="font-mono text-[10px] text-primary/80 mt-4 leading-relaxed relative z-10 px-4">
              Distilling complex Machine Learning architectures into accessible intelligence for the digital grid.
            </p>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
});

export default About;
