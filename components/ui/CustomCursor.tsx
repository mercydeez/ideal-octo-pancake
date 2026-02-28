"use client";

import { useEffect, useState } from "react";
import { useCursorStore } from "@/lib/store";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { cursorVariant } = useCursorStore();

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    const isDefault = cursorVariant === "default";

    return (
        <div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
            style={{
                transform: `translate(${mousePosition.x - (isDefault ? 6 : 20)}px, ${mousePosition.y - (isDefault ? 6 : 20)}px)`,
            }}
        >
            <div
                style={{
                    width: isDefault ? '12px' : '40px',
                    height: isDefault ? '12px' : '40px',
                    backgroundColor: isDefault ? '#00F0FF' : 'transparent',
                    border: isDefault ? 'none' : '2px dashed #FF6B35',
                    borderRadius: '50%',
                    transition: 'all 0.15s ease',
                    animation: isDefault ? 'none' : 'cursor-spin 1s linear infinite',
                    boxShadow: isDefault ? 'none' : '0 0 20px rgba(255,107,53,0.6)',
                }}
            />
        </div>
    );
}

