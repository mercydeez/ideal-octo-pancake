"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import { Download, Eye, FileCode } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-[32px] p-12 md:p-20 relative overflow-hidden group border border-white/10"
      >
        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 mb-8 group-hover:rotate-12 transition-transform">
            <FileCode size={32} />
          </div>

          <p className="text-amber-500 font-mono text-sm tracking-[0.4em] mb-4 uppercase font-bold">Document_Manifest</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-6">
            DOWNLOAD <span className="text-glow-white">VITAE</span>
          </h2>

          <p className="text-white/40 font-mono text-sm leading-relaxed mb-12">
            Detailed breakdown of technical architectures, research publications, and professional trajectory available for offline review.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <a
              href={PERSONAL.resumeDirectDownload}
              className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:shadow-[0_0_30px_#FF6B3580] transition-all flex items-center justify-center gap-3"
            >
              <Download size={18} />
              GET_PDF_MANIFEST
            </a>
            <a
              href={PERSONAL.resumeDriveView}
              target="_blank"
              className="px-10 py-5 bg-white/5 border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <Eye size={18} />
              REMOTE_VIEW
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
