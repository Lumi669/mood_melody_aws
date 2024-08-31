import React from "react";
import { MusicWithImage } from "types/type";
import { fetchAllMusicWithImages } from "../../../utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../../components/ClientContextUpdater";
import CustomImage from "components/CustomImage";

export default async function AllMusicPage() {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div className="h-screen overflow-y-scroll p-4 pb-40">
      {/* Adds padding bottom i.e pb-40 to create space */}
      <ul>
        {matchedData.map((item: MusicWithImage) => (
          <li
            key={item.id}
            className="relative h-90 w-full max-w-4xl mx-auto mb-10"
          >
            <h2 className="text-xl font-semibold mb-5">{item.name}</h2>
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
            />
          </li>
        ))}
      </ul>
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
}
