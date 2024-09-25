"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AboutDropdownProps {
  closeDropdown: () => void; // Receive closeDropdown function
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({ closeDropdown }) => {
  const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);

  const toggleTechDropdown = () => {
    setTechDropdownOpen(!isTechDropdownOpen);
  };

  return (
    <ul className="flex flex-col bg-white shadow-md rounded-md">
      <li>
        <div
          className="w-full flex justify-between items-center px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100"
          onClick={toggleTechDropdown}
        >
          <span>Tech</span>
          <span>{isTechDropdownOpen ? "v" : ">"}</span>
        </div>
        {isTechDropdownOpen && (
          <ul className="ml-4 bg-gray-50 shadow-md rounded-md">
            {["Architecture", "CICD", "Tech Stack"].map((item) => (
              <li key={item}>
                <Link
                  href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeDropdown} // Close dropdown on link click
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      {["Privacy", "Testimonials", "Analytics"].map((item) => (
        <li key={item}>
          <Link
            href={`/about/${item.toLowerCase()}`}
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeDropdown} // Close dropdown on link click
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AboutDropdown;
