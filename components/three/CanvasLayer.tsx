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
    const prevScrollYRef = useRef(0);

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

        // Calculate velocity for FOV Warp
        prevScrollYRef.current = THREE.MathUtils.lerp(prevScrollYRef.current, scrollY, 8 * delta);
        const velocity = Math.abs(scrollY - prevScrollYRef.current);
        const warpFactor = Math.min(velocity / 30, 1.0); // 0 to 1 based on velocity intensity

        // Cinematic Section-Aware Camera Keyframes
        let targetZ = 35;
        let baseRotX = 0;
        let baseRotY = 0;
        let baseRotZ = 0;

        if (progress < 0.2) {
            // 0-20%: Hero -> About (Galaxy fly-in)
            const p = progress / 0.2;
            targetZ = THREE.MathUtils.lerp(35, -20, p);
            baseRotX = THREE.MathUtils.lerp(0.0, 0.1, p);
            baseRotY = THREE.MathUtils.lerp(0.0, 0.05, p);
            baseRotZ = THREE.MathUtils.lerp(0.0, 0.02, p);
        } else if (progress < 0.5) {
            // 20-50%: About -> Skills (Nebula pass-through)
            const p = (progress - 0.2) / 0.3;
            targetZ = THREE.MathUtils.lerp(-20, -150, p);
            baseRotX = THREE.MathUtils.lerp(0.1, 0.2, p);
            baseRotY = THREE.MathUtils.lerp(0.05, -0.1, p);
            baseRotZ = THREE.MathUtils.lerp(0.02, -0.05, p);
        } else if (progress < 0.75) {
            // 50-75%: Skills -> Projects (Dust storm / deep dive)
            const p = (progress - 0.5) / 0.25;
            targetZ = THREE.MathUtils.lerp(-150, -320, p);
            baseRotX = THREE.MathUtils.lerp(0.2, 0.35, p);
            baseRotY = THREE.MathUtils.lerp(-0.1, 0.15, p);
            baseRotZ = THREE.MathUtils.lerp(-0.05, 0.05, p);
        } else {
            // 75-100%: Projects -> Contact (Black hole approach)
            const p = (progress - 0.75) / 0.25;
            targetZ = THREE.MathUtils.lerp(-320, -450, p);
            baseRotX = THREE.MathUtils.lerp(0.35, 0.5, p);
            baseRotY = THREE.MathUtils.lerp(0.15, 0.0, p);
            baseRotZ = THREE.MathUtils.lerp(0.05, 0.0, p);
        }

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
            baseRotY + parallaxRotY,
            lerpFactor
        );
        state.camera.rotation.z = THREE.MathUtils.lerp(
            state.camera.rotation.z,
            baseRotZ,
            lerpFactor * 2
        );

        // FOV Warp effect for velocity
        const targetFov = 55 + (warpFactor * 20); // stretch up to +20 FOV
        const camera = state.camera as THREE.PerspectiveCamera;
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 5);
        camera.updateProjectionMatrix();
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
