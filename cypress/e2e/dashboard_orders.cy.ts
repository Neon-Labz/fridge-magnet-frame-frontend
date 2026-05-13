describe("Dashboard Orders Page", () => {
  const mockOrders = [
    {
      id: 1,
      orderId: "ORD-001",
      customerName: "John Doe",
      customerInitials: "JD",
      customerId: "CUST-001",
      qty: 2,
      status: "pending",
    },
    {
      id: 2,
      orderId: "ORD-002",
      customerName: "Alice Smith",
      customerInitials: "AS",
      customerId: "CUST-002",
      qty: 5,
      status: "shipped",
    },
  ];

  beforeEach(() => {
    cy.intercept("GET", "/api/v1/orders", {
      statusCode: 200,
      body: mockOrders,
    }).as("getOrders");

    cy.visit("/dashboard/orders");
  });

  it("should load and display orders", () => {
    cy.wait("@getOrders");

    cy.get("table").should("exist");
    cy.contains("ORD-001").should("be.visible");
    cy.contains("John Doe").should("be.visible");
  });

  it("should show loading state initially", () => {
    cy.contains("Loading orders...").should("exist");
  });

  it("should filter orders by status", () => {
    cy.wait("@getOrders");

    cy.contains("Filter").click();
    cy.contains("Shipped").click();

    cy.get("tbody tr").should("have.length", 1);
    cy.contains("ORD-002").should("exist");
  });

  it("should sort orders by customer name", () => {
    cy.wait("@getOrders");

    cy.contains("Sort").click();
    cy.contains("Customer (A → Z)").click();

    cy.get("tbody tr").first().should("contain", "Alice Smith");
  });

  it("should open delete modal and cancel", () => {
    cy.wait("@getOrders");

    cy.get('button[aria-label="Delete order"]').first().click();

    cy.contains("Delete Order").should("be.visible");
    cy.contains("Cancel").click();

    cy.contains("Delete Order").should("not.exist");
  });

  it("should confirm delete and remove order", () => {
    cy.intercept("DELETE", /\/api\/v1\/orders\/\d+/, {
      statusCode: 200,
    }).as("deleteOrder");

    cy.wait("@getOrders");

    cy.get('button[aria-label="Delete order"]').first().click();

    cy.contains("Delete Order").should("be.visible");

    // ✅ IMPORTANT FIX
    cy.get("button").contains("Delete Order").last().click();

    cy.wait("@deleteOrder");

    cy.contains("ORD-001").should("not.exist");
  });

  it("should navigate to order status page", () => {
    cy.wait("@getOrders");

    cy.contains("ORD-001").parents("tr").find("a").first().click();
    cy.wait(4000)

    cy.url().should("include", "/dashboard/orders/1");
  });

  it("should paginate orders", () => {
    const manyOrders = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      orderId: `ORD-${i + 1}`,
      customerName: `User ${i + 1}`,
      customerInitials: "U",
      customerId: `CUST-${i + 1}`,
      qty: 1,
      status: "pending",
    }));

    cy.intercept("GET", "/api/v1/orders", {
      statusCode: 200,
      body: manyOrders,
    }).as("getManyOrders");

    cy.visit("/dashboard/orders");
    cy.wait("@getManyOrders");

    cy.contains("2").click(); // page 2

    cy.get("tbody tr").should("exist");
  });
});
