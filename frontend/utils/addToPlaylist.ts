import { MusicWithImageSimplified } from "../types/type";
export const addToPlaylist22 = (currentMusic: MusicWithImageSimplified) => {
  console.log("addtoplaylist get called .....");

  // Get existing playlist from local storage
  const existingPlaylist = localStorage.getItem("playlist");

  const playlist = existingPlaylist ? JSON.parse(existingPlaylist) : [];

  const isMusicInPlaylist = playlist.some(
    (music: MusicWithImageSimplified) => music.ctg === currentMusic.ctg,
  );

  if (currentMusic && !isMusicInPlaylist) {
    playlist.push(currentMusic);

    localStorage.setItem("playlist", JSON.stringify(playlist));
  }
};
