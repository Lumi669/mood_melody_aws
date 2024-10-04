export const extractAuthorName = (fileName: string) => {
  let authorName = fileName.split("-")[0];

  if (authorName) {
    // Replace underscores with spaces and trim the result
    authorName = authorName.replace(/_/g, " ").trim();
    console.log("authorName.trim === ", authorName);
    return authorName;
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
