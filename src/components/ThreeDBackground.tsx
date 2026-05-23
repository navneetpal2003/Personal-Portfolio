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
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#7f0df2"
          envMapIntensity={0.5}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          metalness={0.15}
          roughness={0.25}
          distort={0.45}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-50 dark:opacity-30">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[8, 8, 8]} intensity={1.5} />
        <pointLight position={[-8, -8, -8]} intensity={1} color="#06b6d4" />
        <pointLight position={[8, -8, 8]} intensity={1.5} color="#ec4899" />
        <BlobMesh />
      </Canvas>
    </div>
  );
}
