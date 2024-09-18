// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useRef,
// } from "react";
// import { usePathname } from "next/navigation";

// type RouteContextType = {
//   view: "reload" | "navigate" | null;
// };

// const RouteContext = createContext<RouteContextType>({ view: null });

// export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const [view, setView] = useState<"reload" | "navigate" | null>(null);

//   const isFirstLoad = useRef(true);
//   console.log("iiiiii isFirstLoad === ", isFirstLoad);

//   const previousPath = useRef<string | null>(null);
//   console.log("ppppp previousPath === ", previousPath);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false; // Initial load
//     } else if (previousPath.current === pathname) {
//       setView("reload"); // Reload
//     } else {
//       setView("navigate"); // Navigation
//     }

//     previousPath.current = pathname; // Update the previous path
//   }, [pathname]);

//   return (
//     <RouteContext.Provider value={{ view }}>{children}</RouteContext.Provider>
//   );
// };

// export const useRouteState = () => useContext(RouteContext);
