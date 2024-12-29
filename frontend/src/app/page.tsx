import React from "react";
import DecorativeElements from "@components/DecorativeElements";
import MusicPlayer from "@components/MusicPlayer";

const Home: React.FC = async () => {
  return (
    <div className="relative h-screen overflow-y-auto px-4 pb-5">
      <MusicPlayer />
      <DecorativeElements />
    </div>
  );
};

export default Home;
