"use client";

import { motion } from "framer-motion";
import { Github, Activity, Server, Database, Shield, Zap, CheckCircle2, Terminal } from "lucide-react";
import { useStore } from "@/lib/store";
import { useCursorHover } from "@/hooks/useCursorHover";
import { PROJECTS } from "@/lib/constants";
import TechChain from "./TechChain";

const MOBILE_TECH_CHAIN = [
    { label: "Next.js", sub: "Client Application", icon: Server, color: "#FFFFFF" },
    { label: "FastAPI", sub: "AI Orchestration Layer", icon: Zap, color: "#818cf8" },
    { label: "OpenAI", sub: "LLM Inference", icon: Database, color: "#74AA9C" },
    { label: "Postgres & Redis", sub: "Data & Event Stream", icon: Database, color: "#4169E1" },
];

const ARCH_NODES = [
    { label: "NGINX", sub: "Reverse Proxy", icon: Shield, color: "#38bdf8", x: 50, row: 0 },
    { label: "Next.js", sub: "Frontend SSR", icon: Server, color: "#FFFFFF", x: 20, row: 1 },
    { label: "FastAPI", sub: "REST API", icon: Zap, color: "#818cf8", x: 50, row: 1 },
    { label: "OpenAI", sub: "AI Chat", icon: Terminal, color: "#74AA9C", x: 80, row: 1 },
    { label: "PostgreSQL", sub: "Relational DB", icon: Database, color: "#4169E1", x: 30, row: 2 },
    { label: "Redis", sub: "Pub/Sub + Cache", icon: Database, color: "#FF4438", x: 70, row: 2 },
];

const CASE_STUDY_METRICS = [
    { value: "10", label: "Stores Tracked", color: "#38bdf8" },
    { value: "50+", label: "Products Monitored", color: "#818cf8" },
    { value: "4-Tier", label: "RBAC System", color: "#818cf8" },
    { value: "<200ms", label: "SSE Latency", color: "#14B8A6" },
];

export default function FeatureProject() {
    const setHoveringProject = useStore((state) => state.setHoveringProject);
    const cursorProps = useCursorHover();

    const luluProject = PROJECTS.find(p => p.id === "lulu");

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
                <div className="tactical-panel w-full p-6 md:p-10 border-amber/40 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start bg-void/90 relative">
                    {/* Scanning line hidden on mobile for performance */}
                    <div className="hidden md:block scanning-line opacity-50" />

                    {/* Left Column: Title & Meta */}
                    <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber/10 border border-amber/30 rounded-lg">
                                <Activity size={20} className="text-amber" />
                            </div>
                            <span className="text-amber font-mono text-xs tracking-[0.2em] animate-pulse">
                                {luluProject.badge?.toUpperCase()}
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase leading-tight text-cyber">
                            {luluProject.name}
                        </h3>

                        <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed">
                            {luluProject.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 font-mono text-[10px] md:text-xs tracking-widest uppercase">
                            {luluProject.tech.map((tag, idx) => (
                                <span key={idx} className="text-cyan/80 border border-cyan/20 px-3 py-1.5 rounded bg-cyan/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <a href={luluProject.github} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 text-void bg-cyan hover:bg-cyan/90 border border-transparent px-6 py-3 font-mono font-bold text-xs transition-colors rounded">
                                <Github size={16} /> VIEW SOURCE
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Key Details & Status */}
                    <div className="w-full lg:w-1/2 flex flex-col z-10 gap-6 w-full">
                        
                        {/* Static Status Board (Replaces Dummy Logs) */}
                        <div className="tactical-border p-5 md:p-6 bg-void/80 w-full rounded-xl border border-white/10 shadow-2xl flex flex-col gap-4">
                            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
                                <CheckCircle2 size={16} className="text-emerald-400" />
                                <span className="font-mono text-xs text-white/50 tracking-widest uppercase">Production Ready</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                <div>
                                    <span className="block font-mono text-[9px] text-white/40 uppercase mb-1">Status</span>
                                    <span className="font-mono text-xs text-emerald-400 font-bold">ACTIVE</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[9px] text-white/40 uppercase mb-1">Type</span>
                                    <span className="font-mono text-xs text-white/90 uppercase">AI SYSTEM</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[9px] text-white/40 uppercase mb-1">Architecture</span>
                                    <span className="font-mono text-xs text-amber font-bold uppercase">EVENT-DRIVEN</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[9px] text-white/40 uppercase mb-1">Scale</span>
                                    <span className="font-mono text-xs text-cyan uppercase">ENTERPRISE GRADE</span>
                                </div>
                            </div>
                        </div>

                        {/* Problem & Approach (Case Study Details) */}
                        <div className="flex flex-col gap-4">
                            <div className="tactical-panel rounded-xl p-5 border border-white/5 bg-white/[0.02]">
                                <span className="text-[10px] font-mono text-amber uppercase tracking-[0.2em] font-bold block mb-2">PROBLEM</span>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {luluProject.problem}
                                </p>
                            </div>
                            <div className="tactical-panel rounded-xl p-5 border border-white/5 bg-white/[0.02]">
                                <span className="text-[10px] font-mono text-cyan uppercase tracking-[0.2em] font-bold block mb-2">APPROACH</span>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {luluProject.approach}
                                </p>
                            </div>
                        </div>

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
                <div className="lg:col-span-3 tactical-panel rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden bg-white/[0.01]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                            <Server size={18} className="text-white/70" />
                        </div>
                        <span className="text-white/70 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">SYSTEM_ARCHITECTURE</span>
                    </div>

                    {/* Mobile View: Vertical TechChain */}
                    <div className="block md:hidden">
                        <TechChain nodes={MOBILE_TECH_CHAIN} />
                    </div>

                    {/* Desktop View: SVG Diagram */}
                    <div className="relative w-full hidden md:block" style={{ minHeight: "280px" }}>
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="50" y1="18" x2="20" y2="42" stroke="rgba(0,240,255,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            <line x1="50" y1="18" x2="50" y2="42" stroke="rgba(255,107,53,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            <line x1="50" y1="18" x2="80" y2="42" stroke="rgba(116,170,156,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            <line x1="50" y1="58" x2="30" y2="78" stroke="rgba(65,105,225,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                            <line x1="50" y1="58" x2="70" y2="78" stroke="rgba(255,68,56,0.3)" strokeWidth="0.3" strokeDasharray="2 1" />
                        </svg>

                        {ARCH_NODES.map((node, i) => {
                            const Icon = node.icon;
                            const top = node.row === 0 ? "5%" : node.row === 1 ? "38%" : "72%";
                            return (
                                <motion.div
                                    key={node.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="absolute flex flex-col items-center gap-2"
                                    style={{
                                        left: `${node.x}%`,
                                        top,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center border backdrop-blur-sm transition-transform hover:scale-110"
                                        style={{
                                            background: `${node.color}15`,
                                            borderColor: `${node.color}40`,
                                            boxShadow: `0 0 20px ${node.color}10`,
                                        }}
                                    >
                                        <Icon size={22} style={{ color: node.color }} />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[11px] font-mono font-bold text-white/90">{node.label}</span>
                                        <span className="text-[9px] font-mono text-white/40">{node.sub}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Data Flow Legend (Desktop Only) */}
                    <div className="hidden md:flex items-center gap-6 mt-8 pt-4 border-t border-white/5">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">DATA_FLOW:</span>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-cyan/50" />
                            <span className="text-[9px] font-mono text-cyan/70">HTTP/SSE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-amber/50" />
                            <span className="text-[9px] font-mono text-amber/70">REST API</span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 h-full">
                        {CASE_STUDY_METRICS.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="tactical-panel flex flex-col justify-center rounded-xl p-6 border border-white/5 text-center bg-white/[0.01]"
                            >
                                <p className="text-3xl md:text-4xl font-display font-black" style={{ color: metric.color }}>
                                    {metric.value}
                                </p>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-2">
                                    {metric.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
