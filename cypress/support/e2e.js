// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';
//import { slowCypressDown } from 'cypress-slow-down'
//slowCypressDown()

before(function () {
  cy.log('This should execute before all test cases')
})

beforeEach(function () {
  cy.log('This should execute before each test case')
})

after(function () {
  cy.log('This should execute after all test cases')
})

afterEach(function () {
  cy.log('This should execute after each test case')
})

// Catch uncaught exceptions to prevent tests from failing unnecessarily
// due to 3rd party scripts or minor app errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
