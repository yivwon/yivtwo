import { useState, useEffect } from "react";
import Scene from "./Scene";
import videoSrc from "/assets/videos/HighTeaScene.mp4"; // Ensure the video file is in the correct path

// Array of video sources
const videoSources = [
  "/assets/videos/CafeScene.mp4",
  "/assets/videos/HighTeaScene.mp4",
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
// <<<<<<< HEAD
    // Randomly select a video source
    const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
    setVideoSrc(randomVideo);

// =======
// >>>>>>> 51faad201f45985b819b5745fad8ce8e717a61fd
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
// <<<<<<< HEAD
              backgroundColor: "rgba(255, 255, 255, 0)",
// =======
              backgroundColor: "rgba(0, 0, 0, 0.5)",
// >>>>>>> 51faad201f45985b819b5745fad8ce8e717a61fd
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
