"use client";

import React, { useEffect, useRef, useState } from "react";
import { MusicWithImage } from "../types/type";
import CustomImage from "@components/CustomImage";
import { useMedia } from "@context/MediaContext";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";

interface MusicListProps {
  matchedData: MusicWithImage[];
}

const MusicList: React.FC<MusicListProps> = ({ matchedData }) => {
  const { currentSong } = useMedia();
  const listRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const containerRef = useRef<HTMLUListElement | null>(null);

  const scrollToActiveMusic = (retryCount: number = 0) => {
    if (!currentSong?.url || !containerRef.current) return;

    const container = containerRef.current;
    const element = listRefs.current[currentSong.url];

    if (element) {
      const containerHeight = container.clientHeight;
      const elementTop = element.offsetTop;
      const elementHeight = element.clientHeight;

      const scrollOffset = elementTop - containerHeight / 2 + elementHeight / 2;

      // Perform the scroll
      container.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });

      // Check if the element is centered
      const isCentered = Math.abs(container.scrollTop - scrollOffset) < 5; // Allow a small margin of error

      if (!isCentered && retryCount < 10) {
        // Retry after a delay
        setTimeout(() => scrollToActiveMusic(retryCount + 1), 100);
      }
    }
  };

  useEffect(() => {
    scrollToActiveMusic();
  }, [currentSong]);

  return (
    <ul ref={containerRef} className="overflow-y-scroll h-full">
      {matchedData.map((item: MusicWithImage) => (
        <li
          key={item.url}
          ref={(el) => {
            if (el) {
              listRefs.current[item.url] = el;
            }
          }}
          className={`relative h-90 w-full max-w-4xl mx-auto mb-10 ${
            currentSong?.url === item.url ? "bg-gray-100" : ""
          }`}
        >
          <h2 className="text-xl font-semibold mb-5">
            <span className="font-bold text-blue-900">
              {extractAuthorName(item.name)}
            </span>
            <span className="text-gray-800">
              : {extractMusicName(item.name)}
            </span>
          </h2>

          <CustomImage
            src={item.imgUrl}
            alt={item.name}
            layout="responsive"
            objectFit="cover"
            dataUrl={item.url}
            className="cursor-pointer rounded-lg transition-all"
            width={900}
            height={450}
            ctg={item.ctg}
            mood={item.mood}
          />
        </li>
      ))}
    </ul>
  );
};

export default MusicList;
