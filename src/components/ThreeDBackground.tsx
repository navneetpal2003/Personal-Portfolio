'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function BlobMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.12;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

    // Smoothly track mouse pointer (pointer coords range from -1 to 1)
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.8;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.08);
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.9}>
        <MeshDistortMaterial
          color="#f3e8ff"
          transmission={0.85}
          thickness={1.8}
          ior={1.48}
          clearcoat={1}
          clearcoatRoughness={0.05}
          metalness={0.05}
          roughness={0.1}
          distort={0.48}
          speed={2.2}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 8, 8]} intensity={1.5} />
        <pointLight position={[-8, -8, -8]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[8, -8, 8]} intensity={1.8} color="#ec4899" />
        <pointLight position={[0, 8, 0]} intensity={1.2} color="#7f0df2" />
        <BlobMesh />
      </Canvas>
    </div>
  );
}
