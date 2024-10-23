import { NextResponse } from "next/server";

export function middleware(request) {
  const stage = request.headers.get("x-stage-name") || "prod";
  console.log("stage from middleware === ", stage);

  if (stage === "dev" && !request.nextUrl.pathname.startsWith("/dev")) {
    // Redirect to /dev if the request is not prefixed with /dev
    return NextResponse.redirect(
      new URL(`/dev${request.nextUrl.pathname}`, request.url),
    );
  } else if (stage === "prod" && request.nextUrl.pathname.startsWith("/dev")) {
    // Redirect to the root if in prod but path starts with /dev
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname.replace("/dev", ""), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Apply the middleware to all paths
};
