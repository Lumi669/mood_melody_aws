// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useMedia } from "@context/MediaContext";
// import { addToPlaylist22 } from "@utils/addToPlaylist";
// import CustomImage from "@components/CustomImage";
// import SentimentAnalysisPage from "@components/Sentimentanalysis";
// import Greeting from "./Greeting";
// import Image from "next/image";

// const MusicPlayer: React.FC = () => {
//   const {
//     mediaData,
//     setIsRed,
//     setIsBlue,
//     setIsBrown,
//     playTrack,
//     stopMusic,
//     setCurrentSong,
//     currentTrack,
//     currentSong,
//     isPlaying,
//     setIsPlaying,
//     isRed,
//     isBlue,
//     isBrown,
//     wasPlaying,
//     setWasPlaying,
//   } = useMedia();

//   const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
//   const [isOriginalViewVisible, setOriginalViewVisible] = useState(true);
//   const [isAnimationActive, setAnimationActive] = useState(false);
//   const [isVideoVisible, setVideoVisible] = useState(false);
//   const [currentMusicCtg, setCurrentMusicCtg] = useState<string | null>(null);
//   const [moodSource, setMoodSource] = useState<"button" | "analysis" | null>(
//     null,
//   );
//   const [sentimentMessage, setSentimentMessage] = useState<string>("");

//   // Retrieve the last played song when the component mounts and force playback
//   useEffect(() => {
//     const currentMood = localStorage.getItem("currentMood");
//     if (currentMood) {
//       const lastPlayedSong = localStorage.getItem(`lastPlayed_${currentMood}`);
//       if (lastPlayedSong) {
//         const song = JSON.parse(lastPlayedSong);
//         setCurrentSong(song); // Set the last played song
//         setTimeout(() => {
//           playTrack(song.url, song); // Play the last played song immediately
//           setIsPlaying(true); // Force set the state to playing
//         }, 0);
//       }
//     }
//   }, []);

//   const playMusic = (
//     mood: "happy" | "sad" | "calm",
//     source: "button" | "analysis",
//   ) => {
//     stopMusic(); // Stop any currently playing music
//     setMoodSource(source);

//     // Store the current mood in localStorage
//     localStorage.setItem("currentMood", mood);

//     const filteredSongs = mediaData.filter((song) => song.mood === mood);
//     const randomSong =
//       filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
//     setCurrentSong(randomSong);
//     addToPlaylist22(randomSong);

//     setIsRed(randomSong.mood === "happy");
//     setIsBlue(randomSong.mood === "sad");
//     setIsBrown(randomSong.mood === "calm");

//     setCurrentMusicName(randomSong.name);
//     setCurrentMusicCtg(randomSong.ctg);

//     playTrack(randomSong.url); // Play the new track using the global context

//     setOriginalViewVisible(false);
//     setAnimationActive(true);

//     setTimeout(() => {
//       setAnimationActive(false);
//       setVideoVisible(true);
//     }, 1000); // Adjust to match the animation duration
//   };

//   useEffect(() => {
//     if (currentSong) {
//       setOriginalViewVisible(false);
//       setVideoVisible(true);
//     } else {
//       setOriginalViewVisible(true); // Ensure the original view is visible when there's no current song
//       setVideoVisible(false);
//     }
//   }, [currentSong]);

//   const handleVideoClick = () => {
//     setOriginalViewVisible(true); // Show the original view
//     setAnimationActive(false); // Stop any ongoing animation
//     setVideoVisible(false); // Hide the video
//     stopMusic(); // Stop the music when returning to the original view
//   };

//   const OriginalViewPart = () => {
//     return (
//       <>
//         <div>
//           <Greeting />
//         </div>
//         <div>
//           <SentimentAnalysisPage
//             onSentimentAnalyzed={handleSentimentAnalysis}
//             playMusic={playMusic} // Pass playMusic as a prop
//           />
//         </div>
//       </>
//     );
//   };

//   const handleSentimentAnalysis = useCallback((message: string) => {
//     setSentimentMessage(message);
//     setMoodSource("analysis");

//     localStorage.setItem("moodSource", "analysis");
//     localStorage.setItem("sentimentMessage", message);
//   }, []);

//   const getMoodMessage = () => {
//     if (moodSource === "analysis") {
//       return sentimentMessage;
//     } else if (moodSource === "button") {
//       if (isRed) return "You seem happy";
//       if (isBlue) return "You seem sad";
//       if (isBrown) return "You seem peaceful";
//     }

//     return "You have no emotion at the moment";
//   };

//   console.log("ccccccccc  currentSong ==== ", currentSong);
//   console.log("iiii isRed ==== ", isRed);
//   console.log("iiii isBlue ==== ", isBlue);
//   console.log("iiii isBrown ==== ", isBrown);

//   console.log("wwwwww wasPlaying === ", wasPlaying);

//   if (!isRed && !isBlue && !isBrown) {
//     setCurrentSong(null);
//     stopMusic();
//   }

//   return (
//     <>
//       <div className="relative min-h-screen px-4">
//         {/* Original Homepage View */}
//         {isOriginalViewVisible && <OriginalViewPart />}

//         {/* Buttons for mood selection */}
//         <div className="flex justify-center space-x-8 m-3">
//           <button
//             onClick={() => playMusic("happy", "button")}
//             className={isRed ? "active-button-style" : "inactive-button-style"}
//           >
//             Happy
//           </button>
//           <button
//             onClick={() => playMusic("sad", "button")}
//             className={isBlue ? "active-button-style" : "inactive-button-style"}
//           >
//             Sad
//           </button>
//           <button
//             onClick={() => playMusic("calm", "button")}
//             className={
//               isBrown ? "active-button-style" : "inactive-button-style"
//             }
//           >
//             Calm
//           </button>
//         </div>

//         {/* Animation from image to video */}
//         {isAnimationActive && (
//           <Image
//             src="/dancing-girl-removebg.webp"
//             alt="Animation"
//             width={100}
//             height={100}
//             className="fixed transition-all duration-1000 transform animate-fly-to-corner"
//           />
//         )}

//         {/* Video in the bottom right corner */}
//         {isVideoVisible && (
//           <div className="video-on-top" onClick={handleVideoClick}>
//             <video
//               src="/animation-center-yellowbg-noblinking.mp4"
//               autoPlay
//               loop
//               muted
//               className="w-full h-full"
//             />
//             {/* Display mood message */}
//             <div className="absolute top-0 left-0 right-0 text-center p-4 bg-opacity-75 bg-black text-white font-bold">
//               {getMoodMessage()}
//             </div>
//           </div>
//         )}

//         {/* Display the current track image */}
//         {currentSong && currentSong.imgUrl && (
//           <div className="flex items-center justify-center h-full">
//             <CustomImage
//               src={currentSong.imgUrl}
//               alt={currentMusicName || "an image associated with the music"}
//               dataUrl={currentTrack}
//               layout="responsive"
//               width={1400}
//               height={700}
//               className="cursor-pointer w-full max-w-full lg:max-w-[1400px]"
//               ctg={currentMusicCtg}
//               mood={currentSong.mood}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MusicPlayer;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMedia } from "@context/MediaContext";
import { addToPlaylist22 } from "@utils/addToPlaylist";
import CustomImage from "@components/CustomImage";
import SentimentAnalysisPage from "@components/Sentimentanalysis";
import Greeting from "./Greeting";
import Image from "next/image";

const MusicPlayer: React.FC = () => {
  const {
    mediaData,
    setIsRed,
    setIsBlue,
    setIsBrown,
    playTrack,
    stopMusic,
    setCurrentSong,
    currentTrack,
    currentSong,
    isPlaying,
    setIsPlaying,
    isRed,
    isBlue,
    isBrown,
    wasPlaying,
    setWasPlaying,
  } = useMedia();

  const [currentMusicName, setCurrentMusicName] = useState<string | null>(null);
  const [isOriginalViewVisible, setOriginalViewVisible] = useState(true);
  const [isAnimationActive, setAnimationActive] = useState(false);
  const [isVideoVisible, setVideoVisible] = useState(false);
  const [currentMusicCtg, setCurrentMusicCtg] = useState<string | null>(null);
  const [moodSource, setMoodSource] = useState<"button" | "analysis" | null>(
    null,
  );
  const [sentimentMessage, setSentimentMessage] = useState<string>("");

  // Restore the last played song or state when navigating back to homepage
  useEffect(() => {
    const currentMood = sessionStorage.getItem("currentMood");
    const lastPlayedSong = sessionStorage.getItem("lastPlayedSong");
    const wasPlayingOnHomePage =
      sessionStorage.getItem("wasPlayingOnHomePage") === "true";

    if (currentMood && lastPlayedSong && wasPlayingOnHomePage) {
      const song = JSON.parse(lastPlayedSong);
      setCurrentSong(song);
      playTrack(song.url, song);
      setIsPlaying(true);
    } else {
      stopMusic();
    }
  }, []);

  const playMusic = (
    mood: "happy" | "sad" | "calm",
    source: "button" | "analysis",
  ) => {
    stopMusic();
    setMoodSource(source);
    sessionStorage.setItem("currentMood", mood);

    const filteredSongs = mediaData.filter((song) => song.mood === mood);
    const randomSong =
      filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    setCurrentSong(randomSong);
    addToPlaylist22(randomSong);

    setIsRed(randomSong.mood === "happy");
    setIsBlue(randomSong.mood === "sad");
    setIsBrown(randomSong.mood === "calm");

    setCurrentMusicName(randomSong.name);
    setCurrentMusicCtg(randomSong.ctg);

    playTrack(randomSong.url);
    setOriginalViewVisible(false);
    setAnimationActive(true);

    sessionStorage.setItem("lastPlayedSong", JSON.stringify(randomSong));
    sessionStorage.setItem("wasPlayingOnHomePage", "true");

    setTimeout(() => {
      setAnimationActive(false);
      setVideoVisible(true);
    }, 1000);
  };

  useEffect(() => {
    if (currentSong) {
      setOriginalViewVisible(false);
      setVideoVisible(true);
    } else {
      setOriginalViewVisible(true);
      setVideoVisible(false);
    }
  }, [currentSong]);

  const handleVideoClick = () => {
    setOriginalViewVisible(true);
    setAnimationActive(false);
    setVideoVisible(false);
    stopMusic();
    sessionStorage.setItem("wasPlayingOnHomePage", "false");
  };

  const OriginalViewPart = () => (
    <>
      <div>
        <Greeting />
      </div>
      <div>
        <SentimentAnalysisPage
          onSentimentAnalyzed={handleSentimentAnalysis}
          playMusic={playMusic}
        />
      </div>
    </>
  );

  const handleSentimentAnalysis = useCallback((message: string) => {
    setSentimentMessage(message);
    setMoodSource("analysis");
    sessionStorage.setItem("moodSource", "analysis");
    sessionStorage.setItem("sentimentMessage", message);
  }, []);

  const getMoodMessage = () => {
    if (moodSource === "analysis") {
      return sentimentMessage;
    } else if (moodSource === "button") {
      if (isRed) return "You seem happy";
      if (isBlue) return "You seem sad";
      if (isBrown) return "You seem peaceful";
    }

    return "You have no emotion at the moment";
  };

  return (
    <div className="relative min-h-screen px-4">
      {isOriginalViewVisible && <OriginalViewPart />}
      <div className="flex justify-center space-x-8 m-3">
        <button
          onClick={() => playMusic("happy", "button")}
          className={isRed ? "active-button-style" : "inactive-button-style"}
        >
          Happy
        </button>
        <button
          onClick={() => playMusic("sad", "button")}
          className={isBlue ? "active-button-style" : "inactive-button-style"}
        >
          Sad
        </button>
        <button
          onClick={() => playMusic("calm", "button")}
          className={isBrown ? "active-button-style" : "inactive-button-style"}
        >
          Calm
        </button>
      </div>

      {isAnimationActive && (
        <Image
          src="/dancing-girl-removebg.webp"
          alt="Animation"
          width={100}
          height={100}
          className="fixed transition-all duration-1000 transform animate-fly-to-corner"
        />
      )}

      {isVideoVisible && (
        <div className="video-on-top" onClick={handleVideoClick}>
          <video
            src="/animation-center-yellowbg-noblinking.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full"
          />
          <div className="absolute top-0 left-0 right-0 text-center p-4 bg-opacity-75 bg-black text-white font-bold">
            {getMoodMessage()}
          </div>
        </div>
      )}

      {currentSong && currentSong.imgUrl && (
        <div className="flex items-center justify-center h-full">
          <CustomImage
            src={currentSong.imgUrl}
            alt={currentMusicName || "an image associated with the music"}
            dataUrl={currentTrack}
            layout="responsive"
            width={1400}
            height={700}
            className="cursor-pointer w-full max-w-full lg:max-w-[1400px]"
            ctg={currentMusicCtg}
            mood={currentSong.mood}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
