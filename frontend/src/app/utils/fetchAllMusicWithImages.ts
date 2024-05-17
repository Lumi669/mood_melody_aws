import { Music, Image } from "../types/type";
export const fetchAllMusicWithImages = async () => {
  const musicResponse = await fetch(
    "http://localhost:4000/api/musics",
  );
  const imageResponse = await fetch(
    "http://localhost:4000/api/images",
  );
  // const musicResponse = await fetch(
  //   "https://mood-melody-backend-860ac0ad6346.herokuapp.com/api/musics",
  // );
  // const imageResponse = await fetch(
  //   "https://mood-melody-backend-860ac0ad6346.herokuapp.com/api/images",
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
