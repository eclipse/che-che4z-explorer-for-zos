module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "modulePathIgnorePatterns": [
      "<rootDir>/out",
      "<rootDir>/dist",
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "collectCoverage": false,
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts}",
        "resources/**/*.{js,jsx,ts}",
        "!**/node_modules/**",
        "!**/coverage/**"
    ]
  }
