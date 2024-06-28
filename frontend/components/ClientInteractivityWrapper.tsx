"use client"; // Mark this file as a client component
import React, { useEffect, useState } from "react";
import { useMedia } from "../context/MediaContext";

const ClientInteractivityWrapper: React.FC = () => {
  const { togglePlayPause, stopMusic } = useMedia();
  const [url, setUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const urlOfMusic = target.getAttribute("data-url");
      setUrl(urlOfMusic);
      console.log(
        "urlOfMusic from ClientInteractivityWrapper ====  ",
        urlOfMusic,
      );
      if (urlOfMusic) {
        togglePlayPause(urlOfMusic);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [togglePlayPause]);

  useEffect(() => {
    console.log("url from ClientInteractivityWrapper ====  ", url);

    if (!url) {
      stopMusic();
    }
  }, [url, stopMusic]);

  return null; // No need to render anything
};

export default ClientInteractivityWrapper;
