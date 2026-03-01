"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── Loading messages for Phase 4 ───────────────────────────────────────────
const LOADING_MESSAGES = [
    "CALIBRATING NEURAL SYSTEMS...",
    "MAPPING STAR COORDINATES...",
    "SYNCHRONIZING DATA STREAMS...",
    "ESTABLISHING DEEP SPACE LINK...",
];

// ─── Particle data generated once ────────────────────────────────────────────
const PARTICLE_COUNT = 80;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const dist = 0.35 + Math.random() * 0.25; // 35–60 vw/vh
    const colorRand = Math.random();
    const color =
        colorRand < 0.33 ? "#ffffff" : colorRand < 0.66 ? "#00F0FF" : "#7B2FBE";
    const size = 2 + Math.random() * 2;
    return {
        id: i,
        x: `${Math.cos(angle) * dist * 100}vw`,
        y: `${Math.sin(angle) * dist * 100}vh`,
        color,
        size,
        duration: 0.55 + Math.random() * 0.3,
        delay: Math.random() * 0.15,
    };
});

// ─── Name letters ─────────────────────────────────────────────────────────────
const NAME = "ATHARVA SOUNDANKAR";
const NAME_LETTERS = NAME.split("");

// ─── Splash Component ─────────────────────────────────────────────────────────
export default function Splash({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [exiting, setExiting] = useState(false);
    const skipRef = useRef(false);

    // ─── SSR-safe localStorage check ───────────────────────────────────────────
    useEffect(() => {
        const hasVisited =
            typeof window !== "undefined" &&
            localStorage.getItem("space_visited") === "true";
        skipRef.current = hasVisited;
        // Start: if visited skip to Phase 3
        setPhase(hasVisited ? 3 : 0);
    }, []);

    // ─── Phase timer sequence ───────────────────────────────────────────────────
    useEffect(() => {
        const skip = skipRef.current;

        const timers: ReturnType<typeof setTimeout>[] = [];

        if (!skip) {
            // Full sequence
            timers.push(setTimeout(() => setPhase(1), 200));
            timers.push(setTimeout(() => setPhase(2), 800));
            timers.push(setTimeout(() => setPhase(3), 1500));
            timers.push(setTimeout(() => setPhase(4), 2200));
            timers.push(
                setTimeout(() => {
                    localStorage.setItem("space_visited", "true");
                    setExiting(true);
                    setTimeout(onComplete, 400);
                }, 2800)
            );
        } else {
            // Short sequence from Phase 3
            timers.push(setTimeout(() => setPhase(4), 500));
            timers.push(
                setTimeout(() => {
                    localStorage.setItem("space_visited", "true");
                    setExiting(true);
                    setTimeout(onComplete, 400);
                }, 1200)
            );
        }

        return () => timers.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── Loading bar animation (Phase 4) ──────────────────────────────────────
    useEffect(() => {
        if (phase !== 4) return;
        const interval = setInterval(() => {
            setBarWidth((prev) => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                return prev + 3.5;
            });
        }, 20);
        return () => clearInterval(interval);
    }, [phase]);

    // ─── Cycling messages (Phase 4) ───────────────────────────────────────────
    useEffect(() => {
        if (phase !== 4) return;
        const interval = setInterval(() => {
            setMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 400);
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(12px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "#030303" }}
                >
                    {/* ── PHASE 1: Single point of light ─────────────────────────────── */}
                    <AnimatePresence>
                        {phase === 1 && (
                            <motion.div
                                key="singularity-point"
                                initial={{ opacity: 0, scale: 0, backgroundColor: "#ffffff" }}
                                animate={{
                                    opacity: [0, 1, 1, 1],
                                    scale: [1, 4, 2],
                                    backgroundColor: ["#ffffff", "#7B2FBE", "#7B2FBE"],
                                    boxShadow: [
                                        "0 0 0px 0px rgba(255,255,255,0)",
                                        "0 0 30px 10px rgba(123,47,190,0.8)",
                                        "0 0 15px 5px rgba(123,47,190,0.6)",
                                    ],
                                }}
                                exit={{ opacity: 0, scale: 8, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{
                                    position: "absolute",
                                    width: "2px",
                                    height: "2px",
                                    borderRadius: "50%",
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* ── PHASE 2: Particle explosion ─────────────────────────────────── */}
                    <AnimatePresence>
                        {phase === 2 && (
                            <div
                                key="particle-field"
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                {particles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                        animate={{
                                            x: p.x,
                                            y: p.y,
                                            opacity: [1, 0.8, 0],
                                            scale: [1, 0.6],
                                        }}
                                        transition={{
                                            duration: p.duration,
                                            delay: p.delay,
                                            ease: "easeOut",
                                        }}
                                        style={{
                                            position: "absolute",
                                            width: p.size,
                                            height: p.size,
                                            borderRadius: "50%",
                                            backgroundColor: p.color,
                                            boxShadow: `0 0 6px 2px ${p.color}88`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>

                    {/* ── PHASES 3+: Name, subtitle, bar ──────────────────────────────── */}
                    <AnimatePresence>
                        {phase >= 3 && (
                            <motion.div
                                key="name-block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-4 px-6 text-center"
                            >
                                {/* Name letter-by-letter */}
                                <h1 className="flex flex-wrap justify-center" style={{ fontFamily: "var(--font-syncopate), sans-serif" }}>
                                    {NAME_LETTERS.map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                                            className={`text-white font-black uppercase tracking-widest ${char === " " ? "w-4" : ""}`}
                                            style={{
                                                fontSize: "clamp(1.4rem, 4vw, 3rem)",
                                                textShadow: phase >= 3 ? "0 0 20px rgba(0,240,255,0.6), 0 0 40px rgba(0,240,255,0.2)" : "none",
                                            }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </h1>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: NAME_LETTERS.length * 0.06 + 0.2, duration: 0.4 }}
                                    className="font-bold uppercase tracking-[0.4em]"
                                    style={{
                                        fontFamily: "var(--font-space), monospace",
                                        fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
                                        color: "#FF6B35",
                                    }}
                                >
                                    AI &amp; BIG DATA ENGINEER
                                </motion.p>

                                {/* ── PHASE 4: Loading bar + messages ──────────────────────── */}
                                <AnimatePresence>
                                    {phase >= 4 && (
                                        <motion.div
                                            key="loading-block"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full max-w-sm flex flex-col items-center gap-3 mt-4"
                                        >
                                            {/* Loading bar */}
                                            <div
                                                className="w-full h-[2px] rounded-full overflow-hidden"
                                                style={{ background: "rgba(255,255,255,0.08)" }}
                                            >
                                                <motion.div
                                                    style={{
                                                        height: "100%",
                                                        width: `${barWidth}%`,
                                                        background: "linear-gradient(90deg, #00F0FF, #FF6B35, #7B2FBE)",
                                                        borderRadius: "9999px",
                                                    }}
                                                    transition={{ duration: 0.02 }}
                                                />
                                            </div>

                                            {/* Cycling messages */}
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={msgIdx}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="font-mono text-[10px] tracking-widest uppercase"
                                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                                >
                                                    {LOADING_MESSAGES[msgIdx]}
                                                </motion.p>
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
