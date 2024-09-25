// import React from "react";

// const Footer: React.FC = () => {
//   return (
//     <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center z-50">
//       <p>&copy; {new Date().getFullYear()} Mood Melody. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center z-10">
      <p>
        &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
