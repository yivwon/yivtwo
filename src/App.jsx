import { useState, useEffect } from "react";
import Scene from "./Scene";

export default function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = () => setStarted(true);

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {!started ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Press any key to continue...
        </div>
      ) : (
        <Scene />
      )}
    </div>
  );
}
