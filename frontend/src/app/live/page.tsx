"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "../../../context/MediaContext";
import CustomImage from "components/CustomImage";
import { extractAuthorName } from "../../../utils/extractMusicInfo";
import { extractMusicName } from "../../../utils/extractMusicInfo";

const Liveplay = () => {
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
    <div className="flex items-center p-4 justify-center text-center">
      {currentSong && (
        <div className="w-1/2">
          <CustomImage
            src={currentSong.imgUrl}
            alt={currentSong.name}
            dataUrl={currentTrack}
            layout="responsive"
            width={800}
            height={800}
            className="cursor-pointer m-10"
          />
          <div className="pl-4">
            <h1 className="text-xl font-bold">Music Name</h1>
            <div className="pb-8">{musicName}</div>
            <h1 className="text-xl font-bold">Author Name</h1>
            <div className="pb-8">{authorName}</div>
            <h1 className="text-xl font-bold">Music Status</h1>
            <div>{isPlaying ? "Playing" : "Paused"}</div>{" "}
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

export default Liveplay;
