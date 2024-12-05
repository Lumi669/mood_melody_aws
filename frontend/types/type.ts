import type { Dispatch, SetStateAction } from "react";

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
  src: string | null;
  alt: string | "not specified";

  onClick?: (dataUrl: string) => void;

  dataUrl: string | null;
  width: number;
  height: number;
  className: string;
  ctg: string | null;
  mood: "happy" | "sad" | "calm";
}

export interface MediaContextType {
  mediaData: (Music & { imgUrl: string })[];
  isRed: boolean;
  isBlue: boolean;
  isBrown: boolean;
  audio: HTMLAudioElement | null;
  currentTrack: string | null;
  currentSong: MusicWithImageSimplified | null;
  isPlaying: boolean;

  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsRed: Dispatch<SetStateAction<boolean>>;
  setIsBlue: Dispatch<SetStateAction<boolean>>;
  setIsBrown: Dispatch<SetStateAction<boolean>>;
  setCurrentSong: Dispatch<SetStateAction<MusicWithImageSimplified | null>>;
  setMediaData: Dispatch<SetStateAction<(Music & { imgUrl: string })[]>>;
  playTrack: (url: string, song?: MusicWithImageSimplified) => void; // Updated to include song
  pauseTrack: () => void;
  togglePlayPause: () => void;
  stopMusic: () => void;
  skipTrack: (
    direction: "next" | "previous",
    isHomePage: boolean,
  ) => MusicWithImageSimplified[];
}

export interface MusicWithImageSimplified {
  imgUrl: string | null;
  url: string | null;
  name: string | "not seen a name";
  ctg: string | null;

  mood: "happy" | "sad" | "calm";
}

export interface ContactFormInputs {
  firstname: string;
  surname: string;
  email: string;
  telephonenumber: string;
  title: string;
  organisation: string;
  message: string;
  roles: string[]; // Array to hold multiple selections
}

// Define the props type for the initial data passed from the server component
export interface MusicPlayerProps {
  initialData: any;
}
