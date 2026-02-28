"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [metadata, setMetadata] = useState({
        fps: 0,
        scroll: 0,
        memory: "N/A",
        status: "OPTIMAL",
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "t") {
                setIsOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        let lastTime = performance.now();
        let frames = 0;

        const update = () => {
            frames++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setMetadata((prev) => ({
                    ...prev,
                    fps: frames,
                    scroll: Math.round(window.scrollY),
                    // @ts-ignore
                    memory: window.performance?.memory ? `${Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024)}MB` : "N/A",
                }));
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(update);
        };

        const id = requestAnimationFrame(update);
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-24 right-8 w-80 z-[200] font-mono pointer-events-auto hidden md:block"
                >
                    <div className="glass-2 bg-void/80 border border-cyan/30 overflow-hidden rounded-lg shadow-[0_0_30px_rgba(0,245,255,0.2)] select-none">
                        <div className="bg-cyan/10 px-4 py-2 border-b border-cyan/20 flex justify-between items-center text-[10px] text-cyan uppercase tracking-widest">
                            <span>System Monitor v3.0.1</span>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>Active</span>
                            </div>
                        </div>

                        <div className="p-4 space-y-3 text-[11px]">
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 uppercase">Performance_FPS</span>
                                <span className="text-cyan">{metadata.fps}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 uppercase">Vertical_Scroll</span>
                                <span className="text-pink">{metadata.scroll}px</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 uppercase">Heap_Usage</span>
                                <span className="text-cyan">{metadata.memory}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 uppercase">Link_Status</span>
                                <span className="text-green-500">{metadata.status}</span>
                            </div>

                            <div className="pt-2 border-t border-white/10">
                                <p className="text-[9px] text-white/30 leading-tight">
                                    [LOG] NEURAL_LINK_ESTABLISHED <br />
                                    [LOG] SCANNING_BIOMETRICS... <br />
                                    [LOG] DATA_STREAMS_HEALTHY
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
