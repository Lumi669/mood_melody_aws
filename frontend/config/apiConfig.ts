// src/config/apiConfig.ts
interface ApiUrls {
  base: string;
  images: string;
  musics: string;
  test: string;
  sentimentanalysis: string;
  saveuserfeedback: string;
}

// process.env.NEXT_PUBLIC_API_URL_0 is how application reads
// the environment vialbels whoese values are built by github actions during building docker image
export const apiUrls: ApiUrls = {
  base: process.env.NEXT_PUBLIC_API_URL_0 || "",
  images: process.env.NEXT_PUBLIC_API_URL_1 || "",
  musics: process.env.NEXT_PUBLIC_API_URL_2 || "",
  test: process.env.NEXT_PUBLIC_API_URL_3 || "",
  sentimentanalysis: process.env.NEXT_PUBLIC_API_URL_4 || "",
  saveuserfeedback: process.env.NEXT_PUBLIC_API_URL_5 || "",
};
