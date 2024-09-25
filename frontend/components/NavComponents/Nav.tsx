"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import SongsDropdown from "./SongsDropdown";
import AboutDropdown from "./AboutDropdown";

const Nav: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
            />
          </Link>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink href="/">Home</NavLink>
            <SongsDropdown />
            <NavLink href="/live">Live</NavLink>
            <AboutDropdown />
            <NavLink href="/contact">Contact</NavLink>
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
            <NavLink href="/">Home</NavLink>
            <SongsDropdown />
            <NavLink href="/live">Live</NavLink>
            <AboutDropdown />
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
