export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testPathIgnorePatterns: [".svg$", "path/to/ignore/"],
};
