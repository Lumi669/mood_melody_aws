import React from "react";

import TestForm from "./components/TestForm";

import ClientWrapperForMusicPlayer from "./components/client/ClientWrapperForMusicPlayer";
const Home: React.FC = () => {
  return (
    <div>
      <div>
        <p>Provide name</p>
        <TestForm />
      </div>
      <h1>Welcome to the New Mood Music App i have no idea</h1>
      <ClientWrapperForMusicPlayer />
    </div>
  );
};

export default Home;
