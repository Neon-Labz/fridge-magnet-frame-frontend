Cypress.Commands.add('getVisible', (selector) => {
  return cy.get(selector).should('be.visible');
});

Cypress.Commands.add('typeSafe', (selector, text) => {
  cy.get(selector).should('be.visible').clear().type(text);
});

Cypress.Commands.add('clickSafe', (selector) => {
  cy.get(selector).should('be.visible').click();
});