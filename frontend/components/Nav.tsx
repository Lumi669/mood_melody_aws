"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Nav: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);
  const [isSongsDropdownOpen, setSongsDropdownOpen] = useState(false);

  const handleAboutMouseEnter = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(true);
  };

  const handleAboutMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(false);
  };
  const handleSongsMouseEnter = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(true);
  };

  const handleSongsMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(false);
  };

  const handleLinkClick = () => {
    // Close all dropdowns when a link is clicked
    setDropdownOpen(false);
    setTechDropdownOpen(false);
  };

  // Define a union type for the allowed keys
  type PlaylistKey = "All Music" | "My Playlist";

  // Create a mapping object with the union type keys
  const urlMapping: Record<PlaylistKey, string> = {
    "All Music": "allmusic",
    "My Playlist": "mixtape",
  };
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-start items-center space-x-6 p-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={60}
            height={60}
            className="cursor-pointer"
          />
        </Link>
        {/* Navigation Links */}
        <NavLink href="/">Home</NavLink>

        {/* Songs Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleSongsMouseEnter(setSongsDropdownOpen)}
          onMouseLeave={() => handleSongsMouseLeave(setSongsDropdownOpen)}
        >
          <NavLink href="/allmusic">Songs</NavLink>
          <AnimatePresence>
            {isSongsDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
              >
                {(["All Music", "My Playlist"] as PlaylistKey[]).map((item) => (
                  <li key={item}>
                    <Link
                      href={`/songs/${urlMapping[item]}`} // Use the mapped value
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <NavLink href="/live">Live</NavLink>
        <NavLink href="/test">Test</NavLink>

        {/* About Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleAboutMouseEnter(setDropdownOpen)}
          onMouseLeave={() => handleAboutMouseLeave(setDropdownOpen)}
        >
          <NavLink href="/about">About</NavLink>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
              >
                {/* Tech Dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() =>
                    handleAboutMouseEnter(setTechDropdownOpen)
                  }
                  onMouseLeave={() =>
                    handleAboutMouseLeave(setTechDropdownOpen)
                  }
                >
                  <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                    Tech
                  </span>
                  <AnimatePresence>
                    {isTechDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-0 mt-0 w-40 bg-white shadow-lg rounded-md"
                      >
                        {["Architecture", "CICD", "Tech Stack"].map((item) => (
                          <li key={item}>
                            <Link
                              href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={handleLinkClick}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                {["Privacy", "Testimonials", "Analytics"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/about/${item.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <NavLink href="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
