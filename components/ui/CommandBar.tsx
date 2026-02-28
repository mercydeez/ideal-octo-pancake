"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Code, Mail } from "lucide-react";
import { useRef } from "react";
import { PERSONAL, SOCIALS } from "@/lib/constants";
import { useStore } from "@/lib/store";

function getSocialUrl(name: string) {
    return SOCIALS.find(s => s.name.toLowerCase() === name.toLowerCase())?.url || "#";
}

function DockIcon({ children, mouseX, href }: { children: React.ReactNode, mouseX: any, href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    // Calculate distance from cursor
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Scale based on distance (magnetic effect)
    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width }}
            className="aspect-square flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-cyan/20 hover:border-cyan/50 text-white/50 hover:text-cyan transition-colors z-10"
            onMouseEnter={() => setCursorVariant("target")}
            onMouseLeave={() => setCursorVariant("default")}
        >
            {children}
        </motion.a>
    );
}

export default function CommandBar() {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
            <div
                className="tactical-panel px-4 py-3 rounded-3xl flex items-center gap-4 shadow-2xl"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                <DockIcon href={getSocialUrl('github')} mouseX={mouseX}><Github size={20} /></DockIcon>
                <DockIcon href={getSocialUrl('linkedin')} mouseX={mouseX}><Linkedin size={20} /></DockIcon>
                <DockIcon href={getSocialUrl('kaggle')} mouseX={mouseX}><Code size={20} /></DockIcon>
                <DockIcon href={getSocialUrl('instagram')} mouseX={mouseX}><Instagram size={20} /></DockIcon>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <DockIcon href={`mailto:${PERSONAL.email}`} mouseX={mouseX}><Mail size={20} /></DockIcon>
            </div>
        </motion.div>
    );
}
