// "use client"; // Mark this file as a client component
// import React, { useEffect } from "react";
// import { useMedia } from "../context/MediaContext";

// const ClientContextUpdater: React.FC<{ initialData: any[] }> = ({
//   initialData,
// }) => {
//   const { setMediaData } = useMedia();

//   useEffect(() => {
//     setMediaData(initialData);
//   }, [initialData, setMediaData]);

//   return null; // No need to render anything
// };

// export default ClientContextUpdater;

// ClientContextUpdater.tsx
"use client";

import React, { useEffect } from "react";
import { useMedia } from "../context/MediaContext";

const ClientContextUpdater: React.FC<{ initialData: any[] }> = ({
  initialData,
}) => {
  const { setMediaData } = useMedia();

  useEffect(() => {
    setMediaData(initialData);
  }, [initialData, setMediaData]);

  return null; // No need to render anything
};

export default ClientContextUpdater;
