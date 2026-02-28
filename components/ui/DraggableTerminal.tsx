"use client";

import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal as TerminalIcon } from "lucide-react";

const INITIAL_LOGS = [
    "[INIT] Initializing Neural Architect...",
    "[INFO] Loading Weights: 100%",
    "[SUCCESS] Neural Graph Rendered.",
    "[STATUS] System Online.",
];

export default function DraggableTerminal() {
    const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
    const [isOpen, setIsOpen] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const messages = [
            "[PROCESS] Analyzing Latent Space...",
            "[FETCH] Retrieving Project Data...",
            "[DEBUG] Buffer optimized for Three.js",
            "[INFO] Connection Secure: 128-bit Cyan",
            "[SYSTEM] Auto-Scaling Active.",
        ];

        const interval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            setLogs((prev) => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ${msg}`]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-8 z-50 p-3 glass-panel rounded-full text-cyan hover:shadow-[0_0_10px_#00f5ff] transition-all"
        >
            <TerminalIcon className="w-5 h-5" />
        </button>
    );

    return (
        <Draggable handle=".terminal-header">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed bottom-32 right-8 w-80 md:w-96 h-64 glass-panel rounded-lg overflow-hidden flex flex-col z-50 border-white/10"
            >
                <div className="terminal-header bg-white/5 px-4 py-2 flex items-center justify-between cursor-move">
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="w-4 h-4 text-cyan" />
                        <span className="text-xs font-mono text-white/50">SYSTEM_LOGS</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <button onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4 text-white/30 hover:text-white" />
                        </button>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="flex-1 p-4 font-mono text-[10px] md:text-xs overflow-y-auto no-scrollbar bg-black/40"
                >
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${log.includes('[SUCCESS]') ? 'text-green-400' : log.includes('[INIT]') ? 'text-cyan' : 'text-white/70'} mb-1`}
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div className="text-cyan animate-pulse">_</div>
                </div>
            </motion.div>
        </Draggable>
    );
}
