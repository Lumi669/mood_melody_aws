// src/app/500.tsx
"use client";

import Link from "next/link";

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-red-500 text-center">
        500 - Internal Server Error
      </h1>
      <p className="mt-2 text-md md:text-lg text-center">
        Oops! Something went wrong on our end.
      </p>
      <Link
        href="/"
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
