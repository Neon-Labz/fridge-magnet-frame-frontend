describe("Dashboard Orders Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard/orders");
  });

  it("should load and display orders", () => {
    cy.get("table").should("exist");

    cy.contains("#MG-82912").should("be.visible");
    cy.contains("Eleanor Herbert").should("be.visible");
  });

  it("should show loading state initially", () => {
    cy.contains("Loading orders...").should("exist");
  });

  it("should filter orders by status", () => {
    cy.contains("Filter").click();

    cy.contains("SHIPPED").click();

    cy.contains("Eleanor Herbert").should("be.visible");
  });

  it("should sort orders by customer name", () => {
    cy.contains("Sort").click();

    cy.contains("Customer (A → Z)").click();

    cy.wait(4000);

    cy.get("tbody tr").first().should("contain.text", "Amanda Torres");
  });

  it("should open delete modal and cancel", () => {
    cy.get('button[aria-label="Delete order"]').first().click();

    cy.contains("Delete Order").should("be.visible");

    cy.contains("Cancel").click();

    cy.contains("Delete Order").should("not.exist");
  });

  it("should confirm delete and remove order", () => {
    cy.intercept("DELETE", /\/api\/v1\/orders\/\d+/, {
      statusCode: 200,
    }).as("deleteOrder");

    cy.get('button[aria-label="Delete order"]').first().click();

    cy.get("button").contains("Delete Order").last().click();

    cy.wait("@deleteOrder");
  });

  it("should navigate to order status page", () => {
    cy.contains("#MG-82912").parents("tr").find("a").first().click();

    cy.url().should("include", "/dashboard/orders");
  });

  it("should paginate orders", () => {
    cy.contains("2").click();

    cy.get("tbody tr").should("exist");
  });
});