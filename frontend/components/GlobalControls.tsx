// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useMedia } from "@context/MediaContext";
// import { MusicWithImageSimplified } from "../types/type";
// import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
// import path from "path";

// const GlobalControls: React.FC = () => {
//   const { stopMusic, togglePlayPause, isPlaying, currentSong, skipTrack } =
//     useMedia();
//   const pathname = usePathname(); // Initialize usePathname
//   const [animate, setAnimate] = useState(false);

//   // Use useRef to keep a stable reference to the playlist
//   const playlistRef = useRef<MusicWithImageSimplified[]>([]);

//   useEffect(() => {
//     if (isPlaying) {
//       setAnimate(true);
//     }
//   }, [isPlaying, currentSong]);

//   const isLivePage = pathname === "/live";

//   // Use useEffect to update localStorage whenever currentSong changes and is on the homepage
//   useEffect(() => {
//     const isHomePage = pathname === "/"; // Check if the current page is the homepage

//     if (isHomePage && currentSong) {
//       localStorage.setItem("currentMood", currentSong.mood);
//       localStorage.setItem(
//         `lastPlayed_${currentSong.mood}`,
//         JSON.stringify(currentSong),
//       );
//     }
//   }, [currentSong, pathname]);

//   const handlePlayPause = () => {
//     togglePlayPause();
//   };

//   const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
//     // Update the ref with the new playlist
//     playlistRef.current = newPlaylist;

//     localStorage.setItem("playlist", JSON.stringify(newPlaylist));
//     window.dispatchEvent(new Event("playlistUpdated"));
//   };

//   const handleSkipTrack = (direction: "next" | "previous") => {
//     const isHomePage = pathname === "/"; // Check if the current page is the homepage
//     const updatedPlaylist = skipTrack(direction, isHomePage); // Pass both direction and isHomePage
//     console.log(
//       "uuuuuuu updatedPlaylist from GlobalControls.tsx === ",
//       updatedPlaylist,
//     );

//     updatePlaylist(updatedPlaylist);
//   };

//   const handleStopMusic = () => {
//     // Stop music through context
//     stopMusic();
//     sessionStorage.setItem("wasPlayingOnHomePage", "false");
//     sessionStorage.setItem("wasPausedOnHomePage", "false");
//     sessionStorage.removeItem("lastPlayedSong");
//     sessionStorage.removeItem("timePointOfHomePage");

//     // Dispatch any events or callbacks  notify other components e.g MusicPlayer.tsx
//     window.dispatchEvent(new Event("musicStopped"));
//   };

//   return (
//     <div
//       className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex flex-col items-center justify-center z-50 transition-all duration-500 ${animate ? "animate-fly-in" : ""}`}
//     >
//       {currentSong && (
//         <div className="flex items-center space-x-4">
//           {!isLivePage && (
//             <button
//               onClick={() => handleSkipTrack("previous")}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Previous
//             </button>
//           )}
//           <button
//             onClick={handlePlayPause}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 text-center"
//           >
//             {isPlaying ? "Pause" : "Play "}
//           </button>
//           <button
//             onClick={handleStopMusic}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Stop Music
//           </button>

//           {!isLivePage && (
//             <button
//               onClick={() => handleSkipTrack("next")}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Next
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlobalControls;

// components/GlobalControls.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMedia } from "@context/MediaContext";
import { MusicWithImageSimplified } from "../types/type";
import { usePathname } from "next/navigation";

const GlobalControls: React.FC = () => {
  const { stopMusic, togglePlayPause, isPlaying, currentSong, skipTrack } =
    useMedia();
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  const playlistRef = useRef<MusicWithImageSimplified[]>([]);

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }
  }, [isPlaying, currentSong]);

  const isLivePage = pathname === "/live";

  useEffect(() => {
    const isHomePage = pathname === "/";

    if (isHomePage && currentSong) {
      localStorage.setItem("currentMood", currentSong.mood);
      localStorage.setItem(
        `lastPlayed_${currentSong.mood}`,
        JSON.stringify(currentSong),
      );
    }
  }, [currentSong, pathname]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const updatePlaylist = (newPlaylist: MusicWithImageSimplified[]) => {
    playlistRef.current = newPlaylist;

    localStorage.setItem("playlist", JSON.stringify(newPlaylist));
    window.dispatchEvent(new Event("playlistUpdated"));
  };

  const handleSkipTrack = (direction: "next" | "previous") => {
    const isHomePage = pathname === "/";
    const updatedPlaylist = skipTrack(direction, isHomePage);
    console.log(
      "Updated Playlist from GlobalControls.tsx === ",
      updatedPlaylist,
    );

    updatePlaylist(updatedPlaylist);
  };

  const handleStopMusic = () => {
    stopMusic();
    sessionStorage.setItem("wasPlayingOnHomePage", "false");
    sessionStorage.setItem("wasPausedOnHomePage", "false");
    sessionStorage.removeItem("lastPlayedSong");
    sessionStorage.removeItem("timePointOfHomePage");

    window.dispatchEvent(new Event("musicStopped"));
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex flex-col items-center justify-center z-50 transition-all duration-500 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      style={{ position: "fixed", bottom: "60px" }} // Adjust 'bottom' to move the component above footer
    >
      {currentSong && (
        <div className="flex items-center space-x-4">
          {!isLivePage && (
            <button
              onClick={() => handleSkipTrack("previous")}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          <button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 text-center"
          >
            {isPlaying ? "Pause" : "Play "}
          </button>
          <button
            onClick={handleStopMusic}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop Music
          </button>

          {!isLivePage && (
            <button
              onClick={() => handleSkipTrack("next")}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalControls;
