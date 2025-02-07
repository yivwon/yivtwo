import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Character() {
  const ref = useRef();
  const speed = 0.05;

  useFrame(() => {
    if (!ref.current) return;
    // Movement logic here (you can implement it if you want to move the character with keys)
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

  // Set up key press listener for 'Y' key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "y" || event.key === "Y") {
        setView((prevView) => (prevView === 1 ? 2 : 1));
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      {/* PerspectiveCamera with OrbitControls */}
      <PerspectiveCamera makeDefault position={view === 1 ? [0, 2, 5] : [0, 5, 10]} />
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Character />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}
