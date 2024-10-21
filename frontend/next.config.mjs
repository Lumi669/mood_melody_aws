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
      // {
      //   source: "/live",
      //   destination: "/live",
      // },
      // {
      //   source: "/allmusic",
      //   destination: "/allmusic",
      // },
      // Rewrite for base paths without trailing slash
      {
        source: "/dev",
        destination: "/",
      },
      {
        source: "/prod",
        destination: "/",
      },
      // Rewrite for base paths with trailing slash
      {
        source: "/dev/",
        destination: "/",
      },
      {
        source: "/prod/",
        destination: "/",
      },
      // Handle all other paths
      {
        source: "/dev/:path*",
        destination: "/:path*",
      },
      {
        source: "/prod/:path*",
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
