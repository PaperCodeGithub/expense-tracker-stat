import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundParticles = () => {
  return (
    <Sphere args={[60, 48, 48]}>
      <meshBasicMaterial
        color="#000000" 
        side={THREE.BackSide}
        wireframe={true}
        transparent={true}
        opacity={0.03}
      />
    </Sphere>
  );
};

const CameraParallax = () => {
  useFrame((state) => {
    const scrollY = Math.max(0, window.scrollY);
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      scrollY * -0.015,
      0.1
    );
  });
}

export default function SphereBackground() {
  return (
    <div 
      className="canvas-wrapper" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0, 
        backgroundColor: '#ffffff' 
      }}
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
        <Suspense fallback={null}>
          <BackgroundParticles />
          <CameraParallax />
        </Suspense>
      </Canvas>
      
      <div 
        className="vignette" 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 40%, #ffffff 100%)',
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
}