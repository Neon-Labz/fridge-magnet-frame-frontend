describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login", {
      failOnStatusCode: false,
    });
  });

  it("renders login form", () => {
    cy.contains("Welcome back").should("be.visible");
    cy.get('input[placeholder="Email"]').should("exist");
    cy.get('input[placeholder="Password"]').should("exist");
  });

  it("shows error when login fails", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 400,
      body: {
        success: false,
        error: "Invalid credentials",
      },
    }).as("loginError");

    cy.get('input[placeholder="Email"]').type("test@mail.com");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.wait("@loginError");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("stores admin token on success", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "fake-admin-token",
          user: { role: "admin" },
        },
      },
    }).as("loginRequest");

    cy.get('input[placeholder="Email"]').type("admin@test.com");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("adminToken")).to.eq(
        "fake-admin-token"
      );
    });
  });
});