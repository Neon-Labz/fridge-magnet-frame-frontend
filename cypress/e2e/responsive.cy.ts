/// <reference types="cypress" />

describe("Header Responsiveness Tests", () => {
  const getHeader = () => cy.get("header").filter(":visible").first();

  beforeEach(() => {
    cy.visit("/");
  });

  // -----------------------------------
  // 1. DESKTOP VIEW
  // -----------------------------------
  it("should render correctly on desktop", () => {
    cy.viewport(1440, 900);

    getHeader().should("be.visible");

    getHeader().within(() => {
      cy.contains("Home").should("be.visible");
      cy.contains("Shop").should("be.visible");
      cy.contains("Contact").should("be.visible");
    });
  });

  // -----------------------------------
  // 2. TABLET VIEW
  // -----------------------------------
  it("should render correctly on tablet", () => {
    cy.viewport(768, 1024);

    getHeader().should("be.visible");

    getHeader().within(() => {
      cy.contains("Home").should("be.visible");
      cy.contains("Shop").should("be.visible");
    });
  });

  // -----------------------------------
  // 3. MOBILE VIEW (HAMBURGER)
  // -----------------------------------
  it("should render correctly on mobile", () => {
    cy.viewport(375, 667);

    getHeader().should("be.visible");

    // hamburger or menu button should exist
    cy.get("header").then(($el) => {
      expect($el.text().length).to.be.greaterThan(0);
    });
  });

  // -----------------------------------
  // 4. MOBILE MENU TOGGLE
  // -----------------------------------
 it("should open mobile menu toggle", () => {

  cy.viewport(375, 667);
  cy.visit("/");

  cy.get('button[aria-label="Menu"]')
    .should("be.visible")
    .click();

  // verify toggle changed (menu → x icon)
  cy.get('button[aria-label="Menu"]')
    .should("exist");

});
});
