"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── Digital Optics Loading Messages ───────────────────────────────────────
const LOADING_MESSAGES = [
    "ALIGNING OPTICAL CONDUITS...",
    "FOCUSING COGNITIVE LENSES...",
    "REFRACTING DATA STREAMS...",
    "INITIATING PRISM CORE...",
];

const VIBGYOR = [
    { color: "#FF0000", angle: -18, label: "Red" },     // Top
    { color: "#FF7F00", angle: -12, label: "Orange" },
    { color: "#FFFF00", angle: -6,  label: "Yellow" },
    { color: "#00FF00", angle: 0,   label: "Green" },   // Center
    { color: "#0000FF", angle: 6,   label: "Blue" },
    { color: "#4B0082", angle: 12,  label: "Indigo" },
    { color: "#8B00FF", angle: 18,  label: "Violet" },  // Bottom
];

export default function Splash({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [exiting, setExiting] = useState(false);
    const skipRef = useRef(false);

    useEffect(() => {
        const hasVisited = typeof window !== "undefined" && localStorage.getItem("optics_visited") === "true";
        skipRef.current = hasVisited;
        
        const timers: ReturnType<typeof setTimeout>[] = [];
        
        if (!skipRef.current) {
            // Full Sequence
            timers.push(setTimeout(() => setPhase(1), 500));  // Light beam enters
            timers.push(setTimeout(() => setPhase(2), 1500)); // Prism refracts
            timers.push(setTimeout(() => setPhase(3), 2500)); // Name illuminates
            
            timers.push(
                setTimeout(() => {
                    localStorage.setItem("optics_visited", "true");
                    setExiting(true);
                    setTimeout(onComplete, 800);
                }, 5500)
            );
        } else {
            // Fast Boot Sequence
            setPhase(3);
            timers.push(
                setTimeout(() => {
                    setExiting(true);
                    setTimeout(onComplete, 600);
                }, 1500)
            );
        }

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    // Loading bar and messages
    useEffect(() => {
        const barInterval = setInterval(() => {
            setBarWidth((prev) => (prev >= 100 ? 100 : prev + (skipRef.current ? 4 : 0.6)));
        }, 20);
        
        const msgInterval = setInterval(() => {
            setMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 800);

        return () => {
            clearInterval(barInterval);
            clearInterval(msgInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    key="splash-optics"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(20px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#030303]"
                >
                    {/* Background Grid - Barely Visible */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    <div className="relative flex flex-col items-center justify-center w-full max-w-6xl h-full">
                        
                        {/* Optics Assembly (Translates Up in Phase 3) */}
                        <motion.div
                            animate={{ y: phase >= 3 ? -100 : 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* ─── PHASE 1: Laser Beam Entering ─── */}
                            <AnimatePresence>
                                {(phase >= 1) && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "50%", opacity: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute left-0 top-1/2 -translate-y-[1px] h-[3px] bg-white shadow-[0_0_15px_#fff,0_0_30px_#fff]"
                                        style={{ transformOrigin: "left" }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* ─── PHASE 2: True Glass Prism ─── */}
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                                        className="absolute z-20 w-48 h-48 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] flex justify-center items-center"
                                    >
                                        {/* SVG Prism Shape */}
                                        <svg viewBox="0 0 100 100" className="absolute w-full h-full inset-0 z-10">
                                            <defs>
                                                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                                    <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                                                    <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                                                </linearGradient>
                                                <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                                                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                                                </linearGradient>
                                            </defs>
                                            <polygon points="50,10 10,90 90,90" fill="url(#glassGradient)" stroke="url(#edgeHighlight)" strokeWidth="0.5" />
                                            {/* Inner 3D facet reflection */}
                                            <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                                            <line x1="50" y1="90" x2="10" y2="90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                                        </svg>
                                        {/* Glass Blur Background exactly inside the triangle */}
                                        <div 
                                            className="absolute inset-0 backdrop-blur-md" 
                                            style={{ clipPath: "polygon(50% 10%, 10% 90%, 90% 90%)" }} 
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ─── PHASE 2b: VIBGYOR Refracted Beams ─── */}
                            <AnimatePresence>
                                {phase >= 2 && (
                                    <div className="absolute left-[50%] right-0 top-1/2 -translate-y-1/2 h-0 flex items-center justify-start z-10 pointer-events-none">
                                        {VIBGYOR.map((beam, i) => (
                                            <motion.div
                                                key={beam.label}
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "100%", opacity: [0, 1, 0.8] }}
                                                transition={{ duration: 1, ease: "easeOut", delay: i * 0.05 }}
                                                className="absolute left-0 h-[4px] rounded-r-full mix-blend-screen"
                                                style={{ 
                                                    transformOrigin: "left",
                                                    backgroundColor: beam.color,
                                                    transform: `rotate(${beam.angle}deg)`,
                                                    boxShadow: `0 0 15px ${beam.color}, 0 0 30px ${beam.color}88`,
                                                    filter: "blur(1.5px)",
                                                    width: "120vw", // Span all the way out of screen
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* ─── PHASE 3: Content Reveals ─── */}
                        <AnimatePresence>
                            {phase >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 130, filter: "blur(0px)" }}
                                    transition={{ duration: 1 }}
                                    className="absolute z-30 flex flex-col items-center pointer-events-none"
                                >
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-cyber font-black text-white text-4xl md:text-6xl tracking-[0.2em] mb-2 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                            ATHARVA
                                        </h1>
                                        <h2 className="text-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-[#FF6B35] text-2xl md:text-4xl tracking-[0.2em]">
                                            SOUNDANKAR
                                        </h2>
                                        
                                        <div className="h-[1px] w-[140%] bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />
                                        
                                        <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/50 mb-8">
                                            AI &amp; BIG DATA ENGINEER
                                        </p>

                                        {/* Loading Elements */}
                                        <div className="w-[300px] h-[1px] bg-white/10 relative overflow-hidden">
                                            <motion.div 
                                                className="absolute top-0 left-0 h-full bg-cyan shadow-[0_0_8px_#00F0FF]"
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>
                                        
                                        <div className="w-[300px] flex justify-between items-center mt-3 text-[9px] font-mono tracking-widest uppercase">
                                            <div className="text-white/40">
                                                {LOADING_MESSAGES[msgIdx]}
                                            </div>
                                            <div className="text-cyan">
                                                {Math.floor(barWidth)}%
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Ambient Light Refraction */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[150px]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
