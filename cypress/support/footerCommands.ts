/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getFooter(): Chainable<any>;

      validateSectionTitle(
        title: string
      ): Chainable<any>;

      validateFooterLink(
        text: string
      ): Chainable<any>;

      validateNewsletterInput(): Chainable<any>;

      validateButton(
        selector: string
      ): Chainable<any>;
    }
  }
}

Cypress.Commands.add('getFooter', () => {
  return cy.get('footer')
    .should('exist')
    .and('be.visible');
});

Cypress.Commands.add(
  'validateSectionTitle',
  (title: string) => {

    return cy.contains('h4', title)
      .should('exist')
      .and('be.visible');
  }
);

Cypress.Commands.add(
  'validateFooterLink',
  (text: string) => {

    return cy.contains('li', text)
      .should('exist')
      .and('be.visible');
  }
);

Cypress.Commands.add(
  'validateNewsletterInput',
  () => {

    return cy.get('input[type="email"]')
      .should('exist')
      .and('be.visible')
      .and(
        'have.attr',
        'placeholder',
        'Email address'
      );
  }
);

Cypress.Commands.add(
  'validateButton',
  (selector: string) => {

    return cy.get(selector)
      .should('exist')
      .and('be.visible');
  }
);

export {};