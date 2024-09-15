"use client";

import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";

export default function PlayButton({
  previewurl,
}: {
  previewurl: string;
}): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // progress in percentage
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // handle toggle play/pause
  const handleToggle = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying((prev) => !prev);
  };

  // update progress based on the audio's current time
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration > 0) {
        const percent =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent);
      }
    };

    // add event listeners for time update and when the preview ends
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0); // Reset progress after completion
      });
    }

    // clean up event listeners
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  // reset progress when previewurl changes
  useEffect(() => {
    setProgress(0); // reset progress to 0 when previewurl changes
    setIsPlaying(false);
  }, [previewurl]);

  // ensure the audio pauses if the component is unmounted
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const radius = 18; // adjust to ensure the circle is large enough around the button
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleToggle}
        className="relative z-10 flex h-12 w-12 items-center justify-center"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* hidden audio element to control playback */}
      <audio ref={audioRef} src={previewurl} />

      {/* circular progress stroke */}
      <svg className="absolute" width="80" height="80" viewBox="0 0 80 80">
        <circle
          cx="40" // center the circle in the SVG
          cy="40"
          r={radius}
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // rounded ends
          transform="rotate(-90 40 40)" // rotate the circle by 90 degrees around its center (cx, cy)
          style={{
            opacity: progress === 100 ? 0 : 1, // hide the circle when progress reaches 100%
            transition: "stroke-dashoffset 0.1s ease-in-out, opacity 0.3s ease", // smooth transition for progress and disappearing effect
          }}
        />
      </svg>
    </div>
  );
}
