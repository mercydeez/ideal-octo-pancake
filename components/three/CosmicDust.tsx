"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 500;
const RADIUS = 60;

export default function CosmicDust() {
    const pointsRef = useRef<THREE.Points>(null!);

    const { positions, driftVectors, sizes, colors } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3);
        const driftVectors = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);
        const colors = new Float32Array(COUNT * 3);

        const white = new THREE.Color("#FFFFFF");
        const lavender = new THREE.Color("#C4A5E8");

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;

            // Random position in sphere radius 60
            const pos = new THREE.Vector3().setFromSphericalCoords(
                Math.random() * RADIUS,
                Math.random() * Math.PI,
                Math.random() * 2 * Math.PI
            );
            positions[i3] = pos.x;
            positions[i3 + 1] = pos.y;
            positions[i3 + 2] = pos.z;

            // Consistent drift vector
            const drift = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ).normalize().multiplyScalar(0.005);
            driftVectors[i3] = drift.x;
            driftVectors[i3 + 1] = drift.y;
            driftVectors[i3 + 2] = drift.z;

            sizes[i] = 0.3 + Math.random() * 0.9;

            const mixColor = white.clone().lerp(lavender, Math.random());
            colors[i3] = mixColor.r;
            colors[i3 + 1] = mixColor.g;
            colors[i3 + 2] = mixColor.b;
        }

        return { positions, driftVectors, sizes, colors };
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;

        const posAttr = pointsRef.current.geometry.attributes.position;
        const array = posAttr.array as Float32Array;

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;

            // Update position
            array[i3] += driftVectors[i3];
            array[i3 + 1] += driftVectors[i3 + 1];
            array[i3 + 2] += driftVectors[i3 + 2];

            // Wrap around radius 60
            const dist = Math.sqrt(
                array[i3] ** 2 + array[i3 + 1] ** 2 + array[i3 + 2] ** 2
            );

            if (dist > RADIUS) {
                // Re-spawn on exactly opposite side
                array[i3] *= -0.98;
                array[i3 + 1] *= -0.98;
                array[i3 + 2] *= -0.98;
            }
        }

        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={COUNT}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={COUNT}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={COUNT}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                transparent
                opacity={0.12}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                size={0.6} // Fallback size
                sizeAttenuation
            />
        </points>
    );
}
