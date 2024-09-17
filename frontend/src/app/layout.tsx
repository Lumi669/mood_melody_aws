import React from "react";
import Nav from "@components/NavComponents/Nav";
import { MediaProvider } from "@context/MediaContext";
import { RouteProvider } from "@context/RouteContext"; // Import RouteProvider
import LayoutWrapper from "@components/LayoutWrapper";
import GlobalControls from "@components/GlobalControls";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RouteProvider>
          <MediaProvider>
            <LayoutWrapper>
              <Nav />
              <main>
                <div>{children}</div>
              </main>
              <GlobalControls />
              {/* Add the global audio element for playback control */}
              <audio id="audio" />
            </LayoutWrapper>
          </MediaProvider>
        </RouteProvider>
      </body>
    </html>
  );
}
