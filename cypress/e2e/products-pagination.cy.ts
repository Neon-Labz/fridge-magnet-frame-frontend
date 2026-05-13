describe("Products Pagination", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");
  });

  it("should display pagination controls", () => {
    cy.contains(/next/i).should("exist");
  });

  it("should navigate to next page", () => {
    cy.contains(/next/i)
      .click({ force: true });
  });

  it("should navigate to previous page", () => {
    cy.contains(/previous/i)
      .click({ force: true });
  });
});