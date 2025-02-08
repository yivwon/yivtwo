import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Character({ targetPosition }) {
  const ref = useRef();
  const smoothSpeed = 0.1;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(targetPosition, smoothSpeed);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
