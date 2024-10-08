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
      {/* Decorative shapes for a playful look */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-32 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-30 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
    </div>
  );
};

export default Home;
