describe("Products List Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");
  });

  it("should display Add Product button", () => {
    cy.contains("Add Product").should("be.visible");
  });

  it("should display product table", () => {
    cy.get("table").should("exist");
    cy.get("tbody tr")
      .should("have.length.greaterThan", 0);
  });

  it("should display action buttons in rows", () => {
    cy.get("tbody tr")
      .first()
      .find("button")
      .should("have.length.greaterThan", 0);
  });

  it("should open Add Product modal", () => {
    cy.contains("Add Product").click();

    cy.contains("Add New Product")
      .should("be.visible");
  });
});