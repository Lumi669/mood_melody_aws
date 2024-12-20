import React from "react";
import { fetchAllMusicWithImages } from "@utils/fetchAllMusicWithImages";
// import ClientContextUpdater from "@components/ClientContextUpdater";
import DecorativeElements from "@components/DecorativeElements";
// import ClientMusicPlayer from "@components/ClientMusicPlayer";
import MusicPlayer from "@components/MusicPlayer";

const Home: React.FC = async () => {
  // const matchedData = await fetchAllMusicWithImages();

  return (
    <div className="relative h-screen overflow-auto md:overflow-hidden px-4 pb-60">
      {/* Pass initial data as props to the client component */}
      {/* <ClientMusicPlayer /> */}
      {/* <ClientContextUpdater initialData={matchedData} /> */}
      {/* Decorative shapes for a playful look */}
      <MusicPlayer />
      <DecorativeElements />
    </div>
  );
};

export default Home;
