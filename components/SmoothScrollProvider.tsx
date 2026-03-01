"use client";

// @ts-ignore - lenis doesn't have official types
import { ReactLenis } from "lenis/react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
