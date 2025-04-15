"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import {
  MusicWithImageSimplified,
  MediaContextType,
  MusicWithImage,
} from "../types/type";
import { addToPlaylist22 } from "utils/addToPlaylist";

const MediaContext = createContext<MediaContextType>({
  mediaData: [],
  isRed: false,
  isBlue: false,
  isBrown: false,
  audio: null,
  currentTrack: null,
  setCurrentTrack: () => {},
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

// Define the props for MediaProvider
interface MediaProviderProps {
  children: ReactNode;
  initialData?: MusicWithImage[];
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
  initialData,
}) => {
  const [mediaData, setMediaData] = useState<MusicWithImage[]>(
    initialData || [],
  );
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [isBrown, setIsBrown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentSong, setCurrentSong] =
    useState<MusicWithImageSimplified | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]); // State to manage playlist

  // const [fetchError, setFetchError] = useState<string | null>(null); // For error handling

  const isHomePage = () => window.location.pathname === "/";

  // // Fetch mediaData when the component mounts
  // useEffect(() => {
  //   const fetchMediaData = async () => {
  //     try {
  //       const result = await fetchAllMusicWithImages(); // fetch data
  //       if (result.error) {
  //         setFetchError(result.message || "Failed to fetch media data.");
  //       } else {
  //         setMediaData(result.data); // Update state with valid data
  //         setFetchError(null); // Clear any previous errors
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch media data:", error);
  //       setFetchError("An unexpected error occurred.");
  //     }
  //   };

  //   fetchMediaData();
  // }, []);

  useEffect(() => {
    audioRef.current = new Audio(); // Create a new audio element
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const wasPlayingOnHomePage = sessionStorage.getItem("wasPlayingOnHomePage");
    const wasPausedOnHomePage = sessionStorage.getItem("wasPausedOnHomePage");
    const timePoint = sessionStorage.getItem("timePointOfHomePage");

    // Check if music was previously playing or paused on the homepage
    if (wasPlayingOnHomePage === "true") {
      const lastPlayedSong = sessionStorage.getItem("lastPlayedSong");
      if (lastPlayedSong) {
        const song = JSON.parse(lastPlayedSong);
        setCurrentSong(song);
        setCurrentTrack(song.url);

        // Stop any other music playing on the other pages
        if (audioRef.current) {
          audioRef.current.pause();
        }

        playTrack(song.url, song); // Play the homepage music
        setIsPlaying(true);
      }
    } else if (wasPausedOnHomePage === "true" && timePoint) {
      const lastPlayedSong = sessionStorage.getItem("lastPlayedSong");
      if (lastPlayedSong) {
        const song = JSON.parse(lastPlayedSong);
        setCurrentSong(song);
        setCurrentTrack(song.url);

        // Stop any other music playing from other pages
        if (audioRef.current) {
          audioRef.current.pause();
        }

        // Restore the paused state
        if (audioRef.current) {
          audioRef.current.src = song.url;
          audioRef.current.currentTime = parseFloat(timePoint);
        }
        setIsPlaying(false); // Keep it paused
      }
    }

    // Cleanup: Ensure music stops when leaving the homepage
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle visibility change to detect if user is navigating away from the homepage
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isHomePage()) {
        // Save the homepage's music state
        sessionStorage.setItem(
          "wasPlayingOnHomePage",
          isPlaying ? "true" : "false",
        );
        sessionStorage.setItem(
          "wasPausedOnHomePage",
          !isPlaying ? "true" : "false",
        );
        sessionStorage.setItem(
          "timePointOfHomePage",
          audioRef.current?.currentTime.toString() || "0",
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const playTrack = (url: string, song?: MusicWithImageSimplified) => {
    if (!audioRef.current) {
      console.error("Audio element is not available.");
      return;
    }

    console.log("Attempting to play track with URL:", url);

    // If the src is the same and the track is already playing, do nothing
    if (audioRef.current.src === url && !audioRef.current.paused) {
      console.log("Track is already playing, no action needed.");
      return;
    }

    // If the src is the same but the track is paused, resume playback
    if (audioRef.current.src === url && audioRef.current.paused) {
      console.log("Resuming paused track.");
      audioRef.current
        .play()
        .then(() => {
          console.log("Playback resumed successfully.");
          setIsPlaying(true);
        })
        .catch((error) => {
          // Only log the error if it's not in debugging mode i.e inspect (DevTools) is open
          if (
            !(
              navigator.webdriver ||
              window.performance?.getEntriesByType("resource").length > 0
            )
          ) {
            console.error("Failed to resume playback:", error);
          }
        });
      return;
    }

    // Otherwise, update the src and play the new track
    console.log("Updating audio source to:", url);
    audioRef.current.pause(); // Pause any existing playback
    audioRef.current.src = url;

    const handleCanPlay = () => {
      console.log("Audio is ready to play.");
      audioRef.current
        ?.play()
        .then(() => {
          console.log("Playback started successfully.");
          setIsPlaying(true);
          setCurrentTrack(url);

          if (isHomePage()) {
            sessionStorage.setItem("wasPlayingOnHomePage", "true");
            sessionStorage.setItem("wasPausedOnHomePage", "false");
          }

          if (song) {
            setCurrentSong(song);
            addToPlaylist22(song);

            if (isHomePage()) {
              sessionStorage.setItem("lastPlayedSong", JSON.stringify(song));
            }
          }
        })
        .catch((error) => {
          // Only log the error if it's not in debugging mode
          if (
            !(
              navigator.webdriver ||
              window.performance?.getEntriesByType("resource").length > 0
            )
          ) {
            console.error("Failed to start playback:", error);
          }
        });
    };

    // Use the "loadedmetadata" event instead of "canplay" for better timing
    audioRef.current.addEventListener("loadedmetadata", handleCanPlay, {
      once: true,
    });

    // Cleanup listener
    return () => {
      audioRef.current?.removeEventListener("loadedmetadata", handleCanPlay);
    };
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);

      if (isHomePage()) {
        sessionStorage.setItem("wasPausedOnHomePage", "true");
        sessionStorage.setItem(
          "timePointOfHomePage",
          audioRef.current.currentTime.toString(),
        );
        sessionStorage.setItem("wasPlayingOnHomePage", "false");
      }
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrack(null);
      setCurrentSong(null);

      if (isHomePage()) {
        sessionStorage.setItem("wasPlayingOnHomePage", "false");
        sessionStorage.setItem("wasPausedOnHomePage", "false");

        sessionStorage.removeItem("lastPlayedSong");
        sessionStorage.removeItem("timePointOfHomePage");
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            sessionStorage.setItem("wasPlayingOnHomePage", "true");
            sessionStorage.setItem("wasPausedOnHomePage", "false");
          })
          .catch((error) => console.error("Failed to play audio:", error));
      } else {
        pauseTrack();
      }
    }
  };

  const skipTrack = (
    direction: "next" | "previous",
    isHomePage: boolean,
  ): MusicWithImageSimplified[] => {
    if (!mediaData.length) return [];

    const currentMood = currentSong?.mood;
    const filteredSongs =
      isHomePage && currentMood
        ? mediaData.filter((song) => song.mood === currentMood)
        : mediaData;

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
        audio: audioRef.current ?? null,
        currentTrack,
        setCurrentTrack,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playTrack,
        pauseTrack,
        togglePlayPause,
        stopMusic,
        skipTrack,
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
