"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAX_STARS = 8;
const TRAIL_POINTS = 20;

export default function ShootingStars() {
    const stars = useMemo(() => {
        return Array.from({ length: MAX_STARS }, (_, i) => {
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ).normalize().multiplyScalar(2.0);

            // Initialize trail positions (all at spawn point initially)
            const positions = new Float32Array(TRAIL_POINTS * 3);
            const spawnPos = new THREE.Vector3().setFromSphericalCoords(
                80,
                Math.random() * Math.PI,
                Math.random() * 2 * Math.PI
            );

            for (let j = 0; j < TRAIL_POINTS; j++) {
                const j3 = j * 3;
                positions[j3] = spawnPos.x;
                positions[j3 + 1] = spawnPos.y;
                positions[j3 + 2] = spawnPos.z;
            }

            // Vertex colors for fade-out trail
            const colors = new Float32Array(TRAIL_POINTS * 3);
            for (let j = 0; j < TRAIL_POINTS; j++) {
                const j3 = j * 3;
                const opacity = 1 - j / TRAIL_POINTS;
                colors[j3] = opacity;
                colors[j3 + 1] = opacity;
                colors[j3 + 2] = opacity;
            }

            return {
                velocity,
                spawnPos,
                currentPos: spawnPos.clone(),
                positions,
                colors,
                traveled: 0,
                startTime: i * 2, // Staggered spawn
            };
        });
    }, []);

    const geometries = useMemo(() => {
        return stars.map((star) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(star.positions, 3));
            geo.setAttribute("color", new THREE.BufferAttribute(star.colors, 3));
            return geo;
        });
    }, [stars]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        stars.forEach((star, i) => {
            if (time < star.startTime) return;

            const geo = geometries[i];
            const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

            // Move current position
            const move = star.velocity.clone().multiplyScalar(delta * 30); // scale delta to feel like speed 2.0
            star.currentPos.add(move);
            star.traveled += move.length();

            // Shift trail points
            for (let j = TRAIL_POINTS - 1; j > 0; j--) {
                const current3 = j * 3;
                const prev3 = (j - 1) * 3;
                star.positions[current3] = star.positions[prev3];
                star.positions[current3 + 1] = star.positions[prev3 + 1];
                star.positions[current3 + 2] = star.positions[prev3 + 2];
            }

            // Update front point
            star.positions[0] = star.currentPos.x;
            star.positions[1] = star.currentPos.y;
            star.positions[2] = star.currentPos.z;

            // Respawn logic
            if (star.traveled > 60) {
                const newSpawn = new THREE.Vector3().setFromSphericalCoords(
                    80,
                    Math.random() * Math.PI,
                    Math.random() * 2 * Math.PI
                );
                star.currentPos.copy(newSpawn);
                star.spawnPos.copy(newSpawn);
                star.traveled = 0;
                star.velocity.set(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize().multiplyScalar(2.0);

                // Reset all trail points to new spawn to avoid long lines stretching across screen
                for (let j = 0; j < TRAIL_POINTS; j++) {
                    const j3 = j * 3;
                    star.positions[j3] = newSpawn.x;
                    star.positions[j3 + 1] = newSpawn.y;
                    star.positions[j3 + 2] = newSpawn.z;
                }
            }

            posAttr.needsUpdate = true;
        });
    });

    return (
        <group>
            {geometries.map((geo, i) => (
                <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.8,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                }))} />
            ))}
        </group>
    );
}
