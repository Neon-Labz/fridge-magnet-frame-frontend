/// <reference types="cypress" />

describe("Header Navigation - Functional Tests", () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
    { label: "Price", href: "/price" },
  ];

  const getHeader = () => cy.get("header");

  beforeEach(() => {
    cy.visit("/");
    cy.get("header").should("be.visible");
  });

  // -----------------------------------
  // 1. NAVIGATION FUNCTIONAL TEST
  // -----------------------------------
  it("should navigate correctly using header links", () => {
    navLinks.forEach(({ label, href }) => {
      cy.visit("/");

      getHeader().contains("a", label).should("be.visible").click();

      cy.url().should("include", href);
    });
  });

  // -----------------------------------
  // 2. LOGO NAVIGATION
  // -----------------------------------
  it("should navigate to home when logo is clicked", () => {
    cy.visit("/shop");

    getHeader().find('a[href="/"]').first().click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  // -----------------------------------
  // 3. CART FUNCTIONAL TEST
  // -----------------------------------
  it("should render cart icon", () => {
    getHeader().contains("🛒").should("be.visible");
  });

  // -----------------------------------
  // 4. LOGIN BUTTON NAVIGATION
  // -----------------------------------
  it("should navigate to login page", () => {
    getHeader().contains(/login/i).click();

    cy.url().should("include", "/login");
  });
  // -----------------------------
  // 5. LOGOUT FUNCTIONALITY
  // -----------------------------
  it("should logout and show Login again", () => {
    cy.visit("/");

    cy.get("header").then(($header) => {
      if ($header.text().includes("Logout")) {
        cy.contains("Logout").click();
      }
    });

    cy.get("header").contains("Login").should("be.visible");
  });

  // -----------------------------
  // 6. ACTIVE ROUTE CHECK
  // -----------------------------
  it("should highlight active navigation link", () => {
    navLinks.forEach(({ href, label }) => {
      cy.visit(href);

      cy.get("header")
        .contains("a", label)
        .should("have.class", "font-semibold");
    });
  });

  // -----------------------------
  // 7. HEADER ALWAYS VISIBLE
  // -----------------------------
  it("should keep header fixed on scroll", () => {
    cy.scrollTo("bottom");

    cy.get("header").should("be.visible").and("have.css", "position", "fixed");
  });

  // -----------------------------------
  // 8. CART ICON NAVIGATION
  // -----------------------------------
 it("should navigate to cart page when cart icon is clicked", () => {

  getHeader().contains("🛒").click();
  cy.wait(4000); // Wait for navigation to complete
  cy.url().should("include", "/cart");

});
});
