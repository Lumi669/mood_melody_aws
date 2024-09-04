import React from "react";
import { fetchAllMusicWithImages } from "@utils/fetchAllMusicWithImages";
import ClientContextUpdater from "@components/ClientContextUpdater";
import MusicList from "@components/MusicList"; // Client-side component

export default async function AllMusicPage() {
  const matchedData = await fetchAllMusicWithImages(); // Fetch data server-side

  return (
    <div className="h-screen overflow-y-scroll p-4 pb-40">
      {/* Pass the fetched data to the client-side component */}
      <MusicList matchedData={matchedData} />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
}
