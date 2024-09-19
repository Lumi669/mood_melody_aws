"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Aboutpage = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-center mt-8 text-4xl">About This App</h1>
      <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
        <div className="max-w-5xl mx-auto">
          <div className="indent-8 m-10 text-xl leading-relaxed">
            <p>
              This application serves as a demonstration of my full-stack
              development expertise. It highlights my ability to design and
              develop user-friendly, responsive web applications, build
              efficient back-end solutions and APIs, and integrate modern
              front-end technologies. Additionally, it features a CI/CD pipeline
              and DevOps practices, ensuring seamless and automated deployment.
              Utilizing AWS services for hosting and deployment, this project
              also incorporates AI-driven functionalities.
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
          <div className="flex justify-center mt-8">
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

export default Aboutpage;
