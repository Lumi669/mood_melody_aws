import React from "react";
import { fetchAllMusicWithImages } from "@utils/fetchAllMusicWithImages";
import ClientContextUpdater from "@components/ClientContextUpdater";
import MusicPlayer from "@components/MusicPlayer";

const Home: React.FC = async () => {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div className="relative min-h-screen overflow-auto px-4">
      <MusicPlayer />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
};

export default Home;
