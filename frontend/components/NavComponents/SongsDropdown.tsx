"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SongsDropdownProps {
  closeDropdown: () => void; // Receive closeDropdown function
}

const SongsDropdown: React.FC<SongsDropdownProps> = ({ closeDropdown }) => {
  const pathname = usePathname();

  const urlMapping: Record<"All Music" | "My Playlist", string> = {
    "All Music": "allmusic",
    "My Playlist": "mixtape",
  };

  return (
    <ul className="flex flex-col bg-white shadow-md rounded-md w-40">
      {(["All Music", "My Playlist"] as ("All Music" | "My Playlist")[]).map(
        (item) => (
          <li key={item}>
            <Link
              href={`/songs/${urlMapping[item]}`}
              className="block px-4 py-2 hover:bg-gray-100 w-40"
              onClick={closeDropdown} // Close dropdown on link click
            >
              {item}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default SongsDropdown;
