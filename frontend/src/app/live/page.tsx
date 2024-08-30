"use client";

import React from "react";
import { useMedia } from "../../../context/MediaContext";
import CustomImage from "components/CustomImage";
import { extractAuthorName } from "../../../utils/extractMusicInfo";

const Liveplay = () => {
  const { currentTrack, currentSong } = useMedia();
  console.log("current song from live.tsx === ", currentSong);
  console.log("current track from live.tsx === ", currentTrack);

  let authorName;

  if (currentSong && currentSong.name) {
    authorName = extractAuthorName(currentSong.name);
  } else {
    authorName = "No author name specified";
  }

  return (
    <div className="flex items-center p-4">
      {currentSong && (
        <div className="w-1/2">
          <CustomImage
            src={currentSong.imgUrl}
            alt={currentSong.name}
            dataUrl={currentTrack}
            layout="responsive"
            width={800}
            height={800}
            className="cursor-pointer"
          />
        </div>
      )}
      <div className="w-1/2 pl-4 ">
        <h1 className="text-xl font-bold ">Music Name</h1>
        <div>{currentSong?.name || "No song playing"}</div>
        <h2 className="text-xl font-bold">Author Name</h2>
        <div>{authorName}</div>
      </div>
    </div>
  );
};

export default Liveplay;
