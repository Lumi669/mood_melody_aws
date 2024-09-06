"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "@context/MediaContext";
import { MusicWithImageSimplified } from "../types/type";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const GlobalControls: React.FC = () => {
  const { stopMusic, togglePlayPause, isPlaying, currentSong, skipTrack } =
    useMedia();
  const pathname = usePathname(); // Initialize usePathname
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
    localStorage.setItem("playlist", JSON.stringify(newPlaylist));
    window.dispatchEvent(new Event("playlistUpdated"));
  };

  const handleSkipTrack = (direction: "next" | "previous") => {
    // Use pathname to check if the current page is the homepage
    const isHomePage = pathname === "/"; // Adjust the path to match your homepage
    const updatedPlaylist = skipTrack(direction, isHomePage); // Pass both direction and isHomePage

    updatePlaylist(updatedPlaylist);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex flex-col items-center justify-center z-50 transition-all duration-500 ${
        animate ? "animate-fly-in" : ""
      }`}
    >
      {currentSong && (
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 text-center"
          >
            {isPlaying ? "Pause" : "Play "}
          </button>
          <button
            onClick={stopMusic}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop Music
          </button>
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
