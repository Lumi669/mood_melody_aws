// // "use client";
// import React from "react";

// import { useMedia } from "../../../context/MediaContext";

// import CustomImage from "../../../components/CustomImage";
// import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";

// const AllMusicPage: React.FC = () => {
//   const { mediaData, /*playTrack,*/ togglePlayPause, setMediaData } = useMedia();

//   const fetchData = async () => {
//       // Fetch music and image data and match them
//       const matchedData = await fetchAllMusicWithImages();
//       console.log("matchedData ===== ", matchedData);
//       setMediaData(matchedData);
//     };

//   fetchData();

//   console.log("mediaData ==== ", mediaData);

//   return (
//     <div>
//       <h1>All Music hello</h1>
//       <ul>
//         {mediaData.map((item) => {
//           console.log("Image URL: ", item.imgUrl);

//           return (
//             <li
//               key={item.id}
//               className="relative h-96 w-full max-w-4xl mx-auto "
//             >
//               <h2>{item.name}</h2>

//               <CustomImage
//                 src={item.imgUrl}
//                 alt={item.name}
//                 onClick={() => togglePlayPause(item.url)}
//               />
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default AllMusicPage;

// import React, { Suspense } from "react";
// import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";
// import CustomImage from "../../../components/CustomImage"
// import { MusicWithImage } from "types/type";

// export default async function AllMusicPage() {
//   // Fetch music and image data server-side
//   const matchedData = await fetchAllMusicWithImages();

//   return (
//     <div>
//       <h1>All Music</h1>
//       {/* <Suspense fallback={<div>Loading...</div>}>
//         <MusicList initialData={matchedData} />
//       </Suspense> */}

//       <ul>
//         {matchedData.map((item: MusicWithImage) => (
//           <li
//             key={item.id}
//             className="relative h-96 w-full max-w-4xl mx-auto "
//           >
//             <h2>{item.name}</h2>
//             <CustomImage
//               src={item.imgUrl}
//               alt={item.name}
//               onClick={() => {/* Add logic if necessary */}}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from "react";
import { MusicWithImage } from "types/type";
import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../../components/ClientContextUpdater";
import ClientInteractivityWrapper from "../../../components/ClientInteractivityWrapper";
import Image from "next/image";

export default async function AllMusicPage() {
  // Fetch music and image data server-side
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div>
      <h1>All Music</h1>
      <ul>
        {matchedData.map((item: MusicWithImage) => (
          <li key={item.id} className="relative h-96 w-full max-w-4xl mx-auto">
            <h2>{item.name}</h2>
            <Image
              src={item.imgUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              data-url={item.url} // Pass the URL as a data attribute
            />
          </li>
        ))}
      </ul>
      <ClientContextUpdater initialData={matchedData} />
      <ClientInteractivityWrapper />
    </div>
  );
}
