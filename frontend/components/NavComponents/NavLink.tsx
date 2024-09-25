"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-lg font-semibold px-4 py-2 transition-transform duration-200 ease-in-out ${
        isActive
          ? "text-[#326ed1] shadow-lg transform scale-105" // Active state styling with shadow and slight scale effect
          : "text-gray-800 hover:text-gray-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
