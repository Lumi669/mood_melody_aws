// MusicPlayer.tsx
import React, { useState } from "react";
import { useMedia } from "../../context/MediaContext";

const MusicPlayer: React.FC = () => {
  const { mediaData } = useMedia();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playMusic = (mood: "happy" | "sad") => {
    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(randomSong.url);
    setAudio(newAudio);
    newAudio.play();
  };

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
    </>
  );
};

export default MusicPlayer;
