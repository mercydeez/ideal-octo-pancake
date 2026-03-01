"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { StaggerContainer, FadeInUp } from "@/components/ui/ScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">[ TECHNICAL_TOOLKIT ]</p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          <ScrambleText text="CORE " /><span className="text-cyan text-glow-cyan"><ScrambleText text="POWERS" /></span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12">
        {Object.entries(SKILLS).map(([groupTitle, skillsList], groupIdx) => (
          <StaggerContainer key={groupTitle}>
            <h3 className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
              {groupIdx + 1}. {groupTitle}
              <div className="h-px flex-1 bg-white/5" />
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {skillsList.map((skill, i) => (
                <FadeInUp key={skill.name}>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl
                      border border-white/10 hover:border-[#FF6B35]/60
                      bg-white/5 hover:bg-white/10 
                      transition-all duration-300 hover:scale-105 
                      cursor-default group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center
                        bg-black/40 rounded-lg p-1">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 
                      group-hover:text-[#FF6B35] transition-colors text-center
                      font-mono">
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
