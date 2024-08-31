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
            {/* Number */}
            <span className="text-2xl font-bold mr-9">{index + 1}.</span>

            {/* Image with Fixed Size */}
            <div className="flex-shrink-0 mr-4">
              <CustomImage
                src={item.imgUrl}
                alt={item.name}
                layout="fixed"
                objectFit="cover"
                dataUrl={item.url}
                className="cursor-pointer rounded-lg transition-all"
                width={200}
                height={100} // Correctly set the height and width to maintain aspect ratio
                ctg={item.ctg}
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
              {item.name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MixTape;
