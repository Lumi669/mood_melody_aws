import React from "react";
import { fetchAllMusicWithImages } from "@utils/fetchAllMusicWithImages";
import ClientContextUpdater from "@components/ClientContextUpdater";
import dynamic from "next/dynamic";

// Dynamically import MusicPlayer to ensure it's treated as a client component
const MusicPlayer = dynamic(() => import("@components/MusicPlayer"), {
  ssr: false,
});

const Home: React.FC = async () => {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div className="relative h-screen overflow-auto md:overflow-hidden px-4 pb-60">
      {/* Pass initial data as props to the client component */}
      <MusicPlayer initialData={matchedData} />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
};

export default Home;
