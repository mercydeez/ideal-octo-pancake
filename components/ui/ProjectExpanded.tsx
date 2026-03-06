"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Activity, Terminal, Server, Database, Shield, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import { useCursorHover } from "@/hooks/useCursorHover";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/lib/constants";

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

const ARCH_NODES = [
    { label: "NGINX", sub: "Reverse Proxy", icon: Shield, color: "#00F0FF", x: 50, row: 0 },
    { label: "Next.js", sub: "Frontend SSR", icon: Server, color: "#FFFFFF", x: 20, row: 1 },
    { label: "FastAPI", sub: "REST API", icon: Zap, color: "#FF6B35", x: 50, row: 1 },
    { label: "OpenAI", sub: "AI Chat", icon: Terminal, color: "#74AA9C", x: 80, row: 1 },
    { label: "PostgreSQL", sub: "Relational DB", icon: Database, color: "#4169E1", x: 30, row: 2 },
    { label: "Redis", sub: "Pub/Sub + Cache", icon: Database, color: "#FF4438", x: 70, row: 2 },
];

const CASE_STUDY_METRICS = [
    { value: "10", label: "Stores Tracked", color: "#00F0FF" },
    { value: "50+", label: "Products Monitored", color: "#FF6B35" },
    { value: "4-Tier", label: "RBAC System", color: "#7B2FBE" },
    { value: "<200ms", label: "SSE Latency", color: "#14B8A6" },
];

export default function ProjectExpanded() {
    const setHoveringProject = useStore((state) => state.setHoveringProject);
    const cursorProps = useCursorHover();
    const [logIndex, setLogIndex] = useState(0);

    const luluProject = PROJECTS.find(p => p.id === "lulu");

    useEffect(() => {
        const interval = setInterval(() => {
            setLogIndex(prev => (prev + 1) % DUMMY_LOGS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    if (!luluProject) return null;

    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-6 mb-8">
            {/* ── HERO CARD ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glow-card overflow-hidden rounded-2xl"
                onMouseEnter={() => {
                    setHoveringProject(true);
                    cursorProps.onMouseEnter();
                }}
                onMouseLeave={() => {
                    setHoveringProject(false);
                    cursorProps.onMouseLeave();
                }}
            >
                <div className="tactical-panel relative h-full w-full p-6 md:p-12 border-amber/40 flex flex-col lg:flex-row gap-8 items-center bg-void/90">
                    <div className="scanning-line" />

                    <div className="w-full lg:w-2/3 z-10 relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber/10 border border-amber/30 rounded-lg">
                                <Activity size={20} className="text-amber" />
                            </div>
                            <span className="text-amber font-mono text-xs tracking-[0.2em] animate-pulse">
                                {luluProject.badge?.toUpperCase()}
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase leading-none text-cyber">
                            {luluProject.name.split(" ").slice(0, 2).join(" ")} <br className="hidden md:block" /> {luluProject.name.split(" ").slice(2).join(" ")}
                        </h3>

                        <p className="text-white/60 font-mono text-sm md:text-base mb-8 max-w-xl leading-relaxed">
                            {luluProject.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs tracking-widest uppercase">
                            {luluProject.tech.map((tag, idx) => (
                                <span key={idx} className="text-amber/80 border border-amber/30 px-3 py-1.5 rounded bg-amber/5">
                                    [{tag}]
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a href={luluProject.github} target="_blank" rel="noopener noreferrer" className="flex flex-1 md:flex-none justify-center items-center gap-2 text-white/50 border border-white/20 hover:text-white hover:border-white px-6 py-3 font-mono text-xs transition-colors">
                                <Github size={16} /> SOURCE
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex flex-col justify-end items-end z-10 h-full mt-8 lg:mt-0 gap-4">
                        {(luluProject as any).image && (
                            <div className="w-full rounded-xl overflow-hidden border border-amber/30 shadow-2xl group/img">
                                <img
                                    src={(luluProject as any).image}
                                    alt="Lulu Dashboard Screenshot"
                                    className="w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                            </div>
                        )}

                        <div className="tactical-border p-4 bg-void/80 w-full rounded-xl border border-white/10 shadow-2xl relative overflow-hidden h-48">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                <Terminal size={14} className="text-cyan animate-pulse" />
                                <span className="font-mono text-[10px] text-white/50 tracking-widest">LIVE_PROCESS_STDOUT</span>
                            </div>
                            <div className="flex flex-col gap-2 font-mono text-xs">
                                {DUMMY_LOGS.map((log, i) => {
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
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-void to-transparent" />
                        </div>
                        <p className="font-mono text-xs text-amber font-bold animate-pulse mt-1">&gt; STATUS: OPTIMIZED</p>
                    </div>
                </div>
            </motion.div>

            {/* ── CASE STUDY: ARCHITECTURE + METRICS ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
                {/* Architecture Diagram */}
                <div className="lg:col-span-3 tactical-panel rounded-2xl p-6 md:p-8 border border-cyan/20 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-cyan/10 border border-cyan/30 rounded-lg">
                            <Server size={18} className="text-cyan" />
                        </div>
                        <span className="text-cyan font-mono text-[10px] tracking-[0.2em] uppercase">SYSTEM_ARCHITECTURE</span>
                    </div>

                    {/* Architecture Flow Diagram */}
                    <div className="relative w-full" style={{ minHeight: "280px" }}>
                        {/* Connection Lines - SVG */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* NGINX → Next.js */}
                            <line x1="50" y1="18" x2="20" y2="42" stroke="rgba(0,240,255,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            {/* NGINX → FastAPI */}
                            <line x1="50" y1="18" x2="50" y2="42" stroke="rgba(255,107,53,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            {/* NGINX → OpenAI */}
                            <line x1="50" y1="18" x2="80" y2="42" stroke="rgba(116,170,156,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            {/* FastAPI → PostgreSQL */}
                            <line x1="50" y1="58" x2="30" y2="78" stroke="rgba(65,105,225,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            {/* FastAPI → Redis */}
                            <line x1="50" y1="58" x2="70" y2="78" stroke="rgba(255,68,56,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                        </svg>

                        {/* Architecture Nodes */}
                        {ARCH_NODES.map((node, i) => {
                            const Icon = node.icon;
                            const top = node.row === 0 ? "5%" : node.row === 1 ? "38%" : "72%";
                            return (
                                <motion.div
                                    key={node.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="absolute flex flex-col items-center gap-1"
                                    style={{
                                        left: `${node.x}%`,
                                        top,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border backdrop-blur-sm"
                                        style={{
                                            background: `${node.color}15`,
                                            borderColor: `${node.color}40`,
                                            boxShadow: `0 0 20px ${node.color}20`,
                                        }}
                                    >
                                        <Icon size={20} style={{ color: node.color }} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/90">{node.label}</span>
                                    <span className="text-[8px] font-mono text-white/40">{node.sub}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Data Flow Legend */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">DATA_FLOW:</span>
                        <div className="flex items-center gap-1">
                            <div className="w-6 h-px bg-cyan/50" style={{ backgroundImage: "repeating-linear-gradient(90deg, #00F0FF80, #00F0FF80 4px, transparent 4px, transparent 8px)" }} />
                            <span className="text-[9px] font-mono text-cyan/60">HTTP/SSE</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-6 h-px bg-amber/50" style={{ backgroundImage: "repeating-linear-gradient(90deg, #FF6B3580, #FF6B3580 4px, transparent 4px, transparent 8px)" }} />
                            <span className="text-[9px] font-mono text-amber/60">REST API</span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics + Problem/Approach */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {CASE_STUDY_METRICS.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="tactical-panel rounded-xl p-4 border border-white/5 text-center"
                            >
                                <p className="text-2xl md:text-3xl font-display font-black" style={{ color: metric.color }}>
                                    {metric.value}
                                </p>
                                <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-1">
                                    {metric.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Problem → Solution */}
                    <div className="tactical-panel rounded-xl p-5 border border-white/5 flex-1">
                        <div className="mb-4">
                            <span className="text-[9px] font-mono text-red-400/80 uppercase tracking-[0.2em] font-bold">⚠ PROBLEM</span>
                            <p className="text-white/60 font-mono text-xs mt-1 leading-relaxed">
                                {luluProject.problem}
                            </p>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                            <span className="text-[9px] font-mono text-cyan uppercase tracking-[0.2em] font-bold">✓ APPROACH</span>
                            <p className="text-white/60 font-mono text-xs mt-1 leading-relaxed">
                                {luluProject.approach}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
