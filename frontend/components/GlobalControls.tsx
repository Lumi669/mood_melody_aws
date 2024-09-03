// export default GlobalControls;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMedia } from "../context/MediaContext";
import { MusicWithImageSimplified } from "../types/type";

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

  // Use useRef to keep a stable reference to the playlist
  const playlistRef = useRef<MusicWithImageSimplified[]>([]);

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

  // Function to update playlist in localStorage and dispatch custom event
  const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
    console.log(
      "newPlaylist inside updatePlaylist of MediaContext ==== ",
      newPlaylist,
    );

    // Update the ref with the new playlist
    playlistRef.current = newPlaylist;

    // Persist the playlist in localStorage
    localStorage.setItem("playlist", JSON.stringify(newPlaylist));

    // Dispatch the custom event
    window.dispatchEvent(new Event("playlistUpdated"));
  };

  const handleSkipTrack = (direction: "next" | "previous") => {
    // Call skipTrack and get the updated playlist
    const updatedPlaylist = skipTrack(direction);

    console.log(
      "uuuuuupdatedPlaylist from handleSkipTrack of globalControl returned by skipTrack === ",
      updatedPlaylist,
    );

    // Update the local state and notify other components of the change
    updatePlaylist(updatedPlaylist); // Update localStorage and dispatch event
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
            onClick={() => handleSkipTrack("previous")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => handleSkipTrack("next")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
