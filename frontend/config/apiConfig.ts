// src/config/apiConfig.ts
interface ApiUrls {
  //   base: string;
  images: string;
  musics: string;
  // test: string;
}

// process.env.NEXT_PUBLIC_API_URL_0 is how application reads
// the environment vialbels whoese values are built by github actions during building docker image
export const apiUrls: ApiUrls = {
  // base: process.env.NEXT_PUBLIC_API_URL_0 || "",
  images: process.env.NEXT_PUBLIC_API_URL_0 || "",
  musics: process.env.NEXT_PUBLIC_API_URL_1 || "",
  // test: process.env.NEXT_PUBLIC_API_URL_3 || "",
};
