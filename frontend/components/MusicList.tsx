"use client"; // Indicate that this is a client-side component

import React, { useEffect, useRef, useState } from "react";
import { MusicWithImage, MusicWithImageSimplified } from "types/type";
import CustomImage from "@components/CustomImage";
import { useMedia } from "@context/MediaContext";

interface MusicListProps {
  matchedData: MusicWithImage[];
}

const MusicList: React.FC<MusicListProps> = ({ matchedData }) => {
  const { currentSong } = useMedia();

  // Refs to store references to list items
  const listRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  // Ref for the container element
  const containerRef = useRef<HTMLUListElement | null>(null);

  // Ref to keep track of the previous currentSong
  const previousSongRef = useRef<MusicWithImageSimplified | null>(null);

  // State to check if the component has been initially loaded
  const [initialLoad, setInitialLoad] = useState(true);

  // Scroll to the specific music image whenever currentSong changes
  useEffect(() => {
    if (currentSong?.url) {
      const element = listRefs.current[currentSong.url]; // Use the song's URL as the key

      // Check if scrolling is needed based on previous song or initial load
      if (
        (previousSongRef.current?.url !== currentSong.url || initialLoad) &&
        element &&
        containerRef.current
      ) {
        // Calculate the scroll position
        const containerHeight = containerRef.current.clientHeight;
        const elementOffset = element.offsetTop;
        const elementHeight = element.clientHeight;
        const scrollTo =
          elementOffset - containerHeight / 2 + elementHeight / 2;

        // Scroll to the correct position
        containerRef.current.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });

        // Store scroll position in sessionStorage
        sessionStorage.setItem("scrollPosition", String(scrollTo));

        // Update the previous song ref to the current song
        previousSongRef.current = currentSong;

        // Mark the initial load as complete
        setInitialLoad(false);
      }
    }
  }, [currentSong, initialLoad]);

  // Restore scroll position on component mount
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition && containerRef.current) {
      containerRef.current.scrollTo({
        top: Number(savedScrollPosition),
        behavior: "auto", // Instantly set to the saved position
      });
    }
  }, []);

  return (
    <>
      <ul ref={containerRef} className="overflow-y-scroll h-full">
        {matchedData.map((item: MusicWithImage) => (
          <li
            key={item.url} // Use URL as a unique key
            ref={(el) => {
              // Assign refs to each list item
              if (el) {
                listRefs.current[item.url] = el; // Store refs using song URL as key
              }
            }}
            className={`relative h-90 w-full max-w-4xl mx-auto mb-10 ${
              currentSong?.url === item.url ? "bg-gray-100" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-5">{item.name}</h2>
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
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MusicList;
