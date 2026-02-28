"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Data Packets traveling along edges ───── */
function DataPackets({
  edges,
  nodePositions,
}: {
  edges: [number, number][];
  nodePositions: [number, number, number][];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 8; // MAX 8 Packets
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const duration = 2; // 2 Seconds travel time

  const packetData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      edgeIdx: Math.floor(Math.random() * edges.length),
      offset: Math.random() * duration, // Stagger start times
    }));
  }, [count, edges.length]);

  const vA = useMemo(() => new THREE.Vector3(), []);
  const vB = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime();

    packetData.forEach((p, i) => {
      const time = (elapsed + p.offset) % duration;
      const progress = time / duration;

      if (progress < 0.01) {
        // Pick new random edge when looping
        p.edgeIdx = Math.floor(Math.random() * edges.length);
      }

      const [a, b] = edges[p.edgeIdx];
      vA.set(...nodePositions[a]);
      vB.set(...nodePositions[b]);

      dummy.position.lerpVectors(vA, vB, progress);
      dummy.scale.setScalar(0.08); // Size 0.08
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#FFB800"
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

/* ─── Neural Network Nodes & Edges ─────────── */
export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { nodesCount, edges, nodePositions } = useMemo(() => {
    const count = 30;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      positions.push([
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
      ]);
    }
    const edgeList: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[j]));
        if (dist < 5.0) edgeList.push([i, j]);
      }
    }
    return { nodesCount: count, edges: edgeList, nodePositions: positions };
  }, []);

  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], idx) => {
      posArray[idx * 6] = nodePositions[a][0];
      posArray[idx * 6 + 1] = nodePositions[a][1];
      posArray[idx * 6 + 2] = nodePositions[a][2];
      posArray[idx * 6 + 3] = nodePositions[b][0];
      posArray[idx * 6 + 4] = nodePositions[b][1];
      posArray[idx * 6 + 5] = nodePositions[b][2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    return geo;
  }, [edges, nodePositions]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || !nodesRef.current) return;
    const t = clock.getElapsedTime();

    // Rotate the entire network
    groupRef.current.rotation.y = t * 0.05 + pointer.x * 0.1;
    groupRef.current.rotation.x = t * 0.02 + pointer.y * 0.1;

    // Pulse individual nodes
    for (let i = 0; i < nodesCount; i++) {
      const isPrimary = i % 5 === 0;
      dummy.position.set(...nodePositions[i]);
      const pulse = Math.sin(t * 2 + i) * 0.2 + 1;
      dummy.scale.setScalar((isPrimary ? 0.15 : 0.08) * pulse);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);
      nodesRef.current.setColorAt(i, new THREE.Color(isPrimary ? "#FF6B35" : "#FFB800"));
    }
    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
  });

  // Separate nodes into primary and secondary for easier color management
  const [primaryIndices, secondaryIndices] = useMemo(() => {
    const p: number[] = [];
    const s: number[] = [];
    for (let i = 0; i < nodesCount; i++) {
      if (i % 5 === 0) p.push(i);
      else s.push(i);
    }
    return [p, s];
  }, [nodesCount]);

  return (
    <group ref={groupRef}>
      {/* Central PointLight for glow */}
      <pointLight position={[0, 0, 0]} color="#FF6B35" intensity={2} distance={20} />

      {/* Primary Nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodesCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="white" toneMapped={false} />
      </instancedMesh>

      {/* We'll actually use vertex colors or two meshes if the user wants separate colors perfectly. 
          The user said: Primary #FF6B35 (size 0.15), Secondary #FFB800 (size 0.08).
          Let's just use one InstancedMesh and set colors per instance for performance. 
      */}

      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          color="#FF6B35" // High visibility orange
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <DataPackets edges={edges} nodePositions={nodePositions} />
    </group>
  );
}
