"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMedia } from "@context/MediaContext";
import { addToPlaylist22 } from "@utils/addToPlaylist";
import CustomImage from "@components/CustomImage";
import SentimentAnalysisPage from "@components/Sentimentanalysis";
import Greeting from "./Greeting";
import Image from "next/image";

// Define the props type for the initial data passed from the server component
interface MusicPlayerProps {
  initialData: any;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ initialData }) => {
  const {
    setIsRed,
    setIsBlue,
    setIsBrown,
    playTrack,
    stopMusic,
    setCurrentSong,
    currentTrack,
    currentSong,
    setIsPlaying,
    isRed,
    isBlue,
    isBrown,
    audio,
  } = useMedia();

  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
  const [isOriginalViewVisible, setOriginalViewVisible] = useState(true);
  const [isAnimationActive, setAnimationActive] = useState(false);
  const [isVideoVisible, setVideoVisible] = useState(false);
  const [currentMusicCtg, setCurrentMusicCtg] = useState<string | null>(null);
  const [moodSource, setMoodSource] = useState<"button" | "analysis" | null>(
    null,
  );

  useEffect(() => {
    // Use the initialData from props instead of fetching again
    if (initialData) {
      console.log("Received initial data:", initialData);
    }

    // Restore state from sessionStorage or initialize
    const currentMood = sessionStorage.getItem("currentMood");
    const lastPlayedSong = sessionStorage.getItem("lastPlayedSong");
    const wasPlayingOnHomePage =
      sessionStorage.getItem("wasPlayingOnHomePage") === "true";
    const wasPausedOnHomePage =
      sessionStorage.getItem("wasPausedOnHomePage") === "true";
    const timePoint = sessionStorage.getItem("timePointOfHomePage");

    if (lastPlayedSong) {
      const song = JSON.parse(lastPlayedSong);

      if (audio) {
        audio.pause(); // Stop any other playing audio
      }

      if (wasPlayingOnHomePage) {
        setCurrentSong(song);
        playTrack(song.url, song); // Play the song if it was playing before
        setIsPlaying(true);
        setVideoVisible(true);
        setOriginalViewVisible(false); // Hide the original view when music is playing
      } else if (wasPausedOnHomePage && timePoint) {
        setCurrentSong(song);
        setIsPlaying(false);
        setVideoVisible(true);
        setOriginalViewVisible(false); // Restore the paused state

        if (audio) {
          audio.src = song.url;
          audio.currentTime = parseFloat(timePoint);
          audio.pause(); // Keep it paused
        }
      }
    } else {
      stopMusic();
      setOriginalViewVisible(true);
    }
  }, [audio]);

  const playMusic = (
    mood: "happy" | "sad" | "calm",
    source: "button" | "analysis",
  ) => {
    stopMusic();
    setMoodSource(source);
    sessionStorage.setItem("currentMood", mood);

    let message = "";
    if (mood === "happy") {
      message = "You seem happy";
    } else if (mood === "sad") {
      message = "You seem sad";
    } else if (mood === "calm") {
      message = "You seem peaceful";
    }

    sessionStorage.setItem("currentMessage", message);

    const filteredSongs = initialData.filter((song: any) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    addToPlaylist22(randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");
    setIsBrown(randomSong.mood === "calm");

    setCurrentMusicName(randomSong.name);
    setCurrentMusicCtg(randomSong.ctg);

    playTrack(randomSong.url);
    setOriginalViewVisible(false);
    setAnimationActive(true);

    sessionStorage.setItem("lastPlayedSong", JSON.stringify(randomSong));
    sessionStorage.setItem("wasPlayingOnHomePage", "true");

    setTimeout(() => {
      setAnimationActive(false);
      setVideoVisible(true);
    }, 1000);
  };

  const handleVideoClick = () => {
    setOriginalViewVisible(true);
    setAnimationActive(false);
    setVideoVisible(false);
    stopMusic();
    sessionStorage.setItem("wasPlayingOnHomePage", "false");
    sessionStorage.setItem("wasPausedOnHomePage", "true");
  };

  useEffect(() => {
    const handleMusicStopped = () => {
      setOriginalViewVisible(true);
      setAnimationActive(false);
      setVideoVisible(false);
      setCurrentMusicName(null);
    };

    window.addEventListener("musicStopped", handleMusicStopped);

    return () => {
      window.removeEventListener("musicStopped", handleMusicStopped);
    };
  }, []);

  const OriginalViewPart = () => (
    <>
      <div>
        <Greeting />
      </div>
      <div>
        <SentimentAnalysisPage
          onSentimentAnalyzed={handleSentimentAnalysis}
          playMusic={playMusic}
        />
      </div>
    </>
  );

  const handleSentimentAnalysis = useCallback((message: string) => {
    setMoodSource("analysis");
    sessionStorage.setItem("moodSource", "analysis");
    sessionStorage.setItem("currentMessage", message);
  }, []);

  const getMoodMessage = () => {
    const displayMessage = sessionStorage.getItem("currentMessage");
    if (displayMessage) {
      return displayMessage;
    } else {
      return "You have no mood at the moment";
    }
  };

  return (
    <div className="relative min-h-screen px-4 pb-20">
      {isOriginalViewVisible && <OriginalViewPart />}

      {/* Mood Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 m-3">
        <button
          onClick={() => playMusic("happy", "button")}
          className={isRed ? "active-button-style" : "inactive-button-style"}
        >
          Happy
        </button>
        <button
          onClick={() => playMusic("sad", "button")}
          className={isBlue ? "active-button-style" : "inactive-button-style"}
        >
          Sad
        </button>
        <button
          onClick={() => playMusic("calm", "button")}
          className={isBrown ? "active-button-style" : "inactive-button-style"}
        >
          Calm
        </button>
      </div>

      {/* Music Image and Video Positioned Together */}
      <div className="relative flex justify-center items-center w-full mx-auto max-w-screen-lg lg:max-w-screen-xl mt-4 mb-10">
        {currentSong && currentSong.imgUrl && (
          <div className="relative w-full max-w-full h-[55vh]">
            <CustomImage
              src={currentSong.imgUrl}
              alt={currentMusicName || "an image associated with the music"}
              dataUrl={currentTrack}
              layout="responsive"
              width={1400}
              height={700}
              className="cursor-pointer w-full h-full object-cover"
              ctg={currentMusicCtg}
              mood={currentSong.mood}
            />

            {isVideoVisible && (
              <div
                className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 w-40 h-40 lg:w-48 lg:h-48 cursor-pointer"
                onClick={handleVideoClick}
              >
                <video
                  src="/animation-center-yellowbg-noblinking.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 text-center p-1 bg-opacity-75 bg-black text-white text-xs lg:text-sm font-bold">
                  {getMoodMessage()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
