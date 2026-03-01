"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BOOT_SEQUENCE = [
    "[SYSTEM] INITIALIZING NEURAL PATHWAYS...",
    "[SYSTEM] CALIBRATING BIOMETRIC ARRAYS...",
    "[SYSTEM] LOADING QUANTUM KERNEL...",
    "[SYSTEM] ESTABLISHING SECURE PROTOCOLS...",
    "[SYSTEM] NEURAL LINK: 100% SYNCHRONIZED.",
];

export default function Splash({ onComplete }: { onComplete: () => void }) {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        if (index < BOOT_SEQUENCE.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
                setLoading((prev) => Math.min(100, prev + 25));
            }, 400);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [index, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center font-mono">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full max-w-lg px-6"
            >
                <div className="mb-8">
                    <div className="flex justify-between text-[10px] text-cyan mb-2 uppercase tracking-widest">
                        <span>Booting Identity Module</span>
                        <span>{loading}%</span>
                    </div>
                    <div className="h-[1px] w-full bg-cyan/20 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-cyan"
                            initial={{ width: "0%" }}
                            animate={{ width: `${loading}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </div>

                <div className="space-y-2 h-40 overflow-hidden">
                    {BOOT_SEQUENCE.slice(0, index).map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs md:text-sm text-cyan/70"
                        >
                            <span className="text-amber mr-2"> {">"} </span>
                            {line}
                        </motion.p>
                    ))}
                    {index < BOOT_SEQUENCE.length && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-cyan/50"
                        />
                    )}
                </div>

                {index === BOOT_SEQUENCE.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-[10px] text-amber uppercase tracking-[0.5em] animate-pulse">
                            [ ACCESS GRANTED ]
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Singularity / Neural Core Animation */}
            <AnimatePresence>
                {index < BOOT_SEQUENCE.length + 1 && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 3, transition: { duration: 1.2, ease: "easeInOut" } }}
                    >
                        {/* Core Glowing Orb */}
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: "200px",
                                height: "200px",
                                background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,0,0,0) 70%)",
                                border: "1px solid rgba(0,240,255,0.1)"
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 180]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Outer Geometric Ring */}
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: "350px",
                                height: "350px",
                                border: "1px dashed rgba(255,107,53,0.15)"
                            }}
                            animate={{
                                scale: [1, 0.95, 1],
                                rotate: [180, 0, -180]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner High-Energy Pulse */}
                        <motion.div
                            className="absolute rounded-full bg-cyan"
                            style={{
                                width: "4px",
                                height: "4px",
                                boxShadow: "0 0 20px 4px rgba(0,240,255,0.6)"
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
