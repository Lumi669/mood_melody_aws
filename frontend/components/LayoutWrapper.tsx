"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "@context/MediaContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isRed, isBlue, isBrown } = useMedia();
  const [view, setView] = useState<"reload" | "navigate" | null>(null); // view can be used globally
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  // to distinguish page refresh vs navigate, because homepage refresh show original view but navigate show its very last view (music image view or original view or original view with mood clor)
  useEffect(() => {
    // Compare the current path with the previous path
    if (previousPath.current === null) {
      setView(null); // Initial load
    } else if (previousPath.current === pathname) {
      setView("reload"); // Reload
      sessionStorage.removeItem("currentMessage");
      sessionStorage.removeItem("currentMood");
    } else {
      setView("navigate"); // Navigation
    }

    // Update the previous path after comparison
    previousPath.current = pathname;
  }, [pathname]);

  // Set the background color
  let backgroundColor = "bg-white"; // Default to white
  if (isRed) backgroundColor = "bg-light-red";
  else if (isBlue) backgroundColor = "bg-light-blue";
  else if (isBrown) backgroundColor = "bg-gray-400";

  return (
    <div className={`${backgroundColor} min-h-screen w-full`}>{children}</div>
  );
};

export default LayoutWrapper;
