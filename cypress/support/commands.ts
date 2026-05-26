export {};

declare global {
  namespace Cypress {
    interface Chainable {
      interceptOrder(fixtureName?: string): Chainable<void>;
      interceptOrderError(statusCode?: number, message?: string): Chainable<void>;
      interceptOrderStatusUpdate(body?: any): Chainable<void>;
    }
  }
}

// ------------------ COMMANDS ------------------

Cypress.Commands.add("interceptOrder", (fixtureName = "order") => {
  return cy.fixture(fixtureName).then((order) => {
    cy.intercept("GET", /\/api\/v1\/orders\/.*/, {
      statusCode: 200,
      body: order,
    }).as("getOrder");
  });
});

Cypress.Commands.add(
  "interceptOrderError",
  (statusCode = 500, message = "Server error") => {
    cy.intercept("GET", /\/api\/v1\/orders\/.*/, {
      statusCode,
      body: { message },
    }).as("getOrderFail");
  }
);

Cypress.Commands.add("interceptOrderStatusUpdate", (body = {}) => {
  cy.intercept("PATCH", /\/api\/v1\/orders\/\d+\/status/, {
    statusCode: 200,
    body,
  }).as("updateOrder");
});