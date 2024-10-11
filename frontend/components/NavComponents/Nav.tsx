"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@components/navComponents/MobileMenu";
import DesktopMenu from "@components/navComponents/DesktopMenu";
import { usePathname } from "next/navigation";

const Nav: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSongsDropdownOpen, setSongsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isTechActive = pathname.startsWith("/about/tech");

  // Toggle main mobile menu
  const toggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
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

  // Close dropdown menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  // Handle hover events for wider screens (desktop)
  const handleMouseEnter = (dropdown: string) => {
    if (window.innerWidth >= 768) {
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

  const handleDropdownClick = (dropdown: string) => {
    if (window.innerWidth < 768) {
      if (dropdown === "songs") {
        setSongsDropdownOpen(!isSongsDropdownOpen);
        setAboutDropdownOpen(false);
      }
      if (dropdown === "about") {
        setAboutDropdownOpen(!isAboutDropdownOpen);
        setSongsDropdownOpen(false);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 shadow-md">
      <div className="container mx-auto flex justify-between md:justify-start items-center p-4 space-x-6">
        {/* Left Section: Logo */}
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

        {/* Desktop Links (shown only on desktop) */}
        <DesktopMenu
          isSongsDropdownOpen={isSongsDropdownOpen}
          isAboutDropdownOpen={isAboutDropdownOpen}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          closeMobileMenu={closeMobileMenu}
          isTechActive={isTechActive}
        />

        {/* Mobile Menu Hamburger Icon (hidden on desktop, visible on mobile) */}
        <button
          ref={buttonRef}
          className="md:hidden block text-gray-800 hover:text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          isSongsDropdownOpen={isSongsDropdownOpen}
          isAboutDropdownOpen={isAboutDropdownOpen}
          handleDropdownClick={handleDropdownClick}
          closeMobileMenu={closeMobileMenu}
          menuRef={menuRef}
        />
      </div>
    </nav>
  );
};

export default Nav;
