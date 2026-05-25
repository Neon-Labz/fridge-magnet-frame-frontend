describe("Products Image Upload", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products/create");
    cy.contains("h2", "Add New Product", { timeout: 10000 }).should(
      "be.visible",
    );
  });

  const getAddProductModal = () =>
    cy.contains("h2", "Add New Product").parents(".relative").first();

  it("should upload primary image", () => {
    getAddProductModal()
      .find('input[type="file"]')
      .first()
      .selectFile("cypress/fixtures/test-image.png", { force: true });

    getAddProductModal()
      .find('input[type="file"]')
      .first()
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;

        expect(input.files?.length).to.equal(1);
      });
  });

  it("should upload gallery images", () => {
    getAddProductModal()
      .find('input[type="file"]')
      .should("have.length", 2)
      .last()
      .selectFile(
        ["cypress/fixtures/test-image.png", "cypress/fixtures/test-image.png"],
        { force: true },
      );

    getAddProductModal()
      .find('input[type="file"]')
      .last()
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;

        expect(input.files?.length).to.equal(2);
      });
  });
});
