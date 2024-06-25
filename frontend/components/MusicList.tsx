"use client";

import React, { useEffect } from "react";
import CustomImage from "./CustomImage";
import { useMedia } from "../context/MediaContext";

const MusicList: React.FC<{ initialData: any[] }> = ({ initialData }) => {
  const { setMediaData, togglePlayPause, mediaData } = useMedia();

  useEffect(() => {
    setMediaData(initialData);
  }, [initialData, setMediaData]);

  return (
    <ul>
      {mediaData.map((item) => (
        <li key={item.id} className="relative h-96 w-full max-w-4xl mx-auto ">
          <h2>{item.name}</h2>
          <CustomImage
            src={item.imgUrl}
            alt={item.name}
            onClick={() => togglePlayPause(item.url)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MusicList;
