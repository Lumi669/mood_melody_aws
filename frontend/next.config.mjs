/** @type {import('next').NextConfig} */

// Note: `NEXT_PUBLIC_STAGE` is set in AWS Lambda configuration environment variable
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
        source: `/${stage}`, // Match the base path without a trailing slash
        destination: "/",
      },
      {
        source: `/${stage}/:path*`, // Match any path under the base path
        destination: "/:path*",
      },
    ];
  },
  images: {
    unoptimized: true, // Disable image optimization if using serverless environments
  },
};

export default nextConfig;
