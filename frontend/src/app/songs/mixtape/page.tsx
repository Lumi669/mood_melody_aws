"use client";

import React, { useEffect, useState } from "react";
import CustomImage from "@components/CustomImage";
import { MusicWithImageSimplified } from "../../../../types/type";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";
import Link from "next/link";

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);

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

  return (
    <div className="h-screen overflow-y-scroll p-4 pb-40">
      {playlist.length === 0 ? (
        <div className="flex flex-col items-center justify-start h-full pt-16">
          <p className="text-3xl font-semibold text-gray-600 mb-6 text-center">
            You have not played any music yet.
          </p>
          <div className="space-y-4 text-center">
            <Link
              href="/home"
              className="text-lg text-blue-500 hover:underline"
            >
              Go to Homepage
            </Link>
            <Link
              href="/all-music"
              className="text-lg text-blue-500 hover:underline"
            >
              Go to All Music Page
            </Link>
          </div>
        </div>
      ) : (
        <ul>
          {playlist.map((item: MusicWithImageSimplified, index: number) => (
            <li
              key={item.ctg}
              className="flex items-center w-full max-w-xl mx-auto mb-10"
            >
              {/* Number and text on left of image for mobile */}
              <div className="md:hidden w-full flex flex-col items-center mb-4">
                <span className="text-2xl font-bold">{index + 1}.</span>
                <div className="text-lg font-semibold">
                  {extractAuthorName(item.name)}
                </div>
                <div className="text-sm">{extractMusicName(item.name)}</div>
              </div>

              {/* Number for desktop (left side of the image) */}
              <span className="hidden md:block text-2xl font-bold w-8 text-right mr-16">
                {index + 1}.
              </span>

              {/* Image */}
              <div className="flex-shrink-0 mr-8">
                <CustomImage
                  src={item.imgUrl}
                  alt={item.name}
                  layout="fixed"
                  objectFit="cover"
                  dataUrl={item.url ?? ""}
                  className="cursor-pointer rounded-lg transition-all"
                  width={260}
                  height={130}
                  ctg={item.ctg}
                  mood={item.mood}
                />
              </div>

              {/* Text beside image for desktop */}
              <h2 className="hidden md:block text-xl font-semibold ml-4 flex-grow basis-3/4">
                <div className="font-bold text-blue-900">
                  {extractAuthorName(item.name)}
                </div>
                <div className="text-gray-800 whitespace-nowrap overflow-hidden">
                  {extractMusicName(item.name)}
                </div>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MixTape;
