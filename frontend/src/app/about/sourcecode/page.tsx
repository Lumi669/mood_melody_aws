"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

import ContactButton from "@components/ContactButton";
import DecorativeElements from "@components/DecorativeElements";

const SourceCodePage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div>
      {/* Page heading */}
      <h1 className={`text-center mt-16 text-4xl font-extrabold ${textColor}`}>
        Source&nbsp;Code
      </h1>

      {/* Scrollable content wrapper */}
      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Repo banner (no Card) */}
          <div className="border-2 border-dashed hover:border-solid transition-all rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Portfolio&nbsp;App&nbsp;@&nbsp;GitHub
              </h2>
              <p className="text-sm opacity-80">
                Browse the full open‑source code, submit issues or pull
                requests.
              </p>
            </div>

            <a
              href="https://github.com/your-username/portfolio-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              View Repository
            </a>
          </div>

          {/* Project‑health badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            <img
              src="https://img.shields.io/github/actions/workflow/status/your-username/portfolio-app/ci.yml?label=build"
              alt="Build status"
            />
            <img
              src="https://img.shields.io/github/last-commit/your-username/portfolio-app"
              alt="Last commit"
            />
            <img
              src="https://img.shields.io/badge/License-MIT-yellow.svg"
              alt="License: MIT"
            />
          </div>

          {/* Deep‑dive links */}
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

      {/* Decorative shapes for a playful look */}
      <DecorativeElements />
    </div>
  );
};

export default SourceCodePage;
