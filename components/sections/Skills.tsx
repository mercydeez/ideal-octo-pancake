"use client";
import React from "react";
import { motion } from "framer-motion";
import { SKILLS_FLAT, CURRENTLY_LEARNING } from "@/lib/constants";
import { StaggerContainer, FadeInUp } from "@/components/ui/ScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";
import Ballpit from "@/components/ui/Ballpit";

const Skills = React.memo(function Skills() {
  return (
    <section id="skills" className="py-10 md:py-16 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 border-l-4 border-primary pl-8"
      >
        <p className="text-primary font-mono text-sm tracking-widest mb-2 uppercase">[ TECHNICAL_TOOLKIT ]</p>
        <h2 className="text-3xl md:text-5xl font-display font-black text-text-1 uppercase tracking-tighter">
          <ScrambleText text="CORE " /><span className="text-primary"><ScrambleText text="POWERS" /></span>
        </h2>
      </motion.div>

      {/* Currently Mastering Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-secondary/5 border-y border-secondary/10 py-3 overflow-hidden whitespace-nowrap mb-8"
      >
        <div className="flex items-center">
          <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest px-4 border-r border-secondary/30 shrink-0 z-10 bg-base relative">CURRENTLY MASTERING</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee gap-10 items-center text-secondary font-mono font-bold uppercase text-[10px] tracking-[0.15em] flex ml-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-10 items-center">
                  {CURRENTLY_LEARNING.map((token, j) => (
                    <span key={j} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-secondary rounded-full shadow-[0_0_6px_rgba(129,140,248,0.6)]" />
                      {token}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <StaggerContainer>
        <FadeInUp>
          <div className="w-full h-[560px] rounded-xl overflow-hidden">
            <Ballpit
              followCursor={true}
              gravity={0}
              count={SKILLS_FLAT.length}
              skills={SKILLS_FLAT}
              colors={SKILLS_FLAT.map(s => parseInt(s.color.replace('#', ''), 16))}
              ambientColor={0xffffff}
              ambientIntensity={1}
              lightIntensity={200}
              minSize={0.5}
              maxSize={1.2}
              friction={0.9975}
              wallBounce={0.95}
            />
          </div>
        </FadeInUp>
      </StaggerContainer>
    </section>
  );
});

export default Skills;
