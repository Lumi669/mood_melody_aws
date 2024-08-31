"use client";

import React, { useState } from "react";
import { useMedia } from "../context/MediaContext";
import { addToPlaylist } from "../utils/addToPlaylist";
import CustomImage from "./CustomImage";
import SentimentAnalysisPage from "./Sentimentanalysis";
import Greeting from "./Greeting";
import Image from "next/image";

const MusicPlayer: React.FC = () => {
  const {
    mediaData,
    setIsRed,
    setIsBlue,
    setIsBrown,
    playTrack,
    stopMusic,
    setCurrentSong,
    currentTrack,
  } = useMedia();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
  const [isOriginalViewVisible, setOriginalViewVisible] = useState(true);
  const [isAnimationActive, setAnimationActive] = useState(false);
  const [isVideoVisible, setVideoVisible] = useState(false);

  const playMusic = (mood: "happy" | "sad" | "calm") => {
    stopMusic(); // Stop any currently playing music

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    addToPlaylist(randomSong);

    console.log("random song === ", randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");
    setIsBrown(randomSong.mood === "calm");

    setCurrentImageUrl(randomSong.imgUrl);
    setCurrentMusicName(randomSong.name);

    playTrack(randomSong.url); // Play the new track using the global context

    // Trigger the animation sequence
    setOriginalViewVisible(false);
    setAnimationActive(true);

    setTimeout(() => {
      setAnimationActive(false);
      setVideoVisible(true);
    }, 1000); // Adjust to match the animation duration
  };

  // Function to handle returning to the original view when the video is clicked
  const handleVideoClick = () => {
    setOriginalViewVisible(true); // Show the original view
    setAnimationActive(false); // Stop any ongoing animation
    setVideoVisible(false); // Hide the video
    setCurrentImageUrl(null); // Hide the music image
  };

  const OrginalViewPart = () => {
    return (
      <>
        <div>
          <Greeting />
        </div>
        <div>
          <SentimentAnalysisPage />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="relative min-h-screen p-4">
        {/* Original Homepage View */}
        {isOriginalViewVisible && <OrginalViewPart />}

        <button onClick={() => playMusic("happy")} className="m-5">
          Happy
        </button>
        <button onClick={() => playMusic("sad")} className="m-5">
          Sad
        </button>
        <button onClick={() => playMusic("calm")} className="m-5">
          Calm
        </button>

        {/* Animation from image to video */}
        {isAnimationActive && (
          <Image
            src="/dancing-girl-removebg.webp"
            alt="Animation"
            width={100}
            height={100}
            className="fixed transition-all duration-1000 transform animate-fly-to-corner"
          />
        )}

        {/* Video in the bottom right corner */}
        {isVideoVisible && (
          <div className="video-on-top" onClick={handleVideoClick}>
            <video
              src="/animation-center-yellowbg-noblinking.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full"
            />
          </div>
        )}

        {/* Display the current track image */}
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
