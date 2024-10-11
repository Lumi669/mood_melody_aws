import React from "react";
import Link from "next/link";
import ButtonGroup from "@components/ButtonGroup";
import DecorativeElements from "@components/DecorativeElements";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

const EmptyPlaylist: React.FC = () => {
  const { isRed, isBlue, isBrown } = useMedia();

  return (
    <div>
      <div className="h-screen overflow-y-auto">
        <h1
          className={`text-center mt-64 text-5xl md:text-4xl sm:text-3xl font-extrabold ${getTextColor(
            isRed,
            isBlue,
            isBrown,
          )}`}
        >
          You have no played music yet.
        </h1>
        <div className="h-screen overflow-y-scroll px-4 pb-80 pt-10">
          <div className="max-w-5xl mx-auto">
            <div className="indent-8 m-2 text-xl leading-relaxed text-center text-purple-600">
              <p>
                Explore the entire music collection{" "}
                <Link
                  href="/songs/allmusic"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  all music.
                </Link>{" "}
                You may also try selecting a mood to match your vibe or check
                your mood using the AI tool on the{" "}
                <Link
                  href="/"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  homepage
                </Link>
                .
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <ButtonGroup />
            </div>
          </div>
        </div>
      </div>
      <DecorativeElements />
    </div>
  );
};

export default EmptyPlaylist;
