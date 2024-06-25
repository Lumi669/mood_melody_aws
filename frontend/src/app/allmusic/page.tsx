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
