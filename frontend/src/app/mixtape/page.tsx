"use client";

import React, { useEffect, useState, useRef } from "react";
import CustomImage from "components/CustomImage";
import { MusicWithImageSimplified } from "../../../types/type";

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);

  // Function to load the playlist from localStorage
  const loadPlaylistFromLocalStorage = () => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }
  };

  useEffect(() => {
    // Load the playlist initially
    loadPlaylistFromLocalStorage();

    // Event listener for custom 'playlistUpdated' event
    const handlePlaylistUpdate = () => {
      loadPlaylistFromLocalStorage();
    };

    // Listen for the custom 'playlistUpdated' event dispatched in function updatePlaylist of GlobalControll.tsx
    window.addEventListener("playlistUpdated", handlePlaylistUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("playlistUpdated", handlePlaylistUpdate);
    };
  }, []);

  console.log("playlist from mixtape page === ", playlist);

  return (
    <div className="h-screen overflow-y-scroll p-4 pb-40">
      <ul>
        {playlist.map((item: MusicWithImageSimplified, index: number) => (
          <li
            key={item.ctg}
            className="flex items-center w-full max-w-xl mx-auto mb-10"
          >
            {/* Number with Fixed Width */}
            <span className="text-2xl font-bold w-8 text-right mr-16">
              {index + 1}.
            </span>

            {/* Image with Fixed Size */}
            <div className="flex-shrink-0 mr-8">
              <CustomImage
                src={item.imgUrl}
                alt={item.name}
                layout="fixed"
                objectFit="cover"
                dataUrl={item.url ?? ""} // Ensure dataUrl is always a string
                className="cursor-pointer rounded-lg transition-all"
                width={260}
                height={130}
                ctg={item.ctg}
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold ml-4 flex-grow basis-3/4 whitespace-nowrap verflow-hidden">
              {item.name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MixTape;
