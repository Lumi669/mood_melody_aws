"use client";

import React from "react";
import ContactForm from "@components/ContactForm";
import InfoSections from "@components/InfoSections"; // Import the InfoSections component
const ContactPage = () => {
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  return (
    <div className="h-screen overflow-y-scroll pb-80">
      {/* Contact Section with Gradient Background */}
      <div>
        <div className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12">
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
            <div className="flex justify-center px-4 sm:px-6 md:px-8 lg:px-12">
              <a
                href="https://www.linkedin.com/in/jinghuanwang/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/profile.webp"
                  alt="Jinghuan Wang"
                  className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <ContactForm />
      </div>
      <div className="text-center text-4xl text-rose-600">
        <p>Thank you for your time !</p>
      </div>
      {/* Info Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2">
        <InfoSections /> {/* Include the InfoSections component */}
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2">
        <p className="text-center mt-10">Jinghuan @ 2 0 2 4</p>
      </div>
    </div>
  );
};

export default ContactPage;
