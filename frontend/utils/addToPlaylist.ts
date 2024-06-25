import { MusicWithImage } from "../types/type";
export const addToPlaylist = (currentMusic: MusicWithImage) => {
  // Get existing playlist from local storage
  const existingPlaylist = localStorage.getItem("playlist");

  console.log("exiting play list ==== ", existingPlaylist);

  const playlist = existingPlaylist ? JSON.parse(existingPlaylist) : [];

  console.log("playlist === ", playlist);

  const isMusicInPlaylist = playlist.some(
    (music: MusicWithImage) => music.id === currentMusic.id,
  );

  if (currentMusic && !isMusicInPlaylist) {
    playlist.push(currentMusic);
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }
};
