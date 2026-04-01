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
          <div className="max-w-3xl mx-auto px-6 py-6 text-gray-800">
            <p className="text-lg leading-relaxed mb-4">
              This application showcases my ability to design and build an{" "}
              <span className="font-semibold text-gray-900">
                end-to-end, full-stack, cloud-native
              </span>{" "}
              web application.
            </p>

            <p className="text-lg leading-relaxed mb-4">
              It features a responsive frontend built with{" "}
              <span className="font-medium">Next.js</span> and a serverless
              backend on <span className="font-medium">AWS</span> using{" "}
              <span className="font-medium">Lambda</span> and{" "}
              <span className="font-medium">API Gateway</span>.
            </p>

            <p className="text-lg leading-relaxed mb-4">
              Data is managed with <span className="font-medium">DynamoDB</span>{" "}
              and <span className="font-medium">S3</span>, while{" "}
              <span className="font-medium">CloudFront</span> is used to
              optimize content delivery with caching and low-latency
              distribution.
            </p>

            <p className="text-lg leading-relaxed mb-4">
              The application integrates AI via{" "}
              <span className="font-medium">AWS Comprehend</span> to analyze
              user input and dynamically generate personalized music and visual
              experiences.
            </p>

            <p className="text-lg leading-relaxed">
              A CI/CD pipeline powered by{" "}
              <span className="font-medium">GitHub Actions</span> and{" "}
              <span className="font-medium">AWS CodePipeline</span> enables
              automated building and deployment, reflecting real-world DevOps
              practices.
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
