"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface AboutDropdownProps {
  closeDropdown?: () => void;
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({ closeDropdown }) => {
  const pathname = usePathname();
  const isTechActive = pathname.startsWith("/about/tech");

  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Submenu only opens on hover (desktop) or explicit toggle (mobile)
  const techIsOpen = isHovered || isTechDropdownOpen;

  // Desktop hover handlers
  const handleTechHover = (hovered: boolean) => {
    if (window.innerWidth >= 768) {
      setIsHovered(hovered);
    }
  };

  // Mobile toggle handler
  const handleTechToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      setTechDropdownOpen((open) => !open);
    }
  };

  // Close everything when a link is clicked
  const handleLinkClick = () => {
    closeDropdown?.();
    setTechDropdownOpen(false);
  };

  const techClass = isTechActive ? "bg-gray-200 font-bold text-blue-600" : "";

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
          {/* Tech menu item */}
          <li
            className={`relative ${techClass}`}
            onMouseEnter={() => handleTechHover(true)}
            onMouseLeave={() => handleTechHover(false)}
          >
            <div className="flex justify-between items-center">
              <Link
                href="/about/tech"
                className="flex-1 px-4 py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Tech
              </Link>
              <button className="md:hidden px-2" onClick={handleTechToggle}>
                {techIsOpen ? "–" : "+"}
              </button>
            </div>

            <AnimatePresence>
              {techIsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full top-0 w-40 bg-white shadow-lg rounded-md z-60"
                >
                  {["Architecture", "CICD", "Tech Stack"].map((item) => {
                    const slug = item.replace(/\s+/g, "").toLowerCase();
                    return (
                      <li key={item}>
                        <Link
                          href={`/about/tech/${slug}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={handleLinkClick}
                          onMouseEnter={() => handleTechHover(true)}
                          onMouseLeave={() => handleTechHover(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Other About links */}
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
