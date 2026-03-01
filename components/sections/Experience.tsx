"use client";
import React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";

const Experience = React.memo(function Experience() {
  const sectionRef = useScrollReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="py-12 md:py-16 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 border-l-4 border-amber-500 pl-8"
      >
        <p className="text-amber-400 font-mono text-[10px] md:text-sm tracking-widest mb-2 uppercase">[ PROFESSIONAL_TIMELINE ]</p>
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-black text-white uppercase tracking-tighter">
          <ScrambleText text="THE " /><span className="text-amber-400 text-glow-amber"><ScrambleText text="JOURNEY" /></span>
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-12">
        {/* Animated Origin Line */}
        <motion.div
          className="absolute left-0 top-0 w-px bg-amber-500/50 origin-top"
          style={{ height: "100%", scaleY: pathLength }}
        />
        {/* Faded background line for path */}
        <div className="absolute left-0 top-0 w-px h-full bg-amber-500/10" />
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div
              className="absolute -left-[41px] md:-left-[73px] top-0 w-10 h-10 rounded-full border-2 border-void z-10 flex items-center justify-center text-xs font-bold overflow-hidden"
              style={{ backgroundColor: exp.color, color: '#030303', boxShadow: `0 0 15px ${exp.color}80` }}
            >
              {(exp as any).logo ? (
                <img src={(exp as any).logo} alt={exp.company} className="w-full h-full object-cover" />
              ) : (
                exp.monogram
              )}
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
              <div
                className="absolute top-0 right-0 w-24 h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-20"
                style={{ background: `linear-gradient(to left, ${exp.color}, transparent)` }}
              />
              <p className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">{exp.duration}</p>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
              <p className="font-mono text-sm mb-4" style={{ color: exp.color }}>{exp.company}</p>
              <p className="text-white/50 text-sm font-mono leading-relaxed max-w-2xl">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

export default Experience;
