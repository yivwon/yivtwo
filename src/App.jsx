import { useState, useEffect } from "react";
import Scene from "./Scene";
// import videoSrc from "/assets/videos/HighTeaScene.mp4"; // Ensure the video file is in the correct path

// Array of video sources
const videoSources = [
  "/assets/videos/CafeScene.mp4",
  "/assets/videos/HighTeaScene.mp4",
  "/assets/videos/SleepyScene.mp4",

];

export default function App() {
  const [started, setStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {

    const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
    setVideoSrc(randomVideo);

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
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
          </div>
        </div>
      ) : (
        <Scene />
      )}
    </div>
  );
}
