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
    <div className="flex h-screen md:overflow-auto md:justify-center lg:justify-center lg:overflow-auto">
      {currentSong && (
        <div className="w-full md:flex-grow md:w-full lg:flex lg:w-1/2 flex flex-col items-center">
          <CustomImage
            src={currentSong.imgUrl}
            alt={currentSong.name}
            dataUrl={currentTrack}
            layout="responsive"
            width={1600}
            height={800}
            className="cursor-pointer mt-10 mb-5 aspect-[3/2] md:aspect-[2/1] max-w-[600px] md: max-w-[700px] lg:max-w-[800px] " // Adjusted aspect ratio classes
            ctg={currentSong.ctg}
            mood={currentSong.mood}
          />
          <div className="text-center">
            <h1 className={`text-xl font-bold ${textColor} mt-8`}>
              Music name
            </h1>
            <div className="pb-5">{musicName}</div>
            <h1 className={`text-xl font-bold ${textColor}`}>Author name</h1>
            <div className="pb-5">{authorName}</div>
            <h1 className={`text-xl font-bold ${textColor}`}>Music status</h1>
            <div>{isPlaying ? "Playing" : "Paused"}</div>
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
