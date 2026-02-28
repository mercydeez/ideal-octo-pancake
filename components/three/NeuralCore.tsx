"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function NeuralCore() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<any>(null!);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress from 0 to 1
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            targetScroll.current = windowHeight > 0 ? totalScroll / windowHeight : 0;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame((state, delta) => {
        // Smooth interpolation for scroll (Lerp)
        currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 4);

        if (meshRef.current) {
            // Rotate autonomously, but faster as user scrolls
            meshRef.current.rotation.y += delta * (0.2 + currentScroll.current * 2);
            meshRef.current.rotation.x += delta * 0.1;

            // Move Core down and scale up as user scrolls
            meshRef.current.position.y = -currentScroll.current * 5;
            const scale = 1 + currentScroll.current * 1.5;
            meshRef.current.scale.set(scale, scale, scale);
        }

        if (materialRef.current) {
            // Increase distortion based on scroll (Evolving geometry effect)
            materialRef.current.distort = 0.3 + currentScroll.current * 0.6;
            materialRef.current.speed = 1.5 + currentScroll.current * 4;
        }
    });

    return (
        <Icosahedron args={[1.5, 64]} ref={meshRef}>
            <MeshDistortMaterial
                ref={materialRef}
                color="#030303"
                emissive="#00F0FF"
                emissiveIntensity={0.5}
                wireframe={true}
                transparent
                opacity={0.8}
            />
        </Icosahedron>
    );
}
