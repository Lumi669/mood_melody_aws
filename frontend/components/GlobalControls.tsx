"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const GlobalControls: React.FC = () => {
  const {
    stopMusic,
    playTrack,
    togglePlayPause,
    isPlaying,
    currentSong,
    skipTrack,
  } = useMedia();

  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0); // State to track the progress of the audio

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }

    // Update progress bar as the song plays
    const audio = document.getElementById("audio") as HTMLAudioElement | null;
    if (!audio) return;

    const updateProgress = () => {
      if (audio && currentSong?.url) {
        console.log("audio.duration === ", audio.duration);
        const percentage = (audio.currentTime / audio.duration) * 100;
        setProgress(percentage || 0);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    togglePlayPause(); // Use togglePlayPause instead of pauseTrack
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex flex-col items-center justify-center z-50 transition-all duration-500 ${
        animate ? "animate-fly-in" : ""
      }`}
    >
      {/* Show controls only if there is a current song */}
      {currentSong && (
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          {/* Stop Button */}
          <button
            onClick={stopMusic}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop Music
          </button>

          {/* Skip Controls */}
          <button
            onClick={() => skipTrack("previous")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => skipTrack("next")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Progress bar */}
      {currentSong && (
        <div className="w-full bg-gray-300 h-1 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-1"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
