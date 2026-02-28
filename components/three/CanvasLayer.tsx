"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GalaxyBackground from "@/components/three/GalaxyBackground";
import Starfield from "@/components/three/Starfield";
import Nebula from "@/components/three/Nebula";
import BlackHole from "@/components/three/BlackHole";
import * as THREE from "three";

// ─── Scroll-Driven Camera Controller ───────────────────────────────────────
function UniverseCamera() {
    useFrame((state) => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
        );
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // Define the journey path through Z-space:
        // Hero (0)     : Z = 35 (Looking at Galaxy)
        // About (0.2)  : Z = 0  (Inside Galaxy core)
        // Skills (0.5) : Z = -120 (Approaching Nebula)
        // Proj (0.75)  : Z = -320 (Approaching Black Hole)
        // Footer (1.0) : Z = -450 (Deep space beyond)

        let targetZ = 35;
        if (progress < 0.2) {
            // 0 -> 0.2: Fly to Galaxy
            const p = progress / 0.2;
            targetZ = THREE.MathUtils.lerp(35, -20, p);
        } else if (progress < 0.5) {
            // 0.2 -> 0.5: Galaxy to Nebula
            const p = (progress - 0.2) / 0.3;
            targetZ = THREE.MathUtils.lerp(-20, -120, p);
        } else if (progress < 0.75) {
            // 0.5 -> 0.75: Nebula to Black Hole
            const p = (progress - 0.5) / 0.25;
            targetZ = THREE.MathUtils.lerp(-120, -320, p);
        } else {
            // 0.75 -> 1.0: Black Hole to Deep Space Footer
            const p = (progress - 0.75) / 0.25;
            targetZ = THREE.MathUtils.lerp(-320, -450, p);
        }

        // Tilt down slightly as we dive deeper
        const targetRotX = THREE.MathUtils.lerp(0.0, 0.25, progress);

        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
        state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.05);

        // Organic drift
        const time = state.clock.getElapsedTime();
        state.camera.position.x = Math.sin(time * 0.2) * 2;
        state.camera.position.y = Math.cos(time * 0.3) * 1 + 8;
    });
    return null;
}

// ─── Main Scene ────────────────────────────────────────────────────────────
export default function CanvasLayer() {
    return (
        <Canvas
            camera={{ position: [0, 8, 35], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
        >
            <color attach="background" args={["#030303"]} />

            {/* Scroll-driven observer */}
            <UniverseCamera />

            <ambientLight intensity={0.1} />

            {/* Zone 1: The Warp Tunnel (Deep Space) */}
            <Starfield count={15000} depth={500} />

            {/* Zone 2: The Galaxy (Z=0) */}
            <GalaxyBackground />

            {/* Zone 3: The Nebula (Z=-150) */}
            <Nebula position={[0, 0, -150]} />

            {/* Zone 4: The Black Hole (Z=-350) */}
            <BlackHole position={[0, -5, -350]} />

            {/* Post Processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                    intensity={0.8}
                />
                <Vignette
                    offset={0.3}
                    darkness={0.98}
                />
            </EffectComposer>
        </Canvas>
    );
}
