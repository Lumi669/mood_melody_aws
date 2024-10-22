/** @type {import('next').NextConfig} */

//note env.NEXT_PUBLIC_STAGE is set in aws lambda configuration envionment variable
const stage = process.env.NEXT_PUBLIC_STAGE || "prod";
const nextConfig = {
  basePath: `/${stage}`, // Set basePath based on the stage
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL_0: process.env.NEXT_PUBLIC_API_URL_0,
    NEXT_PUBLIC_API_URL_1: process.env.NEXT_PUBLIC_API_URL_1,
    NEXT_PUBLIC_API_URL_2: process.env.NEXT_PUBLIC_API_URL_2,
    NEXT_PUBLIC_API_URL_3: process.env.NEXT_PUBLIC_API_URL_3,
  },
  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: "/${stage}",
        destination: "/",
      },

      {
        source: `/${stage}/:path*`,
        destination: "/:path*",
      },
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
  images: {
    unoptimized: true, // Add this to disable image optimization if using serverless environments
  },
};

export default nextConfig;
