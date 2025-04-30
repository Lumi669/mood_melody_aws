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
        Technical Documentation
      </h1>

      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Our Technology Stack
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-medium mb-4">
                  Language &amp; Tooling
                </h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>
                    Primary language: <strong>TypeScript</strong>
                  </li>
                  <li>
                    Schema validation: <strong>Zod</strong>
                  </li>
                  <li>
                    Package management: <strong>PNPM</strong> (monorepo)
                  </li>
                  <li>
                    Linting &amp; formatting: <strong>ESLint, Prettier</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-4">Backend</h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>
                    Runtime &amp; framework:{" "}
                    <strong>Node.js, Express.js</strong>
                  </li>
                  <li>
                    Automation: <strong>Shell scripts</strong>
                  </li>
                  <li>
                    Databases &amp; storage:{" "}
                    <strong>DynamoDB, SQLite, Amazon S3</strong>
                  </li>
                  <li>
                    API style: <strong>REST</strong>
                  </li>
                  <li>
                    Serverless deployment:{" "}
                    <strong>AWS Lambda + API Gateway</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-4">Frontend</h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>
                    Frameworks &amp; libraries: <strong>Next.js, React</strong>
                  </li>
                  <li>
                    Component development: <strong>Storybook</strong>
                  </li>
                  <li>
                    Markup &amp; styles: <strong>HTML, CSS</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-4">
                  DevOps &amp; Infrastructure
                </h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>
                    Source &amp; CI/CD:{" "}
                    <strong>GitHub, AWS CodePipeline</strong>
                  </li>
                  <li>
                    Infrastructure as code: <strong>AWS CloudFormation</strong>
                  </li>
                  <li>
                    Containerization &amp; registry:{" "}
                    <strong>Docker, AWS ECR</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div>
            <p className="text-center text-2xl mb-5">
              For detailed technical information, check:
            </p>
            <ul className="list-disc list-inside text-center space-y-4">
              <li>
                <Link
                  href="/about/tech/architecture"
                  className="text-blue-700 font-bold no-underline hover:underline text-xl"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/about/tech/cicd"
                  className="text-blue-700 font-bold no-underline hover:underline text-xl"
                >
                  CI/CD
                </Link>
              </li>
              <li>
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
