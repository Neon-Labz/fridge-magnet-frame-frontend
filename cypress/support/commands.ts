/// <reference types="cypress" />
// ***********************************************
// Custom Cypress commands for order details tests.
// ***********************************************

Cypress.Commands.add('interceptOrder', (fixtureName = 'order') => {
  return cy.fixture(fixtureName).then((order) => {
    return cy.intercept('GET', /\/api\/v1\/orders\/.*/, { statusCode: 200, body: order }).as('getOrder');
  });
});

Cypress.Commands.add('interceptOrderError', (statusCode = 500, message = 'Server error') => {
  return cy.intercept('GET', /\/api\/v1\/orders\/.*/, {
    statusCode,
    body: { message },
  }).as('getOrderFail');
});

Cypress.Commands.add('interceptOrderStatusUpdate', (body) => {
  return cy.intercept('PATCH', /\/api\/v1\/orders\/\d+\/status/, {
    statusCode: 200,
    body,
  }).as('updateOrder');
});
