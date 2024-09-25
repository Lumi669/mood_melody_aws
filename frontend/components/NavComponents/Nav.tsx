"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import SongsDropdown from "./SongsDropdown";
import AboutDropdown from "./AboutDropdown";

const Nav: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Toggle main mobile menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setOpenSubMenu(null); // Close any open submenu when toggling the main menu
  };

  // Toggle individual submenu
  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  // Close menu when navigating
  const closeMobileMenu = () => {
    setMenuOpen(false);
    setOpenSubMenu(null);
  };

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

            {/* Desktop SongsDropdown */}
            <div className="relative group">
              <NavLink href="/songs">Songs</NavLink>
              <div className="absolute left-0 hidden group-hover:block mt-2 bg-white shadow-md rounded-md">
                <SongsDropdown closeDropdown={() => {}} />
              </div>
            </div>

            <NavLink href="/live" onClick={closeMobileMenu}>
              Live
            </NavLink>

            {/* Desktop AboutDropdown */}
            <div className="relative group">
              <NavLink href="/about">About</NavLink>
              <div className="absolute left-0 hidden group-hover:block mt-2 bg-white shadow-md rounded-md">
                <AboutDropdown closeDropdown={() => {}} />
              </div>
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
          } md:hidden absolute top-16 left-0 w-full bg-gray-50 shadow-md rounded-md`}
        >
          <div className="flex flex-col space-y-4 p-4">
            {/* Home Link */}
            <NavLink href="/" onClick={closeMobileMenu}>
              Home
            </NavLink>

            {/* Songs Menu Item with "+" to Expand */}
            <div>
              <div
                className="w-full flex justify-between items-center text-lg font-semibold px-4 py-2 cursor-pointer transition-transform duration-200 ease-in-out text-gray-800 hover:text-gray-600"
                onClick={() => toggleSubMenu("songs")}
              >
                <span>Songs</span>
                <span className="text-gray-600">
                  {openSubMenu === "songs" ? "-" : "+"}
                </span>
              </div>
              {openSubMenu === "songs" && (
                <div className="ml-4">
                  <SongsDropdown closeDropdown={closeMobileMenu} />
                </div>
              )}
            </div>

            {/* Live Link */}
            <NavLink href="/live" onClick={closeMobileMenu}>
              Live
            </NavLink>

            {/* About Menu Item with "+" to Expand */}
            <div>
              <div
                className="w-full flex justify-between items-center text-lg font-semibold px-4 py-2 cursor-pointer transition-transform duration-200 ease-in-out text-gray-800 hover:text-gray-600"
                onClick={() => toggleSubMenu("about")}
              >
                <span>About</span>
                <span className="text-gray-600">
                  {openSubMenu === "about" ? "-" : "+"}
                </span>
              </div>
              {openSubMenu === "about" && (
                <div className="ml-4">
                  <AboutDropdown closeDropdown={closeMobileMenu} />
                </div>
              )}
            </div>

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
