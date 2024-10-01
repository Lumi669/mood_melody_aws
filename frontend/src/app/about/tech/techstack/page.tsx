"use client";

import Image from "next/image";

import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";

const TechStackPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();

  const textColor = getTextColor(isRed, isBlue, isBrown);
  return (
    <div className="h-screen overflow-y-scroll pt-12 pb-80">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-12 text-center ${textColor}`}
        >
          Tech Stack of My Full-Stack Application
        </h1>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto">
          <Image
            src="/tech-stack-border50.webp"
            alt="Tech Stack"
            width={600}
            height={400}
            layout="responsive"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
