describe("Delete Product", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");
  });

  it("should display delete action button", () => {
    cy.get("tbody tr")
      .first()
      .find("button")
      .should("have.length.greaterThan", 0);
  });

  it("should open delete confirmation modal", () => {
    cy.get("tbody tr")
      .first()
      .find("button")
      .last()
      .click({ force: true });

    cy.contains(/delete|confirm/i)
      .should("exist");
  });
});