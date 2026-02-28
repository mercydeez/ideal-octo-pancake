"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import NeuralNetwork from "@/components/three/NeuralNetwork";

export default function CanvasLayer() {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]} gl={{ antialias: false }}>
            <color attach="background" args={["#030303"]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F0FF" />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FF6B35" />

            {/* 3D Neural Network */}
            <NeuralNetwork />

            {/* High-End Post Processing Stack */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.2}
                    mipmapBlur
                    intensity={1.5}
                />
                <Vignette
                    offset={0.5}
                    darkness={0.9} // Deep vignette for pure black edges
                />
            </EffectComposer>
        </Canvas>
    );
}
