import { useState, useEffect } from "react";
import Scene from "./Scene";
import videoSrc from "/assets/videos/HighTeaScene.mp4"; // Ensure the video file is in the correct path

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
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Press any key to continue...
          </div>
        </div>
      ) : (
        <Scene />
      )}
    </div>
  );
}
