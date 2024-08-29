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
  const [currentTime, setCurrentTime] = useState<number>(0); // For progress bar
  const [duration, setDuration] = useState<number>(0); // For progress bar
  const [isDragging, setIsDragging] = useState<boolean>(false); // For draggable progress bar

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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (currentTrack && isPlaying) {
      const newAudio = new Audio(currentTrack);
      newAudio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSliderStart = () => {
    setIsDragging(true);
  };

  const handleSliderEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (currentTrack) {
      const newAudio = new Audio(currentTrack);
      newAudio.addEventListener("loadedmetadata", () =>
        setDuration(newAudio.duration),
      );
      newAudio.addEventListener("timeupdate", () => {
        if (!isDragging) {
          setCurrentTime(newAudio.currentTime);
        }
      });
      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [currentTrack, isDragging]);

  return (
    <>
      {/* <button onClick={stopMusic} className="m-5">
        Stop
        </button> */}

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
            // onClick={handleImageClick} // This now properly toggles play/pause
            className="cursor-pointer"
          />
        )}
        {currentTrack && (
          <input
            type="range"
            min="0"
            max={duration || 1} // Ensure max is never 0 to avoid a React error
            value={currentTime}
            onChange={handleSliderChange}
            onMouseDown={handleSliderStart}
            onMouseUp={handleSliderEnd}
            onTouchStart={handleSliderStart}
            onTouchEnd={handleSliderEnd}
            style={{ width: "100%" }}
            className="absolute bottom-0 left-0 w-full"
          />
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
