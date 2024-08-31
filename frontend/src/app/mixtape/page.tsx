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
            {/* Left side: Number and name */}
            <div className="flex items-center mr-4">
              <span className="text-2xl font-bold mr-2">{index + 1}.</span>
              <h2 className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                {item.name}
              </h2>
            </div>

            {/* Right side: Image */}
            <CustomImage
              src={item.imgUrl}
              alt={item.name}
              layout="responsive"
              objectFit="cover"
              dataUrl={item.url}
              className="cursor-pointer rounded-lg transition-all"
              width={90}
              height={45}
              ctg={item.ctg}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MixTape;
