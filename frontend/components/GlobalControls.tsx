// components/GlobalControls.tsx
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
      className={`fixed bottom-16 left-0 w-full p-2 bg-gray-800 bg-opacity-90 text-white flex flex-col items-center justify-center z-50 rounded-lg shadow-lg transition-all duration-500 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      style={{ position: "fixed", bottom: "4rem" }} // Adjust position to reduce crowding
    >
      {currentSong && (
        <div className="flex items-center space-x-2">
          {!isLivePage && (
            <button
              onClick={() => handleSkipTrack("previous")}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
            >
              <FaStepBackward size={20} />
            </button>
          )}
          <button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={handleStopMusic}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          >
            <FaStop size={20} />
          </button>

          {!isLivePage && (
            <button
              onClick={() => handleSkipTrack("next")}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
            >
              <FaStepForward size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
