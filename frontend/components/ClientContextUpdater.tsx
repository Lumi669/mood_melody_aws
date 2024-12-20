// // "use client";

// // import React, { useEffect } from "react";
// // import { useMedia } from "@context/MediaContext";

// // const ClientContextUpdater: React.FC<{ initialData: any[] }> = ({
// //   initialData,
// // }) => {
// //   const { setMediaData } = useMedia();

// //   useEffect(() => {
// //     setMediaData(initialData);
// //   }, [initialData, setMediaData]);

// //   return null; // No need to render anything
// // };

// // export default ClientContextUpdater;

// "use client";

// import React, { useEffect } from "react";
// import { useMedia } from "@context/MediaContext";

// interface ClientContextUpdaterProps {
//   initialData: any[]; // Array of media items or empty if there's an error
// }

// const ClientContextUpdater: React.FC<ClientContextUpdaterProps> = ({
//   initialData,
// }) => {
//   const { setMediaData } = useMedia();

//   useEffect(() => {
//     // Only update context if initialData is a valid array
//     if (Array.isArray(initialData) && initialData.length > 0) {
//       setMediaData(initialData);
//     } else {
//       console.warn("No valid initial data to update MediaContext.");
//     }
//   }, [initialData, setMediaData]);

//   return null; // No need to render anything
// };

// export default ClientContextUpdater;
