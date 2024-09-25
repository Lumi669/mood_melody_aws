"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMedia } from "@context/MediaContext";
import { MusicWithImageSimplified } from "../types/type";
import { usePathname } from "next/navigation";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaStop,
} from "react-icons/fa";

const GlobalControls: React.FC = () => {
  const { stopMusic, togglePlayPause, isPlaying, currentSong, skipTrack } =
    useMedia();
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  const playlistRef = useRef<MusicWithImageSimplified[]>([]);

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }
  }, [isPlaying, currentSong]);

  const isLivePage = pathname === "/live";

  useEffect(() => {
    const isHomePage = pathname === "/";

    if (isHomePage && currentSong) {
      localStorage.setItem("currentMood", currentSong.mood);
      localStorage.setItem(
        `lastPlayed_${currentSong.mood}`,
        JSON.stringify(currentSong),
      );
    }
  }, [currentSong, pathname]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
    playlistRef.current = newPlaylist;

    localStorage.setItem("playlist", JSON.stringify(newPlaylist));
    window.dispatchEvent(new Event("playlistUpdated"));
  };

  const handleSkipTrack = (direction: "next" | "previous") => {
    const isHomePage = pathname === "/";
    const updatedPlaylist = skipTrack(direction, isHomePage);
    console.log(
      "Updated Playlist from GlobalControls.tsx === ",
      updatedPlaylist,
    );

    updatePlaylist(updatedPlaylist);
  };

  const handleStopMusic = () => {
    stopMusic();
    sessionStorage.setItem("wasPlayingOnHomePage", "false");
    sessionStorage.setItem("wasPausedOnHomePage", "false");
    sessionStorage.removeItem("lastPlayedSong");
    sessionStorage.removeItem("timePointOfHomePage");

    window.dispatchEvent(new Event("musicStopped"));
  };

  return (
    <div
      className={`fixed bottom-16 left-0 w-full p-4 flex flex-col items-center justify-center z-50 transition-all duration-500 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      style={{ position: "fixed", bottom: "4rem" }} // Adjust position to reduce crowding
    >
      {currentSong && (
        <div className="flex items-center space-x-4">
          {!isLivePage && (
            <div
              onClick={() => handleSkipTrack("previous")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
              style={{ width: "48px", height: "48px" }} // Match width and height with icon size
              aria-label="Previous Track"
              title="Previous Track" // Add title for screen readers and tooltips
            >
              <FaStepBackward size={24} className="text-blue-800" />
            </div>
          )}
          <div
            onClick={handlePlayPause}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
            style={{ width: "48px", height: "48px" }} // Match width and height with icon size
            aria-label={isPlaying ? "Pause" : "Play"}
            title={isPlaying ? "Pause" : "Play"} // Add title for screen readers and tooltips
          >
            {isPlaying ? (
              <FaPause size={24} className="text-blue-800" />
            ) : (
              <FaPlay size={24} className="text-blue-800" />
            )}
          </div>
          <div
            onClick={handleStopMusic}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
            style={{ width: "48px", height: "48px" }} // Match width and height with icon size
            aria-label="Stop Music"
            title="Stop Music" // Add title for screen readers and tooltips
          >
            <FaStop size={24} className="text-blue-800" />
          </div>

          {!isLivePage && (
            <div
              onClick={() => handleSkipTrack("next")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
              style={{ width: "48px", height: "48px" }} // Match width and height with icon size
              aria-label="Next Track"
              title="Next Track" // Add title for screen readers and tooltips
            >
              <FaStepForward size={24} className="text-blue-800" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
