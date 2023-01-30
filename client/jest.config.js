module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!public-ip|is-ip|ip-regex|indent-string|aggregate-error|clean-stack|escape-string-regexp).+\\.js$',
  ],
  moduleNameMapper: {
    '\\.(png)$': '<rootDir>/fileMock.js',
  },
};
