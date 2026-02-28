"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    color?: "cyan" | "pink";
}

export default function MagneticButton({
    children,
    className = "",
    onClick,
    color = "cyan"
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.4, y: y * 0.4 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const colorClass = color === "cyan"
        ? "border-cyan text-cyan hover:bg-cyan/10 border-glow-cyan"
        : "border-pink text-pink hover:bg-pink/10 border-glow-pink";

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            <button
                onClick={onClick}
                data-cursor="pointer"
                data-cursor-color={color === "cyan" ? "#00f5ff" : "#ff007a"}
                className={`px-8 py-3 bg-transparent border-2 font-display uppercase tracking-widest text-sm transition-all duration-300 glass-panel ${colorClass} ${className}`}
            >
                {children}
            </button>
        </motion.div>
    );
}
