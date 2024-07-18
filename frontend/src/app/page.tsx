import React from "react";

import TestForm from "../../components/TestForm";
import { fetchAllMusicWithImages } from "utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../components/ClientContextUpdater";

import ClientWrapperForMusicPlayer from "../../components/client/ClientWrapperForMusicPlayer";
const Home: React.FC = async () => {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div>
      <div>
        <p>Provide name</p>
        <TestForm />
      </div>
      <h1>Welcome to the New Mood Music App i have no idea</h1>
      <ClientWrapperForMusicPlayer />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
};

export default Home;
