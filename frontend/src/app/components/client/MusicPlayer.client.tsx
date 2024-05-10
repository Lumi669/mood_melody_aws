// MusicPlayer.tsx
import React, { useState, useEffect } from "react";
import { useMedia } from "../../context/MediaContext";

const MusicPlayer: React.FC = () => {
  const { mediaData } = useMedia();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  //for progress bar
  const [currentTime, setCurrentTime] = useState<number>(0);
  //for progress bar
  const [duration, setDuration] = useState<number>(0);

  const playMusic = (mood: "happy" | "sad") => {
    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(randomSong.url);

    //for progress bar
    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });
    //for progress bar
    newAudio.addEventListener("timeupdate", () => {
      setCurrentTime(newAudio.currentTime);
    });

    setAudio(newAudio);
    newAudio.play();
  };

  const stopMusic = () => {
    if (audio) {
      console.log("audio ===== ", audio);
      audio.pause();
      audio.currentTime = 0;
    }
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

      {audio && <progress value={currentTime} max={duration}></progress>}
    </>
  );
};

export default MusicPlayer;
