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

  // State to track if the scroll logic has been triggered
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Reset the scroll state whenever the currentSong changes
    setHasScrolled(false);
  }, [currentSong]);

  useEffect(() => {
    // Execute centering logic if currentSong is valid, container exists, and scroll hasn't been triggered
    if (!currentSong?.url || !containerRef.current || hasScrolled) return;

    // Get the active song element
    const element = listRefs.current[currentSong.url];
    if (element) {
      // Use a timeout to ensure the layout is fully rendered before scrolling
      setTimeout(() => {
        // Calculate scroll offset to center the active item in the container
        const containerHeight = containerRef.current!.clientHeight;
        const elementTop = element.offsetTop;
        const elementHeight = element.clientHeight;

        const scrollOffset =
          elementTop - containerHeight / 2 + elementHeight / 2;

        // Scroll to the calculated position
        containerRef.current!.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });

        // Mark as scrolled to avoid re-triggering
        setHasScrolled(true);
      }, 100); // Adjust the delay as needed to ensure the layout is ready
    }
  }, [currentSong, hasScrolled]);

  return (
    <ul ref={containerRef} className="overflow-y-scroll h-full">
      {matchedData.map((item: MusicWithImage) => (
        <li
          key={item.url}
          id={item.url || ""}
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
