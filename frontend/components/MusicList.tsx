"use client";

import React, { useEffect, useRef, useState } from "react";
import { MusicWithImage } from "../types/type";
import CustomImage from "@components/CustomImage";
import { useMedia } from "@context/MediaContext";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";

const MusicList: React.FC = () => {
  const { mediaData, currentSong } = useMedia();
  const listRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const containerRef = useRef<HTMLUListElement | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToActiveMusic = () => {
    if (!currentSong?.url || !containerRef.current) return;

    const container = containerRef.current;
    const element = listRefs.current[currentSong.url];

    if (element) {
      const containerHeight = container.clientHeight;
      const elementTop = element.offsetTop;
      const elementHeight = element.clientHeight;

      const scrollOffset = elementTop - containerHeight / 2 + elementHeight / 2;

      setIsScrolling(true);

      // Smooth scrolling logic
      container.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });

      // Wait for the scroll to complete
      setTimeout(() => setIsScrolling(false), 500); // Adjust timeout to match scroll duration
    }
  };

  // Debounce scroll logic to prevent overlapping triggers
  useEffect(() => {
    if (isScrolling) return;

    const timeout = setTimeout(scrollToActiveMusic, 100); // Add slight delay for rendering stability
    return () => clearTimeout(timeout);
  }, [currentSong]);

  return (
    <ul ref={containerRef} className="overflow-y-scroll h-full">
      {mediaData.map((item: MusicWithImage) => (
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
            dataUrl={item.url}
            className="cursor-pointer rounded-lg transition-all object-cover" // Tailwind class for object fit
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
