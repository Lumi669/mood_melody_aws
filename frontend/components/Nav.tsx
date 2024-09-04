"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Nav: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
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
        <NavLink href="/allmusic">All Music</NavLink>
        <NavLink href="/mixtape">My Playlist</NavLink>
        <NavLink href="/live">Live</NavLink>

        {/* About Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink href="/About">About</NavLink>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
              >
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/About/Contact">Contact</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/About/Tech">Tech</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/About/Testimonials">Testimonials</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/About/Privacy">Privacy Policy</Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
