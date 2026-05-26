describe("Forgot Password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/forgot-password");
  });

  it("renders form", () => {
    cy.contains("Forgot Password").should("be.visible");
  });

  it("validates email", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid email address").should("be.visible");
  });

  it("success flow", () => {
    cy.intercept("POST", "**/auth/forgot-password", {
      statusCode: 200,
      body: { success: true },
    }).as("forgotRequest");

    cy.get('input[name="email"]').type("test@mail.com");

    cy.get('button[type="submit"]').click();

    cy.wait("@forgotRequest");

    cy.contains("Check Your Email").should("be.visible");

    cy.contains("Back to Login").click();
  });
});