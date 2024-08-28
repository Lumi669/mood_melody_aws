import React from "react";

import TestForm from "../../components/TestForm";
import { fetchAllMusicWithImages } from "utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../components/ClientContextUpdater";

import ClientWrapperForMusicPlayer from "../../components/ClientWrapperForMusicPlayer";
const Home: React.FC = async () => {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div>
      <h1 className="m-20 p-20 bg-yellow-100 text-4xl font-mono text-green-500 font-bold tracking-wide text-center">
        Hi there, How do you feel today :D ?
      </h1>
      <ClientWrapperForMusicPlayer />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
};

export default Home;
