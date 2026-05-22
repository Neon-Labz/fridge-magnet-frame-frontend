Cypress.Commands.add('getVisible', (selector: string) => {
  return cy.get(selector).should('be.visible');
});

Cypress.Commands.add('typeSafe', (selector: string, text: string) => {
  cy.get(selector).should('be.visible').clear().type(text);
});

Cypress.Commands.add('clickSafe', (selector: string) => {
  cy.get(selector).should('be.visible').click();
});