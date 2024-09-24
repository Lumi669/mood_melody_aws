"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";
import { get } from "axios";

const AboutPage = () => {
  const router = useRouter();
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
              <span className="font-bold text-blue-800">
                full-stack development expertise
              </span>
              . It highlights my ability to{" "}
              <span className="bg-gray-200 text-black px-1 rounded">
                design
              </span>{" "}
              and{" "}
              <span className="bg-gray-200 text-black px-1 rounded">
                develop
              </span>{" "}
              user-friendly, responsive web applications, build{" "}
              <span className="text-gray-800 font-semibold">
                efficient back-end solutions
              </span>{" "}
              and <span className="text-gray-800 font-semibold">APIs</span>, and
              integrate modern{" "}
              <span className="underline text-blue-800">
                front-end technologies
              </span>
              . Additionally, it features a{" "}
              <span className="font-bold text-purple-800">CI/CD pipeline</span>{" "}
              and{" "}
              <span className="font-bold text-purple-800">
                DevOps practices
              </span>
              , ensuring seamless and automated deployment. Utilizing{" "}
              <span className="italic text-gray-900">AWS services</span> for
              hosting and deployment, this project also incorporates{" "}
              <span className="text-indigo-800 font-medium">
                AI-driven functionalities
              </span>
              .
            </p>
          </div>

          <div>
            <p className="mt-20 text-center text-2xl mb-5">
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
          <div className="flex justify-center mt-16">
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="border-2  bg-yellow-100 text-black px-6 py-3 rounded-full shadow-md hover:bg-yellow-200 hover:shadow-lg active:bg-yellow-300 active:shadow-none focus:outline-none focus:ring-4 focus:ring-yellow-100 transition-all duration-200 ease-in-out flex items-center group"
            >
              Contact me
              <span className="ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
