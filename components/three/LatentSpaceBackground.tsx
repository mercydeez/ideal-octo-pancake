"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { random } from "maath";

function Particles() {
    const pointsRef = useRef<THREE.Points>(null!);

    // Generate 5000 points in a sphere with radius 15
    const sphere = useMemo(() => {
        return random.inSphere(new Float32Array(5000 * 3), { radius: 15 }) as Float32Array;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.x -= delta / 10;
            pointsRef.current.rotation.y -= delta / 15;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={sphere.length / 3}
                    array={sphere}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                transparent
                color="#00F0FF"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function LatentSpaceBackground() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <Particles />
        </Canvas>
    );
}
