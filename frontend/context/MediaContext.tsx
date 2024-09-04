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
  ): MusicWithImageSimplified[] => {
    // Assuming mediaData is available and is of type MusicWithImageSimplified[]
    console.log("mediaData from skipTrack ==== ", mediaData);
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
    // console.log(
    //   "storedPlaylist from skipTrack of MediaContext === ",
    //   storedPlaylist,
    // );
    let updatedPlaylist: MusicWithImageSimplified[] = storedPlaylist
      ? JSON.parse(storedPlaylist)
      : [];
    console.log(
      "updatedPlaylist before push next song from skipTrack of MediaContext === ",
      updatedPlaylist,
    );
    // Check if the next song is already in the playlist; if not, add it
    // This is critical code for real time updating the play list when clicking next or previous button !!
    if (!updatedPlaylist.find((song) => song.url === nextSong.url)) {
      updatedPlaylist.push(nextSong); // Add the new song if it isn't already in the playlist
    }
    console.log(
      "updatedPlaylist after push next song from skipTrack of MediaContext === ",
      updatedPlaylist,
    );
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
