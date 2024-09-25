"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SongsDropdown from "./SongsDropdown";
import AboutDropdown from "./AboutDropdown";
import { usePathname } from "next/navigation";

const Nav: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSongsDropdownOpen, setSongsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Toggle main mobile menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setSongsDropdownOpen(false);
    setAboutDropdownOpen(false);
  };

  // Close menu when navigating
  const closeMobileMenu = () => {
    setMenuOpen(false);
    setSongsDropdownOpen(false);
    setAboutDropdownOpen(false);
  };

  // Handle hover events for wider screens (desktop)
  const handleMouseEnter = (dropdown: string) => {
    if (window.innerWidth >= 768) {
      // Check if screen width is >= 768px (md breakpoint)
      if (dropdown === "songs") setSongsDropdownOpen(true);
      if (dropdown === "about") setAboutDropdownOpen(true);
    }
  };

  const handleMouseLeave = (dropdown: string) => {
    if (window.innerWidth >= 768) {
      if (dropdown === "songs") setSongsDropdownOpen(false);
      if (dropdown === "about") setAboutDropdownOpen(false);
    }
  };

  // Handle click events for mobile screens
  const handleDropdownClick = (dropdown: string) => {
    if (window.innerWidth < 768) {
      // Check if screen width is < 768px (mobile view)
      if (dropdown === "songs") {
        setSongsDropdownOpen(!isSongsDropdownOpen);
        setAboutDropdownOpen(false); // Close About dropdown if Songs is opened
      }
      if (dropdown === "about") {
        setAboutDropdownOpen(!isAboutDropdownOpen);
        setSongsDropdownOpen(false); // Close Songs dropdown if About is opened
      }
    }
  };

  // Check if current path is related to Tech subpages
  const isTechActive = pathname.startsWith("/about/tech");

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={60}
              height={60}
              className="cursor-pointer"
              onClick={closeMobileMenu}
            />
          </Link>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink href="/" onClick={closeMobileMenu}>
              Home
            </NavLink>

            {/* Desktop SongsDropdown with hover behavior */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("songs")}
              onMouseLeave={() => handleMouseLeave("songs")}
            >
              <NavLink
                href="/songs"
                activePaths={["/songs", "/allmusic", "/mixtape"]}
                onClick={closeMobileMenu}
              >
                Songs
              </NavLink>
              <AnimatePresence>
                {isSongsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-30"
                  >
                    <SongsDropdown closeDropdown={closeMobileMenu} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/live" onClick={closeMobileMenu}>
              Live
            </NavLink>

            {/* Desktop AboutDropdown with hover behavior */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={() => handleMouseLeave("about")}
            >
              <NavLink
                href="/about"
                activePaths={[
                  "/about",
                  "/about/tech",
                  "/about/privacy",
                  "/about/testimonials",
                  "/about/analytics",
                ]}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <AnimatePresence>
                {isAboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-50"
                  >
                    <AboutDropdown
                      closeDropdown={closeMobileMenu}
                      isTechActive={isTechActive} // Pass active state to AboutDropdown
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/contact" onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden block text-gray-800 hover:text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-16 left-0 w-full bg-gray-50 shadow-md rounded-md z-40`}
        >
          <div className="flex flex-col space-y-4 p-4">
            {/* Home Link */}
            <NavLink href="/" onClick={closeMobileMenu}>
              Home
            </NavLink>

            {/* Songs Menu Item with "+" to Expand */}
            <div className="flex items-center justify-between">
              <NavLink
                href="/songs"
                activePaths={["/songs", "/allmusic", "/mixtape"]}
                onClick={closeMobileMenu}
              >
                Songs
              </NavLink>
              <button
                className="text-lg font-semibold text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={() => handleDropdownClick("songs")}
              >
                {isSongsDropdownOpen ? "-" : "+"}
              </button>
            </div>
            {isSongsDropdownOpen && (
              <div className="ml-4">
                <SongsDropdown closeDropdown={closeMobileMenu} />
              </div>
            )}

            {/* Live Link */}
            <NavLink href="/live" onClick={closeMobileMenu}>
              Live
            </NavLink>

            {/* About Menu Item with "+" to Expand */}
            <div className="flex items-center justify-between">
              <NavLink
                href="/about"
                activePaths={[
                  "/about",
                  "/about/tech",
                  "/about/privacy",
                  "/about/testimonials",
                  "/about/analytics",
                ]}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <button
                className="text-lg font-semibold text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={() => handleDropdownClick("about")}
              >
                {isAboutDropdownOpen ? "-" : "+"}
              </button>
            </div>
            {isAboutDropdownOpen && (
              <div className="ml-4">
                <AboutDropdown
                  closeDropdown={closeMobileMenu}
                  isTechActive={isTechActive} // Pass active state to AboutDropdown
                />
              </div>
            )}

            {/* Contact Link */}
            <NavLink href="/contact" onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
