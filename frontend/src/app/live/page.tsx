"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "@context/MediaContext";
import CustomImage from "components/CustomImage";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";

const LivePlay = () => {
  const [hasImage, setHasImage] = useState(false);
  const { currentTrack, currentSong, isPlaying } = useMedia();
  console.log("current song from live.tsx === ", currentSong);
  console.log("current track from live.tsx === ", currentTrack);

  let authorName;
  let musicName;

  // Use useEffect to update hasImage when currentSong changes
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
    <div className="flex items-center justify-center">
      {currentSong && (
        <div className="w-1/2 flex flex-col items-center">
          <CustomImage
            src={currentSong.imgUrl}
            alt={currentSong.name}
            dataUrl={currentTrack}
            layout="responsive"
            width={1200}
            height={600}
            className="cursor-pointer mt-10 mb-5"
            ctg={currentSong.ctg}
            mood={currentSong.mood}
          />
          <div className="text-center">
            <h1 className="text-xl font-bold">Music Name</h1>
            <div className="pb-5">{musicName}</div>
            <h1 className="text-xl font-bold">Author Name</h1>
            <div className="pb-5">{authorName}</div>
            <h1 className="text-xl font-bold">Music Status</h1>
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
