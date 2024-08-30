"use client";

import React, { useState } from "react";
import { useMedia } from "../../../context/MediaContext";
import CustomImage from "components/CustomImage";

const Liveplay = () => {
  const { currentTrack, currentSong } = useMedia();
  console.log("current song from live.tsx === ", currentSong);
  console.log("current track from live.tsx === ", currentTrack);
  return (
    <>
      <div>
        Liveplay: now it is playing {currentSong?.name || "No song playing"}
      </div>
      {currentSong && (
        <CustomImage
          src={currentSong.imgUrl}
          alt={currentSong.name}
          dataUrl={currentTrack}
          layout="responsive"
          width={800}
          height={800}
          className="cursor-pointer"
        />
      )}
    </>
  );
};

export default Liveplay;
