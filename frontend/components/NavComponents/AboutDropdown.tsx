// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface AboutDropdownProps {
//   closeDropdown: () => void; // Receive closeDropdown function
// }

// const AboutDropdown: React.FC<AboutDropdownProps> = ({ closeDropdown }) => {
//   const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);

//   const toggleTechDropdown = () => {
//     setTechDropdownOpen(!isTechDropdownOpen);
//   };

//   return (
//     <ul className="flex flex-col bg-white shadow-md rounded-md">
//       <li>
//         <div
//           className="w-full flex justify-between items-center px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100"
//           onClick={toggleTechDropdown}
//         >
//           <span>Tech</span>
//           <span>{isTechDropdownOpen ? "v" : ">"}</span>
//         </div>
//         {isTechDropdownOpen && (
//           <ul className="ml-4 bg-gray-50 shadow-md rounded-md">
//             {["Architecture", "CICD", "Tech Stack"].map((item) => (
//               <li key={item}>
//                 <Link
//                   href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={closeDropdown} // Close dropdown on link click
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//       {["Privacy", "Testimonials", "Analytics"].map((item) => (
//         <li key={item}>
//           <Link
//             href={`/about/${item.toLowerCase()}`}
//             className="block px-4 py-2 hover:bg-gray-100"
//             onClick={closeDropdown} // Close dropdown on link click
//           >
//             {item}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default AboutDropdown;
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";

// interface AboutDropdownProps {
//   closeDropdown?: () => void; // Optional closeDropdown prop
// }

// const AboutDropdown: React.FC<AboutDropdownProps> = ({ closeDropdown }) => {
//   const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);
//   const pathname = usePathname();

//   const handleTechMouseEnter = () => {
//     setTechDropdownOpen(true);
//   };

//   const handleTechMouseLeave = () => {
//     setTechDropdownOpen(false);
//   };

//   const handleLinkClick = () => {
//     if (closeDropdown) closeDropdown(); // Close dropdown if prop is passed
//   };

//   // Determine if the dropdown or any of its links are active
//   const isActive = pathname.startsWith("/about");

//   return (
//     <div className="relative">
//       <AnimatePresence>
//         <motion.ul
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//           className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md"
//         >
//           {/* Tech Menu Item with Nested Dropdown */}
//           <li
//             className="relative"
//             onMouseEnter={handleTechMouseEnter}
//             onMouseLeave={handleTechMouseLeave}
//           >
//             <span
//               className={`block px-4 py-2 cursor-pointer ${
//                 isTechDropdownOpen ? "bg-gray-100" : "hover:bg-gray-100"
//               }`}
//             >
//               Tech
//             </span>
//             <AnimatePresence>
//               {isTechDropdownOpen && (
//                 <motion.ul
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute left-full top-0 mt-0 w-40 bg-white shadow-lg rounded-md"
//                 >
//                   {["Architecture", "CICD", "Tech Stack"].map((item) => (
//                     <li key={item}>
//                       <Link
//                         href={`/about/tech/${item.replace(" ", "").toLowerCase()}`}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                         onClick={handleLinkClick}
//                       >
//                         {item}
//                       </Link>
//                     </li>
//                   ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </li>
//           {/* Other About Items */}
//           {["Privacy", "Testimonials", "Analytics"].map((item) => (
//             <li key={item}>
//               <Link
//                 href={`/about/${item.toLowerCase()}`}
//                 className="block px-4 py-2 hover:bg-gray-100"
//                 onClick={handleLinkClick}
//               >
//                 {item}
//               </Link>
//             </li>
//           ))}
//         </motion.ul>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AboutDropdown;
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

  // Determine if the dropdown or any of its links are active
  const isActive = pathname.startsWith("/about");

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
            onClick={handleTechClick}
          >
            <span
              className={`block px-4 py-2 cursor-pointer ${
                isTechDropdownOpen ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
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
