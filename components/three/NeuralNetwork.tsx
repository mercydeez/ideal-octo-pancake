"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

export default function NeuralNetwork() {
  const isHoveringProject = useStore((state) => state.isHoveringProject);
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const particleCount = 200;
  const maxDistance = 4.5;
  const maxDistanceSq = maxDistance * maxDistance; // CPU Optimization

  // Initialize base positions (for breathing effect) and current positions/velocities
  const [basePositions, positions, velocities] = useMemo(() => {
    const basePos = new Float32Array(particleCount * 3);
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [basePos, pos, vel];
  }, []);

  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), []);
  const lineColors = useMemo(() => new Float32Array(particleCount * particleCount * 3), []);

  // Use refs to smoothly transition the time multiplier and color 
  const timeMultiplier = useRef(0.5);
  const targetColor = useRef(new THREE.Color("#00F0FF"));
  const currentColor = useRef(new THREE.Color("#00F0FF"));

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Reactivity Logic - Speed up time and change color when hovering
    timeMultiplier.current = THREE.MathUtils.lerp(
      timeMultiplier.current,
      isHoveringProject ? 2.5 : 0.5,
      delta * 2
    );

    // Color interpolation (Cyan to Amber)
    targetColor.current.set(isHoveringProject ? "#FFB800" : "#00F0FF");
    currentColor.current.lerp(targetColor.current, delta * 3);

    const time = state.clock.getElapsedTime() * timeMultiplier.current;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    // Breathing effect via sine wave
    const breathScale = 1 + Math.sin(time * 0.5) * 0.05;

    if (groupRef.current) {
      // Spin faster when hovering
      groupRef.current.rotation.y += (isHoveringProject ? 0.003 : 0.001);
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.scale.set(breathScale, breathScale, breathScale);
    }

    for (let i = 0; i < particleCount; i++) {
      // Drift - accelerate velocities slightly on hover
      const speedMod = isHoveringProject ? 2.0 : 1.0;
      positions[i * 3] += velocities[i * 3] * speedMod;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speedMod;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * speedMod;

      // Squared distance check from origin
      const distSqFromCenter =
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2;

      // Bounce constraints (5^2 = 25, 25^2 = 625)
      if (distSqFromCenter > 625 || distSqFromCenter < 25) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // Squared distance connections for CPU perf
    for (let i = 0; i < particleCount; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[j * 3] - x1;
        const dy = positions[j * 3 + 1] - y1;
        const dz = positions[j * 3 + 2] - z1;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistanceSq) {
          const alpha = 1.0 - (Math.sqrt(distSq) / maxDistance);

          linePositions[vertexpos++] = x1;
          linePositions[vertexpos++] = y1;
          linePositions[vertexpos++] = z1;

          linePositions[vertexpos++] = positions[j * 3];
          linePositions[vertexpos++] = positions[j * 3 + 1];
          linePositions[vertexpos++] = positions[j * 3 + 2];

          // Dynamic coloring based on hover state
          lineColors[colorpos++] = currentColor.current.r * alpha;
          lineColors[colorpos++] = currentColor.current.g * alpha;
          lineColors[colorpos++] = currentColor.current.b * alpha;

          lineColors[colorpos++] = currentColor.current.r * alpha;
          lineColors[colorpos++] = currentColor.current.g * alpha;
          lineColors[colorpos++] = currentColor.current.b * alpha;

          numConnected++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (linesRef.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

    // Update Point Colors dynamically too
    (pointsRef.current.material as THREE.PointsMaterial).color = currentColor.current;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00F0FF" size={0.15} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={lineColors.length / 3} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
