const { defineConfig } = require('cypress');
require('dotenv').config();

const environments = {
  staging: 'https://merchant-console-uat.afarapartners.com',
  prod: 'https://www.afara-prod.com'
};

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  pageLoadTimeout: 100000,
  defaultCommandTimeout: 100000,
  watchForFileChanges: false,

  viewportWidth: 1280,
  viewportHeight: 720,

  video: false,
  screenshotOnRunFailure: false,
  screenshotsFolder: 'reports/screenshots',
  videosFolder: 'reports/videos',

  chromeWebSecurity: false,

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      const envName = config.env.APP_ENV || 'staging';

      if (!environments[envName]) {
        throw new Error(
            `Invalid APP_ENV: "${envName}". Valid options are: ${Object.keys(environments).join(', ')}`
        );
      }

      config.baseUrl = environments[envName];

      config.env = {
        ...config.env,
        ...process.env,
        APP_ENV: envName
      };

      console.log(`Running Cypress tests in "${envName}" environment`);
      console.log(`Base URL: ${config.baseUrl}`);

      return config;
    }
  }
});