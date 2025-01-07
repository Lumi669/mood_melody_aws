"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMedia } from "@context/MediaContext";
import { addToPlaylist22 } from "@utils/addToPlaylist";
import CustomImage from "@components/CustomImage";
import SentimentAnalysisPage from "@components/Sentimentanalysis";
import Greeting from "./Greeting";

const MusicPlayer: React.FC = () => {
  const {
    setIsRed,
    setIsBlue,
    setIsBrown,
    playTrack,
    stopMusic,
    setCurrentSong,
    currentTrack,
    setCurrentTrack,
    currentSong,
    setIsPlaying,
    isRed,
    isBlue,
    isBrown,
    audio,
    mediaData,
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
        setCurrentTrack(song.url);
        playTrack(song.url, song); // Play the song if it was playing before
        setIsPlaying(true);
        setVideoVisible(true);
        setOriginalViewVisible(false); // Hide the original view when music is playing
      } else if (wasPausedOnHomePage && timePoint) {
        setCurrentSong(song);
        setCurrentTrack(song.url);

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

    const filteredSongs = mediaData.filter((song: any) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    setCurrentTrack(randomSong.url);
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

  console.log(
    "cccc=ssss currentSong from MusicPlayer before render ==== ",
    currentSong,
  );
  console.log(
    "cccc=tttt currentTrack from MusicPlayer before render ==== ",
    currentTrack,
  );

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

      <div className="relative flex w-full mx-auto max-w-screen-md lg:max-w-screen-xl mt-4 mb-0">
        {currentSong && currentSong.imgUrl && (
          <div className="relative w-full max-w-full h-[55vh] ">
            <CustomImage
              src={currentSong.imgUrl}
              alt={currentMusicName || "an image associated with the music"}
              dataUrl={currentTrack}
              width={1800}
              height={900}
              className="cursor-pointer w-full lg:h-full object-cover aspect-[3/2] md:aspect-[2/1]"
              ctg={currentMusicCtg}
              mood={currentSong.mood}
              priority={true}
            />

            {isVideoVisible && (
              <div
                className="absolute right-[-20px] w-40 h-40 md:w-52 md:h-52 lg:bottom-[80px] lg:right-[-40px]  cursor-pointer group"
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
                <div className="absolute top-0 left-0 right-0 text-center p-1 bg-opacity-50 bg-black text-white text-xs lg:text-sm font-bold">
                  {getMoodMessage()}
                </div>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[120%] text-sm text-white px-3 py-1 rounded bg-black bg-opacity-70 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                  Click to go back
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
