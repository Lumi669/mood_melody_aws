// "use client";

// import React from "react";
// import Image from "next/image";
// import { customLoader } from "../utils/customImageLoader";
// import { addToPlaylist } from "../utils/addToPlaylist";
// import { CustomImageProps } from "../types/type";
// import { useMedia } from "../context/MediaContext";
// // import MusicWithImageSimplified from "../types/type";

// const CustomImage: React.FC<CustomImageProps> = ({
//   src,
//   alt,
//   layout,
//   objectFit,
//   onClick,
//   dataUrl,
//   width,
//   height,
//   className,
//   ctg,
// }) => {
//   const {
//     currentTrack,
//     isPlaying,
//     playTrack,
//     togglePlayPause,
//     setCurrentSong,
//   } = useMedia();

//   console.log("src from CustomImage.tsx === ", src);

//   const validSrc = src ?? ""; // Ensure src is a string

//   const handleClick = () => {
//     if (currentTrack !== dataUrl) {
//       const newSong = { imgUrl: validSrc, url: dataUrl, name: alt, ctg: ctg }; // Construct song details
//       setCurrentSong(newSong); // Set the current song in global context
//       addToPlaylist(newSong);

//       playTrack(dataUrl || ""); // Play the clicked track
//     } else {
//       togglePlayPause(dataUrl || ""); // Toggle play/pause if the same track is clicked again
//     }

//     if (onClick) {
//       onClick(dataUrl || "");
//     }
//   };

//   return (
//     <div className="relative inline-block cursor-pointer" onClick={handleClick}>
//       <Image
//         loader={() => customLoader({ srcOfImageUrl: src })}
//         src={validSrc}
//         alt={alt}
//         layout={layout}
//         objectFit={objectFit}
//         unoptimized
//         data-url={dataUrl}
//         width={width}
//         height={height}
//         className={className}
//       />

//       {/* Show play or pause icon based on current track and playing status */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {currentTrack === dataUrl && isPlaying ? (
//           // Show pause icon when the current track is playing
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="white"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-12 h-12 text-white"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 4.5v15m12-15v15"
//             />
//           </svg>
//         ) : (
//           // Show play icon when the track is not playing
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="white"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-12 h-12 text-white"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
//             />
//           </svg>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomImage;
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { customLoader } from "../utils/customImageLoader";
import { addToPlaylist } from "../utils/addToPlaylist";
import { CustomImageProps } from "../types/type";
import { useMedia } from "../context/MediaContext";

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = "not specified", // Default alt text
  layout,
  objectFit,
  onClick,
  dataUrl,
  width,
  height,
  className,
  ctg,
}) => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setCurrentSong,
    audio, // Use the global audio element from context
  } = useMedia();

  const [progress, setProgress] = useState<number>(0); // State to track the progress of the audio

  const validSrc = src ?? ""; // Ensure src is a string

  useEffect(() => {
    if (!audio) return; // Make sure the audio element is available

    const updateProgress = () => {
      if (audio && currentTrack === dataUrl) {
        const percentage = (audio.currentTime / audio.duration) * 100; // Calculate the progress percentage
        setProgress(percentage || 0);
      }
    };

    // Add event listener to update progress
    audio.addEventListener("timeupdate", updateProgress);

    // Clean up the event listener when the component unmounts or dependencies change
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio, currentTrack, dataUrl]); // Re-run when audio, currentTrack, or dataUrl changes

  const handleClick = () => {
    if (currentTrack !== dataUrl) {
      const newSong = { imgUrl: validSrc, url: dataUrl, name: alt, ctg: ctg }; // Construct song details
      setCurrentSong(newSong); // Set the current song in global context
      addToPlaylist(newSong);

      playTrack(dataUrl || ""); // Play the clicked track
    } else {
      togglePlayPause(); // Toggle play/pause if the same track is clicked again
    }

    if (onClick) {
      onClick(dataUrl || "");
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleClick}>
      <Image
        loader={() => customLoader({ srcOfImageUrl: validSrc })}
        src={validSrc}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        unoptimized
        data-url={dataUrl}
        width={width}
        height={height}
        className={className}
      />

      {/* Show play or pause icon based on current track and playing status */}
      <div className="absolute inset-0 flex items-center justify-center">
        {currentTrack === dataUrl && isPlaying ? (
          // Show pause icon when the current track is playing
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4.5v15m12-15v15"
            />
          </svg>
        ) : (
          // Show play icon when the track is not playing
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        )}
      </div>

      {/* Progress bar */}
      {currentTrack === dataUrl && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-1 bg-blue-500"
            style={{ width: `${progress}%` }} // Dynamic width based on progress
          />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
