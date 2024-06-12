import { Music, Image } from "../types/type";

import { apiUrls } from "../config/apiConfig";

export const fetchAllMusicWithImages = async () => {
  const musicResponse = await fetch(apiUrls.musics);
  const imageResponse = await fetch(apiUrls.images);

  const musicData = await musicResponse.json();
  const imageData = await imageResponse.json();

  console.log("musicData from context === ", musicData);
  console.log("imageData from context === ", imageData);

  // Match music and image records based on common identifier
  const matchedData = musicData.map((music: Music) => {
    const matchingImage = imageData.find(
      (image: Image) => image.ctg === music.ctg,
    );
    return { ...music, imgUrl: matchingImage ? matchingImage.url : "" };
  });

  return matchedData;
};
