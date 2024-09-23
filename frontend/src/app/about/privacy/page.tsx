"use client";

// require("dotenv").config();

import React from "react";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";

const PrivacyPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  return (
    <div className="h-screen overflow-y-scroll px-4  pb-80 p-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-3xl font-extrabold mb-4 ${getTextColor(
            isRed,
            isBlue,
            isBrown,
          )}`}
        >
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4">
          This Privacy Policy explains how this app handles your data. Please
          note that this app is a demonstration project created to showcase my
          development skills, and it is not intended for commercial use.
          Therefore, it does not actively collect or store personal data.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Content Usage and Attribution
        </h2>
        <p className="text-gray-700 mb-4">
          This app includes animations and music sourced from online platforms
          under their respective licenses:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Animations from{" "}
            <a
              href="https://www.veed.io/"
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Veed.io
            </a>
            , used according to their licensing terms.
          </li>
          <li>
            Music from{" "}
            <a
              href="https://artlist.io/"
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Artlist
            </a>
            , all song titles and artists are mentioned on the music page.
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          This app includes images sourced from{" "}
          <a
            href="https://www.freepik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Freepik
          </a>
          . These images are used under Freepik&apos;s free license with proper
          attribution to the original authors:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <a
              href="https://www.freepik.com/free-photo/adorable-little-poodle-with-cute-bunny-ears-beige-surface_15672270.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by wirestock on Freepik
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/free-photo/happy-beagle-with-droopy-ears-blue-background_135010608.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by rorozoa on Freepik
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/free-photo/medium-shot-friends-eating-pizza_138239739.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by Drazen Zigic on Freepik
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/free-photo/cute-puppy-sitting-grass-enjoying-nature-playful-beauty-generated-by-artificial-intelligence_79687547.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by upklyak on Freepik
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/free-photo/close-up-adorable-dog-laying-blanket_10422541.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by Freepik
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/free-photo/small-pug-sofa_11043847.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by Freepik
            </a>
          </li>

          <li>
            <a
              href="https://www.freepik.com/free-ai-image/cute-puppy-sitting-grass-enjoying-nature-playful-beauty-generated-by-artificial-intelligence_79687547.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Image by vecstock on Freepik
            </a>
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          All content is used for demonstration purposes only and is not
          intended for commercial distribution.
        </p>

        <h2 className="text-xl font-semibold mb-2">Types of Data Collected</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Personal Information:</strong> This app may collect personal
            information such as usernames and email addresses during the user
            registration process. This information is used solely for creating
            and managing user accounts, and to provide a personalized experience
            within the app.
          </li>
          <li>
            <strong>Usage Data:</strong> The app may track how users navigate
            and use the app to demonstrate usage statistics.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> This app may use
            cookies to improve user experience, but no personally identifiable
            information is stored.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">How Data is Used</h2>
        <p className="text-gray-700 mb-4">
          Any data collected is used solely for demonstrating app functionality
          and is not shared with third parties. It helps in understanding user
          behavior and improving the app&apos;s features.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Data Sharing and Disclosure
        </h2>
        <p className="text-gray-700 mb-4">
          No personal data is shared with third parties for marketing or
          advertising purposes. However, if third-party services (such as
          analytics tools) are used, they may collect and process data in
          accordance with their own privacy policies. Please review the privacy
          policies of these third-party services to understand how they handle
          your data.
        </p>

        <h2 className="text-xl font-semibold mb-2">Data Security</h2>
        <p className="text-gray-700 mb-4">
          The app employs standard security measures to protect data. However,
          as this is a demo app, it is not intended to handle sensitive or
          personal information.
        </p>

        <h2 className="text-xl font-semibold mb-2">User Rights</h2>
        <p className="text-gray-700 mb-4">
          Users have the right to access, update, or delete their personal
          information, such as their username and email address, stored within
          this app. If you would like to exercise these rights or have any
          concerns about how your data is being handled, please contact us at{" "}
          {email}.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or concerns about this Privacy Policy,
          please contact me at {email}.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Disclaimer for Demo Purposes
        </h2>
        <p className="text-gray-700 mb-4">
          This app is for demonstration purposes. It may collect and store real
          user data, specifically usernames and email addresses, but no other
          personal information. The collected data is used solely for creating
          and managing user accounts and is not shared with third parties,
          except as required for the app's functionality. This app is not
          intended for commercial use.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
