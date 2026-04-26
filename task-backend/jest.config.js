module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir: '.',

  moduleFileExtensions: ['js', 'json', 'ts'],

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverageFrom: ['src/**/*.(t|j)s'],

  coverageDirectory: 'coverage',
};