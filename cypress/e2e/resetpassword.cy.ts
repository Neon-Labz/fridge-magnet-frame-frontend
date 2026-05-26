describe("Reset Password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/reset-password");
  });

  it("renders form", () => {
    cy.contains("Reset Password").should("be.visible");
  });

  it("password mismatch validation", () => {
    cy.get('input[placeholder="New Password"]').type("12345678");
    cy.get('input[placeholder="Confirm Password"]').type("wrongpass");

    cy.get('button[type="submit"]').click();

    cy.contains("Passwords don't match").should("be.visible");
  });

  it("short password validation", () => {
    cy.get('input[placeholder="New Password"]').type("short");
    cy.get('input[placeholder="Confirm Password"]').type("short");

    cy.get('button[type="submit"]').click();

    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("successful reset", () => {
    cy.intercept("POST", "**/auth/reset-password", {
      statusCode: 200,
      body: { success: true },
    }).as("resetRequest");

    cy.get('input[placeholder="New Password"]').type("12345678");
    cy.get('input[placeholder="Confirm Password"]').type("12345678");

    cy.get('button[type="submit"]').click();

    cy.wait("@resetRequest");

    cy.contains("Password Updated").should("be.visible");

    cy.contains("Back to Login").click();
  });
});