"use client";

import React from "react";
import { useRouteState } from "@context/RouteContext"; // Import the custom hook

const TestPage = () => {
  const { view } = useRouteState(); // Use the shared state from context

  return (
    <div>
      {view === "reload" && <div>Reload Page99999999</div>}
      {view === "navigate" && <div>Navigate to this page99999</div>}
      {view === null && <div>Loading...99999</div>}
    </div>
  );
};

export default TestPage;

// This page is to test how to distinguish refreshing a page vs. navigating to a page
