/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL_0: process.env.NEXT_PUBLIC_API_URL_0,
    NEXT_PUBLIC_API_URL_1: process.env.NEXT_PUBLIC_API_URL_1,
    NEXT_PUBLIC_API_URL_2: process.env.NEXT_PUBLIC_API_URL_2,
    NEXT_PUBLIC_API_URL_3: process.env.NEXT_PUBLIC_API_URL_3,
    NEXT_PUBLIC_API_URL_4: process.env.NEXT_PUBLIC_API_URL_4,
    NEXT_PUBLIC_API_URL_5: process.env.NEXT_PUBLIC_API_URL_5,
    NEXT_PUBLIC_API_URL_6: process.env.NEXT_PUBLIC_API_URL_6,
    NEXT_PUBLIC_PERSONAL_EMAIL: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    NEXT_PUBLIC_PERSONAL_PHONE: process.env.NEXT_PUBLIC_PERSONAL_PHONE,
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
