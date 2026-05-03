const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    pageLoadTimeout: 100000,
    defaultCommandTimeout: 100000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Dynamic Environment Configuration
      const envName = config.env.APP_ENV || 'staging';
      const environments = {
        staging: 'https://merchant-console-uat.afarapartners.com',
        preprod: 'https://preprod.facebook.com',
        prod: 'https://www.facebook.com'
      };

      // Set the baseUrl based on the environment
      config.baseUrl = environments[envName] || environments.staging;

      // Implement node event listeners and load .env here
      config.env = {
        ...config.env,
        ...process.env
      };
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'reports/screenshot',
    videosFolder: 'reports/video',
    chromeWebSecurity: false // Disabling to avoid cross-origin frame issues if any occur
  },
});
