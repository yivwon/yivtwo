import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Character({ targetPosition }) {
  const ref = useRef();
  const smoothSpeed = 0.1; // Smooth movement speed

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = lerp(ref.current.position.x, targetPosition.x, smoothSpeed);
      ref.current.position.y = lerp(ref.current.position.y, targetPosition.y, smoothSpeed);
      ref.current.position.z = lerp(ref.current.position.z, targetPosition.z, smoothSpeed);
    }
  });

  const lerp = (start, end, t) => start + (end - start) * t;

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function Scene() {
  const [view, setView] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0.5, z: 0 });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "y") setView((prev) => (prev === 1 ? 2 : 1));

      const speed = 0.2;
      if (event.key === "w") setPosition((prev) => ({ ...prev, z: prev.z - speed }));
      if (event.key === "s") setPosition((prev) => ({ ...prev, z: prev.z + speed }));
      if (event.key === "a") setPosition((prev) => ({ ...prev, x: prev.x - speed }));
      if (event.key === "d") setPosition((prev) => ({ ...prev, x: prev.x + speed }));
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault position={view === 1 ? [0, 2, 5] : [0, 5, 10]} />
      <OrbitControls enablePan enableZoom enableRotate />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Character targetPosition={position} />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}
