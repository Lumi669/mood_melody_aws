// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the URL starts with /dev or /prod
  if (pathname.startsWith("/dev") || pathname.startsWith("/prod")) {
    // Do nothing, continue with the current path
    return NextResponse.next();
  }

  // If the path doesn't start with /dev or /prod, continue with the request
  return NextResponse.next();
}
