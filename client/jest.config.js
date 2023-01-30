module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '/node_modules/(?!public-ip|is-ip|ip-regex|indent-string|aggregate-error|clean-stack|escape-string-regexp).+\\.js$',
  ],
  moduleNameMapper: {
    '\\.(png)$': '<rootDir>/fileMock.js',
  },
};
