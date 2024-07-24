/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Uncomment this if you are using a base path
  // basePath: "/prod",
  env: {
    NEXT_PUBLIC_API_URL_0: process.env.NEXT_PUBLIC_API_URL_0,
    NEXT_PUBLIC_API_URL_1: process.env.NEXT_PUBLIC_API_URL_1,
    NEXT_PUBLIC_API_URL_2: process.env.NEXT_PUBLIC_API_URL_2,
    NEXT_PUBLIC_API_URL_3: process.env.NEXT_PUBLIC_API_URL_3,
  },
  async rewrites() {
    return [
      {
        source: "/live",
        destination: "/live",
      },
      {
        source: "/allmusic",
        destination: "/allmusic",
      },
      {
        // Catch-all route to handle any other requests
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
