// "use client";

// import React from "react";
// import ContactForm from "@components/ContactForm";
// import InfoSections from "./InfoSections";

// const ContactPage = () => {
//   const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

//   return (
//     <div className="h-screen overflow-y-scroll px-4 pb-80">
//       <div className="max-w-5xl mx-auto">
//         {/* Contact Section with Gradient Background */}
//         <div className="py-16 px-4 bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             {/* Text Content */}
//             <div>
//               <h1 className="text-4xl font-bold mb-4 text-white">Contact me</h1>
//               <p className="text-lg text-gray-100 mb-4">
//                 Interested in collaborating? If you&apos;re looking for a
//                 passionate developer to join your team, whether full-time or as
//                 a subcontractor, or if you&apos;d like to discuss potential
//                 cooperation on a project, I&apos;d love to hear from you!
//               </p>
//               <p className="text-lg text-gray-100">
//                 Feel free to reach out using the form below or directly via your
//                 preferred contact method, like{" "}
//                 <a
//                   href={`mailto:${email}`}
//                   className="text-blue-500 hover:underline"
//                 >
//                   {email}
//                 </a>{" "}
//                 or{" "}
//                 <a
//                   href="https://www.linkedin.com/in/jinghuanwang/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:text-blue-400 "
//                 >
//                   LinkedIn
//                 </a>
//               </p>
//             </div>
//             {/* Personal Photo */}
//             <div className="flex justify-center">
//               <img
//                 src="/profile.webp"
//                 alt="Jinghuan Wang"
//                 className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Additional Content Section */}
//         <div className="max-w-5xl mx-auto mt-10 px-4 py-8 bg-white">
//           <ContactForm />
//         </div>
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default ContactPage;

"use client";

import React from "react";
import ContactForm from "@components/ContactForm";
import InfoSections from "@components/InfoSections"; // Import the InfoSections component

const ContactPage = () => {
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  return (
    <div className="h-screen overflow-y-scroll px-4 pb-80">
      <div className="max-w-5xl mx-auto">
        {/* Contact Section with Gradient Background */}
        <div className="py-16 px-4 bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-white">Contact me</h1>
              <p className="text-lg text-gray-100 mb-4">
                Interested in collaborating? If you&apos;re looking for a
                passionate developer to join your team, whether full-time or as
                a subcontractor, or if you&apos;d like to discuss potential
                cooperation on a project, I&apos;d love to hear from you!
              </p>
              <p className="text-lg text-gray-100">
                Feel free to reach out using the form below or directly via your
                preferred contact method, like{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-blue-500 hover:underline"
                >
                  {email}
                </a>{" "}
                or{" "}
                <a
                  href="https://www.linkedin.com/in/jinghuanwang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 "
                >
                  LinkedIn
                </a>
              </p>
            </div>
            {/* Personal Photo */}
            <div className="flex justify-center">
              <img
                src="/profile.webp"
                alt="Jinghuan Wang"
                className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-5xl mx-auto mt-10 px-4 py-8 ">
          <ContactForm />
        </div>

        {/* Info Sections */}
        <div className="max-w-5xl mx-auto  px-4 py-2 ">
          <InfoSections /> {/* Include the InfoSections component */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
