// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { Music, MusicWithImageSimplified } from "../types/type";

// interface MediaContextType {
//   mediaData: (Music & { imgUrl: string })[];
//   isRed: boolean;
//   isBlue: boolean;
//   isBrown: boolean;
//   audio: HTMLAudioElement | null;
//   currentTrack: string | null;
//   currentSong: MusicWithImageSimplified | null;
//   isPlaying: boolean;

//   setIsPlaying: Dispatch<SetStateAction<boolean>>;
//   setIsRed: Dispatch<SetStateAction<boolean>>;
//   setIsBlue: Dispatch<SetStateAction<boolean>>;
//   setIsBrown: Dispatch<SetStateAction<boolean>>;
//   setCurrentSong: Dispatch<SetStateAction<MusicWithImageSimplified | null>>;
//   setMediaData: Dispatch<SetStateAction<(Music & { imgUrl: string })[]>>;
//   playTrack: (url: string) => void;
//   togglePlayPause: (url: string) => void;
//   stopMusic: () => void;
// }

// const MediaContext = createContext<MediaContextType>({
//   mediaData: [],
//   isRed: false,
//   isBlue: false,
//   isBrown: false,
//   audio: null,
//   currentTrack: null,
//   currentSong: null,
//   setCurrentSong: () => {},
//   isPlaying: false, // NEW
//   setIsPlaying: () => {},
//   setIsRed: () => {},
//   setIsBlue: () => {},
//   setIsBrown: () => {},
//   setMediaData: () => {},
//   playTrack: () => {},
//   togglePlayPause: () => {},
//   stopMusic: () => {},
// });

// interface MediaProviderProps {
//   children: ReactNode;
// }

// export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
//   const [mediaData, setMediaData] = useState<MediaContextType["mediaData"]>([]);
//   const [isRed, setIsRed] = useState(false);
//   const [isBlue, setIsBlue] = useState(false);
//   const [isBrown, setIsBrown] = useState(false);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
//   const [currentTrack, setCurrentTrack] = useState<string | null>(null);
//   const [currentSong, setCurrentSong] =
//     useState<MusicWithImageSimplified | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false); // NEW

//   const playTrack = (url: string) => {
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0; // Reset the audio
//     }
//     const newAudio = new Audio(url);
//     setAudio(newAudio);
//     setCurrentTrack(url);
//     setIsPlaying(true);

//     newAudio
//       .play()
//       .catch((error) => console.error("Failed to play audio:", error));
//   };

//   const togglePlayPause = () => {
//     if (audio) {
//       if (audio.paused) {
//         audio
//           .play()
//           .then(() => setIsPlaying(true))
//           .catch((error) => console.error("Failed to play audio:", error));
//       } else {
//         audio.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   const stopMusic = () => {
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0; // Reset the audio
//       setIsPlaying(false);
//       setCurrentTrack(null);
//       setCurrentSong(null);
//     }
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
//         audio,
//         currentTrack,
//         currentSong,
//         setCurrentSong,
//         isPlaying, // NEW
//         setIsPlaying,
//         playTrack,
//         togglePlayPause,
//         stopMusic,
//       }}
//     >
//       {children}
//     </MediaContext.Provider>
//   );
// };

// export const useMedia = () => {
//   const context = useContext(MediaContext);
//   console.log("useMedia hook called:", context); // Add this log
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
  playTrack: (url: string) => void;
  pauseTrack: () => void; // NEW
  togglePlayPause: () => void;
  stopMusic: () => void;
  skipTrack: (direction: "next" | "previous") => void;
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
  pauseTrack: () => {}, // NEW
  togglePlayPause: () => {},
  stopMusic: () => {},
  skipTrack: () => {},
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

  useEffect(() => {
    const newAudio = new Audio();
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, []);

  const playTrack = (url: string) => {
    if (!audio) return;

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
        pauseTrack(); // Use the new pauseTrack function
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

  const skipTrack = (direction: "next" | "previous") => {
    if (!mediaData.length) return;

    const currentIndex = mediaData.findIndex(
      (track) => track.url === currentTrack,
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % mediaData.length;
    } else {
      newIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    }

    const nextSong = mediaData[newIndex];
    if (nextSong) {
      playTrack(nextSong.url);
      setCurrentSong(nextSong);
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
        audio,
        currentTrack,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playTrack,
        pauseTrack, // NEW
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
