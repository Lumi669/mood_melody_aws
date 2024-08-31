"use client";

import React, { useEffect, useState } from "react";
import CustomImage from "components/CustomImage";
import { MusicWithImageSimplified } from "../../../types/type";

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);

  useEffect(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }
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
                dataUrl={item.url}
                className="cursor-pointer rounded-lg transition-all"
                width={260}
                height={130}
                ctg={item.ctg}
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold ml-4">{item.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MixTape;
