"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import { MapPin } from "lucide-react";

export default function About() {
  const learningTokens = [
    "LLMs", "RAG Pipelines", "LangChain", "Vector Databases",
    "AWS SageMaker", "MLOps", "LlamaIndex", "Prompt Engineering"
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1 glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="relative w-56 h-56 mb-6">
            {/* Conic Gradient Border */}
            <div
              className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
              style={{
                background: "conic-gradient(from 0deg, #00f5ff, #ff007a, #00f5ff)",
                animation: "rotate-gradient-conic 4s linear infinite"
              }}
            />
            <div className="absolute inset-1 bg-[#0D0D0D] rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/images/profile.jpg"
                alt={PERSONAL.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL.name)}&background=00f5ff&color=000`)}
              />
            </div>
          </div>
          <h3 className="text-2xl font-display font-bold mb-2 text-white">{PERSONAL.name}</h3>
          <p className="text-cyan font-mono text-sm uppercase tracking-tighter">[ STATION_ID: NEURAL_ARCHITECT ]</p>

          <div className="flex items-center gap-2 mt-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            <MapPin size={10} className="text-cyan" />
            {PERSONAL.location}
          </div>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-cyan/50" />
            <p className="text-cyan font-mono text-xs tracking-widest uppercase">
              [ BIOLOGICAL_SUMMARY ]
            </p>
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-white/70 mb-6 font-mono">
            I'm an <span className="text-cyan font-bold">AI & Data Engineer</span> who transforms raw data into decisions that matter — and documents the journey to make AI accessible for everyone.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-white/50 font-mono">
            Proficient in <span className="text-cyan">Python, SQL, and Machine Learning</span>, I build end-to-end systems from data ingestion to production deployment. Currently pursuing Master of AI in Business at <span className="text-cyan">SP Jain School of Global Management, Mumbai</span>.
          </p>

          <div className="mt-8 p-4 bg-cyan/5 border border-cyan/20 rounded-xl inline-block">
            <p className="italic text-cyan font-mono text-sm">
              &gt; Open to AI Engineering, Data Science & ML Engineering roles.
            </p>
          </div>
        </motion.div>

        {/* Learning Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-cyan/5 border-y border-cyan/10 py-6 overflow-hidden whitespace-nowrap"
        >
          <div className="animate-marquee gap-12 items-center text-cyan font-mono font-bold uppercase text-xs tracking-[0.2em] flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {learningTokens.map((token, j) => (
                  <span key={j} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_#00f5ff]" />
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
