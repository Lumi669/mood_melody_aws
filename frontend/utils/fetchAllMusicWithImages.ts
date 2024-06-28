import { Music, Image } from "../types/type";

import { apiUrls } from "../config/apiConfig";

export const fetchAllMusicWithImages = async () => {
  console.log("apiUrls.images ====== ", apiUrls.images);
  console.log("apiUrls.musics ====== ", apiUrls.musics);
  const musicResponse = await fetch(
    `${apiUrls.musics}?cacheBust=${Date.now()}`,
  );
  const imageResponse = await fetch(
    `${apiUrls.images}?cacheBust=${Date.now()}`,
  );
  // const imageResponse = await fetch(
  //   `http://localhost:4000/api/images?cacheBust=${Date.now()}`,
  // );

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
