// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

// Catch uncaught exceptions to prevent tests from failing unnecessarily 
// due to 3rd party scripts or minor app errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
