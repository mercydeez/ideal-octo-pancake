"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";

const SYSTEM_LOGS = [
    "Allocating memory buffers...",
    "Loading GLSL Shaders...",
    "Initializing Neural Core geometry...",
    "Establishing Secure Socket Connection...",
    "Data stream synchronized.",
    "Warning: High latency detected in Sector 4.",
    "Rerouting power to WebGL Context...",
    "Adaptive Performance: ACTIVE.",
];

export default function SystemLog() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            setLogs(prev => {
                const newLogs = [...prev, SYSTEM_LOGS[currentIndex]];
                if (newLogs.length > 4) newLogs.shift();
                return newLogs;
            });

            currentIndex = (currentIndex + 1) % SYSTEM_LOGS.length;
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-6 right-6 z-50 pointer-events-none w-64 md:w-80">
            <div className="tactical-panel p-4 rounded border border-cyan/20">
                <div className="flex items-center gap-2 mb-3 border-b border-cyan/20 pb-2">
                    <Cpu size={14} className="text-amber animate-pulse" />
                    <span className="text-[10px] text-amber font-mono tracking-[0.2em] font-bold uppercase">
                        System Diagnostics
                    </span>
                </div>

                <div className="h-24 overflow-hidden flex flex-col justify-end">
                    <AnimatePresence initial={false}>
                        {logs.map((log, i) => (
                            <motion.div
                                key={log + i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20, position: "absolute" }}
                                className="text-[10px] font-mono text-cyan/70 mb-1"
                            >
                                &gt; {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
