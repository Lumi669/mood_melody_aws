// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const url = req.nextUrl.clone();
//   console.log("url from middleware ====== ", url);

//   // Redirect to include the base path if missing
//   if (!url.pathname.startsWith("/prod")) {
//     url.pathname = `/prod${url.pathname}`;
//     console.log("url after adding stage prod ====== ", url);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }
