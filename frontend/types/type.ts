export interface Music {
  id: string;
  name: string;
  url: string;
  ctg: string;
  mood: "happy" | "sad" | "calm";
}

export interface Image {
  id: string;
  name: string;
  url: string;
  ctg: string;
  mood: "happy" | "sad" | "calm";
}

export type MusicWithImage = Music & { imgUrl: string };

export interface CustomImageProps {
  src: string;
  alt: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
  onClick?: (dataUrl: string) => void;

  dataUrl: string | null;
  width: number;
  height: number;
  className: string;
}
