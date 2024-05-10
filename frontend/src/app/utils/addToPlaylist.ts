import { MusicWithImage } from "../types/type";
export const addToPlaylist = (currentMusic: MusicWithImage) => {
  // Get existing playlist from local storage
  const existingPlaylist = localStorage.getItem("playlist");

  console.log("exiting play list ==== ", existingPlaylist);

  const playlist = existingPlaylist ? JSON.parse(existingPlaylist) : [];

  console.log("playlist === ", playlist);

  // Add current music to playlist
  if (currentMusic) {
    playlist.push(currentMusic);
    // Save updated playlist to local storage
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }
};
