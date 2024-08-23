// import React, { useState, useEffect } from "react";

// import { useMedia } from "../context/MediaContext";

// import { addToPlaylist } from "../utils/addToPlaylist";
// import CustomImage from "./CustomImage";

// // import { MusicWithImage } from "../../types/type";

// const MusicPlayer: React.FC = () => {
//   const { mediaData, setIsRed, setIsBlue, togglePlayPause } = useMedia();
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
//   const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null); // Image URL state
//   const [currentUrl, setCurrentUrl] = useState<string | null>(null); // music URL state
//   const [currentMusicName, setCurretMusicName] = useState<string | null>(null); // music URL state

//   //for progress bar
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   //for progress bar
//   const [duration, setDuration] = useState<number>(0);

//   //for draggable progress bar
//   const [isDragging, setIsDragging] = useState<boolean>(false);

//   const playMusic = (mood: "happy" | "sad") => {
//     stopMusic();
//     const filteredSongs = mediaData.filter((song) => song.mood === mood);
//     const randomSong =
//       filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
//     addToPlaylist(randomSong);

//     console.log("random song === ", randomSong);
//     if (audio) {
//       audio.pause();
//     }
//     const newAudio = new Audio(randomSong.url);

//     //for progress bar
//     newAudio.addEventListener("loadedmetadata", () => {
//       setDuration(newAudio.duration);
//     });

//     //for draggable progress bar
//     newAudio.addEventListener("timeupdate", () => {
//       if (!isDragging) {
//         setCurrentTime(newAudio.currentTime);
//       }
//     });

//     setIsRed(randomSong.mood === "happy");
//     setIsBlue(randomSong.mood === "sad");

//     setCurrentImageUrl(randomSong.imgUrl);
//     setCurrentUrl(randomSong.url);
//     setCurretMusicName(randomSong.name);

//     setAudio(newAudio);
//     newAudio.play();
//     console.log("audo ccc=== ", audio);
//     console.log("newaudio ccc=== ", newAudio);
//   };

//   const stopMusic = () => {
//     if (audio) {
//       console.log("audio ===== ", audio);
//       audio.pause();
//       audio.currentTime = 0;
//       setCurrentTime(0);
//     }
//   };

//   const toggleMusic = () => {
//     if (audio) {
//       if (audio.paused) {
//         audio.play();
//       } else {
//         audio.pause();
//       }
//     }
//   };

//   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const time = parseFloat(event.target.value);
//     if (audio) {
//       audio.currentTime = time;
//       setCurrentTime(time);
//     }
//   };

//   const handleSliderStart = () => {
//     setIsDragging(true);
//   };

//   const handleSliderEnd = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     return () => {
//       if (audio) {
//         audio.pause();
//         audio.removeEventListener("loadedmetadata", () =>
//           setDuration(audio.duration),
//         );
//         audio.removeEventListener("timeupdate", () =>
//           setCurrentTime(audio.currentTime),
//         );
//       }
//     };
//   }, [audio]);

//   console.log("currentImageUrl ======= ", currentImageUrl);

//   return (
//     <>
//       <button
//         onClick={() => {
//           playMusic("happy");
//         }}
//         style={{ margin: "10px" }}
//       >
//         Happy
//       </button>
//       <button
//         onClick={() => {
//           playMusic("sad");
//         }}
//         style={{ margin: "10px" }}
//       >
//         Sad
//       </button>
//       <button
//         onClick={() => {
//           stopMusic();
//         }}
//         style={{ margin: "10px" }}
//       >
//         Stop
//       </button>

//       <div className="w-[500px] h-[400px] bg-red-500 relative ">
//         {currentImageUrl && (
//           <CustomImage
//             src={currentImageUrl}
//             alt={currentMusicName || "an image associated with the music"}
//             dataUrl={currentUrl}
//             layout="responsive"
//             width={800}
//             height={800}
//             onClick={toggleMusic}
//             className="cursor-pointer"
//           />
//         )}
//         {audio && (
//           <input
//             type="range"
//             min="0"
//             max={duration || 1} // Ensure max is never 0 to avoid a React error
//             value={currentTime}
//             onChange={handleSliderChange}
//             onMouseDown={handleSliderStart}
//             onMouseUp={handleSliderEnd}
//             onTouchStart={handleSliderStart}
//             onTouchEnd={handleSliderEnd}
//             style={{ width: "100%" }}
//             className="absolute bottom-0 left-0 w-full"
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default MusicPlayer;

// import React, { useState, useEffect } from "react";
// import { useMedia } from "../context/MediaContext";
// import { addToPlaylist } from "../utils/addToPlaylist";
// import CustomImage from "./CustomImage";

// const MusicPlayer: React.FC = () => {
//   const {
//     mediaData,
//     setIsRed,
//     setIsBlue,
//     playTrack,
//     togglePlayPause,
//     stopMusic,
//     currentTrack,
//   } = useMedia();
//   const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
//   const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
//   const [currentTime, setCurrentTime] = useState<number>(0); // For progress bar
//   const [duration, setDuration] = useState<number>(0); // For progress bar
//   const [isDragging, setIsDragging] = useState<boolean>(false); // For draggable progress bar
//   const [userInitiated, setUserInitiated] = useState<boolean>(false); // Track user-initiated play

//   const playMusic = (mood: "happy" | "sad") => {
//     stopMusic(); // Stop any currently playing music

//     const filteredSongs = mediaData.filter((song) => song.mood === mood);
//     const randomSong =
//       filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
//     addToPlaylist(randomSong);

//     setIsRed(randomSong.mood === "happy");
//     setIsBlue(randomSong.mood === "sad");

//     setCurrentImageUrl(randomSong.imgUrl);
//     setCurrentMusicName(randomSong.name);

//     setUserInitiated(true); // Mark this as a user-initiated play
//     playTrack(randomSong.url); // Play the new track using the global context
//   };

//   const toggleMusic = () => {
//     console.log("Toggling music for currentTrack:", currentTrack);
//     if (currentTrack) {
//       togglePlayPause(currentTrack);
//     }
//   };

//   const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const time = parseFloat(event.target.value);
//     if (currentTrack) {
//       const newAudio = new Audio(currentTrack);
//       newAudio.currentTime = time;
//       setCurrentTime(time);
//     }
//   };

//   const handleSliderStart = () => {
//     setIsDragging(true);
//   };

//   const handleSliderEnd = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (currentTrack && userInitiated) {
//       const newAudio = new Audio(currentTrack);
//       newAudio.addEventListener("loadedmetadata", () => {
//         setDuration(newAudio.duration);
//       });
//       newAudio.addEventListener("timeupdate", () => {
//         if (!isDragging) {
//           setCurrentTime(newAudio.currentTime);
//         }
//       });
//       newAudio.play();
//       return () => {
//         newAudio.pause();
//         newAudio.currentTime = 0;
//       };
//     }
//   }, [currentTrack, userInitiated, isDragging]);

//   return (
//     <>
//       <button onClick={() => playMusic("happy")} style={{ margin: "10px" }}>
//         Happy
//       </button>
//       <button onClick={() => playMusic("sad")} style={{ margin: "10px" }}>
//         Sad
//       </button>
//       <button onClick={stopMusic} style={{ margin: "10px" }}>
//         Stop
//       </button>

//       <div className="w-[500px] h-[400px] bg-red-500 relative">
//         {currentImageUrl && (
//           <CustomImage
//             src={currentImageUrl}
//             alt={currentMusicName || "an image associated with the music"}
//             dataUrl={currentTrack}
//             layout="responsive"
//             width={800}
//             height={800}
//             onClick={toggleMusic} // This now properly toggles play/pause
//             className="cursor-pointer"
//           />
//         )}
//         {currentTrack && (
//           <input
//             type="range"
//             min="0"
//             max={duration || 1} // Ensure max is never 0 to avoid a React error
//             value={currentTime}
//             onChange={handleSliderChange}
//             onMouseDown={handleSliderStart}
//             onMouseUp={handleSliderEnd}
//             onTouchStart={handleSliderStart}
//             onTouchEnd={handleSliderEnd}
//             style={{ width: "100%" }}
//             className="absolute bottom-0 left-0 w-full"
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default MusicPlayer;

import React, { useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";
import { addToPlaylist } from "../utils/addToPlaylist";
import CustomImage from "./CustomImage";

const MusicPlayer: React.FC = () => {
  const {
    mediaData,
    setIsRed,
    setIsBlue,
    playTrack,
    togglePlayPause,
    stopMusic,
    currentTrack,
    isPlaying,
  } = useMedia();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0); // For progress bar
  const [duration, setDuration] = useState<number>(0); // For progress bar
  const [isDragging, setIsDragging] = useState<boolean>(false); // For draggable progress bar

  const playMusic = (mood: "happy" | "sad") => {
    stopMusic(); // Stop any currently playing music

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    addToPlaylist(randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");

    setCurrentImageUrl(randomSong.imgUrl);
    setCurrentMusicName(randomSong.name);

    playTrack(randomSong.url); // Play the new track using the global context
  };

  const handleImageClick = () => {
    if (currentTrack) {
      togglePlayPause(currentTrack); // Toggle play/pause using the context function
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (currentTrack && isPlaying) {
      const newAudio = new Audio(currentTrack);
      newAudio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSliderStart = () => {
    setIsDragging(true);
  };

  const handleSliderEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (currentTrack) {
      const newAudio = new Audio(currentTrack);
      newAudio.addEventListener("loadedmetadata", () =>
        setDuration(newAudio.duration),
      );
      newAudio.addEventListener("timeupdate", () => {
        if (!isDragging) {
          setCurrentTime(newAudio.currentTime);
        }
      });
      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [currentTrack, isDragging]);

  return (
    <>
      <button onClick={() => playMusic("happy")} style={{ margin: "10px" }}>
        Happy
      </button>
      <button onClick={() => playMusic("sad")} style={{ margin: "10px" }}>
        Sad
      </button>
      <button onClick={stopMusic} style={{ margin: "10px" }}>
        Stop
      </button>

      <div className="w-[500px] h-[400px] bg-red-500 relative">
        {currentImageUrl && (
          <CustomImage
            src={currentImageUrl}
            alt={currentMusicName || "an image associated with the music"}
            dataUrl={currentTrack}
            layout="responsive"
            width={800}
            height={800}
            onClick={handleImageClick} // This now properly toggles play/pause
            className="cursor-pointer"
          />
        )}
        {currentTrack && (
          <input
            type="range"
            min="0"
            max={duration || 1} // Ensure max is never 0 to avoid a React error
            value={currentTime}
            onChange={handleSliderChange}
            onMouseDown={handleSliderStart}
            onMouseUp={handleSliderEnd}
            onTouchStart={handleSliderStart}
            onTouchEnd={handleSliderEnd}
            style={{ width: "100%" }}
            className="absolute bottom-0 left-0 w-full"
          />
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
