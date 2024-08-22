"use client";

import React from "react";
import { useMedia } from "../context/MediaContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isRed, isBlue } = useMedia();
  console.log("isRed === ", isRed);
  console.log("isBlue === ", isBlue);

  let backgroundColor = "bg-white"; // Default to white

  if (isRed) {
    backgroundColor = "bg-red-500";
  } else if (isBlue) {
    backgroundColor = "bg-blue-500";
  }

  return (
    <div className={`${backgroundColor} min-h-screen w-full`}>{children}</div>
  );
};

export default LayoutWrapper;
