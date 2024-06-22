import React from "react";

import "./styles/globals.css"; // Ensure this is the correct path to your global styles

import Nav from "./components/Nav"; // Ensure this is the correct path to your Nav component

import { MediaProvider } from "./context/MediaContext"; // Ensure this is the correct path to your MediaContext
import LayoutWrapper from "./components/LayoutWrapper";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MediaProvider>
          <LayoutWrapper>
            <Nav />
            <main>{children}</main>
          </LayoutWrapper>
        </MediaProvider>
      </body>
    </html>
  );
}
