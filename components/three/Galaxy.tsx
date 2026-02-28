"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export default function Galaxy() {
    const pointsRef = useRef<THREE.Points>(null!);
    const { scrollYProgress } = useScroll();
    const count = 800; // FIX 2: Reduced for performance

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const color1 = new THREE.Color("#00f5ff");
        const color2 = new THREE.Color("#ff007a");

        for (let i = 0; i < count; i++) {
            const radius = Math.random() * 20 + 5;
            const spin = radius * 0.8;
            const angle = Math.random() * Math.PI * 2;

            pos[i * 3] = Math.cos(angle + spin) * radius + (Math.random() - 0.5) * 2;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = Math.sin(angle + spin) * radius + (Math.random() - 0.5) * 2;

            const mixedColor = color1.clone().lerp(color2, Math.random());
            col[i * 3] = mixedColor.r;
            col[i * 3 + 1] = mixedColor.g;
            col[i * 3 + 2] = mixedColor.b;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            const t = state.clock.getElapsedTime();
            const scroll = scrollYProgress.get();

            // Strict scroll-linked rotation with time-based drift
            pointsRef.current.rotation.y = t * 0.02 + scroll * Math.PI;
            pointsRef.current.rotation.z = scroll * 0.5;

            // Dynamic scaling based on scroll
            pointsRef.current.scale.setScalar(1 + scroll * 1.5);

            // Opacity shift for depth
            (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.1 + scroll * 0.4;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.2}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
