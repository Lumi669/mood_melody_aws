"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Container with gradient background */}
      <div className="w-full h-[90vh] flex items-center bg-gradient-to-r from-orange-500 to-black via-white from-20% via-70% to-90%">
        {/* Text content */}
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-2">Contact me</h1>
          <div className="text-2xl text-gray-700 space-y-2">
            <p>Interested in collaborating?</p>
          </div>
          <div className="text-base">
            <p>If you’re looking for a passionate developer</p>
            <p>to join your team, whether full-time or as a subcontractor,</p>
            <p>
              or if you’d like to discuss potential cooperation on a project,
            </p>
            <p>I’d love to hear from you!</p>
            <p>Feel free to reach out using the form below</p>
            <p>or directly via your preferred contact method,</p>
            <p>like email or LinkedIn.</p>
          </div>
        </div>
        {/* Personal photo */}
        <div className="flex-shrink-0 p-6">
          <img
            src="/path-to-your-photo.jpg"
            alt="Jinghuan Wang"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>
      {/* Additional content that will be scrollable */}
      <div className="h-[10vh] overflow-y-auto">
        {/* Add more content here */}
        <p>
          Additional content goes here. Users can scroll to view this content.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
