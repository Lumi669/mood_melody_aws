"use client";
import React, { useState, useEffect } from "react";
import EmptyPlaylist from "@components/myplaylistComponents/EmptyPlaylist";
import NonEmptyPlaylist from "@components/myplaylistComponents/NonEmptyPlaylist";
import { MusicWithImageSimplified } from "../../../../types/type";

const MixTape: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicWithImageSimplified[]>([]);

  // Load the playlist from localStorage
  const loadPlaylistFromLocalStorage = () => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }
  };

  useEffect(() => {
    // Load the playlist initially
    loadPlaylistFromLocalStorage();

    // Event listener for custom 'playlistUpdated' event
    const handlePlaylistUpdate = () => {
      loadPlaylistFromLocalStorage();
    };

    window.addEventListener("playlistUpdated", handlePlaylistUpdate);

    return () => {
      window.removeEventListener("playlistUpdated", handlePlaylistUpdate);
    };
  }, []);

  // Conditional rendering
  return (
    <div>
      {playlist.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <NonEmptyPlaylist playlist={playlist} />
      )}
    </div>
  );
};

export default MixTape;
