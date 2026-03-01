"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// ─── GLSL Vertex Shader ────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpin;
  uniform float uScrollY;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Scroll-driven tilt: tilt the galaxy plane as the user scrolls
    float tiltAngle = uScrollY * 0.0008;
    mat3 tiltMatrix = mat3(
      1.0, 0.0, 0.0,
      0.0, cos(tiltAngle), -sin(tiltAngle),
      0.0, sin(tiltAngle),  cos(tiltAngle)
    );

    vec3 pos = tiltMatrix * position;

    // Perspective size — bigger particles closer to camera
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (350.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);

    gl_Position = projectionMatrix * mvPosition;

    // Fade outer particles slightly
    float dist = length(position.xz);
    vAlpha = 1.0 - smoothstep(8.0, 22.0, dist);
  }
`;

// ─── GLSL Fragment Shader ──────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  uniform float uCameraZ;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular disc with soft glowing edge
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Soft, dim glow — atmospheric not blinding
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 4.0); // sharper falloff = less halo bleed

    // Distance fade (fades out rapidly as camera flies past Z=-20 down to -100)
    float fade = smoothstep(-100.0, -20.0, uCameraZ);

    gl_FragColor = vec4(vColor, strength * vAlpha * 0.55 * fade); // global opacity clamp
  }
`;

// ─── Galaxy Geometry Builder ───────────────────────────────────────────────
function buildGalaxy(count: number, arms: number, spin: number, randomness: number) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const insideColor = new THREE.Color("#8B4513"); // dark burnt-amber core — won't bloom as harshly
    const midColor = new THREE.Color("#006080"); // deep teal mid-arms
    const outsideColor = new THREE.Color("#0a0518"); // near-black violet outer rim

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Radius: bias towards inner regions
        const radius = Math.pow(Math.random(), 0.6) * 22;

        // Which spiral arm
        const armAngle = ((i % arms) / arms) * Math.PI * 2;

        // Logarithmic spiral angle
        const spinAngle = radius * spin;
        const angle = armAngle + spinAngle;

        // Scatter — more scatter at outer edge
        const randomR = radius * randomness;
        const rx = (Math.random() - 0.5) * randomR;
        const ry = (Math.random() - 0.5) * randomR * 0.2; // flat disc
        const rz = (Math.random() - 0.5) * randomR;

        positions[i3] = Math.cos(angle) * radius + rx;
        positions[i3 + 1] = ry;
        positions[i3 + 2] = Math.sin(angle) * radius + rz;

        // Color blend: core=amber, mid=cyan, outer=violet
        const mixedColor = insideColor.clone();
        const t = Math.min(radius / 22, 1.0);
        if (t < 0.4) {
            mixedColor.lerp(insideColor, 1.0 - t / 0.4);
        } else if (t < 0.75) {
            mixedColor.lerpColors(insideColor, midColor, (t - 0.4) / 0.35);
        } else {
            mixedColor.lerpColors(midColor, outsideColor, (t - 0.75) / 0.25);
        }

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        // Vary particle sizes — bigger near core
        sizes[i] = Math.random() * 2.5 + (1.0 - t) * 2.5;
    }

    return { positions, colors, sizes };
}

// ─── Component ────────────────────────────────────────────────────────────
export default function GalaxyBackground({ isMobile = false }) {
    const isHoveringProject = useStore((state) => state.isHoveringProject);
    const groupRef = useRef<THREE.Group>(null!);
    const shaderRef = useRef<THREE.ShaderMaterial>(null!);

    // Build galaxy once — scale down massively on mobile
    const particleCount = isMobile ? 8000 : 40000;

    const { positions, colors, sizes } = useMemo(
        () => buildGalaxy(particleCount, 3, 0.55, 0.5),
        [particleCount]
    );

    // Smooth refs for interpolation
    const spinSpeed = useRef(0.04);
    const scrollY = useRef(0);
    useEffect(() => {
        const handler = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener("scroll", handler, { passive: true });
        handler(); // Initialize
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useFrame((state, delta) => {
        // Target spin — faster on project hover
        const targetSpin = isHoveringProject ? 0.35 : 0.04;
        spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, targetSpin, delta * 2);

        // Rotate the galaxy
        if (groupRef.current) {
            groupRef.current.rotation.y += spinSpeed.current * delta;
        }

        // Use the ref updated by the effect
        const currentScrollY = scrollY.current;

        // Push scroll into the shader uniform
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.uniforms.uScrollY.value = scrollY.current;
            shaderRef.current.uniforms.uCameraZ.value = state.camera.position.z;
        }
    });

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, [positions, colors, sizes]);

    return (
        <group ref={groupRef} rotation={[0.3, 0, 0]}>
            <points geometry={geometry}>
                <shaderMaterial
                    ref={shaderRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        uTime: { value: 0 },
                        uSpin: { value: 0.55 },
                        uScrollY: { value: 0 },
                        uCameraZ: { value: 35 },
                    }}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
