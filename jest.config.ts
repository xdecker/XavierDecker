import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/src/app/features/**/domain/**/*.spec.ts',
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    'src/app/features/**/domain/**/*.ts',
    '!**/*.spec.ts',
    '!**/tokens/**',
    '!**/*.token.ts',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default config;
