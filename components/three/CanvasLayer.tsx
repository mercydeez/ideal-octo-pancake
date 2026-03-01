"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import GalaxyBackground from "@/components/three/GalaxyBackground";
import Starfield from "@/components/three/Starfield";
import Nebula from "@/components/three/Nebula";
import BlackHole from "@/components/three/BlackHole";
import ShootingStars from "@/components/three/ShootingStars";
import CosmicDust from "@/components/three/CosmicDust";
import MobileSpaceBackground from "@/components/ui/MobileSpaceBackground";
import * as THREE from "three";
import { useEffect, useState, useRef } from "react";

// ─── Scroll & Mouse Driven Camera Controller ───────────────────────────────
function UniverseCamera() {
    const { pointer } = useThree();
    const scrollYRef = useRef(0);

    useEffect(() => {
        const handler = () => {
            scrollYRef.current = window.scrollY;
        };
        window.addEventListener("scroll", handler, { passive: true });
        handler(); // Initialize
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useFrame((state, delta) => {
        const scrollY = scrollYRef.current;
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
        const parallaxX = pointer.x * -3;
        const parallaxY = pointer.y * -3;

        // Banking effect
        const parallaxRotY = pointer.x * -0.05;

        // Apply with smooth lerping
        const lerpFactor = 2.5 * delta;
        state.camera.position.z = THREE.MathUtils.lerp(
            state.camera.position.z,
            targetZ,
            lerpFactor * 2
        );
        state.camera.position.x = THREE.MathUtils.lerp(
            state.camera.position.x,
            driftX + parallaxX,
            lerpFactor
        );
        state.camera.position.y = THREE.MathUtils.lerp(
            state.camera.position.y,
            driftY + parallaxY,
            lerpFactor
        );

        state.camera.rotation.x = THREE.MathUtils.lerp(
            state.camera.rotation.x,
            baseRotX,
            lerpFactor * 2
        );
        state.camera.rotation.y = THREE.MathUtils.lerp(
            state.camera.rotation.y,
            parallaxRotY,
            lerpFactor
        );
    });
    return null;
}

// ─── Main Scene ────────────────────────────────────────────────────────────
export default function CanvasLayer() {
    const [isMobile, setIsMobile] = useState<null | boolean>(null);

    useEffect(() => {
        const checkMobile = () =>
            setIsMobile(
                window.innerWidth < 768 || navigator.hardwareConcurrency <= 4
            );
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Avoid flash of desktop on mobile by waiting for hydration/check
    if (isMobile === null) return <div className="fixed inset-0 bg-[#030303]" />;

    // Zone: Swap Logic
    if (isMobile) {
        return <MobileSpaceBackground />;
    }

    return (
        <Canvas
            camera={{ position: [0, 8, 35], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
        >
            <color attach="background" args={["#030303"]} />

            <UniverseCamera />

            <ambientLight intensity={0.1} />

            <Starfield count={15000} depth={500} />

            <GalaxyBackground isMobile={false} />

            <>
                <ShootingStars />
                <CosmicDust />
                <Nebula position={[0, 0, -150]} />
                <BlackHole position={[0, -5, -350]} />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                        intensity={0.6}
                    />
                    <Vignette offset={0.3} darkness={0.98} />
                </EffectComposer>
            </>
        </Canvas>
    );
}
