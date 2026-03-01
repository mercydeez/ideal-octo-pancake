"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { StaggerContainer, FadeInUp } from "@/components/ui/ScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";
import { CURRENTLY_LEARNING } from "@/lib/constants";

export default function Skills() {
  return (
    <section id="skills" className="py-10 md:py-16 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">[ TECHNICAL_TOOLKIT ]</p>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
          <ScrambleText text="CORE " /><span className="text-cyan text-glow-cyan"><ScrambleText text="POWERS" /></span>
        </h2>
      </motion.div>

      {/* Currently Mastering Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-amber-500/5 border-y border-amber-500/10 py-3 overflow-hidden whitespace-nowrap mb-8"
      >
        <div className="flex items-center">
          <span className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest px-4 border-r border-amber-500/30 shrink-0">CURRENTLY MASTERING</span>
          <div className="animate-marquee gap-10 items-center text-amber-400 font-mono font-bold uppercase text-[10px] tracking-[0.15em] flex ml-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center">
                {CURRENTLY_LEARNING.map((token, j) => (
                  <span key={j} className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_6px_#FF6B35]" />
                    {token}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        {Object.entries(SKILLS).map(([groupTitle, skillsList], groupIdx) => (
          <StaggerContainer key={groupTitle}>
            <h3 className="text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-2 flex items-center gap-3">
              {groupIdx + 1}. {groupTitle}
              <div className="h-px flex-1 bg-white/5" />
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-1.5 md:gap-2">
              {skillsList.map((skill, i) => (
                <FadeInUp key={skill.name}>
                  <div
                    className="flex flex-col items-center justify-center gap-1 p-1.5 rounded-md
                    border border-white/5 hover:border-[#FF6B35]/60
                    bg-white/[0.03] hover:bg-white/10
                    transition-all duration-300 hover:scale-105
                    cursor-default group h-14"
                  >
                    <div className="w-7 h-7 flex items-center justify-center
                        bg-black/30 rounded p-1">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="object-contain w-full h-full"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] text-gray-400 
                      group-hover:text-[#FF6B35] transition-colors text-center
                      font-mono leading-tight">
                      {skill.name}
                    </span>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </StaggerContainer>
        ))}
      </div>
    </section>
  );
}
