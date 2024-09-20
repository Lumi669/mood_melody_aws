import React from "react";
import Link from "next/link";

const SongsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      {/* Title with a playful style */}
      <h1 className="text-5xl font-extrabold text-pink-600 mb-8 drop-shadow-lg">
        Welcome to the Music Garden!
      </h1>

      {/* Description with a soft tone */}
      <p className="text-xl text-purple-600 mb-6 text-center max-w-xl leading-relaxed">
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
          your played list
        </Link>
        .
      </p>

      {/* Button area styled with a cute look */}
      <div className="flex justify-center gap-6 mt-4">
        <Link href="/songs/allmusic">
          <div className="bg-blue-300 text-white px-8 py-4 rounded-full hover:bg-blue-400 transition text-lg font-semibold shadow-md cursor-pointer">
            All Music
          </div>
        </Link>
        <Link href="/songs/mixtape">
          <div className="bg-purple-300 text-white px-8 py-4 rounded-full hover:bg-purple-400 transition text-lg font-semibold shadow-md cursor-pointer">
            Your Played List
          </div>
        </Link>
      </div>

      {/* Decorative shapes for a playful look */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
    </div>
  );
};

export default SongsPage;
