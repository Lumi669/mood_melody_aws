"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface AboutDropdownProps {
  closeDropdown?: () => void; // Optional closeDropdown prop
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({ closeDropdown }) => {
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handleTechMouseEnter = () => {
    if (window.innerWidth >= 768) setTechDropdownOpen(true); // Open on hover for desktop
  };

  const handleTechMouseLeave = () => {
    if (window.innerWidth >= 768) setTechDropdownOpen(false); // Close on hover leave for desktop
  };

  const handleTechClick = () => {
    if (window.innerWidth < 768) setTechDropdownOpen(!isTechDropdownOpen); // Toggle on click for mobile
  };

  const handleLinkClick = () => {
    if (closeDropdown) closeDropdown(); // Close dropdown if prop is passed
  };

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
        >
          {/* Tech Menu Item with Nested Dropdown */}
          <li
            className="relative"
            onMouseEnter={handleTechMouseEnter}
            onMouseLeave={handleTechMouseLeave}
            onClick={handleTechClick} // Click event for mobile view
          >
            <div className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
              <span>Tech</span>
              {/* Arrow icon toggles direction based on dropdown state */}
              <span className="md:hidden">
                {" "}
                {/* Hide arrow on desktop */}
                {isTechDropdownOpen ? (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg> // Arrow pointing down when dropdown is open
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg> // Arrow pointing right when dropdown is closed
                )}
              </span>
            </div>
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
          {/* Other About Items */}
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
      </AnimatePresence>
    </div>
  );
};

export default AboutDropdown;
