"use client";

import React from "react";
import Link from "next/link";
import { useMedia } from "@context/MediaContext";
import { getTextColor } from "@utils/getTextColor";

const PrivacyPage = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  return (
    <div className="h-screen overflow-y-scroll px-4 pb-80 p-10">
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
          development skills and is not intended for commercial use.
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
            <Link href="https://www.veed.io/" legacyBehavior>
              <a
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Veed.io
              </a>
            </Link>
            , used according to their licensing terms.
          </li>
          <li>
            Music from{" "}
            <Link href="https://artlist.io/" legacyBehavior>
              <a
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Artlist
              </a>
            </Link>
            , all song titles and artists are mentioned on the music page.
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          This app includes images sourced from{" "}
          <Link href="https://www.freepik.com" legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Freepik
            </a>
          </Link>
          . These images are used under Freepik&apos;s free license with proper
          attribution to the original authors.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <Link
              href="https://www.freepik.com/free-photo/adorable-little-poodle-with-cute-bunny-ears-beige-surface_15672270.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by wirestock on Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-photo/happy-beagle-with-droopy-ears-blue-background_135010608.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by rorozoa on Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-photo/medium-shot-friends-eating-pizza_138239739.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by Drazen Zigic on Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-photo/cute-puppy-sitting-grass-enjoying-nature-playful-beauty-generated-by-artificial-intelligence_79687547.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by upklyak on Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-photo/close-up-adorable-dog-laying-blanket_10422541.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-photo/small-pug-sofa_11043847.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by Freepik
              </a>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-ai-image/cute-puppy-sitting-grass-enjoying-nature-playful-beauty-generated-by-artificial-intelligence_79687547.htm"
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Image by vecstock on Freepik
              </a>
            </Link>
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          All content is used for demonstration purposes only and is not
          intended for commercial distribution.
        </p>

        {/* The rest of your content remains the same */}
        <h2 className="text-xl font-semibold mb-2">
          Data Collection and Usage
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Personal Information:</strong> This app may collect
            usernames and email addresses during the user registration process.
            This information is used solely for creating and managing user
            accounts and providing a personalized experience.
          </li>
          <li>
            <strong>Usage Data:</strong> The app may track user activity to
            demonstrate usage statistics.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> This app may use
            cookies to improve the user experience, but no personally
            identifiable information is stored.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">
          Data Security and Sharing
        </h2>
        <p className="text-gray-700 mb-4">
          Any data collected is used solely for demonstrating app functionality.
          I do not share your personal information with third parties for
          marketing or advertising purposes. However, I may use the following
          third-party service to improve the app: Google Analytics which tracks
          anonymized user behavior to help me improve the app experience. For
          more information on how this third-party service handle your data,
          please review their respective privacy policies.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          User Rights and Contact Information
        </h2>
        <p className="text-gray-700 mb-4">
          Users have the right to access, update, or delete their personal
          information, such as their username and email address, stored within
          this app. If you would like to exercise these rights or have any
          concerns about how your data is being handled, please contact me at{" "}
          {email}.
        </p>

        <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
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
