// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the URL starts with /dev or /prod
  if (pathname.startsWith("/dev") || pathname.startsWith("/prod")) {
    // Rewrite the request to the appropriate path without changing the basePath
    return NextResponse.rewrite(new URL(pathname, req.url));
  }

  // If the path doesn't match /dev or /prod, continue with the request
  return NextResponse.next();
}
