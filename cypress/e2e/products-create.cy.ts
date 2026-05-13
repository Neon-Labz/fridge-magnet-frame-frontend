describe("Create Product Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");

    cy.contains("Add Product").should("be.visible").click({ force: true });

    // instead of strict modal text check
    cy.get("body", { timeout: 10000 }).should("contain", "Add New Product");
  });

  it("should display all form fields correctly", () => {
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="productId"]').should("be.visible");
    cy.get('select[name="category"]').should("be.visible");
    cy.get('input[name="stock"]').should("be.visible");
    cy.get('input[name="price"]').should("be.visible");

    cy.get('textarea[name="description"]').scrollIntoView().should("exist");
  });

  it("should validate stock input", () => {
    cy.get('input[name="stock"]').clear({ force: true }).type("50");

    cy.get('input[name="stock"]').should(($el) => {
      expect(Number($el.val())).to.eq(50);
    });
  });

  it("should validate price input", () => {
    cy.get('input[name="price"]').clear({ force: true }).type("99.99");

    cy.get('input[name="price"]').should(($el) => {
      expect(Number($el.val())).to.eq(99.99);
    });
  });

  it("should allow description input", () => {
    cy.get('textarea[name="description"]')
      .scrollIntoView()
      .clear({ force: true })
      .type("Test Description");

    cy.get('textarea[name="description"]').should(
      "have.value",
      "Test Description",
    );
  });

  it("should submit product form", () => {
    cy.get('input[name="name"]').clear().type("New Product");
    cy.get('input[name="productId"]').clear().type("SKU-999");

    cy.get('input[name="stock"]')
      .clear({ force: true })
      .type("10", { delay: 0 });

    cy.get('input[name="price"]')
      .clear({ force: true })
      .type("49.99", { delay: 0 });

    cy.get('textarea[name="description"]')
      .clear({ force: true })
      .type("Description");

    cy.contains("Submit Product").scrollIntoView().click({ force: true });

    cy.get("body").should("not.contain", "Add New Product");
  });

  it("should prevent empty form submission", () => {
    cy.contains("Submit Product").scrollIntoView().click({ force: true });

    cy.get("body").should("contain", "Add New Product");
  });
});
