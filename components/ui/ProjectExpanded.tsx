"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Activity, Terminal } from "lucide-react";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

const DUMMY_LOGS = [
    "[SYS] Initializing XGBoost Pipeline...",
    "[DATA] Fetching 913,428 records from BigQuery.",
    "[ETL] Normalizing feature embeddings...",
    "[MODEL] Inference: Sales Turnover Risk...",
    "[WARN] Latency spike in Sector 7. Re-routing.",
    "[SYS] Prediction Confidence: 94.2%.",
    "[SYNC] Writing back to PostgreSQL instance.",
    "[OK] Pipeline execution complete. Sleep state."
];

export default function ProjectExpanded() {
    const setHoveringProject = useStore((state) => state.setHoveringProject);
    const setCursorVariant = useStore((state) => state.setCursorVariant);
    const [logIndex, setLogIndex] = useState(0);

    // Scroll terminal logs
    useEffect(() => {
        const interval = setInterval(() => {
            setLogIndex(prev => (prev + 1) % DUMMY_LOGS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-2 lg:col-span-3 glow-card overflow-hidden rounded-2xl mb-8"
            onMouseEnter={() => {
                setHoveringProject(true);
                setCursorVariant("target");
            }}
            onMouseLeave={() => {
                setHoveringProject(false);
                setCursorVariant("default");
            }}
        >
            <div className="tactical-panel relative h-full w-full p-6 md:p-12 border-amber/40 flex flex-col lg:flex-row gap-8 items-center bg-void/90">

                {/* Scanning Line */}
                <div className="scanning-line" />

                <div className="w-full lg:w-2/3 z-10 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber/10 border border-amber/30 rounded-lg">
                            <Activity size={20} className="text-amber" />
                        </div>
                        <span className="text-amber font-mono text-xs tracking-[0.2em] animate-pulse">
                            ENTERPRISE DEPLOYMENT
                        </span>
                    </div>

                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase leading-none text-cyber">
                        Lulu Sales <br className="hidden md:block" /> Intelligence
                    </h3>

                    <p className="text-white/60 font-mono text-sm md:text-base mb-8 max-w-xl leading-relaxed">
                        An AI-driven forecasting engine designed to analyze 913K+ retail records, predicting inventory turnover with 94.2% accuracy using a robust stream processing architecture.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs tracking-widest uppercase">
                        {["Next.js 14", "Python/FastAPI", "XGBoost", "BigQuery", "Tailwind"].map((tag, idx) => (
                            <span key={idx} className="text-amber/80 border border-amber/30 px-3 py-1.5 rounded bg-amber/5">
                                [{tag}]
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="flex flex-1 md:flex-none justify-center items-center gap-2 text-void bg-amber hover:bg-white px-6 py-3 font-mono text-xs font-bold transition-colors">
                            <ExternalLink size={16} /> LIVE_SYSTEM
                        </a>
                        <a href="#" className="flex flex-1 md:flex-none justify-center items-center gap-2 text-white/50 border border-white/20 hover:text-white hover:border-white px-6 py-3 font-mono text-xs transition-colors">
                            <Github size={16} /> SOURCE
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 flex flex-col justify-end items-end z-10 h-full mt-8 lg:mt-0">
                    {/* Metadata Terminal Log Simulation */}
                    <div className="tactical-border p-4 bg-void/80 w-full rounded-xl border border-white/10 shadow-2xl relative overflow-hidden h-48">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                            <Terminal size={14} className="text-cyan animate-pulse" />
                            <span className="font-mono text-[10px] text-white/50 tracking-widest">LIVE_PROCESS_STDOUT</span>
                        </div>

                        <div className="flex flex-col gap-2 font-mono text-xs">
                            {DUMMY_LOGS.map((log, i) => {
                                // Show previous, current, next logs for scrolling effect
                                const isActive = i === logIndex;
                                const isPrev = i === (logIndex - 1 + DUMMY_LOGS.length) % DUMMY_LOGS.length;
                                const isNext = i === (logIndex + 1) % DUMMY_LOGS.length;

                                if (isActive || isPrev || isNext) {
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: isActive ? 1 : 0.3,
                                                y: isActive ? 0 : (isPrev ? -10 : 10)
                                            }}
                                            className={`
                                        ${log.includes('[WARN]') ? 'text-amber' : ''}
                                        ${log.includes('[OK]') ? 'text-cyan' : ''}
                                        ${!log.includes('[WARN]') && !log.includes('[OK]') ? 'text-white/70' : ''}
                                    `}
                                        >
                                            {log}
                                        </motion.div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-void to-transparent" />
                    </div>

                    <p className="font-mono text-xs text-amber font-bold animate-pulse mt-4">&gt; STATUS: OPTIMIZED</p>
                </div>
            </div>
        </motion.div>
    );
}
