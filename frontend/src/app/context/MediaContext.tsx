"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Music } from "../types/type";
import { fetchAllMusicWithImages } from "../utils/fetchAllMusicWithImages";

interface MediaContextType {
  mediaData: (Music & { imgUrl: string })[]; // Include mood property from Music interface and imgUrl
  isRed: boolean;
  isBlue: boolean;

  // setIsRed: () => void;
  // setIsBlue: () => void;

  setIsRed: Dispatch<SetStateAction<boolean>>; // Corrected type
  setIsBlue: Dispatch<SetStateAction<boolean>>; // Corrected type
}
const MediaContext = createContext<MediaContextType>({
  mediaData: [],
  isRed: false,
  isBlue: false,

  setIsRed: () => {},
  setIsBlue: () => {},
});

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
}: any) => {
  const [mediaData, setMediaData] = useState<MediaContextType["mediaData"]>([]);
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);

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
    <MediaContext.Provider
      value={{ mediaData, isRed, setIsRed, isBlue, setIsBlue }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
