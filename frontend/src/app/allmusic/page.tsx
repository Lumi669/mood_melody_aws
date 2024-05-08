"use client";
import React from "react";
import Image from "next/image";

import { useMedia } from "../context/MediaContext";

const AllMusicPage: React.FC = () => {
  const { mediaData } = useMedia();

  console.log("mediaData ==== ", mediaData);

  return (
    <div>
      <h1>All Music</h1>
      <ul>
        {mediaData.map((item) => (
          <li key={item.id} className="relative h-96 w-full max-w-4xl mx-auto ">
            <h2>{item.name}</h2>
            <Image
              src={item.imgUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMusicPage;
