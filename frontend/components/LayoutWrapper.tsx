"use client";

import React, { useEffect, useState } from "react";
import { useMedia } from "@context/MediaContext";

const LayoutWrapper = ({
  children,
  noScroll = false,
}: {
  children: React.ReactNode;
  noScroll?: boolean;
}) => {
  const { isRed, isBlue, isBrown } = useMedia();
  const [backgroundColor, setBackgroundColor] = useState<string>("bg-white");

  useEffect(() => {
    let color = "bg-no-mood"; // Default to no mood background
    if (isRed) color = "bg-warm-gradient";
    else if (isBlue) color = "bg-cold-gradient";
    else if (isBrown) color = "bg-neutral-gradient";
    setBackgroundColor(color);
  }, [isRed, isBlue, isBrown]);
  // Monitor the background color change and clear session storage if it turns to white
  useEffect(() => {
    if (backgroundColor === "bg-no-mood") {
      sessionStorage.removeItem("currentMessage");
      sessionStorage.removeItem("currentMood");
    }
  }, [backgroundColor]);

  return (
    <div
      className={`${backgroundColor} ${
        noScroll ? "overflow-hidden h-screen" : "min-h-screen"
      } flex flex-col`}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
