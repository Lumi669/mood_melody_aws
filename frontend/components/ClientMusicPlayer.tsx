"use client";

import React from "react";

import { MusicPlayerProps } from "../types/type";

import dynamic from "next/dynamic";

const MusicPlayer = dynamic(() => import("@components/MusicPlayer"), {
  ssr: false,
});

const ClientMusicPlayer: React.FC<MusicPlayerProps> = ({ initialData }) => {
  return <MusicPlayer initialData={initialData} />;
};

export default ClientMusicPlayer;
