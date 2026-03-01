"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// ─── Fractional Brownian Motion (fBm) Noise Shaders ────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  uniform vec3 uColorPurple;
  uniform float uHoverIntensity;
  uniform float uCameraZ;
  
  varying vec2 vUv;

  // ... noise functions same ...
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm (in vec2 st) {
      float value = 0.0;
      float amplitude = .5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st);
          st = rot * st * 2.0 + shift;
          amplitude *= .5;
      }
      return value;
  }

  void main() {
    vec2 st = vUv * 3.0;
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.00 * uTime);
    q.y = fbm(st + vec2(1.0));
    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);
    float fBmValue = fbm(st + r);

    // Mix colors based on the noise field
    vec3 baseCol = uColorBase;
    vec3 accentCol = uColorAccent;
    vec3 purpleCol = uColorPurple;

    // Singularity Purple Integration: Mix purple into clouds
    vec3 cloudColor = mix(baseCol, purpleCol, smoothstep(0.3, 0.7, vUv.y) * fBmValue);
    vec3 finalColor = mix(cloudColor, accentCol, clamp((fBmValue * fBmValue) * 4.0, 0.0, 1.0));

    // Add a glowing core linked to uHoverIntensity
    finalColor += uHoverIntensity * 0.3 * fBmValue * fBmValue * fBmValue * uColorAccent;

    float dist = distance(vUv, vec2(0.5));
    float alphaMask = smoothstep(0.5, 0.2, dist);
    float fadeStart = 1.0 - smoothstep(-100.0, -20.0, uCameraZ);
    float fadeEnd = smoothstep(-280.0, -200.0, uCameraZ);
    
    float alpha = fBmValue * alphaMask * 0.8 * fadeStart * fadeEnd;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function Nebula({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const isHoveringProject = useStore((state) => state.isHoveringProject);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const hoverValue = useRef(0);

  // Memoize uniform colors
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color("#05081c") }, // Deep violet void
    uColorAccent: { value: new THREE.Color("#00F0FF") }, // Cyan gas
    uColorPurple: { value: new THREE.Color(0.48, 0.18, 0.75) }, // #7B2FBE
    uHoverIntensity: { value: 0 },
    uCameraZ: { value: 35 },
  }), []);

  useFrame((state, delta) => {
    if (!shaderRef.current) return;

    // Slowly increment time
    shaderRef.current.uniforms.uTime.value += delta * 0.2;

    // Smooth lerp hover intensity for reactivity
    const targetHover = isHoveringProject ? 1.0 : 0.0;
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 3);
    shaderRef.current.uniforms.uHoverIntensity.value = hoverValue.current;
    shaderRef.current.uniforms.uCameraZ.value = state.camera.position.z;
  });

  return (
    <mesh position={position} >
      <planeGeometry args={[80, 80]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
