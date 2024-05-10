import React, { useState, useEffect } from "react";
import { useMedia } from "../../context/MediaContext";

import { addToPlaylist } from "@/app/utils/addToPlaylist";

// import { MusicWithImage } from "../../types/type";

const MusicPlayer: React.FC = () => {
  const { mediaData } = useMedia();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  //for progress bar
  const [currentTime, setCurrentTime] = useState<number>(0);
  //for progress bar
  const [duration, setDuration] = useState<number>(0);

  //for draggable progress bar
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const playMusic = (mood: "happy" | "sad") => {
    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    addToPlaylist(randomSong);

    console.log("random song === ", randomSong);
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(randomSong.url);

    //for progress bar
    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });

    //for draggable progress bar
    newAudio.addEventListener("timeupdate", () => {
      if (!isDragging) {
        setCurrentTime(newAudio.currentTime);
      }
    });

    setAudio(newAudio);
    newAudio.play();
    console.log("audo ccc=== ", audio);
    console.log("newaudio ccc=== ", newAudio);
  };

  const stopMusic = () => {
    if (audio) {
      console.log("audio ===== ", audio);
      audio.pause();
      audio.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (audio) {
      audio.currentTime = time;
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
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration),
        );
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime),
        );
      }
    };
  }, [audio]);

  return (
    <>
      <button
        onClick={() => {
          playMusic("happy");
        }}
        style={{ margin: "10px" }}
      >
        Happy
      </button>
      <button
        onClick={() => {
          playMusic("sad");
        }}
        style={{ margin: "10px" }}
      >
        Sad
      </button>
      <button
        onClick={() => {
          stopMusic();
        }}
        style={{ margin: "10px" }}
      >
        Stop
      </button>
      {audio && (
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
        />
      )}
    </>
  );
};

export default MusicPlayer;
