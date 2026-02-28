"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Starfield({ count = 10000, depth = 300 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const baseColor = new THREE.Color("#ffffff");
        const cyanColor = new THREE.Color("#00F0FF");
        const amberColor = new THREE.Color("#FFB347");

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread stars out in a wide cylinder along the Z axis
            const radius = 20 + Math.random() * 80;
            const theta = Math.random() * Math.PI * 2;

            positions[i3] = Math.cos(theta) * radius;
            positions[i3 + 1] = Math.sin(theta) * radius;
            positions[i3 + 2] = (Math.random() - 0.5) * depth;

            // Colors
            const rand = Math.random();
            let color = baseColor;
            if (rand > 0.8) color = cyanColor;
            if (rand > 0.95) color = amberColor;

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
                size={0.15}
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
