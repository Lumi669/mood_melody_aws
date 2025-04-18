import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AboutDropdownProps {
  closeDropdown?: () => void; // Optional closeDropdown prop
  isTechActive?: boolean; // Optional isTechActive prop
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({
  closeDropdown,
  isTechActive,
}) => {
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false); // Initial state is false (dropdown closed)
  const [isHovered, setIsHovered] = useState(false); // State for hover

  // Handle hover state (for desktop only)
  const handleTechHover = (hovered: boolean) => {
    if (window.innerWidth >= 768) {
      setIsHovered(hovered);
    }
  };

  // Toggle dropdown on click for mobile
  const handleTechClick = () => {
    console.log("Tech clicked...");
    console.log("isTechDropdownOpen === ", isTechDropdownOpen);
    if (window.innerWidth < 768) {
      setTechDropdownOpen((prevState) => !prevState); // Toggle the state between true/false for mobile
    }
  };

  // Close dropdown when a subpage link is clicked
  const handleLinkClick = () => {
    if (closeDropdown) closeDropdown();
  };

  // Combine styles for active or hover states
  const techClass =
    isTechActive || isHovered ? "bg-gray-200 font-bold text-blue-600" : "";

  return (
    <div className="relative pb-40">
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-40 bg-white shadow-lg rounded-md z-50"
        >
          {/* Tech Menu Item with Nested Dropdown */}
          <li
            className={`relative ${techClass}`} // Apply styles for active or hovered Tech
            onMouseEnter={() => handleTechHover(true)} // Only for desktop
            onMouseLeave={() => handleTechHover(false)} // Only for desktop
            onClick={handleTechClick} // Toggle on click for mobile view
          >
            <div
              className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${isTechDropdownOpen ? "bg-gray-100 " : ""}`}
            >
              <span>Tech</span>
              {/* Arrow icon toggles direction based on dropdown state */}
              <span className="md:hidden">
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
                  </svg>
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
                  </svg>
                )}
              </span>
            </div>
            <AnimatePresence>
              {/* Only show nested dropdown when either hovered (desktop) or open (mobile) */}
              {(isTechDropdownOpen || isHovered || isTechActive) && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full top-0 mt-0 w-40 bg-white shadow-lg rounded-md z-60"
                >
                  {["Architecture", "CICD", "Tech Stack"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 shadow-inner md:shadow-none"
                        onClick={handleLinkClick}
                        onMouseEnter={() => handleTechHover(true)}
                        onMouseLeave={() => handleTechHover(false)} // Propagate hover state
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
          {["Privacy", "SourceCode", "Analytics"].map((item) => (
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
