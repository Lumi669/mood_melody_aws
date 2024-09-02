"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Music, MusicWithImageSimplified } from "../types/type";

interface MediaContextType {
  mediaData: (Music & { imgUrl: string })[];
  isRed: boolean;
  isBlue: boolean;
  isBrown: boolean;
  audio: HTMLAudioElement | null;
  currentTrack: string | null;
  currentSong: MusicWithImageSimplified | null;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsRed: Dispatch<SetStateAction<boolean>>;
  setIsBlue: Dispatch<SetStateAction<boolean>>;
  setIsBrown: Dispatch<SetStateAction<boolean>>;
  setCurrentSong: Dispatch<SetStateAction<MusicWithImageSimplified | null>>;
  setMediaData: Dispatch<SetStateAction<(Music & { imgUrl: string })[]>>;
  playTrack: (url: string, song?: MusicWithImageSimplified) => void; // Updated to include song
  pauseTrack: () => void;
  togglePlayPause: () => void;
  stopMusic: () => void;
  skipTrack: (direction: "next" | "previous") => MusicWithImageSimplified[]; // Updated to return the correct type
  addToPlaylist: (song: MusicWithImageSimplified) => void;
}

const MediaContext = createContext<MediaContextType>({
  mediaData: [],
  isRed: false,
  isBlue: false,
  isBrown: false,
  audio: null,
  currentTrack: null,
  currentSong: null,
  setCurrentSong: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  setIsRed: () => {},
  setIsBlue: () => {},
  setIsBrown: () => {},
  setMediaData: () => {},
  playTrack: () => {},
  pauseTrack: () => {},
  togglePlayPause: () => {},
  stopMusic: () => {},
  skipTrack: () => [],
  addToPlaylist: () => {},
});

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [mediaData, setMediaData] = useState<MediaContextType["mediaData"]>([]);
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [isBrown, setIsBrown] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentSong, setCurrentSong] =
    useState<MusicWithImageSimplified | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]); // State to manage playlist

  // Initialize the audio element on mount
  useEffect(() => {
    const newAudio = new Audio();
    setAudio(newAudio);

    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, []);

  useEffect(() => {
    // Synchronize playlist with localStorage
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (song: MusicWithImageSimplified) => {
    setPlaylist((prevPlaylist) => {
      // Only add the song if it is not already in the playlist
      const exists = prevPlaylist.find((item) => item.url === song.url);
      if (!exists) {
        return [...prevPlaylist, song];
      }
      return prevPlaylist;
    });
  };

  const playTrack = (url: string, song?: MusicWithImageSimplified) => {
    if (!audio) return;

    // If the same track is clicked again, toggle play/pause
    if (currentTrack === url) {
      togglePlayPause();
      return;
    }

    audio.src = url;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Failed to play audio:", error));

    setCurrentTrack(url);
    setIsPlaying(true);

    if (song) {
      setCurrentSong(song);
      addToPlaylist(song); // Add the song to the playlist whenever a new song is played
    }
  };

  const pauseTrack = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (audio) {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Failed to play audio:", error));
      } else {
        pauseTrack();
      }
    }
  };

  const stopMusic = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrack(null);
      setCurrentSong(null);
    }
  };

  const skipTrack = (
    direction: "next" | "previous",
  ): MusicWithImageSimplified[] => {
    // Assuming mediaData is available and is of type MusicWithImageSimplified[]
    if (!mediaData.length) return []; // Return an empty array if no songs are available

    const currentIndex = mediaData.findIndex(
      (track) => track.url === currentSong?.url,
    );
    let newIndex;

    // Calculate the new index based on the direction
    if (direction === "next") {
      newIndex = (currentIndex + 1) % mediaData.length;
    } else {
      newIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    }

    const nextSong = mediaData[newIndex];
    if (nextSong) {
      playTrack(nextSong.url, nextSong); // Play the next song
    }

    // Retrieve the current playlist from localStorage
    const storedPlaylist = localStorage.getItem("playlist");
    let updatedPlaylist: MusicWithImageSimplified[] = storedPlaylist
      ? JSON.parse(storedPlaylist)
      : [];

    // Check if the next song is already in the playlist; if not, add it
    // This is critical code for real time updating the play list when clicking next or previous button !!
    if (!updatedPlaylist.find((song) => song.url === nextSong.url)) {
      updatedPlaylist.push(nextSong); // Add the new song if it isn't already in the playlist
    }

    // Update the playlist in localStorage to ensure synchronization
    localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));

    // Return the updated playlist
    return updatedPlaylist;
  };

  return (
    <MediaContext.Provider
      value={{
        mediaData,
        isRed,
        setIsRed,
        isBlue,
        setIsBlue,
        isBrown,
        setIsBrown,
        setMediaData,
        audio,
        currentTrack,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playTrack,
        pauseTrack,
        togglePlayPause,
        stopMusic,
        skipTrack,
        addToPlaylist,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
