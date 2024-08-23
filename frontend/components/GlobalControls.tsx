// src/components/GlobalControls.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const GlobalControls: React.FC = () => {
  const { stopMusic, isPlaying } = useMedia();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setAnimate(true);
    }
  }, [isPlaying]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex justify-center z-50 transition-all duration-500 ${
        animate ? "animate-fly-in" : ""
      }`}
    >
      {isPlaying && (
        <button
          onClick={stopMusic}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Stop Music
        </button>
      )}
    </div>
  );
};

export default GlobalControls;
