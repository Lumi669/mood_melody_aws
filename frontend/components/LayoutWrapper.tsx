"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "@context/MediaContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isRed, isBlue, isBrown } = useMedia();
  const [view, setView] = useState<"reload" | "navigate" | null>(null); // view can be used globally
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  console.log("0000000layout.tsx ...");

  // to distinguish page refresh vs navigate, because homepage refresh show original view but navigate show its very last view (music image view or original view or original view with mood clor)
  useEffect(() => {
    // Compare the current path with the previous path
    console.log("11111 layout.tsx ...");
    if (previousPath.current === null) {
      console.log("22222 layout.tsx ...");

      setView(null); // Initial load
    } else if (previousPath.current === pathname) {
      console.log("else if previousPath.current === pathname reached ...");
      console.log(
        "Session storage before clearing:",
        sessionStorage.getItem("currentMessage"),
      );

      setView("reload"); // Reload
      sessionStorage.removeItem("currentMessage");
      sessionStorage.removeItem("currentMood");
      console.log("Page reloaded. Session storage cleared.");
      console.log(
        "Session storage after clearing:",
        sessionStorage.getItem("currentMessage"),
      );
    } else {
      console.log("3333333 layout.tsx ...");

      setView("navigate"); // Navigation
    }

    // Update the previous path after comparison
    previousPath.current = pathname;
    console.log("444444 layout.tsx ...");
  }, [pathname]);
  console.log("555555 layout.tsx .....");

  // Set the background color
  let backgroundColor = "bg-white"; // Default to white
  if (isRed) backgroundColor = "bg-light-red";
  else if (isBlue) backgroundColor = "bg-light-blue";
  else if (isBrown) backgroundColor = "bg-gray-400";

  console.log("6666666 layout.tsx ...");

  return (
    <div className={`${backgroundColor} min-h-screen w-full`}>{children}</div>
  );
};

export default LayoutWrapper;
