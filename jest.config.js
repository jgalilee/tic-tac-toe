module.exports = {
  displayName: 'unit',
  setupTestFrameworkScriptFile: './src/test/unit.js',
  reporters: ['jest-dot-reporter'],
  testMatch: ['**/?(*.)+(spec).js'],
  testPathIgnorePatterns: ['/test', '/e2e'],
  testEnvironment: './src/test/environment.js',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/test'],
  verbose: true,
};
