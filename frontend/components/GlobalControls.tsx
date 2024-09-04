// export default GlobalControls;
"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "@context/MediaContext";
import { MusicWithImageSimplified } from "../types/type";

const GlobalControls: React.FC = () => {
  const { stopMusic, togglePlayPause, isPlaying, currentSong, skipTrack } =
    useMedia();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  // Function to update playlist in localStorage and dispatch custom event
  const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
    // Persist the playlist in localStorage
    localStorage.setItem("playlist", JSON.stringify(newPlaylist));

    // Dispatch the custom event
    window.dispatchEvent(new Event("playlistUpdated"));
  };

  const handleSkipTrack = (direction: "next" | "previous") => {
    // Call skipTrack and get the updated playlist
    const updatedPlaylist = skipTrack(direction);

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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 text-center"
          >
            {isPlaying ? "Pause" : "Play "}
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
