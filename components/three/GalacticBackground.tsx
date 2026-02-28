"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { random } from "maath";

const vertexShader = `
  uniform float uTime;
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec3 updatedPosition = position;
    
    // Deep-space drift effect based on position and time
    updatedPosition.y += sin(uTime * 0.2 + position.x) * 0.1;
    updatedPosition.x += cos(uTime * 0.2 + position.y) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(updatedPosition, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Creating a soft circular particle
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - (distanceToCenter * 2.0);
    strength = pow(strength, 1.5); // Add softness
    
    if (strength < 0.0) discard;
    
    gl_FragColor = vec4(vColor, strength);
  }
`;

export default function GalacticBackground() {
    const pointsRef = useRef<THREE.Points>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    const particleCount = 8000;

    const [positions, sizes, colors] = useMemo(() => {
        // Generate particles in a spherical volume
        const positions = random.inSphere(new Float32Array(particleCount * 3), { radius: 25 }) as Float32Array;
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);

        const colorCyan = new THREE.Color("#00F0FF");
        const colorAmber = new THREE.Color("#FF6B35");

        for (let i = 0; i < particleCount; i++) {
            sizes[i] = Math.random() * 0.8 + 0.2;

            // Mix colors based on position
            const mixedColor = colorCyan.clone().lerp(colorAmber, Math.random() * 0.3);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return [positions, sizes, colors];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
                <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{ uTime: { value: 0 } }}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
