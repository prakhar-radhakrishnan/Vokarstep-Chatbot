"use client";

import { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function ScreenShare() {
  const [screenSharing, setScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleScreenShare = async () => {
    if (!screenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setScreenSharing(true);
      } catch (error) {
        console.error("Error accessing screen share:", error);
      }
    } else {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setScreenSharing(false);
    }
  };

  return (
    <div className="screen-container">
      <video ref={videoRef} autoPlay className="screen-box"></video>
      <Button
        className={`screen-share-button ${
          screenSharing ? "screen-share-active" : ""
        }`}
        onClick={toggleScreenShare}
      >
        {screenSharing ? "Stop Screen Share" : "Start Screen Share"}
      </Button>
    </div>
  );
}
