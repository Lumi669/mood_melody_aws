"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";
import { addToPlaylist } from "../utils/addToPlaylist";
import CustomImage from "./CustomImage";
import SentimentAnalysisPage from "./Sentimentanalysis";

const MusicPlayer: React.FC = () => {
  const {
    mediaData,
    setIsRed,
    setIsBlue,
    playTrack,
    togglePlayPause,
    stopMusic,
    currentTrack,
    isPlaying,
  } = useMedia();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);

  const playMusic = (mood: "happy" | "sad") => {
    stopMusic(); // Stop any currently playing music

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    addToPlaylist(randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");

    setCurrentImageUrl(randomSong.imgUrl);
    setCurrentMusicName(randomSong.name);

    playTrack(randomSong.url); // Play the new track using the global context
  };

  const handleImageClick = () => {
    if (currentTrack) {
      togglePlayPause(currentTrack); // Toggle play/pause using the context function
    }
  };

  return (
    <>
      <div>
        <SentimentAnalysisPage />
      </div>
      <button onClick={() => playMusic("happy")} className="m-5">
        Happy
      </button>
      <button onClick={() => playMusic("sad")} className="m-5">
        Sad
      </button>

      <div>
        {currentImageUrl && (
          <CustomImage
            src={currentImageUrl}
            alt={currentMusicName || "an image associated with the music"}
            dataUrl={currentTrack}
            layout="responsive"
            width={800}
            height={800}
            className="cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
