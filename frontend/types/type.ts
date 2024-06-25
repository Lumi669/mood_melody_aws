export interface Music {
  id: string;
  name: string;
  url: string;
  ctg: string;
  mood: "happy" | "sad";
}

export interface Image {
  id: string;
  name: string;
  url: string;
  ctg: string;
  mood: "happy" | "sad";
}

export type MusicWithImage = Music & { imgUrl: string };

export interface CustomImageProps {
  src: string;
  alt: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
  onClick?: () => void;
}
