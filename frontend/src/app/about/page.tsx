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
          <div className="max-w-3xl mx-auto rounded-3xl bg-white/40 backdrop-blur-sm px-8 py-8 text-gray-800 shadow-sm">
            <div className="space-y-5">
              <p className="text-lg leading-relaxed">
                This application showcases my ability to{" "}
                <span className="font-semibold text-gray-900">
                  design, build, and deploy an end-to-end, AI-powered,
                  cloud-native full-stack application
                </span>{" "}
                on AWS.
              </p>

              <p className="text-lg leading-relaxed">
                It features a responsive frontend built with{" "}
                <span className="font-medium text-gray-900">Next.js</span> and a
                serverless backend on{" "}
                <span className="font-medium text-gray-900">AWS</span> using{" "}
                <span className="font-medium text-gray-900">Lambda</span> and{" "}
                <span className="font-medium text-gray-900">API Gateway</span>.
              </p>

              <p className="text-lg leading-relaxed">
                Data is managed with{" "}
                <span className="font-medium text-gray-900">DynamoDB</span> and{" "}
                <span className="font-medium text-gray-900">S3</span>, while{" "}
                <span className="font-medium text-gray-900">CloudFront</span>{" "}
                helps optimize global content delivery through caching and
                low-latency distribution.
              </p>

              <p className="text-lg leading-relaxed">
                The application integrates AI via{" "}
                <span className="font-medium text-gray-900">
                  AWS Comprehend
                </span>{" "}
                to analyze user input and dynamically generate personalized
                music and visual experiences, including mood-driven playback and
                adaptive UI behavior.
              </p>

              <p className="text-lg leading-relaxed">
                A CI/CD pipeline powered by{" "}
                <span className="font-medium text-gray-900">
                  GitHub Actions
                </span>{" "}
                and{" "}
                <span className="font-medium text-gray-900">
                  AWS CodePipeline
                </span>{" "}
                enables automated building and deployment, reflecting real-world
                DevOps practices.
              </p>

              <p className="text-lg leading-relaxed">
                The system also incorporates production-ready practices such as
                input validation, rate limiting, and edge-level protection via{" "}
                <span className="font-medium text-gray-900">AWS WAF</span>.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-10 px-6 text-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Key Features
            </h2>

            <ul className="space-y-3 text-lg leading-relaxed">
              <li>
                • Mood-driven playback with dynamic play/pause based on user
                sentiment
              </li>

              <li>• Real-time mood analysis from free-text input using NLP</li>

              <li>
                • Adaptive UI with background visuals that respond to detected
                mood
              </li>

              <li>• AI-powered emotion detection to match music and visuals</li>

              <li>
                • Serverless architecture on AWS (Lambda, API Gateway, DynamoDB,
                S3)
              </li>

              <li>
                • CI/CD pipeline using GitHub Actions and AWS CodePipeline
              </li>

              <li>• Containerized deployment with Docker and AWS ECR</li>

              <li>
                • Optimized global content delivery via AWS CloudFront (low
                latency & caching)
              </li>

              <li>• Secure input handling with validation and sanitization</li>

              <li>
                • Multi-layer rate limiting for system protection:
                <ul className="ml-6 mt-2 space-y-1 text-base">
                  <li>- Edge-level protection via AWS WAF (CloudFront)</li>
                  <li>- Backend rate limiting on API endpoints</li>
                </ul>
              </li>

              <li>
                • Automated deployment pipeline with real-time status tracking
              </li>
            </ul>
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
