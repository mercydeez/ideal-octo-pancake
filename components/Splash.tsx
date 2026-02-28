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
                            <span className="text-pink mr-2"> {">"} </span>
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
                        <p className="text-[10px] text-pink uppercase tracking-[0.5em] animate-pulse">
                            [ ACCESS GRANTED ]
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Shatter Effect Background Elements */}
            <AnimatePresence>
                {index === BOOT_SEQUENCE.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.8, 1.2],
                                    rotate: i * 60
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                className="absolute inset-0 border border-cyan/10 rounded-full scale-110"
                                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", scale: 0.5 + i * 0.2 }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
