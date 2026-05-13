describe("Edit / Manage Stock Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");

    // Click ONLY the VIEW (eye icon) button in first row
    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("button svg.lucide-eye").closest("button").click();
      });

    // Wait until stock page/modal is loaded
    cy.contains("Manage Stock Level", { timeout: 20000 }).should("be.visible");
  });

  it("should display product details correctly", () => {
    cy.contains("Manage Stock Level").should("be.visible");

    cy.contains("SKU:").should("be.visible");

    cy.get("h2").should("contain", "Black Walnut Gallery Frame");
  });

  it("should display stock status dropdown", () => {
    // Scroll to dropdown section first
    cy.contains("New Availability Status", { timeout: 10000 })
      .scrollIntoView()
      .should("exist");

    // Validate dropdown button
    cy.contains("button", "In Stock")
      .scrollIntoView()
      .should("exist")
      .and("be.visible");

    // Open dropdown
    cy.contains("button", "In Stock").click({ force: true });

    // Validate dropdown options
    cy.contains("button", "Low Stock").should("exist").and("be.visible");

    cy.contains("button", "Out of Stock").should("exist").and("be.visible");
  });

  it("should allow stock status update flow", () => {
    cy.contains("button", "In Stock").click({ force: true });

    cy.contains("Low Stock", { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    cy.contains("Low Stock").should("exist");
  });

  it("should handle cancel button behavior", () => {
    cy.contains("button", "Cancel").should("be.visible").click();

    cy.contains("Manage Stock Level").should("not.exist");
  });

  it("should handle confirm update button", () => {
    cy.contains("button", "In Stock").click({ force: true });

    cy.contains("Low Stock", { timeout: 10000 }).click({ force: true });

    cy.contains("button", "Confirm Status Update")
      .should("be.visible")
      .click({ force: true });

    cy.contains("Manage Stock Level").should("not.exist");
  });

  it("should display warehouse info correctly", () => {
    cy.contains("Warehouse Location").scrollIntoView().should("be.visible");

    cy.contains("Aisle 14, Bay B").scrollIntoView().should("be.visible");

    cy.contains("Main Distribution Center")
      .scrollIntoView()
      .should("be.visible");
  });

  it("should display last updated section", () => {
    cy.contains("Manage Stock Level", { timeout: 20000 }).should("be.visible");

    cy.contains("Last Updated").scrollIntoView().should("be.visible");

    cy.contains("View Log").scrollIntoView().should("be.visible");
  });

  it("should display View Log button", () => {
    cy.contains("View Log").scrollIntoView().should("be.visible");
  });
});
