"use client";

import React, { useEffect, useState } from "react";
import { useMedia } from "../context/MediaContext";

const ClientInteractivityWrapper: React.FC = () => {
  const { togglePlayPause, stopMusic, currentTrack, playTrack } = useMedia();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const urlOfMusic = target.getAttribute("data-url");

      if (urlOfMusic) {
        console.log("Clicked URL:", urlOfMusic);
        console.log("Current Track:", currentTrack);

        if (urlOfMusic !== currentTrack) {
          playTrack(urlOfMusic); // Play the new track
        } else {
          togglePlayPause(urlOfMusic); // Toggle play/pause if it's the same track
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [togglePlayPause, stopMusic, currentTrack, playTrack]);

  return null; // No need to render anything
};

export default ClientInteractivityWrapper;
