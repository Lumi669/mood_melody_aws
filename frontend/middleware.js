import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Redirect to include the base path if missing
  if (!url.pathname.startsWith("/prod")) {
    url.pathname = `/prod${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
