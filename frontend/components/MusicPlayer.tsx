"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";
import { addToPlaylist22 } from "../utils/addToPlaylist";
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
    currentSong,
    isPlaying,
  } = useMedia();
  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
  const [isOriginalViewVisible, setOriginalViewVisible] = useState(true);
  const [isAnimationActive, setAnimationActive] = useState(false);
  const [isVideoVisible, setVideoVisible] = useState(false);
  const [currentMusicCtg, setCurrentMusicCtg] = useState<string | null>(null);

  useEffect(() => {
    //Check if music is playing when the component mounts
    if (currentSong) {
      console.log("current sssssong ==== ", currentSong);

      setOriginalViewVisible(false);
      setVideoVisible(true);
    } else {
      setOriginalViewVisible(true); // Ensure the original view is visible when there's no current song
      setVideoVisible(false);
    }
  }, [currentSong]);

  const playMusic = (mood: "happy" | "sad" | "calm") => {
    stopMusic(); // Stop any currently playing music

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    addToPlaylist22(randomSong);

    console.log("random song === ", randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");
    setIsBrown(randomSong.mood === "calm");

    setCurrentMusicName(randomSong.name);
    setCurrentMusicCtg(randomSong.ctg);

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
    stopMusic(); // Stop the music when returning to the original view
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
      <div className="relative min-h-screen px-4">
        {/* Original Homepage View */}
        {isOriginalViewVisible && <OrginalViewPart />}

        {/* Buttons for mood selection */}
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
        {currentSong && currentSong.imgUrl && (
          <div className="flex items-center justify-center h-full">
            <CustomImage
              src={currentSong.imgUrl}
              alt={currentMusicName || "an image associated with the music"}
              dataUrl={currentTrack}
              layout="responsive"
              width={1400}
              height={700}
              className="cursor-pointer w-full max-w-full lg:max-w-[1400px]"
              ctg={currentMusicCtg}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
