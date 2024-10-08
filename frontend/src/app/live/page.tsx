"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "@context/MediaContext";
import CustomImage from "@components/CustomImage";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";
import { getTextColor } from "@utils/getTextColor";
import DecorativeElements from "@components/DecorativeElements";

const LivePlay = () => {
  const [hasImage, setHasImage] = useState(false);
  const { currentTrack, currentSong, isPlaying, isRed, isBlue, isBrown } =
    useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  let authorName;
  let musicName;

  useEffect(() => {
    if (currentSong && currentSong.imgUrl) {
      setHasImage(true);
    } else {
      setHasImage(false);
    }
  }, [currentSong]);

  if (currentSong && currentSong.name) {
    authorName = extractAuthorName(currentSong.name);
    musicName = extractMusicName(currentSong.name);
  } else {
    authorName = "No author name specified";
    musicName = "Oh oh ... No music is playing";
  }

  return (
    <div className="flex h-screen justify-center overflow-y-auto m-4 lg:mt-10">
      {currentSong && (
        <div className="w-[90vw] max-w-7xl flex flex-col lg:flex-row items-center lg:items-start sm:mt-20 lg:mt-28">
          {/* Image Section */}
          <div className="lg:w-[70%] h-auto">
            <CustomImage
              src={currentSong.imgUrl}
              alt={currentSong.name}
              dataUrl={currentTrack}
              layout="responsive"
              width={1600}
              height={800}
              className="cursor-pointer aspect-[3/2] lg:aspect-[2/1] w-full"
              ctg={currentSong.ctg}
              mood={currentSong.mood}
            />
          </div>

          {/* Text Section */}
          <div className="pb-[260px] text-center lg:text-left lg:w-[30%] lg:ml-16 mt-4 lg:mt-4 space-y-4">
            <h1 className={`text-4xl font-bold ${textColor}`}>Music name</h1>
            <div className="text-2xl">{musicName}</div>
            <h1 className={`text-4xl font-bold ${textColor}`}>Author name</h1>
            <div className="text-2xl">{authorName}</div>
            <h1 className={`text-4xl font-bold ${textColor}`}>Music status</h1>
            <div
              className={` sm:pb-10 text-2xl ${isPlaying ? "animate-shake" : ""}`}
            >
              {isPlaying ? "Playing" : "Paused"}
            </div>
            {/* <div className="h-64"></div>{" "} */}
            {/* Adds visible space at the bottom for testing */}
          </div>
        </div>
      )}

      {!hasImage && (
        <div className="fixed inset-0 flex justify-center items-center overflow-hidden">
          <video
            src="/nomusic-playing-bird.mp4"
            autoPlay
            loop
            muted
            className="w-3/4 h-2/3"
          />
        </div>
      )}
      <div className="absolute bottom-56 right-60 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
      <DecorativeElements />
    </div>
  );
};

export default LivePlay;
