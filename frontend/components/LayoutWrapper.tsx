"use client";

import React from "react";
import { useMedia } from "../context/MediaContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isRed, isBlue } = useMedia();
  console.log("isRed === ", isRed);
  console.log("isBlue === ", isBlue);

  let backgroundColor = "bg-white"; // Default to white

  if (isRed) {
    backgroundColor = "bg-light-red";
  } else if (isBlue) {
    backgroundColor = "bg-light-blue";
  }

  return (
    <div className={`${backgroundColor} min-h-screen w-full`}>{children}</div>
  );
};

export default LayoutWrapper;
