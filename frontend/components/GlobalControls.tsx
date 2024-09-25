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
              style={{ width: "40px", height: "40px" }} // Set the width and height to fit the icon
            >
              <FaStepBackward size={20} className="text-blue-500" />
            </div>
          )}
          <div
            onClick={handlePlayPause}
            className="bg-green-200 hover:bg-green-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
            style={{ width: "40px", height: "40px" }} // Set the width and height to fit the icon
          >
            {isPlaying ? (
              <FaPause size={20} className="text-green-600" />
            ) : (
              <FaPlay size={20} className="text-green-600" />
            )}
          </div>
          <div
            onClick={handleStopMusic}
            className="bg-red-200 hover:bg-red-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
            style={{ width: "40px", height: "40px" }} // Set the width and height to fit the icon
          >
            <FaStop size={20} className="text-red-600" />
          </div>

          {!isLivePage && (
            <div
              onClick={() => handleSkipTrack("next")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-center transition-colors"
              style={{ width: "40px", height: "40px" }} // Set the width and height to fit the icon
            >
              <FaStepForward size={20} className="text-blue-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
