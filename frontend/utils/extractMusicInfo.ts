export const extractAuthorName = (fileName: string) => {
  // Split the string by the first hyphen
  const authorName = fileName.split("-")[0];

  return authorName.trim();
};

export const extractMusicName = (fileName: string) => {
  // Splits at the first underscore and takes the second part
  const songName = fileName.split("_")[1];

  return songName.trim();
};
