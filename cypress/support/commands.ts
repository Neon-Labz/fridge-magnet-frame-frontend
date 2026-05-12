import { visitHome } from './utils';

Cypress.Commands.add('visitHome', () => {
  visitHome();
});

Cypress.Commands.add('waitForPage', () => {
  cy.get('body').should('be.visible');
});