"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GalaxyBackground from "@/components/three/GalaxyBackground";
import Starfield from "@/components/three/Starfield";
import Nebula from "@/components/three/Nebula";
import BlackHole from "@/components/three/BlackHole";
import * as THREE from "three";
import { useEffect, useState } from "react";

// ─── Scroll & Mouse Driven Camera Controller ───────────────────────────────
function UniverseCamera() {
    const { pointer } = useThree(); // Gets normalized device coordinates (-1 to +1)

    useFrame((state, delta) => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
        );
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // Z-Depth Journey
        let targetZ = 35;
        if (progress < 0.2) {
            targetZ = THREE.MathUtils.lerp(35, -20, progress / 0.2);
        } else if (progress < 0.5) {
            targetZ = THREE.MathUtils.lerp(-20, -120, (progress - 0.2) / 0.3);
        } else if (progress < 0.75) {
            targetZ = THREE.MathUtils.lerp(-120, -320, (progress - 0.5) / 0.25);
        } else {
            targetZ = THREE.MathUtils.lerp(-320, -450, (progress - 0.75) / 0.25);
        }

        // Base Rotation (Tilt down as we dive)
        const baseRotX = THREE.MathUtils.lerp(0.0, 0.25, progress);

        // Organic Time Drift
        const time = state.clock.getElapsedTime();
        const driftX = Math.sin(time * 0.2) * 2;
        const driftY = Math.cos(time * 0.3) * 1 + 8; // Base height of 8

        // Mouse Parallax Offsets
        // Pointer is -1 to 1. We multiply by a factor to get world space travel.
        // It's inverted so the camera moves *away* from the mouse, creating 3D depth
        const parallaxX = pointer.x * -3;
        const parallaxY = pointer.y * -3;

        // Also twist the camera array slightly based on mouse X for a banking effect
        const parallaxRotY = pointer.x * -0.05;

        // Apply with smooth lerping (using delta for framerate independence)
        const lerpFactor = 2.5 * delta;
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, lerpFactor * 2);
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, driftX + parallaxX, lerpFactor);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, driftY + parallaxY, lerpFactor);

        state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, baseRotX, lerpFactor * 2);
        state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, parallaxRotY, lerpFactor);
    });
    return null;
}

// ─── Main Scene ────────────────────────────────────────────────────────────
export default function CanvasLayer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Simple client-side check for low-end/mobile devices
        const checkMobile = () => setIsMobile(window.innerWidth < 768 || navigator.hardwareConcurrency <= 4);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // If mobile, we slash the particle counts and disable heavy shaders
    const starCount = isMobile ? 4000 : 15000;
    const showHeavyShaders = !isMobile;

    return (
        <Canvas
            camera={{ position: [0, 8, 35], fov: 55 }}
            dpr={[1, 1.5]} // Cap DPR to 1.5 to save fill rate
            gl={{ antialias: false, powerPreference: "high-performance" }}
        >
            <color attach="background" args={["#030303"]} />

            {/* Scroll & Mouse observer */}
            <UniverseCamera />

            <ambientLight intensity={0.1} />

            {/* Zone 1: The Warp Tunnel */}
            <Starfield count={starCount} depth={500} />

            {/* Zone 2: The Galaxy (Z=0) */}
            <GalaxyBackground isMobile={isMobile} />

            {/* Zone 3 & 4: Heavy Volumetrics (Disabled on Mobile) */}
            {showHeavyShaders && (
                <>
                    <Nebula position={[0, 0, -150]} />
                    <BlackHole position={[0, -5, -350]} />

                    {/* Post Processing only needed when glowing heavy elements exist */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.15}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                            intensity={0.8}
                        />
                        <Vignette offset={0.3} darkness={0.98} />
                    </EffectComposer>
                </>
            )}
        </Canvas>
    );
}
