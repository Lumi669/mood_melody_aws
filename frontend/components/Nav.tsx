"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Nav: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);

  const handleMouseEnter = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(true);
  };

  const handleMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(false);
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
        <NavLink href="/test">Test</NavLink>

        {/* About Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter(setDropdownOpen)}
          onMouseLeave={() => handleMouseLeave(setDropdownOpen)}
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
                  className="relative px-4 py-2 hover:bg-gray-100"
                  onMouseEnter={() => handleMouseEnter(setTechDropdownOpen)}
                  onMouseLeave={() => handleMouseLeave(setTechDropdownOpen)}
                >
                  <span className="cursor-pointer">Tech</span>
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
                          <li
                            key={item}
                            className="px-4 py-2 hover:bg-gray-100"
                          >
                            <Link
                              href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
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
                  <li key={item} className="px-4 py-2 hover:bg-gray-100">
                    <Link href={`/about/${item.toLowerCase()}`}>{item}</Link>
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
