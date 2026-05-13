describe("Products Image Upload", () => {
  beforeEach(() => {
    cy.visit("/dashboard/products");
    cy.contains("Add Product").click();
  });

  it("should upload primary image", () => {
    cy.get('input[type="file"]')
      .first()
      .selectFile("cypress/fixtures/test-image.png", {
        force: true,
      });

    cy.get('input[type="file"]')
      .first()
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;

        expect(input.files?.length).to.equal(1);
      });
  });

  it("should upload gallery images", () => {
    cy.get('input[type="file"]')
      .last()
      .selectFile(
        ["cypress/fixtures/test-image.png", "cypress/fixtures/test-image.png"],
        { force: true },
      );

    cy.get('input[type="file"]')
      .last()
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;

        expect(input.files?.length).to.equal(2);
      });
  });
});
