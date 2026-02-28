"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cursorVariant = useStore((state) => state.cursorVariant);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
            height: 12,
            width: 12,
            backgroundColor: "rgba(0, 240, 255, 1)",
            border: "0px solid rgba(0, 240, 255, 0)",
            transition: {
                type: "spring",
                mass: 0.1,
                stiffness: 800,
                damping: 30,
            }
        },
        target: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "rgba(255, 107, 53, 0.1)",
            border: "1px dashed rgba(255, 107, 53, 1)",
            borderRadius: "0%", // become a square crosshair reticle
            transition: {
                type: "spring",
                mass: 0.1,
                stiffness: 800,
                damping: 30,
            }
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-screen"
                variants={variants}
                animate={cursorVariant}
            />

            {/* Target Reticle Crosshairs appearing only in target mode */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
                style={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    width: 48,
                    height: 48
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: cursorVariant === "target" ? 1 : 0 }}
            >
                <div className="absolute w-full h-[1px] bg-amber/50" />
                <div className="absolute h-full w-[1px] bg-amber/50" />
            </motion.div>
        </>
    );
}
