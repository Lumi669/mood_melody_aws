"use client";

import React from "react";
import Link from "next/link";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

import ContactButton from "@components/ContactButton";
import DecorativeElements from "@components/DecorativeElements";
import TechLinks from "@components/TechLinks";

const SourceCodePage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div>
      <h1 className={`text-center mt-16 text-4xl font-extrabold ${textColor}`}>
        Source&nbsp;Code
      </h1>

      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="border-2 border-dashed hover:border-solid transition-all rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Moode Melody&nbsp;App&nbsp;@&nbsp;GitHub
              </h2>

              <p className="text-sm opacity-80">
                Browse the full open-source code — feel free to fork or clone
                it.
              </p>
            </div>

            <a
              href="https://github.com/Lumi669/mood_melody_aws"
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
              src="https://img.shields.io/github/last-commit/Lumi669/mood_melody_aws"
              alt="Last commit"
            />
            <img
              src="https://img.shields.io/github/actions/workflow/status/Lumi669/mood_melody_aws/build-backend.yml?label=Backend+Build"
              alt="Backend build status"
            />
            <img
              src="https://img.shields.io/github/actions/workflow/status/Lumi669/mood_melody_aws/build-frontend.yml?label=Frontend+Build"
              alt="Frontend build status"
            />
            <img
              src="https://mood-melody-badges-images-prod.s3.eu-north-1.amazonaws.com/mood-melody-prod.svg"
              alt="Deploy Status Badge"
            />

            <img
              src="https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg"
              alt="License: PolyForm Noncommercial"
            />
          </div>

          <div>
            <p className="text-center text-3xl mb-5">
              For detailed technical information, check:
            </p>
          </div>
          <div className="text-blue-700 font-bold no-underline hover:underline text-3xl text-center">
            <Link href="/about/tech">Technical Documentation</Link>
          </div>

          <TechLinks />

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

export default SourceCodePage;
