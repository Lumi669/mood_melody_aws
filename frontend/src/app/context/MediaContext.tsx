"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Music } from "../types/type";
import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages";

// interface MediaContextType {
//   mediaData: (Music & { imageUrl: string; mood: "happy" | "sad" })[]; // Include mood property
// }

interface MediaContextType {
  mediaData: (Music & { imgUrl: string })[]; // Include mood property from Music interface and imgUrl
}
const MediaContext = createContext<MediaContextType>({ mediaData: [] });

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
}: any) => {
  const [mediaData, setMediaData] = useState<MediaContextType["mediaData"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch music and image data and match them
      const matchedData = await fetchAllMusicWithImages();
      console.log("matchedData ===== ", matchedData);
      setMediaData(matchedData);
    };

    fetchData();
  }, []);

  return (
    <MediaContext.Provider value={{ mediaData }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
