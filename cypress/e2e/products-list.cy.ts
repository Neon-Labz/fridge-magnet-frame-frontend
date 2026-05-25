describe("Products List Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");
  });

  it("should display Add Product button", () => {
    cy.contains("button", "Add Product").should("be.visible");
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
    cy.contains("button", "Add Product")
      .should("be.visible")
      .and("not.be.disabled");

    cy.wait(500);

    cy.contains("button", "Add Product").click({ force: true });

    cy.contains("h2", "Add New Product", { timeout: 10000 }).should(
      "be.visible",
    );
  });
});
