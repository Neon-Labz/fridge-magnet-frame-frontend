describe("Order Details (E2E)", () => {
  beforeEach(() => {
    cy.interceptOrder();
    cy.visit("/dashboard/orders/1");
  });

  it("renders order details and updates status", () => {
    cy.wait("@getOrder");

    cy.contains(/Order #MAG-12345/).should("exist");
    cy.contains(/CUST-9921/).should("exist");
    cy.contains(/\$284\.5|\$284\.50/).should("exist");
    cy.contains(/SHIPPING INFORMATION/).should("exist");

    cy.contains(/Processing/i).should("exist");

    cy.intercept("PATCH", "**/api/v1/orders/*/status", {
      statusCode: 200,
      body: {
        ...require("../fixtures/order.json"),
        status: "shipped",
      },
    }).as("updateOrder");

    cy.contains(/SHIPPED/i).click();
    cy.contains(/Update Order Status/i).click();

    cy.wait("@updateOrder");

    cy.contains(/Shipped/i).should("exist");
  });

  it("shows error state", () => {
    cy.interceptOrderError(500, "Server error");

    cy.visit("/dashboard/orders/999", {
      failOnStatusCode: false,
    });

    cy.wait("@getOrderFail");

    cy.contains(/Server error|Order not found/i).should("exist");
  });
});