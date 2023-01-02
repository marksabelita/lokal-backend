module.exports = {
  verbose: true,
  bail: false,
  "globalSetup": "<rootDir>/jest/globalSetUp.js",
  "globalTeardown": "<rootDir>/jest/globalTearDown.js",
  "testMatch": [
    "**/integ/**/*.integ.test.ts"
  ],
  "preset": "ts-jest",
  "testEnvironment": "node",
  "transform": {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ]
};  