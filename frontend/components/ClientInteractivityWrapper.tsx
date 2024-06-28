"use client"; // Mark this file as a client component
import React, { useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const ClientInteractivityWrapper: React.FC = () => {
  const { togglePlayPause } = useMedia();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const url = target.getAttribute("data-url");
      console.log("url from ClientInteractivityWrapper ====  ", url);
      if (url) {
        togglePlayPause(url);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [togglePlayPause]);

  return null; // No need to render anything
};

export default ClientInteractivityWrapper;
