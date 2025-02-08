import React, { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import './Entrance.css'; // Make sure this file is correctly imported

export default function Entrance() {
  return (
    <div className="entrance-container">
      {/* Video Background */}
      <video
        className="video-background"
        src="/assets/videos/HighTeaScene.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 3D Scene */}
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Character />
      </Canvas>
    </div>
  );
}

function Character() {
  const ref = useRef();
  const smoothSpeed = 0.1;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp({ x: 0, y: 0.5, z: 0 }, smoothSpeed);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
