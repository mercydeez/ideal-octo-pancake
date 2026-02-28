"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { PERSONAL } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

function MorphingGeometry() {
  const meshRef = useRef<any>();
  const { scrollYProgress } = useScroll();

  // Morph from TorusKnot (0) to Sphere (1)
  const morph = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.5, 0.8]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.5}>
        {/* We use a sphere with distortion to simulate the morph and high-density geometry */}
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#00f5ff"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#00f5ff"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007a" />
          <MorphingGeometry />
        </Canvas>
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan font-mono text-[10px] tracking-[0.5em] mb-4 uppercase opacity-50">
            [ INITIALIZING_NEURAL_LINK ]
          </p>

          <h1 className="text-7xl md:text-9xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            <span className="block text-2xl md:text-3xl tracking-[0.2em] mb-4 font-mono text-white/40">THE ARCHITECT</span>
            {PERSONAL.name.split(" ")[0]}<br />
            <span className="text-pink text-glow-pink">{PERSONAL.name.split(" ")[1]}</span>
          </h1>

          <div className="h-px w-24 bg-cyan/30 mx-auto mb-10" />

          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton color="cyan">
              ACCESS_MANIFESTO
            </MagneticButton>
            <MagneticButton color="pink">
              OPEN_TRANSCEIVER
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-cyan to-transparent" />
        </div>
      </div>
    </section>
  );
}
