// "use client"; // Indicate that this is a client-side component

// import React, { useEffect, useRef } from "react";
// import { MusicWithImage, MusicWithImageSimplified } from "../types/type";
// import CustomImage from "@components/CustomImage";
// import { useMedia } from "@context/MediaContext";
// import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";

// interface MusicListProps {
//   matchedData: MusicWithImage[];
// }

// const MusicList: React.FC<MusicListProps> = ({ matchedData }) => {
//   const { currentSong } = useMedia();

//   // Refs to store references to list items
//   const listRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

//   // Ref to keep track of the previous currentSong
//   const previousSongRef = useRef<MusicWithImageSimplified | null>(null);

//   // Ref for the container element
//   const containerRef = useRef<HTMLUListElement | null>(null);

//   // Scroll to the specific music image whenever currentSong changes
//   useEffect(() => {
//     if (currentSong?.url) {
//       // Ensure currentSong is not null and has a valid URL
//       // Check if the current song has changed
//       if (previousSongRef.current?.url !== currentSong.url) {
//         const element = listRefs.current[currentSong.url]; // Use the song's URL as the key
//         if (element && containerRef.current) {
//           // Delay scroll to allow for layout changes
//           setTimeout(() => {
//             element.scrollIntoView({
//               behavior: "smooth", // Smooth scrolling effect
//               block: "center", // Align to the center of the viewport
//             });

//             // Manual adjustment for centering
//             const containerHeight = containerRef.current!.clientHeight;
//             const elementOffset = element.offsetTop;
//             const elementHeight = element.clientHeight;
//             const scrollTo =
//               elementOffset - containerHeight / 2 + elementHeight / 2;
//             containerRef.current!.scrollTo({
//               top: scrollTo,
//               behavior: "smooth",
//             });
//           }, 80); // Delay for 50ms to ensure layout updates settle
//         }
//         // Update the previous song ref to the current song
//         previousSongRef.current = currentSong;
//       }
//     }
//   }, [currentSong]);

//   return (
//     <>
//       <ul ref={containerRef} className="overflow-y-scroll h-full">
//         {matchedData.map((item: MusicWithImage) => (
//           <li
//             key={item.url} // Use URL as a unique key
//             ref={(el) => {
//               // Assign refs to each list item
//               if (el) {
//                 listRefs.current[item.url] = el; // Store refs using song URL as key
//               }
//             }}
//             className={`relative h-90 w-full max-w-4xl mx-auto mb-10 ${
//               currentSong?.url === item.url ? "bg-gray-100" : ""
//             }`}
//           >
//             <h2 className="text-xl font-semibold mb-5">
//               <span className="font-bold text-blue-900">
//                 {extractAuthorName(item.name)}
//               </span>
//               <span className="text-gray-800">
//                 : {extractMusicName(item.name)}
//               </span>
//             </h2>

//             <CustomImage
//               src={item.imgUrl}
//               alt={item.name}
//               layout="responsive"
//               objectFit="cover"
//               dataUrl={item.url}
//               className="cursor-pointer rounded-lg transition-all"
//               width={900}
//               height={450}
//               ctg={item.ctg}
//               mood={item.mood}
//             />
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default MusicList;

"use client"; // Add this line to mark the component as a client component

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

  // State to track if the initial scroll was triggered
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Only execute if there's a valid currentSong with URL, container exists, and scroll hasn't been triggered
    if (!currentSong?.url || !containerRef.current || hasScrolled) return;

    // Get the active song element
    const element = listRefs.current[currentSong.url];
    if (element) {
      // Calculate scroll offset to center the active item in the container
      const containerHeight = containerRef.current.clientHeight;
      const elementTop = element.offsetTop;
      const elementHeight = element.clientHeight;

      // Adjusted scroll calculation
      const scrollOffset = elementTop - containerHeight / 2 + elementHeight / 2;

      // Log the scroll details for debugging
      console.log("Container Height:", containerHeight);
      console.log("Element Offset Top:", elementTop);
      console.log("Element Height:", elementHeight);
      console.log("Calculated Scroll Offset:", scrollOffset);

      // Manually scroll to the calculated position
      containerRef.current.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });

      // Mark as scrolled to avoid re-triggering
      setHasScrolled(true);
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
