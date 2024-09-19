import React from "react";
import Link from "next/link";

const Aboutpage = () => {
  return (
    <>
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
                front-end technologies. Additionally, it features a CI/CD
                pipeline and DevOps practices, ensuring seamless and automated
                deployment. Utilizing AWS services for hosting and deployment,
                this project also incorporates AI-driven functionalities.
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
                    className="text-blue-500 font-bold no-underline hover:text-blue-700 text-xl"
                  >
                    Architecture
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/about/tech/cicd"
                    className="text-blue-500 font-bold no-underline hover:text-blue-700 text-xl"
                  >
                    CI/CD
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/about/tech/techstack"
                    className="text-blue-500 font-bold no-underline hover:text-blue-700 text-xl"
                  >
                    Tech Stack
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="active-button-style">Contact Me</button>
      </div>
    </>
  );
};

export default Aboutpage;
