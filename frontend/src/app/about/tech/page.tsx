"use client";

import React from "react";
import Link from "next/link";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

import ContactButton from "@components/ContactButton";
import DecorativeElements from "@components/DecorativeElements";

const TechPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div>
      <h1 className={`text-center mt-16 text-4xl font-extrabold ${textColor}`}>
        Technical&nbsp;Documentation
      </h1>

      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <p className="text-center text-2xl mb-5">
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

          {/* Contact CTA */}
          <div className="flex justify-center">
            <ContactButton />
          </div>
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
};

export default TechPage;
