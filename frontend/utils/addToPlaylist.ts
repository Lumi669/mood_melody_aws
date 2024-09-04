import { MusicWithImageSimplified } from "../types/type";
export const addToPlaylist22 = (currentMusic: MusicWithImageSimplified) => {
  console.log("addtoplaylist get called .....");

  // Get existing playlist from local storage
  const existingPlaylist = localStorage.getItem("playlist");

  // console.log("existingPlaylist from addToPlaylist22 ==== ", existingPlaylist);
  console.log("555555");

  const playlist = existingPlaylist ? JSON.parse(existingPlaylist) : [];

  console.log("playlist from addToPlaylist22 === ", playlist);
  console.log("66666");

  const isMusicInPlaylist = playlist.some(
    (music: MusicWithImageSimplified) => music.ctg === currentMusic.ctg,
  );
  console.log("777777");

  if (currentMusic && !isMusicInPlaylist) {
    console.log("8888888");

    playlist.push(currentMusic);
    console.log("99999999");

    localStorage.setItem("playlist", JSON.stringify(playlist));
  }
};
