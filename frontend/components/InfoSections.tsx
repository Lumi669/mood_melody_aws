"use client";
import React from "react";

const InfoSections: React.FC = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Section 1 */}
      <div className="text-center">
        <h2 className="font-bold text-lg">My Name</h2>
        <p className="mt-2">Jinghuan Wang</p>
        <h2 className="font-bold text-lg mt-4">My Title</h2>
        <p className="mt-2">Software Developer</p>
      </div>

      {/* Section 2 */}
      <div className="text-center">
        <h2 className="font-bold text-lg">My Interested Roles</h2>
        <p className="mt-2">Fullstack Developer</p>
        <p className="mt-1">Frontend Developer</p>
        <p className="mt-1">Backend Developer</p>
        <p className="mt-1">AWS and Software Dev Related Roles</p>
      </div>

      {/* Section 3 */}
      <div className="text-center">
        <h2 className="font-bold text-lg">My Working Place</h2>
        <p className="mt-2">Tampere, Finland: Onsite, Hybrid</p>
        <p className="mt-1">Other Places in Finland: Remote</p>
        <p className="mt-1">Other Countries: Remote</p>
      </div>
    </div>
  );
};

export default InfoSections;
