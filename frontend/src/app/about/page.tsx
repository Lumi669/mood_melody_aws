"use client";

import React from "react";
import Link from "next/link";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

import ContactButton from "@components/ContactButton";
import DecorativeElements from "@components/DecorativeElements";

const AboutPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div>
      <h1 className={`text-center mt-16 text-4xl font-extrabold ${textColor}`}>
        About This App
      </h1>
      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto">
          <div className="indent-8 m-2 text-xl leading-relaxed">
            <p>
              This application serves as a demonstration of my{" "}
              <span className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded-md">
                full-stack development expertise
              </span>
              . It highlights my ability to{" "}
              <span className="inline-block bg-yellow-100 text-yellow-800 font-medium px-2 py-0.5 rounded-md">
                design
              </span>{" "}
              and{" "}
              <span className="inline-block bg-yellow-100 text-yellow-800 font-medium px-2 py-0.5 rounded-md">
                develop
              </span>{" "}
              user-friendly, responsive web applications, build{" "}
              <span className="inline-block bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-md">
                efficient back-end solutions
              </span>{" "}
              and{" "}
              <span className="inline-block bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-md">
                APIs
              </span>
              , and integrate modern{" "}
              <span className="inline-block bg-teal-100 text-teal-800 font-medium px-2 py-0.5 rounded-md">
                front-end technologies
              </span>
              . Additionally, it features a{" "}
              <span className="inline-block bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-md">
                CI/CD pipeline
              </span>{" "}
              and{" "}
              <span className="inline-block bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-md">
                DevOps practices
              </span>
              , ensuring seamless and automated deployment. Utilizing{" "}
              <span className="italic text-gray-900">AWS services</span> for
              hosting and deployment, this project also incorporates{" "}
              <span className="inline-block bg-indigo-50 text-indigo-800 font-medium px-2 py-0.5 rounded-md">
                AI-driven functionalities
              </span>
              .
            </p>
          </div>

          <div>
            <p className="mt-10 text-center text-2xl mb-5">
              For detailed technical information, check:
            </p>
            <ul className="list-disc list-inside text-center">
              <li className="mb-4">
                <Link
                  href="/about/tech/architecture"
                  className="text-blue-700 font-bold no-underline hover:underline text-xl"
                >
                  Architecture
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/about/tech/cicd"
                  className="text-blue-700 font-bold no-underline hover:underline text-xl"
                >
                  CI/CD
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/about/tech/techstack"
                  className="text-blue-700 font-bold no-underline hover:underline text-xl"
                >
                  Tech Stack
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-8 mb-10 md:mb-0">
            <ContactButton />
          </div>
        </div>
      </div>
      {/* Decorative shapes for a playful look */}
      <DecorativeElements />
    </div>
  );
};

export default AboutPage;
