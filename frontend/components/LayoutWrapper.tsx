"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMedia } from "@context/MediaContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isRed, isBlue, isBrown } = useMedia();
  const [backgroundColor, setBackgroundColor] = useState<string>("bg-white");

  // Set the background color based on the states
  useEffect(() => {
    // let color = "bg-gray-50"; // Default to white
    let color = "bg-no-mood"; // Default to white
    // if (isRed) color = "bg-light-red";
    // if (isRed) color = "bg-purple-200";
    if (isRed) color = "bg-warm-gradient";
    // else if (isBlue) color = "bg-light-blue";
    // else if (isBlue) color = "bg-blue-200";
    else if (isBlue) color = "bg-cold-gradient";
    // else if (isBrown) color = "bg-gray-400";
    // else if (isBrown) color = "bg-gray-200";
    else if (isBrown) color = "bg-neutral-gradient";

    setBackgroundColor(color);
  }, [isRed, isBlue, isBrown]);

  // Monitor the background color change and clear session storage if it turns to white
  useEffect(() => {
    console.log("Background color changed to:", backgroundColor);

    if (backgroundColor === "bg-no-mood") {
      console.log("Background is white. Clearing session storage.");
      sessionStorage.removeItem("currentMessage");
      sessionStorage.removeItem("currentMood");
      console.log("Session storage cleared.");
    }
  }, [backgroundColor]);

  return (
    <div className={`${backgroundColor} min-h-screen w-full`}>{children}</div>
  );
};

export default LayoutWrapper;
