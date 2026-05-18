describe("Order Details (E2E)", () => {
  beforeEach(() => {
    cy.interceptOrder();
  });

  it("renders order details and updates status", () => {
    cy.visit("/dashboard/orders/1");

    cy.wait("@getOrder");

    cy.contains(/Order #MAG-12345/).should("exist");
    cy.contains(/CUST-9921/).should("exist");
    cy.contains(/\$284\.5|\$284\.50/).should("exist");
    cy.contains(/SHIPPING INFORMATION/).should("exist");

    cy.contains(/Status:/).should("exist");
    cy.contains(/Processing/i).should("exist");

    cy.fixture("order").then((order) => {
      const updatedOrder = {
        ...order,
        status: "shipped",
      };

      // ✅ correct intercept
      cy.intercept(
        "PATCH",
        "**/api/v1/orders/*/status",
        {
          statusCode: 200,
          body: updatedOrder,
        }
      ).as("updateOrder");
    });

    cy.contains(/SHIPPED/i).click();

    cy.contains(/Update Order Status/i).click();

    cy.wait("@updateOrder");

    cy.contains(/Shipped/i).should("exist");
  });

  it("shows error state", () => {
    cy.intercept(
      "GET",
      "**/api/v1/orders/999",
      {
        statusCode: 500,
        body: {
          message: "Server error",
        },
      }
    ).as("getOrderFail");

    cy.visit("/dashboard/orders/999", {
      failOnStatusCode: false,
    });

    cy.wait("@getOrderFail");

    cy.contains(/Server error|Order not found/i).should("exist");
  });
});