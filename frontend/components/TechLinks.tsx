import Link from "next/link";
import React from "react";

const TechLinks: React.FC = () => (
  <div className="text-center text-xl font-bold mb-8 text-blue-700">
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
);

export default TechLinks;
