// src/config/apiConfig.ts
interface ApiUrls {
  base: string;
  images: string;
  musics: string;
  test: string;
}

export const apiUrls: ApiUrls = {
  base: process.env.NEXT_PUBLIC_API_URL_0 || "",
  images: process.env.NEXT_PUBLIC_API_URL_1 || "",
  musics: process.env.NEXT_PUBLIC_API_URL_2 || "",
  test: process.env.NEXT_PUBLIC_API_URL_3 || "",
};
