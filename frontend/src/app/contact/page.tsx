// "use client";

// import React from "react";

// const ContactPage = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden">
//       {/* Container with gradient background */}
//       <div className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 max-w-5xl mx-auto">
//           {/* Text content */}
//           <div className="space-y-4">
//             <h1 className="text-4xl font-bold mb-2">Contact me</h1>
//             <div className="text-2xl text-gray-700">
//               <p>Interested in collaborating?</p>
//             </div>
//             <div className="text-base">
//               <p>If you&apos;re looking for a passionate developer</p>
//               <p>to join your team, whether full-time or as a subcontractor,</p>
//               <p>
//                 or if you&apos;d like to discuss potential cooperation on a
//                 project,
//               </p>
//               <p>I&apos;d love to hear from you!</p>
//               <p>Feel free to reach out using the form below</p>
//               <p>or directly via your preferred contact method,</p>
//               <p>like email or LinkedIn.</p>
//             </div>
//           </div>
//           {/* Personal photo */}
//           <div className="flex justify-center">
//             <img
//               src="/profile.webp"
//               alt="Jinghuan Wang"
//               className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Additional content that will be scrollable */}
//       <div className="h-[10vh] overflow-y-auto">
//         {/* Add more content here */}
//         <p>
//           Additional content goes here. Users can scroll to view this content.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Container with gradient background - Fixed top section */}
      <div className="flex-none w-full h-[40vh] flex items-center justify-center bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 max-w-5xl mx-auto">
          {/* Text content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold mb-2">Contact me</h1>
            <div className="text-2xl text-gray-700">
              <p>Interested in collaborating?</p>
            </div>
            <div className="text-base">
              <p>If you&apos;re looking for a passionate developer</p>
              <p>to join your team, whether full-time or as a subcontractor,</p>
              <p>
                or if you&apos;d like to discuss potential cooperation on a
                project,
              </p>
              <p>I&apos;d love to hear from you!</p>
              <p>Feel free to reach out using the form below</p>
              <p>or directly via your preferred contact method,</p>
              <p>like email or LinkedIn.</p>
            </div>
          </div>
          {/* Personal photo */}
          <div className="flex justify-center">
            <img
              src="/profile.webp"
              alt="Jinghuan Wang"
              className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Scrollable content section */}
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 border-t border-gray-300">
        {/* Add more content here */}
        <p>
          Additional content goes here. Users can scroll to view this content.
        </p>
        <p>Content line 1...</p>
        <p>Content line 2...</p>
        <p>Content line 3...</p>
        <p>Content line 4...</p>
        <p>Content line 5...</p>
        <p>Content line 6...</p>
        <p>Content line 7...</p>
        <p>Content line 8...</p>
        <p>Content line 9...</p>
        <p>Content line 10...</p>
        <p>Content line 11...</p>
        <p>Content line 12...</p>
      </div>
    </div>
  );
};

export default ContactPage;
