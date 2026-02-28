"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GalaxyBackground from "@/components/three/GalaxyBackground";
import Starfield from "@/components/three/Starfield";
import * as THREE from "three";

// ─── Scroll-Driven Camera Controller ───────────────────────────────────────
function UniverseCamera() {
    useFrame((state) => {
        // Calculate raw scroll progress (0.0 to 1.0)
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1 // prevent division by zero on short pages
        );
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // Define the journey path through Z-space:
        // Hero (0 progress): Keep back at Z = 35 to see the Starfield
        // Mid-page (0.5): Arrive at the Galaxy (Z = 0)
        // Footer (1.0): Pass right through the center and look back (Z = -60)
        const targetZ = THREE.MathUtils.lerp(35, -60, progress);

        // Also look up slightly as we dive deeper
        const targetRotX = THREE.MathUtils.lerp(0.0, 0.3, progress);

        // Smoothly interpolate current camera position/rotation towards targets
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
        state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.05);

        // Add a subtle drift to X and Y based on time for an organic "floating" feel
        const time = state.clock.getElapsedTime();
        state.camera.position.x = Math.sin(time * 0.2) * 2;
        state.camera.position.y = Math.cos(time * 0.3) * 1 + 8; // base height of +8
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
            <Starfield count={8000} depth={300} />

            {/* Zone 2: The Galaxy (Placed at Z=0) */}
            <GalaxyBackground />

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
