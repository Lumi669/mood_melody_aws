import React from "react";
import Nav from "@components/navComponents/Nav";
import Footer from "@components/Footer";
import { MediaProvider } from "@context/MediaContext";
import LayoutWrapper from "@components/LayoutWrapper";
import GlobalControls from "@components/GlobalControls";
import AnalyticsTracker from "@components/AnalyticsTracker";
import { fetchAllMusicWithImages } from "utils/fetchAllMusicWithImages";

import "./styles/globals.css";

export const metadata = {
  title: "Mood Melody",
  description: "A multi-media app with AI integration",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine if the current page requires scrolling or not
  // const noScroll = true; // Change this condition based on the page

  const noScroll = false;

  // Fetch data for music and images
  const musicWithImages = await fetchAllMusicWithImages();

  return (
    <html lang="en">
      {/* <body className="min-h-screen flex flex-col"> */}
      <body
        className={`min-h-screen flex flex-col ${
          noScroll ? "no-scroll" : "scrollable"
        }`}
      >
        <MediaProvider initialData={musicWithImages}>
          <LayoutWrapper noScroll={noScroll}>
            <Nav />
            <AnalyticsTracker />
            <main
              className={`flex-grow ${
                noScroll ? "overflow-hidden" : "overflow-auto"
              }`}
            >
              <div>{children}</div>
            </main>
            <GlobalControls />
            <Footer />
          </LayoutWrapper>
        </MediaProvider>
      </body>
    </html>
  );
}
