"use client";

import { MusicPlayerProps } from "../types/type";

import dynamic from "next/dynamic";

const MusicPlayer = dynamic(() => import("@components/MusicPlayer"), {
  ssr: false,
});

interface ClientMusicPlayerProps {
  initialData: any; // Replace `any` with the actual type for `initialData`
}

const ClientMusicPlayer: React.FC<ClientMusicPlayerProps> = ({
  initialData,
}) => {
  return <MusicPlayer initialData={initialData} />;
};

export default ClientMusicPlayer;
