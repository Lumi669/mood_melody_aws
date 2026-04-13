module.exports = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  roots: ["<rootDir>/components", "<rootDir>/utils"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@config/(.*)$": "<rootDir>/config/$1",
    "^@context/(.*)$": "<rootDir>/context/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@types/(.*)$": "<rootDir>/types/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  clearMocks: true,
};
