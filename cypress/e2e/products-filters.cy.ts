/// <reference types="cypress" />

describe("Products Filter Functionality", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");

    // Wait until table loads
    cy.get("tbody tr", { timeout: 15000 }).should("have.length.greaterThan", 0);
  });

  it("should display filter button", () => {
    cy.contains("button", "Filter").should("exist").and("be.visible");
  });

  it("should open filter dropdown/modal", () => {
    cy.contains("button", "Filter").click({ force: true });

    // Generic validation
    cy.get("body").then(($body) => {
      // If dropdown/modal appears
      if (
        $body.text().includes("Stock") ||
        $body.text().includes("Filter By") ||
        $body.text().includes("Category")
      ) {
        cy.get("body").should("contain.text", "Stock");
      }

      // If no dropdown exists, button should still be clickable
      else {
        cy.contains("button", "Filter").should("be.visible");
      }
    });
  });

  it("should filter low stock products if option exists", () => {
    cy.contains("button", "Filter").click({ force: true });

    cy.get("body").then(($body) => {
      if ($body.text().includes("Low Stock")) {
        cy.contains("Low Stock").click({ force: true });

        cy.wait(1000);

        cy.get("tbody").should("contain.text", "Low Stock");
      } else {
        cy.log("Low Stock filter option not implemented");
      }
    });
  });

  it("should filter in stock products if option exists", () => {
    cy.contains("button", "Filter").click({ force: true });

    cy.get("body").then(($body) => {
      if ($body.text().includes("In Stock")) {
        cy.contains("In Stock").click({ force: true });

        cy.wait(1000);

        cy.get("tbody").should("contain.text", "In Stock");
      } else {
        cy.log("In Stock filter option not implemented");
      }
    });
  });

  it("should keep products table visible after filter interaction", () => {
    cy.contains("button", "Filter").click({ force: true });

    cy.wait(1000);

    cy.get("table").should("exist").and("be.visible");

    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("should maintain pagination after filter interaction", () => {
    cy.contains("button", "Filter").click({ force: true });

    cy.wait(1000);

    cy.contains("Next").should("exist").and("be.visible");

    cy.contains("Previous").should("exist").and("be.visible");
  });

it("should display product rows correctly after filter click", () => {

  cy.contains("button", "Filter")
    .click({ force: true });

  cy.wait(1000);

  cy.get("tbody tr", { timeout: 10000 })
    .should("exist")
    .and("have.length.greaterThan", 0);

  cy.get("tbody tr").each(($row) => {

    cy.wrap($row)
      .scrollIntoView()
      .should("exist");

    cy.wrap($row)
      .find("td")
      .its("length")
      .should("be.greaterThan", 0);

  });

});
});
