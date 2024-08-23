// import React from "react";
// import { MusicWithImage } from "types/type";
// import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";
// import ClientContextUpdater from "../../../components/ClientContextUpdater";
// import ClientInteractivityWrapper from "../../../components/ClientInteractivityWrapper";
// import CustomImage from "components/CustomImage";

// export default async function AllMusicPage() {
//   // Fetch music and image data server-side
//   const matchedData = await fetchAllMusicWithImages();
//   console.log("matchedData from allmusic page == ", matchedData);

//   return (
//     <div>
//       <h1>All Music</h1>
//       <ul>
//         {matchedData.map((item: MusicWithImage) => (
//           <li key={item.id} className="relative h-96 w-full max-w-4xl mx-auto">
//             <h2>{item.name}</h2>

//             <CustomImage
//               src={item.imgUrl}
//               alt={item.name}
//               layout="responsive"
//               objectFit="cover"
//               dataUrl={item.url}
//               className="cursor-pointer"
//               width={500}
//               height={500}
//             />
//           </li>
//         ))}
//       </ul>
//       <ClientContextUpdater initialData={matchedData} />
//       <ClientInteractivityWrapper />
//     </div>
//   );
// }

import React from "react";
import { MusicWithImage } from "types/type";
import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../../components/ClientContextUpdater";
import ClientInteractivityWrapper from "../../../components/ClientInteractivityWrapper";
import CustomImage from "components/CustomImage";

export default async function AllMusicPage() {
  // Fetch music and image data server-side
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Music</h1>
      <ul>
        {matchedData.map((item: MusicWithImage) => (
          <li key={item.id} className="relative h-96 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <CustomImage
              src={item.imgUrl}
              alt={item.name}
              layout="responsive"
              objectFit="cover"
              dataUrl={item.url}
              className="cursor-pointer rounded-lg transition-all duration-300"
              width={500}
              height={500}
            />
          </li>
        ))}
      </ul>
      <ClientContextUpdater initialData={matchedData} />
      <ClientInteractivityWrapper />
    </div>
  );
}
