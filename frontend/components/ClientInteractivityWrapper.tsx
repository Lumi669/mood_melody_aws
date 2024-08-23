// "use client"; // Mark this file as a client component
// import React, { useEffect, useState } from "react";
// import { useMedia } from "../context/MediaContext";

// const ClientInteractivityWrapper: React.FC = () => {
//   const { togglePlayPause, stopMusic } = useMedia();
//   const [url, setUrl] = useState<string | null | undefined>(undefined);

//   useEffect(() => {
//     const handleClick = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       const urlOfMusic = target.getAttribute("data-url");
//       setUrl(urlOfMusic);
//       console.log(
//         "urlOfMusic from ClientInteractivityWrapper ====  ",
//         urlOfMusic,
//       );
//       if (urlOfMusic) {
//         togglePlayPause(urlOfMusic);
//       }
//     };

//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, [togglePlayPause]);

//   useEffect(() => {
//     console.log("url from ClientInteractivityWrapper ====  ", url);

//     if (!url) {
//       stopMusic();
//     }
//   }, [url, stopMusic]);

//   return null; // No need to render anything
// };

// export default ClientInteractivityWrapper;

"use client"; // Mark this file as a client component
import React, { useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const ClientInteractivityWrapper: React.FC = () => {
  const { togglePlayPause, stopMusic, currentTrack } = useMedia();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const urlOfMusic = target.getAttribute("data-url");

      if (urlOfMusic) {
        togglePlayPause(urlOfMusic);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [togglePlayPause]);

  useEffect(() => {
    const musicItems = document.querySelectorAll("[data-url]");

    musicItems.forEach((item) => {
      const urlOfMusic = item.getAttribute("data-url");
      if (urlOfMusic === currentTrack) {
        // Apply green border to the current track
        item.classList.add("border-4", "border-green-500", "opacity-100");
        // Ensure the item is fully visible
        item.classList.remove("opacity-80");
      } else {
        // Reduce opacity for non-playing items
        item.classList.add("opacity-80");
        // Remove the border from non-playing items
        item.classList.remove("border-4", "border-green-500", "opacity-100");
      }
    });
  }, [currentTrack]);

  return null; // No need to render anything
};

export default ClientInteractivityWrapper;
