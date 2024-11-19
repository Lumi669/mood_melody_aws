"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "@components/ContactForm";
import InfoSections from "@components/InfoSections";
import DecorativeElements from "@components/DecorativeElements";

const ContactPage = () => {
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  return (
    <div className="h-screen overflow-y-scroll pb-20">
      {/* Contact Section with Warm Gradient Background */}
      <div className="relative py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-r from-pink-300 to-orange-200 via-yellow-100 from-20% via-50% to-80%">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Contact me
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Interested in collaborating? If you&apos;re looking for a
              passionate developer to join your team, whether full-time or as a
              subcontractor, or if you&apos;d like to discuss potential
              cooperation on a project, I&apos;d love to hear from you!
            </p>
            <p className="text-lg text-gray-700">
              Feel free to reach out using the form below or directly via your
              preferred contact method, like{" "}
              <a
                href={`mailto:${email}`}
                className="text-pink-500 font-bold hover:underline"
              >
                {email}
              </a>{" "}
              or{" "}
              <a
                href="https://www.linkedin.com/in/jinghuanwang/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 font-bold hover:underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
          {/* Personal Photo */}
          <div className="flex justify-center px-4 sm:px-6 md:px-8 lg:px-12">
            <a
              href="https://www.linkedin.com/in/jinghuanwang/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <Image
                src="/profile.webp"
                alt="Jinghuan Wang"
                width={256}
                height={256}
                className="w-64 h-64 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              {/* Tooltip */}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-sm text-white bg-black bg-opacity-75 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to check my LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <ContactForm />
      </div>

      <div className="text-center text-4xl text-pink-500">
        <p>Thank you for your time!</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2">
        <InfoSections />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2">
        <p className="text-center mt-10">Jinghuan @ 2 0 2 4</p>
      </div>

      <DecorativeElements />
    </div>
  );
};

export default ContactPage;
