"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";

export default function Experience() {
  const EXPERIENCE = [
    {
      company: "Manasvi Tech Solutions Pvt. Ltd.",
      monogram: "MT",
      role: "Jr. Data Analyst",
      period: "December 2024 – July 2025",
      desc: "Collected, cleaned, and analyzed data to identify trends and patterns. Created reports and dashboards providing actionable insights to improve operational efficiency.",
      color: "#00F0FF",
    },
    {
      company: "CodeTriumph Technologies",
      monogram: "CT",
      role: "Founder & CEO",
      period: "February 2025 – June 2025",
      desc: "Led company vision and strategy, overseeing all operations and ensuring delivery of high-quality tech solutions to clients.",
      color: "#FF6B35",
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-amber-500 pl-8"
      >
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2 uppercase">[ PROFESSIONAL_TIMELINE ]</p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          THE <span className="text-amber-400 text-glow-amber">JOURNEY</span>
        </h2>
      </motion.div>

      <div className="relative border-l border-amber-500/20 ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-12">
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
              className="absolute -left-[41px] md:-left-[73px] top-0 w-10 h-10 rounded-full border-2 border-void z-10 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: exp.color, color: '#030303', boxShadow: `0 0 15px ${exp.color}80` }}
            >
              {exp.monogram}
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
              <div
                className="absolute top-0 right-0 w-24 h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-20"
                style={{ background: `linear-gradient(to left, ${exp.color}, transparent)` }}
              />
              <p className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">{exp.period}</p>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
              <p className="font-mono text-sm mb-4" style={{ color: exp.color }}>{exp.company}</p>
              <p className="text-white/50 text-sm font-mono leading-relaxed max-w-2xl">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
