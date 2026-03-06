"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDUCATION, EXPERIENCE } from "@/lib/constants";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";
import { GraduationCap, Briefcase } from "lucide-react";

const Journey = React.memo(function Journey() {
    const sectionRef = useScrollReveal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Interleave education and experience by rough chronological order (newest first)
    const timeline = [
        ...EDUCATION.map((e) => ({ ...e, type: "education" as const })),
        ...EXPERIENCE.map((e) => ({ ...e, type: "experience" as const })),
    ].sort((a, b) => {
        // Extract start year from duration string for rough sorting
        const yearA = parseInt(a.duration.match(/\d{4}/)?.[0] || "0");
        const yearB = parseInt(b.duration.match(/\d{4}/)?.[0] || "0");
        return yearB - yearA; // newest first
    });

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 border-l-4 border-amber-500 pl-8"
            >
                <p className="text-amber-400 font-mono text-[10px] md:text-sm tracking-widest mb-2 uppercase">
                    [ CHRONOLOGICAL_RECORDS ]
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                    <ScrambleText text="THE " />
                    <span className="text-amber-400 text-glow-amber">
                        <ScrambleText text="JOURNEY" />
                    </span>
                </h2>
            </motion.div>

            <div
                ref={containerRef}
                className="relative ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-10"
            >
                {/* Animated Origin Line */}
                <motion.div
                    className="absolute left-0 top-0 w-px bg-amber-500/50 origin-top"
                    style={{ height: "100%", scaleY: pathLength }}
                />
                <div className="absolute left-0 top-0 w-px h-full bg-amber-500/10" />

                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="relative"
                    >
                        {/* Timeline Dot */}
                        <div
                            className="absolute -left-[45px] md:-left-[81px] top-0 w-16 h-16 rounded-full border-2 border-void z-10 flex items-center justify-center text-xs font-bold overflow-hidden"
                            style={{
                                backgroundColor: item.color,
                                color: "#030303",
                                boxShadow: `0 0 15px ${item.color}80`,
                            }}
                        >
                            {item.type === "education" && (item as any).logo ? (
                                <img
                                    src={(item as any).logo}
                                    alt={(item as any).school || (item as any).company}
                                    className="w-full h-full object-cover"
                                />
                            ) : item.type === "experience" && (item as any).logo ? (
                                <img
                                    src={(item as any).logo}
                                    alt={(item as any).company}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                (item as any).monogram
                            )}
                        </div>

                        <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/15 transition-colors">
                            {/* Type Badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-[0.15em] font-bold"
                                    style={{
                                        background: item.type === "education" ? "rgba(0,240,255,0.1)" : "rgba(255,107,53,0.1)",
                                        border: `1px solid ${item.type === "education" ? "rgba(0,240,255,0.3)" : "rgba(255,107,53,0.3)"}`,
                                        color: item.type === "education" ? "#00F0FF" : "#FF6B35",
                                    }}
                                >
                                    {item.type === "education" ? (
                                        <GraduationCap size={10} />
                                    ) : (
                                        <Briefcase size={10} />
                                    )}
                                    {item.type === "education" ? "EDUCATION" : "EXPERIENCE"}
                                </div>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                    {item.duration}
                                </span>
                            </div>

                            {/* Glow accent */}
                            <div
                                className="absolute top-0 right-0 w-24 h-full opacity-5 pointer-events-none transition-opacity group-hover:opacity-20"
                                style={{
                                    background: `linear-gradient(to left, ${item.color}, transparent)`,
                                }}
                            />

                            {item.type === "education" ? (
                                <>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                                        {(item as any).school}
                                    </h3>
                                    <p className="text-white/50 font-mono text-xs mb-3">
                                        {(item as any).degree}
                                    </p>
                                    <span
                                        className="text-[10px] font-mono px-3 py-1 rounded-full font-bold inline-block"
                                        style={{
                                            background: `${item.color}20`,
                                            color: item.color,
                                            border: `1px solid ${item.color}40`,
                                        }}
                                    >
                                        {(item as any).grade}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                        {(item as any).role}
                                    </h3>
                                    <p className="font-mono text-sm mb-3" style={{ color: item.color }}>
                                        {(item as any).company}
                                    </p>
                                    <p className="text-white/50 text-sm font-mono leading-relaxed max-w-2xl">
                                        {(item as any).description}
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
});

export default Journey;
