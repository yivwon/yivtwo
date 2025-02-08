import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Character({ targetPosition }) {
  const ref = useRef();
  const smoothSpeed = 0.1; // Controls the smoothness of the movement

  useFrame(() => {
    if (ref.current) {
      // Smoothly interpolate the position using lerp
      ref.current.position.x = lerp(ref.current.position.x, targetPosition.x, smoothSpeed);
      ref.current.position.y = lerp(ref.current.position.y, targetPosition.y, smoothSpeed);
      ref.current.position.z = lerp(ref.current.position.z, targetPosition.z, smoothSpeed);
    }
  });

  // Linear interpolation function
  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function Scene() {
  const [view, setView] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0.5, z: 0 }); // Initial cube position

  // Set up key press listener for 'Y' key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "y" || event.key === "Y") {
        setView((prevView) => (prevView === 1 ? 2 : 1));
      }

      // Handle cube movement with WASD keys
      if (event.key === "w") {
        setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z - 0.1 }));
      }
      if (event.key === "s") {
        setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z + 0.1 }));
      }
      if (event.key === "a") {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 0.1 }));
      }
      if (event.key === "d") {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 0.1 }));
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
      <OrbitControls
        enablePan={true} // Enable panning with the mouse/touchpad
        enableZoom={true} // Enable zooming in and out
        enableRotate={true} // Enable rotation of the scene
        maxPolarAngle={Math.PI / 2} // Restrict vertical rotation
        minPolarAngle={0} // Restrict vertical rotation
        zoomSpeed={1.2} // Adjust zoom speed
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* Pass the current position state to the Character */}
      <Character targetPosition={position} />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );    
}
