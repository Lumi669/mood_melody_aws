// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: "standalone",

// };

// module.exports = nextConfig;

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  output: "export",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Resolve the '@' alias to the 'src' directory
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
  images: {
    domains: ["mood-melody.s3.eu-north-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
