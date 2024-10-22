// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the URL starts with /dev or /prod
  if (url.pathname.startsWith("/dev") || url.pathname.startsWith("/prod")) {
    // Rewrite the request to the same path without removing the stage prefix
    return NextResponse.rewrite(url);
  }

  // If the path doesn't start with /dev or /prod, continue with the request
  return NextResponse.next();
}
