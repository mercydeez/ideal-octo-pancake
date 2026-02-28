"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GalaxyBackground from "@/components/three/GalaxyBackground";

export default function CanvasLayer() {
    return (
        <Canvas
            camera={{ position: [0, 8, 22], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
        >
            <color attach="background" args={["#030303"]} />

            {/* Minimal ambient light — galaxy is self-lit via additive blending */}
            <ambientLight intensity={0.1} />

            {/* GPU Galaxy Spiral */}
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
