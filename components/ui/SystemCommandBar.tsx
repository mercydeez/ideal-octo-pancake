"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Layers, AppWindow, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { icon: Terminal, label: "INIT", href: "#hero" },
    { icon: Layers, label: "DATA", href: "#projects" },
    { icon: Cpu, label: "CORE", href: "#skills" },
    { icon: AppWindow, label: "LOGS", href: "#experience" },
    { icon: Mail, label: "LINK", href: "#contact" },
];

export default function SystemCommandBar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-8 border-white/10"
            >
                {NAV_ITEMS.map((item, index) => (
                    <Link key={index} href={item.href} className="group relative">
                        <div className="flex flex-col items-center gap-1 transition-all group-hover:-translate-y-1">
                            <item.icon className="w-5 h-5 text-white/50 group-hover:text-cyan transition-colors" />
                            <span className="text-[10px] font-mono text-white/30 group-hover:text-cyan transition-colors">
                                {item.label}
                            </span>
                        </div>
                        {/* Active Indicator */}
                        <motion.div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#00f5ff]"
                        />
                    </Link>
                ))}

                <div className="w-px h-8 bg-white/10 mx-2" />

                <div className="flex items-center gap-4">
                    <a href="https://github.com/mercydeez" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/atharva-soundankar/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
