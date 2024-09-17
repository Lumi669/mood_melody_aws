"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SongsDropdown: React.FC = () => {
  const [isSongsDropdownOpen, setSongsDropdownOpen] = useState(false);

  const handleSongsMouseEnter = () => {
    setSongsDropdownOpen(true);
  };

  const handleSongsMouseLeave = () => {
    setSongsDropdownOpen(false);
  };

  const handleLinkClick = () => {
    setSongsDropdownOpen(false);
  };

  const urlMapping: Record<"All Music" | "My Playlist", string> = {
    "All Music": "allmusic",
    "My Playlist": "mixtape",
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleSongsMouseEnter}
      onMouseLeave={handleSongsMouseLeave}
    >
      <Link href="/allmusic" className="block">
        Songs
      </Link>
      <AnimatePresence>
        {isSongsDropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
          >
            {(
              ["All Music", "My Playlist"] as ("All Music" | "My Playlist")[]
            ).map((item) => (
              <li key={item}>
                <Link
                  href={`/songs/${urlMapping[item]}`}
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
  );
};

export default SongsDropdown;
