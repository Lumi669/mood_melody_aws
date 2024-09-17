"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const AboutDropdown: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);

  const handleAboutMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleTechMouseEnter = () => {
    setTechDropdownOpen(true);
  };

  const handleTechMouseLeave = () => {
    setTechDropdownOpen(false);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setTechDropdownOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleAboutMouseEnter}
      onMouseLeave={handleAboutMouseLeave}
    >
      <Link href="/about" className="block">
        About
      </Link>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
          >
            <li
              className="relative"
              onMouseEnter={handleTechMouseEnter}
              onMouseLeave={handleTechMouseLeave}
            >
              <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                Tech
              </span>
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutDropdown;
