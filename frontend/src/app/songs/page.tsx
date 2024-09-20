import React from "react";
import Link from "next/link"; // Import the Link component from Next.js

const SongsPage = () => {
  return (
    <div className="flex items-start justify-center h-screen">
      <p className="mt-20 text-center text-2xl">
        You can check{" "}
        <Link
          href="/songs/allmusic"
          className="text-blue-500 underline hover:text-blue-700"
        >
          all music
        </Link>{" "}
        or{" "}
        <Link
          href="/songs/mixtape"
          className="text-blue-500 underline hover:text-blue-700"
        >
          your played list
        </Link>
        .
      </p>
    </div>
  );
};

export default SongsPage;
