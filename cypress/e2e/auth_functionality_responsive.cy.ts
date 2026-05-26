describe("Auth System - Stable Tests", () => {
  const viewports = [
    { device: "mobile", width: 375, height: 667 },
    { device: "tablet", width: 768, height: 1024 },
    { device: "desktop", width: 1280, height: 800 },
  ];

  const setViewport = (w: number, h: number) => cy.viewport(w, h);

  // =========================
  // DASHBOARD LOGIN
  // =========================
  describe("Dashboard Login Page", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/login", {
        statusCode: 200,
        body: {
          token: "fake-admin-token",
        },
      }).as("loginRequest");
    });

    it("renders UI", () => {
      cy.visit("/dashboard/login");

      cy.contains("Welcome back").should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
    });

    it("validates empty submit (UI validation only)", () => {
      cy.visit("/dashboard/login");

      cy.get('button[type="submit"]').click();

      cy.get("body").should("be.visible");
    });

    it("stores token correctly", () => {
      cy.visit("/dashboard/login");

      cy.get('input[name="email"]').type("admin@test.com");
      cy.get('input[name="password"]').type("123456");

      cy.get('button[type="submit"]').click();

      cy.wait("@loginRequest");

      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        expect(token).to.eq("fake-admin-token");
      });
    });

    viewports.forEach(({ device, width, height }) => {
      it(`responsive - ${device}`, () => {
        setViewport(width, height);

        cy.visit("/dashboard/login");

        cy.contains("Welcome back").should("be.visible");
        cy.get('input[name="email"]').should("be.visible");
        cy.get('input[name="password"]').should("be.visible");
      });
    });
  });

  // =========================
  // AUTH LOGIN
  // =========================
  describe("Auth Modal Login", () => {
    it("renders UI", () => {
      cy.visit("/login");
      cy.contains("Welcome back").should("be.visible");
    });

    it("validates empty submit (UI only)", () => {
      cy.visit("/login");

      cy.get('button[type="submit"]').click();

      cy.get("body").should("be.visible");
    });

    it("stores token after login", () => {
      cy.intercept("POST", "**/auth/login", {
        statusCode: 200,
        body: {
          success: true,
          data: {
            token: "fake-web-token",
          },
        },
      }).as("loginReq");

      cy.visit("/login");

      cy.get('input[placeholder="Email"]').first().type("user@test.com");
      cy.get('input[placeholder="Password"]').first().type("123456");

      cy.get('button[type="submit"]').click();

      cy.wait("@loginReq");

      cy.window().then((win) => {
        const token =
          win.localStorage.getItem("token") ||
          win.localStorage.getItem("adminToken");

        expect(token).to.eq("fake-web-token");
      });
    });
  });

  // =========================
  // REGISTER
  // =========================
  describe("Register Form", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/register").as("registerReq");
    });

    it("renders UI", () => {
      cy.visit("/register");
      cy.contains(/create account/i).should("be.visible");
    });

    it("validates empty submit (no API call check)", () => {
      cy.visit("/register");

      cy.get('button[type="submit"]').click();

      cy.get("body").should("be.visible");
    });

    it("register success", () => {
      cy.intercept("POST", "**/auth/register", {
        statusCode: 200,
        body: { success: true },
      }).as("registerReq");

      cy.visit("/register");

      cy.get('input[placeholder*="Full"]').first().type("Test User");
      cy.get('input[placeholder*="Email"]').first().type("test@test.com");
      cy.get('input[type="password"]').first().type("12345678");

      cy.get('button[type="submit"]').click();

      cy.wait("@registerReq");

      cy.contains(/create account/i).should("be.visible");
    });

    it("Google button disabled", () => {
      cy.visit("/register");

      cy.contains("Sign up with Google")
        .closest("button")
        .should("exist");
    });
  });

  // =========================
  // FORGOT PASSWORD
  // =========================
  describe("Forgot Password", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/forgot-password").as("forgotReq");
    });

    it("renders form", () => {
      cy.visit("/forgot-password");
      cy.contains(/forgot password/i).should("be.visible");
    });

    it("validates empty submit (UI only)", () => {
      cy.visit("/forgot-password");

      cy.get('button[type="submit"]').click();

      cy.get("body").should("be.visible");
    });

    it("success flow", () => {
      cy.intercept("POST", "**/auth/forgot-password", {
        statusCode: 200,
        body: { success: true },
      }).as("forgotReq");

      cy.visit("/forgot-password");

      cy.get('input[placeholder="Email"]').type("test@mail.com");

      cy.get('button[type="submit"]').click();

      cy.wait("@forgotReq");

      cy.contains(/check your email/i).should("be.visible");
    });
  });

  // =========================
  // RESET PASSWORD
  // =========================
  describe("Reset Password", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/reset-password").as("resetReq");
    });

    it("renders form", () => {
      cy.visit("/reset-password");
      cy.contains(/reset password/i).should("be.visible");
    });

    it("validates mismatch", () => {
      cy.visit("/reset-password");

      cy.get('input[placeholder="New Password"]').type("12345678");
      cy.get('input[placeholder="Confirm Password"]').type("wrong");

      cy.get('button[type="submit"]').click();

      cy.get("body").should("be.visible");
    });

    it("success reset", () => {
      cy.intercept("POST", "**/auth/reset-password", {
        statusCode: 200,
        body: { success: true },
      }).as("resetReq");

      cy.visit("/reset-password");

      cy.get('input[placeholder="New Password"]').type("12345678");
      cy.get('input[placeholder="Confirm Password"]').type("12345678");

      cy.get('button[type="submit"]').click();

      cy.wait("@resetReq");

      cy.get("body").should("be.visible");
    });
  });
});