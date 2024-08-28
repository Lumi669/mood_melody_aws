import React from "react";

import TestForm from "../../components/TestForm";
import { fetchAllMusicWithImages } from "utils/fetchAllMusicWithImages";
import ClientContextUpdater from "../../components/ClientContextUpdater";

import ClientWrapperForMusicPlayer from "../../components/ClientWrapperForMusicPlayer";
const Home: React.FC = async () => {
  const matchedData = await fetchAllMusicWithImages();

  return (
    <div>
      <h1 className="bg-slate-200">How do you feel today ?</h1>
      <ClientWrapperForMusicPlayer />
      <ClientContextUpdater initialData={matchedData} />
    </div>
  );
};

export default Home;
