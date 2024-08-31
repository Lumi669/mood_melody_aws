"use client";

import React, { useEffect, useState } from "react";
import CustomImage from "components/CustomImage";
import MusicWithImageSimplified from "../../../types/type";

type Music = {
  id: string;
  title: string;
  artist: string;
};

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<Music[]>([]);

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
            className="relative h-90 w-full max-w-xl mx-auto mb-10"
          >
            <span className="absolute top-0 left-0 text-2xl font-bold">
              {index + 1}.
            </span>
            <h2 className="text-xl font-semibold mb-5 mx-10">{item.name}</h2>
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
