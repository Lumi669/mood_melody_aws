"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ContactButton from "@components/ContactButton";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";
import DecorativeElements from "@components/DecorativeElements";

const CicdPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const router = useRouter();

  const textColor = getTextColor(isRed, isBlue, isBrown);

  const handleTextClick = () => {
    // Clear any stored session data to reset homepage to its original view
    sessionStorage.removeItem("lastPlayedSong");
    sessionStorage.removeItem("wasPlayingOnHomePage");
    sessionStorage.removeItem("wasPausedOnHomePage");
    sessionStorage.removeItem("timePointOfHomePage");

    // Redirect to homepage
    router.push("/");
  };

  return (
    <div className="h-screen overflow-y-scroll pt-12 pb-80">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-12 text-center ${textColor}`}
        >
          Tech CI/CD of{" "}
          <span
            className="relative cursor-pointer text-blue-600 hover:text-blue-800 hover:underline transition duration-300 ease-in-out hover:scale-105 underline-offset-4"
            onClick={handleTextClick}
          >
            Mood Melody
            <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
              Click to see homepage!
            </span>
          </span>{" "}
          Application
        </h1>
        <div className="w-full flex justify-center">
          {/* Set maximum width and allow responsiveness */}
          <Image
            src="/cicd-border50-awsicon.webp"
            // src="/cicd-border50.webp"
            alt="Architecture"
            width={1000} // Increase the resolution to make it more readable
            height={1370} // Keep the aspect ratio proportional
            priority={true}
            className="w-full max-w-4xl object-contain"
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <ContactButton />
      </div>
      {/* Decorative shapes for a playful look */}
      <DecorativeElements />
    </div>
  );
};

export default CicdPage;
