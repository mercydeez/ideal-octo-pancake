"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// ─── Gravitational Lensing & Accretion Disc Shaders ────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHoverIntensity;
  varying vec2 vUv;

  // 2D Rotation Helper
  mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
  }

  void main() {
    // Center at 0,0
    vec2 p = vUv * 2.0 - 1.0;
    
    // Distance from center (Event Horizon)
    float d = length(p);

    // Event Horizon (perfectly black)
    float horizonSize = 0.25;
    
    // If inside event horizon, absolute black void
    if (d < horizonSize) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // pure black hole
        return;
    }

    // Accretion Disc (swirling plasma around the hole)
    // Rotate coordinate space over time
    vec2 rp = p * rot(uTime * 0.5 - (1.0/d) * 0.2); // Faster near the center
    
    // Smooth falloff from the horizon out
    float discIntensity = smoothstep(horizonSize + 0.15, horizonSize + 0.02, d);
    discIntensity *= smoothstep(0.8, horizonSize, d); // fade edge
    
    // Add noise/stripes to the disc for texture
    float angle = atan(rp.y, rp.x);
    float noise = sin(angle * 6.0 + d * 20.0 - uTime * 4.0) * 0.5 + 0.5;
    
    // Plasma colors (Amber to Cyan on edges)
    vec3 colorCore = vec3(1.0, 0.4, 0.0); // Bright orange/amber
    vec3 colorEdge = vec3(0.0, 0.9, 1.0); // Cyan glow
    
    vec3 plasmaColor = mix(colorCore, colorEdge, pow(d * 1.5, 2.0));
    
    // Intensify when project is hovered
    float glow = (uHoverIntensity * 0.5 + 1.0) * discIntensity * (noise * 0.6 + 0.4);

    vec3 finalColor = plasmaColor * glow * 2.0;
    
    // Additive alpha falloff
    float alpha = discIntensity * 1.5;

    gl_FragColor = vec4(finalColor, min(alpha, 1.0));
  }
`;

export default function BlackHole({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const isHoveringProject = useStore((state) => state.isHoveringProject);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const hoverValue = useRef(0);

  // Large flat plane to project the shader onto
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(60, 60), []);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHoverIntensity: { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (!shaderRef.current) return;

    // Time Uniform
    shaderRef.current.uniforms.uTime.value += delta;

    // Smooth Reaction
    const targetHover = isHoveringProject ? 1.0 : 0.0;
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 3);
    shaderRef.current.uniforms.uHoverIntensity.value = hoverValue.current;
  });

  return (
    <mesh position={new THREE.Vector3(...position)} >
      <primitive object={planeGeo} attach="geometry" />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        // Alpha blending handles the black core while glowing the edges
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
