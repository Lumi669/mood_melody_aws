import React from "react";

import ClientWrapperForMusicPlayer from "./components/client/ClientWrapperForMusicPlayer";
const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the New Mood Music App</h1>
      <ClientWrapperForMusicPlayer />
    </div>
  );
};

export default Home;
