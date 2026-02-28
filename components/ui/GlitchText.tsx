"use client";

import { motion } from "framer-motion";

export default function GlitchText({ text }: { text: string }) {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <motion.span
                animate={{
                    x: [-2, 2, -1, 1, 0],
                    opacity: [0, 1, 0.5, 1, 0]
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
                className="absolute top-0 left-0 -z-10 text-cyan opacity-50 select-none group-hover:block"
            >
                {text}
            </motion.span>
            <motion.span
                animate={{
                    x: [2, -2, 1, -1, 0],
                    opacity: [0, 1, 0.5, 1, 0]
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    delay: 0.1,
                    repeatType: "mirror"
                }}
                className="absolute top-0 left-0 -z-20 text-pink opacity-50 select-none group-hover:block"
            >
                {text}
            </motion.span>
        </div>
    );
}
