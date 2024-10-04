export const extractAuthorName = (fileName: string) => {
  // Split at the first underscore and take the first part (before "_")
  let authorName = fileName.split("_")[0];

  if (authorName) {
    // Replace hyphens with spaces and trim the result
    authorName = authorName.replace(/-/g, " ").trim();
    console.log("authorName.trim === ", authorName);
    return authorName;
  } else {
    return "";
  }
};

export const extractMusicName = (fileName: string) => {
  // Split at the first underscore and take the second part (after "_")
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
