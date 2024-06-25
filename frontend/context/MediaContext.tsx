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

  const playTrack = (url: string) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(url);
    setAudio(newAudio);
    setCurrentTrack(url);
    newAudio.play();
  };

  const togglePlayPause = (url: string) => {
    if (currentTrack === url) {
      if (audio) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    } else {
      playTrack(url);
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

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
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
