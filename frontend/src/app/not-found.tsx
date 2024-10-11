"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 pb-96">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-2 text-lg">
        Oops! The page you&apos;re looking for does not exist.
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
