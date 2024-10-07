// "use client";

// import React, { useEffect, useState } from "react";
// import CustomImage from "@components/CustomImage";
// import { MusicWithImageSimplified } from "../../../../types/type";
// import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";
// import Link from "next/link";
// import { useMedia } from "@context/MediaContext";
// import { getTextColor } from "@utils/getTextColor";
// import ButtonGroup from "@components/ButtonGroup";

// const MixTape: React.FC = () => {
//   const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);
//   const { isRed, isBlue, isBrown } = useMedia();

//   // Load the playlist from localStorage
//   const loadPlaylistFromLocalStorage = () => {
//     const storedPlaylist = localStorage.getItem("playlist");
//     if (storedPlaylist) {
//       setPlaylist(JSON.parse(storedPlaylist));
//     }
//   };

//   useEffect(() => {
//     // Load the playlist initially
//     loadPlaylistFromLocalStorage();

//     // Event listener for custom 'playlistUpdated' event
//     const handlePlaylistUpdate = () => {
//       loadPlaylistFromLocalStorage();
//     };

//     window.addEventListener("playlistUpdated", handlePlaylistUpdate);

//     return () => {
//       window.removeEventListener("playlistUpdated", handlePlaylistUpdate);
//     };
//   }, []);

//   return (
//     <div>
//       {playlist.length === 0 ? (
//         <>
//           {/* This section matches the SongsPage layout */}
//           <div className="relative flex flex-col items-center justify-center h-screen overflow-y-scroll">
//             <div className="flex flex-col items-center justify-center -mt-40">
//               <h1
//                 className={`text-5xl font-extrabold mb-6 drop-shadow-lg ${getTextColor(
//                   isRed,
//                   isBlue,
//                   isBrown,
//                 )}`}
//               >
//                 You have no played music yet.
//               </h1>
//               <p className="text-xl text-purple-600 text-center max-w-xl leading-relaxed mb-8">
//                 Explore the entire music collection{" "}
//                 <Link
//                   href="/songs/allmusic"
//                   className="text-blue-500 underline hover:text-blue-700"
//                 >
//                   all music.
//                 </Link>{" "}
//                 You may also try selecting a mood to match your vibe or check
//                 your mood using the AI tool on the{" "}
//                 <Link
//                   href="/"
//                   className="text-blue-500 underline hover:text-blue-700"
//                 >
//                   homepage
//                 </Link>
//                 .
//               </p>
//               <ButtonGroup />
//             </div>
//             {/* Decorative shapes */}
//             <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
//             <div className="absolute bottom-32 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
//             <div className="absolute bottom-40 right-30 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
//           </div>
//         </>
//       ) : (
//         <div className="h-screen overflow-y-scroll flex justify-center items-center p-4 pb-40">
//           <ul className="pt-10 pb-40 w-full max-w-3xl mt-8">
//             {playlist.map((item: MusicWithImageSimplified, index: number) => (
//               <li
//                 key={item.ctg}
//                 className="flex items-center w-full max-w-xl mx-auto mb-10"
//               >
//                 {/* Number and text on left of image for mobile */}
//                 <div className="md:hidden w-full flex flex-col items-center mb-4">
//                   <span className="text-2xl font-bold">{index + 1}.</span>
//                   <div className="text-lg font-semibold">
//                     {extractAuthorName(item.name)}
//                   </div>
//                   <div className="text-sm">{extractMusicName(item.name)}</div>
//                 </div>

//                 {/* Number for desktop (left side of the image) */}
//                 <span className="hidden md:block text-2xl font-bold w-8 text-right mr-16">
//                   {index + 1}.
//                 </span>

//                 {/* Image */}
//                 <div className="flex-shrink-0 mr-8">
//                   <CustomImage
//                     src={item.imgUrl}
//                     alt={item.name}
//                     layout="fixed"
//                     objectFit="cover"
//                     dataUrl={item.url ?? ""}
//                     className="cursor-pointer rounded-lg transition-all"
//                     width={260}
//                     height={130}
//                     ctg={item.ctg}
//                     mood={item.mood}
//                   />
//                 </div>

//                 {/* Text beside image for desktop */}
//                 <h2 className="hidden md:block text-xl font-semibold ml-4 flex-grow basis-3/4">
//                   <div className="font-bold text-blue-900">
//                     {extractAuthorName(item.name)}
//                   </div>
//                   <div className="text-gray-800 whitespace-nowrap overflow-hidden">
//                     {extractMusicName(item.name)}
//                   </div>
//                 </h2>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MixTape;

"use client";

import React, { useEffect, useState } from "react";
import CustomImage from "@components/CustomImage";
import { MusicWithImageSimplified } from "../../../../types/type";
import { extractAuthorName, extractMusicName } from "@utils/extractMusicInfo";
import Link from "next/link";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";
import ButtonGroup from "@components/ButtonGroup";

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);
  const { isRed, isBlue, isBrown } = useMedia();

  // Load the playlist from localStorage
  const loadPlaylistFromLocalStorage = () => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }
  };

  useEffect(() => {
    // Load the playlist initially
    loadPlaylistFromLocalStorage();

    // Event listener for custom 'playlistUpdated' event
    const handlePlaylistUpdate = () => {
      loadPlaylistFromLocalStorage();
    };

    window.addEventListener("playlistUpdated", handlePlaylistUpdate);

    return () => {
      window.removeEventListener("playlistUpdated", handlePlaylistUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto">
      {playlist.length === 0 ? (
        <>
          {/* This section matches the SongsPage layout */}
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center -mt-40">
              <h1
                className={`text-5xl font-extrabold mb-6 drop-shadow-lg ${getTextColor(
                  isRed,
                  isBlue,
                  isBrown,
                )}`}
              >
                You have no played music yet.
              </h1>
              <p className="text-xl text-purple-600 text-center max-w-xl leading-relaxed mb-8">
                Explore my entire music collection{" "}
                <Link
                  href="/songs/allmusic"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  all music.
                </Link>{" "}
                You may also try selecting a mood to match your vibe or check
                your mood using my AI tool on the{" "}
                <Link
                  href="/"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  homepage
                </Link>
                .
              </p>
              <ButtonGroup />
            </div>
            {/* Decorative shapes */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-32 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-40 right-30 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </>
      ) : (
        <div className="h-screen overflow-y-auto p-4">
          <ul className="pt-4 pb-40 w-full max-w-3xl mx-auto">
            {playlist.map((item: MusicWithImageSimplified, index: number) => (
              <li
                key={item.ctg}
                className="flex items-center w-full max-w-xl mx-auto mb-10"
              >
                {/* Number and text on left of image for mobile */}
                <div className="md:hidden w-full flex flex-col items-center mb-4">
                  <span className="text-2xl font-bold">{index + 1}.</span>
                  <div className="text-lg font-semibold">
                    {extractAuthorName(item.name)}
                  </div>
                  <div className="text-sm">{extractMusicName(item.name)}</div>
                </div>

                {/* Number for desktop (left side of the image) */}
                <span className="hidden md:block text-2xl font-bold w-8 text-right mr-16">
                  {index + 1}.
                </span>

                {/* Image */}
                <div className="flex-shrink-0 mr-8">
                  <CustomImage
                    src={item.imgUrl}
                    alt={item.name}
                    layout="fixed"
                    objectFit="cover"
                    dataUrl={item.url ?? ""}
                    className="cursor-pointer rounded-lg transition-all"
                    width={260}
                    height={130}
                    ctg={item.ctg}
                    mood={item.mood}
                  />
                </div>

                {/* Text beside image for desktop */}
                <h2 className="hidden md:block text-xl font-semibold ml-4 flex-grow basis-3/4">
                  <div className="font-bold text-blue-900">
                    {extractAuthorName(item.name)}
                  </div>
                  <div className="text-gray-800 whitespace-nowrap overflow-hidden">
                    {extractMusicName(item.name)}
                  </div>
                </h2>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MixTape;
