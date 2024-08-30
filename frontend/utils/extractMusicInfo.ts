export const extractAuthorName = (fileName: string) => {
  // Split the string by the first hyphen
  const authorName = fileName.split("-")[0];

  return authorName.trim();
};
