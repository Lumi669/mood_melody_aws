"use client";

import React from "react";
import Link from "next/link";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";
import ButtonGroup from "@components/ButtonGroup";

const SongsPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div className="h-screen overflow-y-auto">
      {/* Title section */}
      <h1
        className={`text-center mt-64 text-5xl md:text-4xl sm:text-3xl font-extrabold ${textColor}`}
      >
        Welcome to the Music Garden!
      </h1>

      {/* Main content wrapper with scrollable behavior */}
      <div className="h-screen overflow-y-scroll px-4 pb-80 pt-10">
        <div className="max-w-5xl mx-auto">
          {/* Description centered in the middle */}
          <div className="indent-8 m-2 text-xl leading-relaxed text-center text-purple-600">
            <p>
              Discover melodies that match your vibe. Feel free to browse{" "}
              <Link
                href="/songs/allmusic"
                className="text-blue-500 underline hover:text-blue-700"
              >
                all music
              </Link>{" "}
              or check out{" "}
              <Link
                href="/songs/mixtape"
                className="text-blue-500 underline hover:text-blue-700"
              >
                my played list
              </Link>
              .
            </p>
          </div>

          {/* Button group */}
          <div className="flex justify-center mt-8">
            <ButtonGroup />
          </div>
        </div>
      </div>

      {/* Decorative shapes for a playful look */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-32 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-30 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
    </div>
  );
};

export default SongsPage;
