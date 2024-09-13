// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   ReactNode,
//   useEffect,
// } from "react";
// import {
//   MusicWithImageSimplified,
//   MediaContextType,
//   MusicWithImage,
// } from "../types/type";
// import { addToPlaylist22 } from "utils/addToPlaylist";
// import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages";

// const MediaContext = createContext<MediaContextType>({
//   mediaData: [],
//   isRed: false,
//   isBlue: false,
//   isBrown: false,
//   audio: null,
//   currentTrack: null,
//   currentSong: null,
//   setCurrentSong: () => {},
//   isPlaying: false,

//   setIsPlaying: () => {},

//   setIsRed: () => {},
//   setIsBlue: () => {},
//   setIsBrown: () => {},
//   setMediaData: () => {},
//   playTrack: () => {},
//   pauseTrack: () => {},
//   togglePlayPause: () => {},
//   stopMusic: () => {},
//   skipTrack: () => [],
// });

// interface MediaProviderProps {
//   children: ReactNode;
// }

// export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
//   const [mediaData, setMediaData] = useState<MusicWithImage[]>([]);
//   const [isRed, setIsRed] = useState(false);
//   const [isBlue, setIsBlue] = useState(false);
//   const [isBrown, setIsBrown] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
//   const [currentTrack, setCurrentTrack] = useState<string | null>(null);
//   const [currentSong, setCurrentSong] =
//     useState<MusicWithImageSimplified | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);

//   const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]); // State to manage playlist

//   // Function to check if the user is currently on the homepage
//   const isHomePage = () => window.location.pathname === "/";

//   // Fetch mediaData when the component mounts
//   useEffect(() => {
//     const fetchMediaData = async () => {
//       try {
//         const data = await fetchAllMusicWithImages(); // Use the utility function to fetch data
//         setMediaData(data); // Set the fetched data to mediaData
//       } catch (error) {
//         console.error("Failed to fetch media data:", error);
//       }
//     };

//     fetchMediaData();
//   }, []);

//   // Initialize the audio element on component mount
//   useEffect(() => {
//     audioRef.current = new Audio();
//     const wasPlayingOnHomePage = sessionStorage.getItem("wasPlayingOnHomePage");

//     if (wasPlayingOnHomePage === "true") {
//       const lastPlayedSong = sessionStorage.getItem("lastPlayedSong");
//       if (lastPlayedSong) {
//         const song = JSON.parse(lastPlayedSong);
//         playTrack(song.url, song);
//       }
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = "";
//         audioRef.current = null;
//       }
//     };
//   }, []);

//   // Handle visibility change to detect if user is navigating away from the homepage
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "hidden" && isHomePage()) {
//         // User is leaving the homepage
//         sessionStorage.setItem(
//           "wasPlayingOnHomePage",
//           isPlaying ? "true" : "false",
//         );
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [isPlaying]);

//   const playTrack = (url: string, song?: MusicWithImageSimplified) => {
//     if (!audioRef.current) return;

//     if (currentTrack === url && isPlaying) {
//       return;
//     } else if (currentTrack === url && !isPlaying) {
//       togglePlayPause();
//       return;
//     }

//     audioRef.current.src = url;
//     audioRef.current
//       .play()
//       .then(() => {
//         setIsPlaying(true);
//         setCurrentTrack(url);

//         // Only set wasPlayingOnHomePage if on the homepage
//         if (isHomePage()) {
//           sessionStorage.setItem("wasPlayingOnHomePage", "true");
//         }

//         if (song) {
//           setCurrentSong(song);
//           addToPlaylist22(song);
//           if (isHomePage()) {
//             // Update the session storage with the last played song
//             sessionStorage.setItem("lastPlayedSong", JSON.stringify(song));
//           }
//         }
//       })
//       .catch((error) => console.error("Failed to play audio:", error));
//   };

//   const pauseTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (audioRef.current.paused) {
//         audioRef.current
//           .play()
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch((error) => console.error("Failed to play audio:", error));
//       } else {
//         pauseTrack();
//       }
//     }
//   };

//   const stopMusic = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       setIsPlaying(false);
//       setCurrentTrack(null);
//       setCurrentSong(null);
//       // Only set wasPlayingOnHomePage if on the homepage
//       if (isHomePage()) {
//         sessionStorage.setItem("wasPlayingOnHomePage", "false");
//         // Clear the last played song when music is stopped
//         sessionStorage.removeItem("lastPlayedSong");
//       }
//     }
//   };

//   const skipTrack = (
//     direction: "next" | "previous",
//     isHomePage: boolean,
//   ): MusicWithImageSimplified[] => {
//     if (!mediaData.length) return [];

//     const currentMood = currentSong?.mood;
//     const filteredSongs =
//       isHomePage && currentMood
//         ? mediaData.filter((song) => song.mood === currentMood)
//         : mediaData;

//     const currentIndex = filteredSongs.findIndex(
//       (track) => track.url === currentSong?.url,
//     );
//     let newIndex;

//     if (direction === "next") {
//       newIndex = (currentIndex + 1) % filteredSongs.length;
//     } else {
//       newIndex =
//         (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
//     }

//     const nextSong = filteredSongs[newIndex];

//     if (nextSong) {
//       playTrack(nextSong.url, nextSong);
//     }

//     const storedPlaylist = localStorage.getItem("playlist");
//     let updatedPlaylist: MusicWithImageSimplified[] = storedPlaylist
//       ? JSON.parse(storedPlaylist)
//       : [];

//     if (!updatedPlaylist.find((song) => song.url === nextSong.url)) {
//       updatedPlaylist.push(nextSong);
//     }

//     localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));

//     return updatedPlaylist;
//   };

//   return (
//     <MediaContext.Provider
//       value={{
//         mediaData,
//         isRed,
//         setIsRed,
//         isBlue,
//         setIsBlue,
//         isBrown,
//         setIsBrown,
//         setMediaData,
//         audio: audioRef.current,
//         currentTrack,
//         currentSong,
//         setCurrentSong,
//         isPlaying,

//         setIsPlaying,
//         playTrack,
//         pauseTrack,
//         togglePlayPause,
//         stopMusic,
//         skipTrack,
//       }}
//     >
//       {children}
//     </MediaContext.Provider>
//   );
// };

// export const useMedia = () => {
//   const context = useContext(MediaContext);
//   if (!context) {
//     throw new Error("useMedia must be used within a MediaProvider");
//   }
//   return context;
// };

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
import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages";

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
  const [mediaData, setMediaData] = useState<MusicWithImage[]>([]);
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [isBrown, setIsBrown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentSong, setCurrentSong] =
    useState<MusicWithImageSimplified | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Utility functions to check which page the user is on
  const getCurrentPageKey = () => {
    if (window.location.pathname === "/") return "HomePage";
    if (window.location.pathname === "/allmusic") return "AllMusicPage";
    if (window.location.pathname === "/mixtape") return "MyPlaylistPage";
    return ""; // Default to an empty string if not on a recognized page
  };

  // Fetch media data when the component mounts
  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const data = await fetchAllMusicWithImages();
        setMediaData(data);
      } catch (error) {
        console.error("Failed to fetch media data:", error);
      }
    };
    fetchMediaData();
  }, []);

  // Initialize the audio element on component mount
  useEffect(() => {
    audioRef.current = new Audio();

    // Restore state for any page (Homepage, AllMusic, MyPlaylist)
    const restoreStateForPage = (page: string) => {
      console.log("ppppp page from restoreStateForPage === ", page);
      const wasPlaying =
        sessionStorage.getItem(`wasPlayingOn${page}`) === "true";
      console.log("wasPlaying from from restoreStateForPage === ", wasPlaying);
      const wasPaused = sessionStorage.getItem(`wasPausedOn${page}`) === "true";
      console.log("wasPaused from from restoreStateForPage === ", wasPaused);

      const lastPlayedSong = sessionStorage.getItem(`lastPlayedSongOn${page}`);
      console.log(
        "lllll lastPlayedSong from restoreStateForPage === ",
        lastPlayedSong,
      );
      const timePoint = sessionStorage.getItem(`timePointOf${page}`);
      console.log("ttttt timepoinst from restoreStateForPage ==== ", timePoint);

      if (lastPlayedSong) {
        const song = JSON.parse(lastPlayedSong);
        setCurrentSong(song);
        setCurrentTrack(song.url);

        if (audioRef.current && timePoint) {
          audioRef.current.src = song.url;
          audioRef.current.currentTime = parseFloat(timePoint);
          if (wasPlaying) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => console.error("Failed to play audio:", error));
          } else if (wasPaused) {
            setIsPlaying(false);
          }
        }
      }
    };

    // Restore state based on the current page
    const pageKey = getCurrentPageKey();
    console.log("pageKey  from MediaContext.tsx === ", pageKey);
    if (pageKey) restoreStateForPage(pageKey);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Handle visibility change to detect if the user is navigating away from the current page
  useEffect(() => {
    const handleVisibilityChange = () => {
      const pageKey = getCurrentPageKey();
      if (document.visibilityState === "hidden" && pageKey) {
        // User is leaving the current page
        sessionStorage.setItem(
          `wasPlayingOn${pageKey}`,
          isPlaying ? "true" : "false",
        );
        sessionStorage.setItem(
          `wasPausedOn${pageKey}`,
          isPlaying ? "false" : "true",
        );
        if (audioRef.current) {
          sessionStorage.setItem(
            `timePointOf${pageKey}`,
            audioRef.current.currentTime.toString(),
          );
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const playTrack = (url: string, song?: MusicWithImageSimplified) => {
    if (!audioRef.current) return;

    if (currentTrack === url && isPlaying) return;

    audioRef.current.src = url;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setCurrentTrack(url);

        if (song) {
          setCurrentSong(song);
          addToPlaylist22(song);

          const pageKey = getCurrentPageKey();
          if (pageKey) {
            sessionStorage.setItem(`wasPlayingOn${pageKey}`, "true");
            sessionStorage.setItem(`wasPausedOn${pageKey}`, "false");
            sessionStorage.setItem(
              `lastPlayedSongOn${pageKey}`,
              JSON.stringify(song),
            );
          }
        }
      })
      .catch((error) => console.error("Failed to play audio:", error));
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);

      const pageKey = getCurrentPageKey();
      if (pageKey) {
        sessionStorage.setItem(`wasPausedOn${pageKey}`, "true");
        sessionStorage.setItem(`wasPlayingOn${pageKey}`, "false");
        sessionStorage.setItem(
          `timePointOf${pageKey}`,
          audioRef.current.currentTime.toString(),
        );
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

      const pageKey = getCurrentPageKey();
      if (pageKey) {
        sessionStorage.setItem(`wasPlayingOn${pageKey}`, "false");
        sessionStorage.setItem(`wasPausedOn${pageKey}`, "false");
        sessionStorage.removeItem(`lastPlayedSongOn${pageKey}`);
        sessionStorage.removeItem(`timePointOf${pageKey}`);
      }
    }
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
        audio: audioRef.current,
        currentTrack,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playTrack,
        pauseTrack,
        togglePlayPause: () => {
          if (audioRef.current) {
            if (audioRef.current.paused) {
              playTrack(audioRef.current.src);
            } else {
              pauseTrack();
            }
          }
        },
        stopMusic,
        skipTrack: () => [], // Implement this function if needed
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
