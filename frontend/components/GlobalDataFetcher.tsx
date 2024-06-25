"use client"; // Mark this file as a client component
import React, { useEffect } from "react";
import { useMedia } from "../context/MediaContext";
import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages";

const GlobalDataFetcher: React.FC = () => {
  const { setMediaData, mediaData } = useMedia();

  useEffect(() => {
    const fetchData = async () => {
      if (mediaData.length === 0) {
        const data = await fetchAllMusicWithImages();
        setMediaData(data);
      }
    };

    fetchData();
  }, [setMediaData, mediaData]);

  return null; // No need to render anything
};

export default GlobalDataFetcher;
