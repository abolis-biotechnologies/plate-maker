/**
 * This file is not part of the released library, it has to be provided by each project integrating
 * this library and wanting to run its Cypress tests to check the integration is working as expected.
 *
 * It is the responsibility of each 'top project' to provide the functions described below.
 *
 * This file can be seen as a delegation of the navigation methods.
 */

/**
 * Navigate to the main Lib tab.
 */
export function goToLib() {
  cy.visit('/');
}
