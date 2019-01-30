/**
 * this is a duplication of generics.ts in aws_client
 * in the future, this file must be extracted as a library that can be used by other projects
 */
import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;
import Chainable = Cypress.Chainable;

export function expectToast(status: string, title: string, message?: string, options?: Partial<Loggable & Timeoutable>) {
  const toastCss = `div#toast-container > div:first-child`;
  cy.get(toastCss, options).within(toast => {
    cy.wrap(toast).should('have.class', `toast-${status}`);
    cy.wrap(toast).find('div.toast-title').should('have.text', title);
    if (message) {
      cy.wrap(toast).find('div.toast-message div').should('have.text', message);
    }
  });
  // remove that toast straight away so that it doesn't accidentally make a subsequent check pass
  cy.document().then(document => document.querySelector(toastCss).remove());
}

export function expectToastInfo(title: string, message?: string, options?: Partial<Loggable & Timeoutable>) {
  return expectToast('info', title, message, options);
}

export function clickOnMDBCheckbox(chainable: Chainable) {
  // because Bootstrap use before and after pseudo-element to adjust label size that has initially 0*0 px
  // here we force the click because the element 'input' is being covered by another element 'label'
  // https://docs.cypress.io/guides/references/error-messages.html#cy-failed-because-the-element-cannot-be-interacted-with
  chainable.click({force: true});
}
