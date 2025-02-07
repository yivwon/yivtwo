import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useControls } from "./useControls";

function Character() {
  const ref = useRef();
  const { forward, backward, left, right } = useControls();

  useFrame(() => {
    if (!ref.current) return;
    const speed = 0.05;
    if (forward) ref.current.position.z -= speed;
    if (backward) ref.current.position.z += speed;
    if (left) ref.current.position.x -= speed;
    if (right) ref.current.position.x += speed;
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function Scene() {
  const [view, setView] = useState(1);

  return (
    <>
      <Canvas>
        {/* Switchable Camera */}
        <PerspectiveCamera makeDefault position={view === 1 ? [0, 2, 5] : [0, 5, 10]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
  
        <Character />

        {/* Ground */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="green" />
        </mesh>

        <OrbitControls />
      </Canvas>

      {/* Camera Switch Button */}
      <button 
        onClick={() => setView(view === 1 ? 2 : 1)} 
        style={{ position: "absolute", top: 20, left: 20, padding: "10px", background: "white", border: "none", cursor: "pointer" }}
      >
        Switch Camera
      </button>
    </>
  );
}
