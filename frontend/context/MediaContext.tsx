"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Music } from "../types/type";

interface MediaContextType {
  mediaData: (Music & { imgUrl: string })[]; // Include mood property from Music interface and imgUrl
  isRed: boolean;
  isBlue: boolean;
  audio: HTMLAudioElement | null;
  currentTrack: string | null;
  setIsRed: Dispatch<SetStateAction<boolean>>; // Corrected type
  setIsBlue: Dispatch<SetStateAction<boolean>>; // Corrected type
  setMediaData: Dispatch<SetStateAction<(Music & { imgUrl: string })[]>>;

  playTrack: (url: string) => void;
  togglePlayPause: (url: string) => void;
  stopMusic: () => void;
}

const MediaContext = createContext<MediaContextType>({
  mediaData: [],
  isRed: false,
  isBlue: false,
  audio: null,
  currentTrack: null,
  setIsRed: () => {},
  setIsBlue: () => {},
  setMediaData: () => {},
  playTrack: () => {},
  togglePlayPause: () => {},
  stopMusic: () => {},
});

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
}: any) => {
  const [mediaData, setMediaData] = useState<MediaContextType["mediaData"]>([]);
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Fetch music and image data and match them
  //     const matchedData = await fetchAllMusicWithImages();
  //     console.log("matchedData ===== ", matchedData);
  //     setMediaData(matchedData);
  //   };

  //   fetchData();
  // }, []);

  const playTrack = async (url: string) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio
    }
    const newAudio = new Audio(url);
    console.log("url from playTrck === ", url);
    console.log("newAudio from playTrck === ", newAudio);
    setAudio(newAudio);
    setCurrentTrack(url);

    try {
      await newAudio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  const togglePlayPause = async (url: string) => {
    if (currentTrack === url) {
      if (audio) {
        if (audio.paused) {
          try {
            await audio.play();
          } catch (error) {
            console.error("Failed to play audio:", error);
          }
        } else {
          audio.pause();
        }
      }
    } else {
      await playTrack(url);
    }
  };

  const stopMusic = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio
      setCurrentTrack(null);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (audio) {
  //       audio.pause();
  //     }
  //   };
  // }, [audio]);

  return (
    <MediaContext.Provider
      value={{
        mediaData,
        isRed,
        setIsRed,
        isBlue,
        setIsBlue,
        setMediaData,
        audio,
        currentTrack,
        playTrack,
        togglePlayPause,
        stopMusic,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
