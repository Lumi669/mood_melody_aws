"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by ErrorBoundary:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 pb-96">
      <h1 className="text-4xl font-bold text-red-500">
        Oops! Something went wrong!
      </h1>
      <p className="mt-2 text-lg">Error: {error.message}</p>
      <button
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => reset()} // This function resets the error boundary state
      >
        Try again
      </button>
    </div>
  );
}
