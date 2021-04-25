export default {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.ts": "ts-jest"
  },
  // Disabling these - we will call test-global-setup.js in our Jenkinsfile for the time being
  // Note that this means you need to have transpiled ts/test/test-global-setup.ts first
  // "globalSetup": "<rootDir>/js/test/test-global-setup.js",
  // "globalTeardown": "<rootDir>/js/test/test-global-teardown.js"
}
