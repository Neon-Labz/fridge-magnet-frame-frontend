/// <reference types="cypress" />

describe("Header and Navigation", () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
    { label: "Price", href: "/price" },
  ];

  const getHeader = () => cy.get("header.fixed");

  const assertSingleHeader = () => {
    getHeader().should("have.length", 1);
  };

  const getNavLink = (label: string) =>
    getHeader().contains("a", label).first();

  const getLogo = () => getHeader().find('a[href="/"]').first();

  const getLoginButton = () => getHeader().contains("Login").closest("button");

  beforeEach(() => {
    cy.visit("/");
    cy.get("header.fixed", { timeout: 10000 }).should("be.visible");
  });

  // ---------------------------
  // 1. CRITICAL STRUCTURE CHECK
  // ---------------------------
  it("should render only ONE header (detects duplicate DOM bug)", () => {
    assertSingleHeader();
  });

  // ---------------------------
  // 2. HEADER CORE ELEMENTS
  // ---------------------------
  it("should render all required header elements", () => {
    assertSingleHeader();

    getLogo().should("be.visible");

    navLinks.forEach(({ label, href }) => {
      getNavLink(label).should("be.visible").and("have.attr", "href", href);
    });

    getHeader().contains("🛒").should("be.visible");
    getLoginButton().should("be.visible");
  });

  // ---------------------------
  // 3. NAVIGATION FLOW (STABLE)
  // ---------------------------
it("should navigate correctly using header links", () => {

  navLinks.forEach(({ label, href }) => {

    cy.visit("/");

    cy.contains("a", label)
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 15000 })
      .should("eq", href);

  });
  });

  // ---------------------------
  // 4. LOGO NAVIGATION
  // ---------------------------
  it("should navigate to home when logo is clicked", () => {
    cy.visit("/shop");

    getLogo().should("be.visible").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
  });

  // ---------------------------
  // 5. ACTIVE STATE CHECK
  // ---------------------------
  it("should highlight active navigation correctly", () => {
    navLinks.forEach(({ label, href }) => {
      cy.visit(href);

      getNavLink(label).should("have.class", "font-semibold");
    });
  });

  // ---------------------------
  // 6. RESPONSIVE CHECK
  // ---------------------------
  it("should render correctly on all devices", () => {
    cy.viewport(1440, 900);
    assertSingleHeader();

    cy.viewport("iphone-x");
    assertSingleHeader();

    navLinks.forEach(({ label }) => {
      getNavLink(label).should("be.visible");
    });
  });

  // ---------------------------
  // 7. STICKY HEADER CHECK
  // ---------------------------
  it("should remain fixed while scrolling", () => {
    cy.scrollTo("bottom");

    getHeader().should("have.css", "position", "fixed").and("be.visible");
  });

  // ---------------------------
  // 8. CART ICON CHECK (UI ONLY)
  // ---------------------------
  it("should render cart icon as UI element", () => {
    getHeader()
      .contains("🛒")
      .should("be.visible")
      .and("have.css", "cursor", "pointer");
  });

  // ---------------------------
  // 9. ACCESSIBILITY BASIC CHECK
  // ---------------------------
  it("should have proper navigation structure", () => {
    getHeader().within(() => {
      cy.get("a").should("have.length.at.least", 4);
      cy.contains("Login").should("be.visible");
    });
  });
});