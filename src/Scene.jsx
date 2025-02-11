import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function NPCCharacter({ targetPosition, direction }) {
  const { scene } = useGLTF("/assets/blendfiles/NPCketchup.glb");
  const ref = useRef();
  const smoothSpeed = 0.5;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(
        new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z),
        smoothSpeed
      );

      // Smoothly rotate NPC to face movement direction
      if (direction.length() > 0) {
        const targetRotation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, -1),
          direction.clone().normalize()
        );
        ref.current.quaternion.slerp(targetRotation, smoothSpeed);
      }
    }
  });

  return <primitive ref={ref} object={scene} position={[0, 0, 0]} />;
}

export default function ThreeScene() {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [direction, setDirection] = useState(new THREE.Vector3(0, 0, 0));
  const refCamera = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      setPosition((prevPosition) => {
        const newPosition = { ...prevPosition };
        const newDirection = new THREE.Vector3(0, 0, 0);

        if (event.key === "w") {
          newPosition.z -= 0.3;
          newDirection.z -= 1;
        }
        if (event.key === "s") {
          newPosition.z += 0.3;
          newDirection.z += 1;
        }
        if (event.key === "a") {
          newPosition.x -= 0.3;
          newDirection.x -= 1;
        }
        if (event.key === "d") {
          newPosition.x += 0.3;
          newDirection.x += 1;
        }

        setDirection(newDirection);
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

      <NPCCharacter targetPosition={position} direction={direction} />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}