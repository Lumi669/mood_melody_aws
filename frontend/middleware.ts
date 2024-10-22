// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the URL starts with /dev or /prod
  if (pathname.startsWith("/dev") || pathname.startsWith("/prod")) {
    // Rewrite to the same path, preserving the stage prefix
    return NextResponse.rewrite(req.nextUrl);
  }

  // If the path doesn't match /dev or /prod, continue with the original request
  return NextResponse.next();
}
