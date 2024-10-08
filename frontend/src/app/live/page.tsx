"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "@context/MediaContext";
import CustomImage from "@components/CustomImage";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";
import { getTextColor } from "@utils/getTextColor";

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
    <div className="flex h-screen  justify-center overflow-y-auto m-4 lg:mt-10">
      {currentSong && (
        <div className="w-[90vw] max-w-7xl flex flex-col lg:flex-row items-center lg:items-start sm:mt-20">
          {/* Image Section */}
          <div className="lg:w-4/5 h-auto ">
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
          <div className="text-center lg:text-left lg:w-1/5 lg:ml-8 mt-4 lg:mt-20 space-y-4">
            <h1 className={`text-4xl font-bold ${textColor}`}>Music name</h1>
            <div className="text-2xl">{musicName}</div>
            <h1 className={`text-4xl font-bold ${textColor}`}>Author name</h1>
            <div className="text-2xl">{authorName}</div>
            <h1 className={`text-4xl font-bold ${textColor}`}>Music status</h1>
            <div className="text-2xl">{isPlaying ? "Playing" : "Paused"}</div>
          </div>
        </div>
      )}

      {/* Video in the bottom right corner */}
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
    </div>
  );
};

export default LivePlay;
