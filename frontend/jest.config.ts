/**
 * jest config file
 */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': `<rootDir>/src/mocks/svg.tsx`,
  },
  moduleNameMapper: {
    '^(.+\\.svg)\\?react$': '<rootDir>/src/mocks/svg.tsx',
    '^(.+\\.svg)$': '<rootDir>/src/mocks/svg.tsx',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
