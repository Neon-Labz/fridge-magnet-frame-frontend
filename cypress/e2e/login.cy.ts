describe("Dashboard Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/login", {
      failOnStatusCode: false,
    });
  });

  it("renders login form", () => {
    cy.contains("Welcome back").should("be.visible");
    cy.get('input[placeholder="Email"]').should("exist");
    cy.get('input[placeholder="Password"]').should("exist");
  });

  it("validates empty form", () => {
    cy.get('button[type="submit"]').click();

    // wait small UI update time (React state update)
    cy.wait(500);

    cy.contains("Invalid email address", { timeout: 5000 }).should("be.visible");
    cy.contains("Password must be at least 6 characters", { timeout: 5000 }).should("be.visible");
  });

  it("fails login with invalid credentials", () => {
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

    cy.contains("Invalid credentials", { timeout: 5000 }).should("be.visible");
  });

  it("stores admin token on success", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "fake-admin-token",
        },
      },
    }).as("loginRequest");

    cy.get('input[placeholder="Email"]').type("admin@test.com");
    cy.get('input[placeholder="Password"]').type("123456");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    // wait for app state update
    cy.wait(500);

    cy.window().then((win) => {
      const token =
        win.localStorage.getItem("adminToken") ||
        win.localStorage.getItem("token");

      expect(token).to.eq("fake-admin-token");
    });
  });
});


describe("Website Login Modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login", {
      failOnStatusCode: false,
    });
  });

  it("renders login modal", () => {
    cy.contains("Welcome back").should("be.visible");
  });

  it("validates empty login", () => {
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.contains("Invalid email address", { timeout: 5000 }).should("be.visible");
    cy.contains("Password must be at least 6 characters", { timeout: 5000 }).should("be.visible");
  });

  it("stores token after successful login", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "fake-web-token",
        },
      },
    }).as("webLoginRequest");

    cy.get('input[placeholder="Email"]').type("user@test.com");
    cy.get('input[placeholder="Password"]').type("123456");
    cy.get('button[type="submit"]').click();

    cy.wait("@webLoginRequest");

    cy.wait(500);

    cy.window().then((win) => {
      const token =
        win.localStorage.getItem("token") ||
        win.localStorage.getItem("adminToken");

      expect(token).to.eq("fake-web-token");
    });
  });
});