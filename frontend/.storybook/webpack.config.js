// .storybook/webpack.config.js
module.exports = ({ config }) => {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false, // Prevent 'fs' module errors in browser environment
    path: require.resolve("path-browserify"), // Add browser polyfills for 'path'
  };
  return config;
};
