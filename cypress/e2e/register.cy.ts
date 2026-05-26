describe("Register Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("renders register form", () => {
    cy.contains("Create Account").should("be.visible");

    cy.get('input[name="fullName"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    cy.contains("Sign up with Google").should("be.visible");
  });


  it("registers successfully", () => {
    cy.intercept("POST", "**/auth/register", {
      statusCode: 200,
      body: {
        success: true,
        data: { id: 1 },
      },
    }).as("registerRequest");

    cy.get('input[name="fullName"]').type("Test User");
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.wait("@registerRequest");

    cy.contains("Registration successful").should("be.visible");
  });

  it("switches to login modal", () => {
    cy.contains("Sign in").click();
  });
});
describe("Register Form - Empty Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("shows validation errors for empty form submission", () => {
    cy.contains("Create Account").should("be.visible");

    cy.get('button[type="submit"]').click();

    // Full Name validation (Zod default message)
    cy.contains("Too small: expected string to have >=2 characters")
      .should("be.visible");

    // Email validation (Zod default message)
    cy.contains("Invalid email")
      .should("be.visible");

    // Password validation (Zod default message)
    cy.contains("Too small: expected string to have >=6 characters")
      .should("be.visible");
  });
});