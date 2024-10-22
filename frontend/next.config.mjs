/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: "/",
        destination: "/dev",
      },
      {
        source: "/",
        destination: "/prod",
      },

      // Handle all other paths
      {
        source: "/:path*",
        destination: "/dev/:path*",
      },
      {
        source: "/:path*",
        destination: "/prod/:path*",
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
