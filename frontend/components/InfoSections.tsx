"use client";
import React from "react";
import PhoneLink from "./PhoneLink";
import { getTextColor } from "@utils/getTextColor";
import { useMedia } from "@context/MediaContext";

const InfoSections: React.FC = () => {
  const { isRed, isBlue, isBrown } = useMedia();
  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
  const mobile = process.env.NEXT_PUBLIC_PERSONAL_PHONE;
  const textColor = getTextColor(isRed, isBlue, isBrown);

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-4   mb-4">
        <h2 className={`font-bold text-2xl mb-2 ${textColor}`}>My Name</h2>
        <p className="text-lg font-medium text-gray-700">Jinghuan Wang</p>
        <h2 className={`font-bold text-2xl  mt-2 ${textColor} `}>My Title</h2>
        <p className="text-lg font-medium text-gray-700 mb-2">
          Software developer
        </p>
        <p className="text-m font-medium text-blue-700">
          <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
            {email}
          </a>
        </p>

        <PhoneLink
          phoneNumber={mobile}
          className="text-m font-medium text-blue-700"
        />
      </div>

      {/* Section 2 */}
      <div className="text-center p-4 ">
        <h2 className={`font-bold text-2xl  mb-2 ${textColor}`}>
          My Interested Roles
        </h2>
        <p className="mt-2 text-lg">
          <span className=" text-gray-800">Fullstack developer</span>
        </p>
        <p className="mt-2 text-lg">
          <span className=" text-gray-800">Frontend developer</span>
        </p>
        <p className="mt-2 text-lg">
          <span className=" text-gray-800">Backend developer</span>
        </p>
        <p className="mt-2 text-lg">
          <span className=" text-gray-800">AWS & Software dev related</span>
        </p>
      </div>

      {/* Section 3 */}
      <div className="text-center p-4  ">
        <h2 className={`font-bold text-2xl mb-4 ${textColor} `}>
          My Work Place
        </h2>
        <p className="mt-2 text-lg">
          <span className="font-semibold text-gray-800">Tampere, Finland:</span>
          <span className="text-gray-600"> Onsite, Hybrid, Remote</span>
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold text-gray-800">
            Other Places in Finland:
          </span>
          <span className="text-gray-600"> Remote</span>
        </p>
        <p className="mt-2 text-lg">
          <span className="font-semibold text-gray-800">Other Countries:</span>
          <span className="text-gray-600"> Remote</span>
        </p>
      </div>
    </div>
  );
};

export default InfoSections;
