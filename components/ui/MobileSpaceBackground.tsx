"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MobileSpaceBackground() {
    const { scrollY } = useScroll();

    // Parallax transforms
    const starsY = useTransform(scrollY, [0, 5000], [0, -1000]);
    const nebulaY = useTransform(scrollY, [0, 5000], [0, -2000]);

    // Randomized stars
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            left: `${(Math.sin(i * 123.45) * 0.5 + 0.5) * 100}%`,
            top: `${(Math.cos(i * 678.9) * 0.5 + 0.5) * 100}%`,
            size: Math.floor((Math.sin(i * 456.78) * 0.5 + 0.5) * 3) + 1,
            duration: (Math.sin(i * 987.65) * 0.5 + 0.5) * 2 + 2,
            color: i % 10 === 0 ? "#C4A5E8" : "#FFFFFF",
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-[#030303] overflow-hidden pointer-events-none">
            {/* ── LAYER 1: Nebula Blobs (0.4x Speed) ────────────────────────────── */}
            <motion.div style={{ y: nebulaY }} className="absolute inset-0 z-0">
                <div
                    className="absolute rounded-full blur-[80px] opacity-[0.12] animate-[nebula-drift_25s_infinite_alternate]"
                    style={{
                        width: "500px", height: "500px",
                        left: "20%", top: "30%",
                        background: "radial-gradient(circle, rgba(123,47,190,0.8), transparent 70%)"
                    }}
                />
                <div
                    className="absolute rounded-full blur-[80px] opacity-[0.08] animate-[nebula-drift_30s_infinite_alternate_reverse]"
                    style={{
                        width: "600px", height: "600px",
                        left: "80%", top: "60%",
                        background: "radial-gradient(circle, rgba(0,240,255,0.8), transparent 70%)"
                    }}
                />
                <div
                    className="absolute rounded-full blur-[80px] opacity-[0.06] animate-[nebula-drift_20s_infinite_alternate]"
                    style={{
                        width: "450px", height: "450px",
                        left: "50%", top: "80%",
                        background: "radial-gradient(circle, rgba(255,107,53,0.8), transparent 70%)"
                    }}
                />
            </motion.div>

            {/* ── LAYER 2: Starfield (0.2x Speed) ─────────────────────────────── */}
            <motion.div style={{ y: starsY }} className="absolute inset-0 z-10">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            backgroundColor: star.color,
                            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                            animation: `twinkle ${star.duration}s infinite ease-in-out`,
                        }}
                    />
                ))}
            </motion.div>

            {/* ── LAYER 3: Shooting Star ────────────────────────────────────────── */}
            <div className="absolute inset-0 z-20 overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-[60px] h-[1px] bg-gradient-to-l from-white to-transparent opacity-0 animate-[shoot_8s_infinite]"
                    style={{
                        transform: "rotate(-45deg)",
                    }}
                />
            </div>
        </div>
    );
}
