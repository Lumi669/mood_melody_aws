export interface ContactFormInputs {
  firstname: string;
  surname: string;
  email: string;
  telephonenumber: string;
  title: string;
  organisation: string;
  message: string;
  roles: string[]; // Array to hold multiple selections
  phoneValidated: boolean | null;
}

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
