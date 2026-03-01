"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Starfield({ count = 10000, depth = 1200 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const baseColor = new THREE.Color("#ffffff");
        const cyanColor = new THREE.Color("#00F0FF");
        const amberColor = new THREE.Color("#FFB347");
        const purpleColor = new THREE.Color("#8A2BE2"); // Cosmic Purple

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread stars evenly across the entire volume, avoiding the "hole" center
            positions[i3] = (Math.random() - 0.5) * 200; // X spread
            positions[i3 + 1] = (Math.random() - 0.5) * 150; // Y spread
            // Distribute stars deeply down to -depth
            positions[i3 + 2] = 50 - Math.random() * depth;

            // Colors - 75% White, 10% Cyan, 5% Amber, 10% Violet
            const rand = Math.random();
            let color = baseColor;

            // Singularity Purple Integration: 5% stars (every 20th) are soft lavender
            if (i % 20 === 0) {
                color = new THREE.Color('#C4A5E8');
            } else if (rand > 0.90) {
                color = purpleColor;
            } else if (rand > 0.80) {
                color = cyanColor;
            } else if (rand > 0.75) {
                color = amberColor;
            }

            // Darken stars further away from center
            const mix = new THREE.Color(color).lerp(new THREE.Color("#000000"), Math.random() * 0.5);

            colors[i3] = mix.r;
            colors[i3 + 1] = mix.g;
            colors[i3 + 2] = mix.b;

            sizes[i] = Math.random() * 1.5;
        }

        return { positions, colors, sizes };
    }, [count, depth]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, [positions, colors, sizes]);

    // Generate a round circle texture so stars aren't rendered as squares
    const circleTexture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        const tex = new THREE.CanvasTexture(canvas);
        return tex;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Slow continuous rotation of the starfield tube
            pointsRef.current.rotation.z += delta * 0.01;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry attach="geometry" {...geometry} />
            <pointsMaterial
                attach="material"
                vertexColors
                size={0.2}
                sizeAttenuation
                transparent
                opacity={0.9}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                map={circleTexture}
                alphaTest={0.01}
            />
        </points>
    );
}
