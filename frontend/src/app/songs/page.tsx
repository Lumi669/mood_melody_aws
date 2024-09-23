"use client";
import React from "react";
import Link from "next/link";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";

const SongsPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Wrapper for the content to control positioning */}
      <div className="flex flex-col items-center justify-center -mt-40">
        {" "}
        <h1
          className={`text-5xl font-extrabold mb-6 drop-shadow-lg ${getTextColor(
            isRed,
            isBlue,
            isBrown,
          )}`}
        >
          Welcome to the Music Garden!
        </h1>
        {/* Description centered in the middle */}
        <p className="text-xl text-purple-600 text-center max-w-xl leading-relaxed mb-8">
          Discover melodies that match your vibe. Feel free to browse{" "}
          <Link
            href="/songs/allmusic"
            className="text-blue-700 hover:underline"
          >
            all music
          </Link>{" "}
          or check out{" "}
          <Link href="/songs/mixtape" className="text-blue-700 hover:underline">
            your played list
          </Link>
          .
        </p>
        {/* Button area styled with a cute look */}
        <div className="flex justify-center gap-6">
          <Link href="/songs/allmusic">
            <div className="bg-blue-300 text-white px-8 py-4 rounded-full hover:bg-blue-400 transition text-lg font-semibold shadow-lg cursor-pointer">
              All Music
            </div>
          </Link>
          <Link href="/songs/mixtape">
            <div className="bg-purple-300 text-white px-8 py-4 rounded-full hover:bg-purple-400 transition text-lg font-semibold shadow-lg cursor-pointer">
              Your Played List
            </div>
          </Link>
        </div>
      </div>
      {/* Decorative shapes for a playful look */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-32 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-30 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>{" "}
      {/* Added a new decorative circle */}
    </div>
  );
};

export default SongsPage;
