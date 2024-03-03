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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Resolve the '@' alias to the 'src' directory
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
};

module.exports = nextConfig;
