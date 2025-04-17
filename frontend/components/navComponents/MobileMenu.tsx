// export default MobileMenu;
import React, { RefObject } from "react";
import NavLink from "@components/navComponents/NavLink";
import SongsDropdown from "@components/navComponents/SongsDropdown";
import AboutDropdown from "@components/navComponents/AboutDropdown";

interface MobileMenuProps {
  isMenuOpen: boolean;
  isSongsDropdownOpen: boolean;
  isAboutDropdownOpen: boolean;
  handleDropdownClick: (dropdown: string) => void;
  closeMobileMenu: () => void;
  menuRef: RefObject<HTMLDivElement>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  isSongsDropdownOpen,
  isAboutDropdownOpen,
  handleDropdownClick,
  closeMobileMenu,
  menuRef,
}) => (
  <div
    ref={menuRef}
    className={`${
      isMenuOpen ? "block" : "hidden"
    } md:hidden absolute top-16 left-0 right-7 min-w-screen bg-red-50 shadow-md rounded-md z-40 overflow-x-visible`} // Ensure dropdown is not cut off
  >
    <div className="flex flex-col space-y-4 p-4">
      {/* Dropdown Links */}
      <NavLink href="/" onClick={closeMobileMenu}>
        Home
      </NavLink>

      <div className="flex items-center justify-between">
        <NavLink
          href="/songs"
          activePaths={["/songs", "/allmusic", "/mixtape"]}
          onClick={closeMobileMenu}
        >
          Songs
        </NavLink>
        <button
          className="text-2xl font-semibold text-gray-800 hover:text-4xl focus:outline-none pr-4"
          onClick={() => handleDropdownClick("songs")}
        >
          {isSongsDropdownOpen ? "-" : "+"}
        </button>
      </div>
      {isSongsDropdownOpen && (
        <div className="ml-4">
          <SongsDropdown closeDropdown={closeMobileMenu} />
        </div>
      )}

      <NavLink href="/live" onClick={closeMobileMenu}>
        Live
      </NavLink>

      <div className="flex items-center justify-between">
        <NavLink
          href="/about"
          activePaths={[
            "/about",
            "/about/tech",
            "/about/privacy",
            "/about/sourcecode",
            "/about/analytics",
          ]}
          onClick={closeMobileMenu}
        >
          About
        </NavLink>
        <button
          className="text-2xl font-semibold text-gray-800 hover:text-4xl focus:outline-none pr-4"
          onClick={() => handleDropdownClick("about")}
        >
          {isAboutDropdownOpen ? "-" : "+"}
        </button>
      </div>
      {isAboutDropdownOpen && (
        <div className="ml-4">
          <AboutDropdown closeDropdown={closeMobileMenu} />
        </div>
      )}

      <NavLink href="/contact" onClick={closeMobileMenu}>
        Contact
      </NavLink>
    </div>
  </div>
);

export default MobileMenu;
