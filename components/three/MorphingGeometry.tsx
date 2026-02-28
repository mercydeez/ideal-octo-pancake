"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MorphingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    const [scale, setScale] = useState(1);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 4;
            meshRef.current.rotation.y = Math.sin(t / 4) / 4;
            meshRef.current.rotation.z = Math.sin(t / 4) / 4;
            meshRef.current.position.y = Math.sin(t / 1.5) / 10;

            // Manual scale interpolation
            const targetScale = hovered ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#00f5ff"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    emissive="#00f5ff"
                    emissiveIntensity={0.5}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </Float>
    );
}
