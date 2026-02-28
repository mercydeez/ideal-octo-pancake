"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    company: "Lululemon (Lulu IT)",
    role: "Data Analyst / BI Intern",
    period: "May 2024 - Present",
    desc: "Spearheaded sales performance analysis for a 913K+ record dataset. Optimized supply chain forecasting using automated Power BI dashboards.",
    color: "#00f5ff"
  },
  {
    company: "Manasvi Tech Solutions",
    role: "Data Science Intern",
    period: "Jan 2024 - Apr 2024",
    desc: "Developed specialized NLP pipelines for internal document processing. Achieved 95% classification accuracy on legal corpora.",
    color: "#ff007a"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">
          [ PROFESSIONAL_TIMELINE ]
        </p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          WORK <span className="text-cyan text-glow-cyan">HISTORY</span>
        </h2>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-12">
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
              className="absolute -left-[41px] md:-left-[73px] top-0 w-4 h-4 rounded-full border-2 border-void z-10"
              style={{ backgroundColor: exp.color, boxShadow: `0 0 15px ${exp.color}80` }}
            />

            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
              <div
                className="absolute top-0 right-0 w-24 h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-20"
                style={{ background: `linear-gradient(to left, ${exp.color}, transparent)` }}
              />

              <p className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">{exp.period}</p>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
              <p className="text-cyan font-mono text-sm mb-4">{exp.company}</p>
              <p className="text-white/50 text-sm font-mono leading-relaxed max-w-2xl">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
