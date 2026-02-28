"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Activity } from "lucide-react";
import { useStore } from "@/lib/store";

export default function FeaturedProject() {
    const setHoveringProject = useStore((state) => state.setHoveringProject);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-3 glow-card overflow-hidden rounded-2xl mb-8"
            onMouseEnter={() => setHoveringProject(true)}
            onMouseLeave={() => setHoveringProject(false)}
        >
            <div className="tactical-panel relative h-full w-full p-8 md:p-12 border-amber/40 flex flex-col md:flex-row gap-8 items-center bg-void/90">

                {/* Scanning Line */}
                <div className="scanning-line" />

                <div className="w-full md:w-2/3 z-10 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber/10 border border-amber/30 rounded-lg">
                            <Activity size={20} className="text-amber" />
                        </div>
                        <span className="text-amber font-mono text-xs tracking-[0.2em] animate-pulse">
                            ENTERPRISE DEPLOYMENT
                        </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-4 uppercase leading-none text-cyber">
                        Lulu Sales <br /> Intelligence
                    </h3>

                    <p className="text-white/60 font-mono text-sm md:text-base mb-8 max-w-xl leading-relaxed">
                        Enterprise-grade real-time sales analytics platform for Lulu Hypermarket UAE. Processes high-frequency POS data into actionable intelligence dashboards using a robust stream processing architecture.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {["Next.js", "FastAPI", "Python", "PostgreSQL", "Redis", "Docker", "TailwindCSS"].map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-mono text-amber/80 border border-amber/30 px-3 py-1.5 rounded bg-amber/5">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="flex items-center gap-2 text-void bg-amber hover:bg-white px-6 py-3 font-mono text-xs font-bold transition-colors">
                            <ExternalLink size={16} /> LIVE_SYSTEM
                        </a>
                        <a href="#" className="flex items-center gap-2 text-white/50 border border-white/20 hover:text-white hover:border-white px-6 py-3 font-mono text-xs transition-colors">
                            <Github size={16} /> SOURCE
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col justify-end items-end z-10">
                    {/* Metadata Terminal */}
                    <div className="tactical-border p-4 bg-void/80 w-full text-right">
                        <p className="font-mono text-[10px] text-amber/60 mb-1">[ARCH: XGBOOST_ENSEMBLE_V4.2]</p>
                        <p className="font-mono text-[10px] text-cyan/60 mb-1">[RUNTIME: PYTHON 3.10_FASTAPI]</p>
                        <p className="font-mono text-xs text-amber font-bold animate-pulse mt-3">&gt; STATUS: OPTIMIZED</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
