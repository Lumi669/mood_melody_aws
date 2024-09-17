"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import SongsDropdown from "./SongsDropdown";
import AboutDropdown from "./AboutDropdown";

const Nav: React.FC = () => {
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
        <SongsDropdown />
        <NavLink href="/live">Live</NavLink>
        <NavLink href="/test">Test</NavLink>

        <AboutDropdown />

        <NavLink href="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
