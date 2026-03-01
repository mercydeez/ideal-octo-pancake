"use client";
import React from "react";
import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";

const Education = React.memo(function Education() {
    const sectionRef = useScrollReveal();

    return (
        <section ref={sectionRef} id="education" className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 border-l-4 border-cyan pl-8"
            >
                <p className="text-singularity-400 font-mono text-sm tracking-widest mb-2 uppercase">[ ACADEMIC_RECORDS ]</p>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                    <ScrambleText text="EDUCATION " /><span className="text-singularity-400 text-glow-white"><ScrambleText text="MATRIX" /></span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION.map((edu, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="tactical-panel rounded-2xl p-6 border border-white/10 hover:border-cyan/40 transition-colors relative overflow-hidden group"
                    >
                        {/* Glow accent */}
                        <div
                            className="absolute top-0 right-0 w-20 h-full opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity"
                            style={{ background: `linear-gradient(to left, ${edu.color}, transparent)` }}
                        />

                        <div className="flex items-center gap-4 mb-4 relative z-10">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg flex-shrink-0 overflow-hidden"
                                style={{ background: `${edu.color}20`, border: `2px solid ${edu.color}60` }}
                            >
                                {edu.logo ? (
                                    <img src={edu.logo} alt={edu.school} className="w-full h-full object-cover" />
                                ) : (
                                    <span style={{ color: edu.color }}>{edu.monogram}</span>
                                )}
                            </div>
                            <div>
                                <p className="text-white font-bold text-base leading-tight">{edu.school}</p>
                                <p className="text-white/50 font-mono text-xs mt-0.5">{edu.degree}</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                            <p className="text-white/30 font-mono text-[11px]">{edu.duration}</p>
                            <span
                                className="text-[10px] font-mono px-3 py-1 rounded-full font-bold"
                                style={{ background: `${edu.color}20`, color: edu.color, border: `1px solid ${edu.color}40` }}
                            >
                                {edu.grade}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
});

export default Education;
