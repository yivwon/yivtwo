import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function NPCCharacter({ targetPosition }) {
  const { scene } = useGLTF("/assets/blendfiles/NPCketchup.glb");
  const ref = useRef();
  const smoothSpeed = 0.1;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(targetPosition, smoothSpeed);
    }
  });

  return <primitive ref={ref} object={scene} position={[0, 0, 0]} />;
}

export default function ThreeScene() {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const refCamera = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition.clone();
        if (event.key === "w") newPosition.z -= 0.1;
        if (event.key === "s") newPosition.z += 0.1;
        if (event.key === "a") newPosition.x -= 0.1;
        if (event.key === "d") newPosition.x += 0.1;
        return newPosition;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera ref={refCamera} makeDefault position={[0, 2, 5]} />
      <OrbitControls enablePan enableRotate maxPolarAngle={Math.PI / 2} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <NPCCharacter targetPosition={position} />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}
