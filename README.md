# Cypress Automation Framework

This repository contains a robust, scalable E2E automation framework for testing the Facebook Sign Up feature. Built with Cypress and modern JavaScript, it is designed adhering to Senior QA engineering principles.

## 🎯 Architecture Overview

This framework utilizes several industry-standard testing patterns:
- **Page Object Model (POM)**: Centralized definitions for UI elements and actions in isolated classes, making specs cleaner and instantly maintainable.
- **Dynamic Data Generation**: Leveraging `@faker-js/faker` to programmatically build unique and robust user personas (generating distinct valid emails, robust passwords, varied birthdates) instead of relying on stale static JSON fixtures.
- **Automated HTML Reporting**: Fully integrated with `cypress-mochawesome-reporter` to automatically generate comprehensive visual HTML reports with embedded failure screenshots upon test execution.
- **Dynamic Environments Support**: Ability to elegantly switch test execution flows across `staging`, `preprod`, and `prod` target URLs seamlessly via mapped command line scripts.

## 📁 Directory Structure

```text
cypress-automation-framework/
├── cypress/
│   ├── e2e/
│   │   └── regression/
│   │       └── merchant-signup.cy.js   # Main E2E regression tests for sign up 
│   ├── pages/
│   │   └── MerchantSignUpPage.js       # POM class holding locators and UI actions
│   ├── fixtures/
│   │   └── users.json                  # Static edge-case test data references
│   ├── support/
│   │   ├── commands.js                 # Reusable custom overarching Cypress commands
│   │   └── e2e.js                      # Core support configuration and plugin registers
│   └── utils/
│       ├── dataBuilder.js              # Faker data generator helper
│       └── logger.js                   # Elegant test step logging wrapper
├── .github/
│   └── workflows/
│       └── cypress.yml                 # Automation CI pipeline configuration
├── cypress.config.js                   # Main Cypress configuration, node hooks, and env router
├── package.json                        # Project metadata, dependencies, and execution scripts
├── .env                                # Sensitive variable storage (ignored from Git)
└── .gitignore                          # Standard git exclusion paths
```

## 🚀 Tasks Performed Throughout Implementation

The following end-to-end framework assembly steps were executed via our implementation workflows:

- [x] **Project Initialization**: Scaffolded `package.json`, environment configurations (`.env`), and the base `cypress.config.js`.
- [x] **POM Implementation**: Designed `MerchantSignUpPage.js` to intelligently interface with modal locators and perform safe typing actions.
- [x] **Utility Creation**: Built the `dataBuilder.js` logic utilizing Faker, alongside a custom `logger.js` to output structured step markers inside the Cypress runner log.
- [x] **Authoring Tests**: Wrote `merchant-signup.cy.js` spanning success paths (dynamic persona creation) and negative paths (empty form submissions testing).
- [x] **CI/CD Integration**: Produced a Github Actions `cypress.yml` workflow ready to execute your tests automatically on Github PRs.
- [x] **Multi-Environment Routing**: Upgraded `cypress.config.js` to read an `APP_ENV` variable to dynamically map the `baseUrl` targeting staging, preprod, and production environments, and generated dedicated quick-launch npm scripts.
- [x] **Mochawesome Reporting**: Installed `cypress-mochawesome-reporter` and wired it deeply into the node setup hooks and support scripts to build out-of-the-box forensic test execution evidence.


## 💻 How to Run This Framework

1. Ensure packages are cleanly installed:
   ```bash
   npm install
   ```

2. **Execute via Interactive UI (Browser)**
   Run tests interactively to debug and observe what paths the automated browser takes.
   ```bash
   # Opens UI hitting Staging environment
   npm run test:ui:staging

   # Opens UI hitting Production environment
   npm run test:ui:prod
   ```

3. **Execute via Headless Mode (Command Line CI)**
   Executes the entire suite silently in the background (generating reports upon completion). Good for pipelines or bulk runs.
   ```bash
   # Run tests targeting Staging
   npm run test:staging

   # Run tests targeting Preprod
   npm run test:preprod
   
   # Run tests targeting Production
   npm run test:prod
   ```

## ⚠️ Important Note regarding Facebook Automation
Because this framework currently targets Facebook's real production sign-up page (`www.facebook.com/reg`), executing tests rapidly may engage their active automated anti-bot systems. Actual final submit clicks have been commented out within the tests (`merchant-signup.cy.js`) simply to prevent causing unnecessary IP blocks during this framework demonstration while still proving testing capabilities.
