"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { customLoader } from "../utils/customImageLoader";
import { CustomImageProps } from "../types/type";
import { useMedia } from "../context/MediaContext";

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = "not specified",
  layout,
  objectFit,
  onClick,
  dataUrl,
  width,
  height,
  className,
  ctg,
}) => {
  // Access audio from MediaContext using useMedia hook
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setCurrentSong,
    audio,
    setIsPlaying,
  } = useMedia();
  const [progress, setProgress] = useState<number>(0);

  const validSrc = src ?? "";

  useEffect(() => {
    if (!audio) return; // Ensure the audio element is available

    const updateProgress = () => {
      if (audio && currentTrack === dataUrl) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        setProgress(percentage || 0);
      }
    };

    const handleEnded = () => {
      //to ensure that only the instance representing the currently playing track reacts to the ended event.
      if (currentTrack === dataUrl) {
        setIsPlaying(false); // Set isPlaying to false when the track ends
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded); // Add event listener for track end

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded); // Clean up event listener
    };
  }, [audio, currentTrack, dataUrl, setIsPlaying]); // Include dependencies

  const handleClick = () => {
    console.log(
      "currentTrack from handleClick of CustomImage.tsx === ",
      currentTrack,
    );
    console.log("dataUrl from handleClick of CustomImage.tsx === ", dataUrl);
    console.log("currentTrack !== dataUrl === ", currentTrack !== dataUrl);
    if (currentTrack !== dataUrl) {
      const newSong = { imgUrl: validSrc, url: dataUrl, name: alt, ctg: ctg };
      setCurrentSong(newSong);
      playTrack(dataUrl || "", newSong);
    } else {
      togglePlayPause();
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

      <div className="absolute inset-0 flex items-center justify-center">
        {currentTrack === dataUrl && isPlaying ? (
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

      {currentTrack === dataUrl && (
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gray-200">
          <div className="h-3 bg-blue-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
