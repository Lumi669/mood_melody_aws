import React from "react";
import NavLink from "@components/navComponents/NavLink";
import { AnimatePresence, motion } from "framer-motion";
import SongsDropdown from "../navComponents/SongsDropdown";
import AboutDropdown from "../navComponents/AboutDropdown";
interface DesktopMenuProps {
  isSongsDropdownOpen: boolean;
  isAboutDropdownOpen: boolean;
  handleMouseEnter: (dropdown: string) => void;
  handleMouseLeave: (dropdown: string) => void;
  closeMobileMenu: () => void;
  isTechActive: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  isSongsDropdownOpen,
  isAboutDropdownOpen,
  handleMouseEnter,
  handleMouseLeave,
  closeMobileMenu,
  isTechActive,
}) => (
  <div className="hidden md:flex md:items-center md:space-x-6">
    <NavLink href="/" onClick={closeMobileMenu}>
      Home
    </NavLink>

    <div
      className="relative"
      onMouseEnter={() => handleMouseEnter("songs")}
      onMouseLeave={() => handleMouseLeave("songs")}
    >
      <NavLink
        href="/songs"
        activePaths={["/songs", "/allmusic", "/mixtape"]}
        onClick={closeMobileMenu}
      >
        Songs
      </NavLink>
      <AnimatePresence>
        {isSongsDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-30"
          >
            <SongsDropdown closeDropdown={closeMobileMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <NavLink href="/live" onClick={closeMobileMenu}>
      Live
    </NavLink>

    <div
      className="relative"
      onMouseEnter={() => handleMouseEnter("about")}
      onMouseLeave={() => handleMouseLeave("about")}
    >
      <NavLink
        href="/about"
        activePaths={[
          "/about",
          "/about/tech",
          "/about/privacy",
          "/about/testimonials",
          "/about/analytics",
        ]}
        onClick={closeMobileMenu}
      >
        About
      </NavLink>
      <AnimatePresence>
        {isAboutDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-50"
          >
            <AboutDropdown
              closeDropdown={closeMobileMenu}
              isTechActive={isTechActive}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <NavLink href="/contact" onClick={closeMobileMenu}>
      Contact
    </NavLink>
  </div>
);

export default DesktopMenu;
