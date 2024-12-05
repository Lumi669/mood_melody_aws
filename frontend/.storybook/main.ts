import path from "path";

import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    // Ensure config.module and config.module.rules are defined
    if (!config.module) {
      config.module = { rules: [] };
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Add TypeScript and Babel loaders
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Use transpileOnly to speed up compilation
          },
        },
      ],
      exclude: /node_modules/,
    });

    // Add .ts and .tsx to the resolver extensions
    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [];
    config.resolve.extensions.push(".ts", ".tsx");

    // Add custom path aliases
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@config": path.resolve(__dirname, "../config"),
      "@utils": path.resolve(__dirname, "../utils"),
    };

    return config;
  },
};

export default config;
