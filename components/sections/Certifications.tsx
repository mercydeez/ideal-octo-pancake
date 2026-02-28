"use client";

import { motion } from "framer-motion";
import { Award, FileText, ChevronRight } from "lucide-react";

const CERTS = [
  {
    title: "Big Data & Hadoop Optimization",
    issuer: "IBM / SP Jain",
    impact: "Distributed Systems Expert",
    color: "#00f5ff"
  },
  {
    title: "Machine Learning Masterclass",
    issuer: "DeepLearning.AI",
    impact: "Neural Architect",
    color: "#ff007a"
  },
  {
    title: "Cloud Data Engineering (AWS)",
    issuer: "Amazon Web Services",
    impact: "Pipeline Orchestrator",
    color: "#00f5ff"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">
          [ ACADEMIC_CREDENTIALS ]
        </p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          SYSTEM <span className="text-cyan text-glow-cyan">VERIFIED</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Research Paper Special Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card rounded-2xl p-8 border border-white/5 bg-gradient-to-br from-cyan/5 to-transparent flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="w-24 h-24 rounded-2xl bg-cyan/10 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
            <FileText size={40} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-cyan/20 text-cyan uppercase tracking-widest mb-4 inline-block">
              PUBLISHED_RESEARCH
            </span>
            <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
              A Hybrid Model for Sales Prediction in E-commerce
            </h3>
            <p className="text-white/40 font-mono text-sm leading-relaxed mb-6">
              Published in the International Journal of Data Science. Achieved 94% prediction accuracy using a novel ensemble of LSTM and XGBoost.
            </p>
            <button className="flex items-center gap-2 text-xs font-display font-bold text-cyan hover:gap-4 transition-all">
              VIEW_PUBLICATION <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Cert Cards */}
        {CERTS.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-8 border border-white/5 relative group cursor-default"
            style={{ borderTop: `4px solid ${cert.color}` }}
          >
            <Award size={24} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: cert.color }} />
            <h4 className="text-xl font-bold text-white mb-2 leading-tight">{cert.title}</h4>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-4">{cert.issuer}</p>
            <div className="mt-auto inline-block px-3 py-1 rounded bg-white/5 text-white/60 font-mono text-[9px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
              {cert.impact}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
