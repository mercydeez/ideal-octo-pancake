"use client";

import { motion } from "framer-motion";
import { PERSONAL, SKILLS, SKILL_CATEGORIES } from "@/lib/constants";
import { MapPin } from "lucide-react";

import { Instagram } from "lucide-react";

const learningTokens = [
  "LLMs", "RAG Pipelines", "LangChain", "Vector Databases",
  "AWS SageMaker", "MLOps", "LlamaIndex", "Prompt Engineering",
  "Apache Kafka Streams", "Fine-tuning LLMs"
];

const EDUCATION = [
  {
    monogram: "SPJ",
    institution: "SP Jain School of Global Management",
    degree: "Master of AI in Business",
    period: "Sept 2025 – Sept 2027",
    grade: "Admitted ✓",
    color: "#FF6B35",
  },
  {
    monogram: "SPPU",
    institution: "Savitribai Phule Pune University",
    degree: "MSc Computer Application",
    period: "Sept 2023 – July 2025",
    grade: "A+ Grade",
    color: "#00F0FF",
  },
  {
    monogram: "SPPU",
    institution: "Savitribai Phule Pune University",
    degree: "BSc Computer Science",
    period: "Sept 2020 – July 2023",
    grade: "A Grade",
    color: "#00F0FF",
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bio Card - Takes up 2 columns now to leave room for Social Signal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 tactical-panel rounded-3xl p-6 md:p-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="h-px w-12 bg-amber-500/50" />
            <p className="text-amber-400 font-mono text-xs tracking-widest uppercase">[ THE_ARCHITECT ]</p>
          </div>

          <p className="text-base md:text-xl leading-relaxed text-white/70 mb-6 font-mono">
            I'm an <span className="text-amber-400 font-bold">AI & Data Engineer</span> transforming raw data into decision architectures. I specialize in <span className="text-cyan">Machine Learning</span> and production-scale pipelines.
          </p>

          <p className="text-sm md:text-base leading-relaxed text-white/50 font-mono mb-6">
            Currently advancing my strategic capabilities through the <span className="text-amber-400 border-b border-amber-400/30">Master of AI in Business</span> program at <span className="text-white">SP Jain School of Global Management, Mumbai</span>. I believe in bridging the gap between brute-force models and elegant business intelligence.
          </p>

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl inline-block w-fit">
            <p className="text-amber-400 font-mono text-[10px] md:text-xs">
              &gt; SYS.AWAITING_COMMAND: Open for AI/Data Engineering Roles.
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
          onClick={() => window.open("https://www.instagram.com/ai.with.atharva/", "_blank")}
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
            <div
              key={i}
              className="glass-card rounded-2xl p-6 border border-white/5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                style={{ background: `${edu.color}20`, color: edu.color, border: `1px solid ${edu.color}40` }}
              >
                {edu.monogram}
              </div>
              <div>
                <p className="text-white/80 font-bold text-sm leading-tight mb-1">{edu.institution}</p>
                <p className="text-white/40 font-mono text-xs mb-1">{edu.degree}</p>
                <p className="text-white/30 font-mono text-[10px]">{edu.period}</p>
                <span
                  className="text-[9px] font-mono px-2 py-0.5 rounded mt-2 inline-block"
                  style={{ background: `${edu.color}20`, color: edu.color }}
                >
                  {edu.grade}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Learning Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-amber-500/5 border-y border-amber-500/10 py-6 overflow-hidden whitespace-nowrap"
        >
          <div className="animate-marquee gap-12 items-center text-amber-400 font-mono font-bold uppercase text-xs tracking-[0.2em] flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {learningTokens.map((token, j) => (
                  <span key={j} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#FF6B35]" />
                    {token}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
