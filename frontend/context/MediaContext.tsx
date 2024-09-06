"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MusicWithImageSimplified, MediaContextType } from "../types/type";

import { addToPlaylist22 } from "utils/addToPlaylist";
import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages"; // Import the utility function

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
});

interface MediaProviderProps {
  children: ReactNode;
}

interface skipTrackProps {
  direction: "next" | "previous";
  isHomePage: boolean;
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

  // Fetch mediaData when the component mounts
  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const data = await fetchAllMusicWithImages(); // Use the utility function to fetch data
        setMediaData(data); // Set the fetched data to mediaData
      } catch (error) {
        console.error("Failed to fetch media data:", error);
      }
    };

    fetchMediaData();
  }, []);

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

  const playTrack = (url: string, song?: MusicWithImageSimplified) => {
    console.log("playTrack get called ...");
    console.log("audio === ", audio);
    if (!audio) return;

    // If the same track is clicked again, toggle play/pause
    if (currentTrack === url) {
      togglePlayPause();
      return;
    }

    console.log("111111");

    audio.src = url;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Failed to play audio:", error));

    console.log("2222222");

    setCurrentTrack(url);
    setIsPlaying(true);

    console.log("33333");

    if (song) {
      console.log("song at 44444 === ", song);
      console.log("4444");

      setCurrentSong(song);
      addToPlaylist22(song); // Add the song to the playlist whenever a new song is played
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
    isHomePage: boolean, // Add isHomePage parameter
  ): MusicWithImageSimplified[] => {
    if (!mediaData.length) return []; // Return an empty array if no songs are available

    // Determine if the current page is the homepage
    const currentMood = currentSong?.mood;
    const filteredSongs =
      isHomePage && currentMood
        ? mediaData.filter((song) => song.mood === currentMood)
        : mediaData; // If not on the homepage, use all songs

    const currentIndex = filteredSongs.findIndex(
      (track) => track.url === currentSong?.url,
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredSongs.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    }

    const nextSong = filteredSongs[newIndex];
    if (nextSong) {
      playTrack(nextSong.url, nextSong);
    }

    const storedPlaylist = localStorage.getItem("playlist");
    let updatedPlaylist: MusicWithImageSimplified[] = storedPlaylist
      ? JSON.parse(storedPlaylist)
      : [];

    if (!updatedPlaylist.find((song) => song.url === nextSong.url)) {
      updatedPlaylist.push(nextSong);
    }

    localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));

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
        // addToPlaylist,
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
