import { useState, useEffect, useRef } from "react";

export default function Microphone() {
  const [isMicOn, setIsMicOn] = useState(false);
  const micRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isMicOn) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        micRef.current = stream;
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function animateMic() {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;

          // Adjust blur effect based on voice activity
          document.documentElement.style.setProperty(
            "--mic-blur",
            `${Math.min(50, avg / 3)}px`
          );

          // Increase the size of the animated blur effect dynamically
          document.documentElement.style.setProperty(
            "--mic-size",
            `${Math.min(350, 180 + avg)}px`
          );

          if (isMicOn) requestAnimationFrame(animateMic);
        }
        animateMic();
      });
    } else {
      micRef.current?.getTracks().forEach((track) => track.stop());
      document.documentElement.style.setProperty("--mic-blur", `0px`);
      document.documentElement.style.setProperty("--mic-size", `180px`);
    }
  }, [isMicOn]);

  return (
    <div className="microphone-container">
      {/* White circle with company logo */}
      <div className="mic-visual">
        <img src="/volkarstep-logo.png" alt="Company Logo" />
      </div>
      <button className="mic-toggle" onClick={() => setIsMicOn(!isMicOn)}>
        {isMicOn ? "Turn Mic Off" : "Turn Mic On"}
      </button>
    </div>
  );
}
