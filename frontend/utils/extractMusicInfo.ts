export const extractAuthorName = (fileName: string) => {
  // Split the string by the first hyphen
  const authorName = fileName.split("-")[0];

  console.log("authorName.trim === ", authorName.trim());

  if (authorName) {
    return authorName.trim();
  } else {
    return "";
  }
};

export const extractMusicName = (fileName: string) => {
  // Splits at the first underscore and takes the second part
  let songName = fileName.split("_")[1];

  if (songName) {
    // Remove the .mp3 extension and replace hyphens with spaces
    songName = songName.replace(".mp3", "").replace(/-/g, " ").trim();
    console.log("songName.trim() === ", songName);
    return songName;
  } else {
    return "";
  }
};
