/** @type {import('next').NextConfig} */

// Note: `NEXT_PUBLIC_STAGE` is set in AWS Lambda configuration environment variable
const stage = process.env.NEXT_PUBLIC_STAGE || "prod";

const nextConfig = {
  basePath: stage === "prod" ? "" : `/${stage}`, // Use empty basePath for prod
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
        source: `/${stage}/:path*`, // Match any path under the base path
        destination: "/:path*", // Rewrite to root paths
      },
    ];
  },
  images: {
    unoptimized: true, // Disable image optimization if using serverless environments
  },
};

export default nextConfig;
