"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ContactButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/contact")}
      className="border-2 bg-yellow-100 text-black px-6 py-3 rounded-full shadow-md hover:bg-yellow-200 hover:shadow-lg active:bg-yellow-300 active:shadow-none focus:outline-none focus:ring-4 focus:ring-yellow-100 transition-all duration-200 ease-in-out flex items-center group"
    >
      Contact me
      <span className="ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
        &rarr;
      </span>
    </button>
  );
};

export default ContactButton;
