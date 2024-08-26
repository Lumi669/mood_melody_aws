// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { customLoader } from "../utils/customImageLoader";
// import { CustomImageProps } from "../types/type";
// import { useMedia } from "../context/MediaContext";

// const CustomImage: React.FC<CustomImageProps> = ({
//   src,
//   alt,
//   layout,
//   objectFit,
//   onClick,
//   dataUrl,
//   width,
//   height,
//   className,
// }) => {
//   const { isPlaying, setIsPlaying } = useMedia();

//   const handleClick = (
//     event: React.MouseEvent<HTMLImageElement, MouseEvent>,
//   ) => {
//     setIsPlaying(!isPlaying);
//     if (onClick) {
//       onClick(dataUrl || ""); // Ensure dataUrl is always a string
//     }
//   };

//   return (
//     <div
//       className="relative inline-block cursor-pointer"
//       onClick={onClick ? handleClick : undefined}
//     >
//       <Image
//         loader={() => customLoader({ srcOfImageUrl: src })}
//         src={src}
//         alt={alt}
//         layout={layout}
//         objectFit={objectFit}
//         unoptimized // Disable optimization
//         data-url={dataUrl}
//         width={width}
//         height={height}
//         className={className}
//       />
//       {isPlaying ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="white"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           className="absolute inset-0 m-auto w-12 h-12 text-white"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M6 4.5v15m12-15v15"
//           />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="white"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           className="absolute inset-0 m-auto w-12 h-12 text-white"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
//           />
//         </svg>
//       )}
//     </div>
//   );
// };

// export default CustomImage;

"use client";

import React from "react";
import Image from "next/image";
import { customLoader } from "../utils/customImageLoader";
import { CustomImageProps } from "../types/type";
import { useMedia } from "../context/MediaContext";

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  layout,
  objectFit,
  onClick,
  dataUrl,
  width,
  height,
  className,
}) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMedia();

  const handleClick = () => {
    if (currentTrack !== dataUrl) {
      playTrack(dataUrl || "");
    } else {
      togglePlayPause(dataUrl || "");
    }
    if (onClick) {
      onClick(dataUrl || "");
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleClick}>
      <Image
        loader={() => customLoader({ srcOfImageUrl: src })}
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        unoptimized
        data-url={dataUrl}
        width={width}
        height={height}
        className={className}
      />
      {currentTrack === dataUrl && isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="absolute inset-0 m-auto w-12 h-12 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 4.5v15m12-15v15"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="absolute inset-0 m-auto w-12 h-12 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomImage;
