/**
 * jest config file
 */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^(.+\\.svg)\\?react$': '<rootDir>/src/mocks/svg.tsx',
    '^(.+\\.svg)$': '<rootDir>/src/mocks/svg.tsx',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
