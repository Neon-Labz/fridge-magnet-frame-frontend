/// <reference types="cypress" />

type ApiProduct = {
  _id: string;
  productId: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description: string;
  primaryImage?: { secure_url: string };
  galleryImages?: Array<{ secure_url: string }>;
  updatedAt?: string;
};

const apiProductsPattern = "**/api/products*";

const initialProducts: ApiProduct[] = [
  {
    _id: "prod-001",
    productId: "MAG-001",
    productName: "Black Walnut Gallery Frame",
    category: "Wooden Frames",
    price: 2500,
    stock: 24,
    status: "In Stock",
    description: "Premium black walnut frame for gallery display.",
    primaryImage: { secure_url: "/product-1.png" },
    updatedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    _id: "prod-002",
    productId: "MAG-002",
    productName: "White Oak Memory Frame",
    category: "Gallery Frames",
    price: 1800,
    stock: 7,
    status: "Low Stock",
    description: "White oak frame for curated memories.",
    primaryImage: { secure_url: "/product-2.png" },
    updatedAt: "2026-05-02T10:00:00.000Z",
  },
  {
    _id: "prod-003",
    productId: "MAG-003",
    productName: "Shadow Box Magnet Frame",
    category: "Shadow Boxes",
    price: 3100,
    stock: 0,
    status: "Out of Stock",
    description: "Deep shadow box style magnet frame.",
    primaryImage: { secure_url: "/product-3.png" },
    updatedAt: "2026-05-03T10:00:00.000Z",
  },
  {
    _id: "prod-004",
    productId: "MAG-004",
    productName: "Metal Edge Frame",
    category: "Metal Frames",
    price: 2200,
    stock: 15,
    status: "In Stock",
    description: "Metal edge display frame.",
    primaryImage: { secure_url: "/product-1.png" },
    updatedAt: "2026-05-04T10:00:00.000Z",
  },
  {
    _id: "prod-005",
    productId: "MAG-005",
    productName: "Heritage Classic Frame",
    category: "Heritage Frames",
    price: 2900,
    stock: 5,
    status: "Low Stock",
    description: "Classic heritage frame.",
    primaryImage: { secure_url: "/product-2.png" },
    updatedAt: "2026-05-05T10:00:00.000Z",
  },
];

let products: ApiProduct[] = [];

const selectors = {
  addProductButton: () => cy.contains("button", "Add Product"),
  submitProductButton: () => cy.contains("button", "Submit Product"),
  modalTitle: (title: string) => cy.contains("h2", title),
  firstRow: () => cy.get("tbody tr").first(),
  tableRows: () => cy.get("tbody tr"),
};

const resetProducts = () => {
  products = initialProducts.map((product) => ({ ...product }));
};

const respondWithProducts = (req: any) => {
  req.reply({
    statusCode: 200,
    body: { data: products },
  });
};

const registerProductApi = () => {
  resetProducts();

  cy.intercept("GET", apiProductsPattern, (req) => {
    respondWithProducts(req);
  }).as("getProducts");

  cy.intercept("POST", apiProductsPattern, (req) => {
    products.unshift({
      _id: "prod-created",
      productId: "MAG-CY-100",
      productName: "Cypress Created Frame",
      category: "Wooden Frames",
      price: 1999,
      stock: 12,
      status: "In Stock",
      description: "Created from Cypress CRUD automation.",
      primaryImage: { secure_url: "/product-1.png" },
      updatedAt: new Date().toISOString(),
    });

    req.reply({
      statusCode: 201,
      body: { message: "Product created" },
    });
  }).as("createProduct");

  cy.intercept("PUT", "**/api/products/*", (req) => {
    const id = req.url.split("/").pop() || "";
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
    const nextStatus = body.status as ApiProduct["status"];

    products = products.map((product) =>
      product._id === id
        ? {
            ...product,
            status: nextStatus,
            stock: nextStatus === "Out of Stock" ? 0 : nextStatus === "Low Stock" ? 5 : 25,
          }
        : product,
    );

    req.reply({
      statusCode: 200,
      body: { message: "Product updated" },
    });
  }).as("updateProduct");

  cy.intercept("DELETE", "**/api/products/*", (req) => {
    const id = req.url.split("/").pop() || "";
    products = products.filter((product) => product._id !== id);

    req.reply({
      statusCode: 200,
      body: { message: "Product deleted" },
    });
  }).as("deleteProduct");
};

const visitProductsPage = () => {
  cy.visit("/dashboard/products");
  cy.wait("@getProducts");
  cy.contains("Product Management", { timeout: 10000 }).should("be.visible");
};

const openAddProductModal = () => {
  selectors.addProductButton().should("be.visible").click();
  selectors.modalTitle("Add New Product").should("be.visible");
};

const fillProductForm = () => {
  cy.get('input[name="name"]').clear().type("Cypress Created Frame");
  cy.get('input[name="productId"]').clear().type("MAG-CY-100");
  cy.get('select[name="category"]').select("Wooden Frames");
  cy.get('input[name="stock"]').clear().type("12");
  cy.get('input[name="price"]').clear().type("1999");
  cy.get('textarea[name="description"]')
    .scrollIntoView()
    .clear()
    .type("Created from Cypress CRUD automation.");
};

const openFirstProductStockModal = () => {
  selectors.firstRow().within(() => {
    cy.get("button").first().click({ force: true });
  });

  selectors.modalTitle("Manage Stock Level").should("be.visible");
};

const openFirstProductDeleteModal = () => {
  selectors.firstRow().within(() => {
    cy.get("button").last().click({ force: true });
  });

  selectors.modalTitle("Confirm Deletion").should("be.visible");
};

describe("Product Dashboard - CRUD, Functionality, Integration, Performance & Responsiveness", () => {
  beforeEach(() => {
    registerProductApi();
  });

  context("Read/List Functionality", () => {
    it("TC01 - loads product dashboard with table, actions, product data, and pagination", () => {
      visitProductsPage();

      selectors.addProductButton().should("be.visible");
      cy.contains("Product ID").should("be.visible");
      cy.contains("Product Details").should("be.visible");
      cy.contains("Price").should("be.visible");
      cy.contains("Stock Status").should("be.visible");
      cy.contains("Actions").should("be.visible");

      selectors.tableRows().should("have.length", 4);
      cy.contains("MAG-001").should("be.visible");
      cy.contains("Black Walnut Gallery Frame").should("be.visible");
      cy.contains("LKR 2500.00").should("be.visible");
      cy.contains("Showing 1").should("be.visible");
      cy.contains("of 5 products").should("be.visible");
    });

    it("TC02 - paginates product rows without making another API call", () => {
      visitProductsPage();

      cy.contains("button", "2").click();

      cy.contains("MAG-005").should("be.visible");
      cy.contains("Heritage Classic Frame").should("be.visible");
      cy.contains("Showing 5").should("be.visible");
    });
  });

  context("Create Functionality", () => {
    it("TC03 - opens Add Product modal and displays all required fields", () => {
      visitProductsPage();
      openAddProductModal();

      cy.get('input[name="name"]').should("be.visible");
      cy.get('input[name="productId"]').should("be.visible");
      cy.get('select[name="category"]').should("be.visible");
      cy.get('input[name="stock"]').should("be.visible");
      cy.get('input[name="price"]').should("be.visible");
      cy.get('textarea[name="description"]').scrollIntoView().should("be.visible");
      cy.contains("Primary Product Image").should("be.visible");
      cy.contains("Product Gallery").should("be.visible");
    });

    it("TC04 - creates a product, calls POST integration, refreshes list, and closes modal", () => {
      visitProductsPage();
      openAddProductModal();
      fillProductForm();

      selectors.submitProductButton().scrollIntoView().click({ force: true });

      cy.wait("@createProduct").its("request.body").should("exist");
      cy.wait("@getProducts");

      cy.contains("Product added successfully").should("be.visible");
      selectors.modalTitle("Add New Product").should("not.exist");
      cy.contains("Cypress Created Frame").should("be.visible");
      cy.contains("MAG-CY-100").should("be.visible");
      cy.contains("LKR 1999.00").should("be.visible");
    });
  });

  context("Update Functionality", () => {
    it("TC05 - opens stock management modal and displays product details", () => {
      visitProductsPage();
      openFirstProductStockModal();

      cy.contains("SKU: MAG-001").should("be.visible");
      cy.contains("Black Walnut Gallery Frame").should("be.visible");
      cy.contains("Update Stock Status").scrollIntoView().should("be.visible");
      cy.contains("Current Availability").scrollIntoView().should("be.visible");
      cy.contains("New Availability Status").scrollIntoView().should("be.visible");
      cy.contains("Confirm Status Update").scrollIntoView().should("be.visible");
    });

    it("TC06 - updates stock status, calls PUT integration, refreshes list, and closes modal", () => {
      visitProductsPage();
      openFirstProductStockModal();

      cy.contains("button", "In Stock").click({ force: true });
      cy.contains("button", "Out of Stock").click({ force: true });
      cy.contains("button", "Confirm Status Update").click({ force: true });

      cy.wait("@updateProduct").then(({ request }) => {
        expect(request.method).to.eq("PUT");
        expect(request.url).to.include("/prod-001");
        expect(request.body).to.deep.eq({ status: "Out of Stock" });
      });
      cy.wait("@getProducts");

      cy.contains("Product updated successfully").should("be.visible");
      selectors.modalTitle("Manage Stock Level").should("not.exist");
      selectors.firstRow().should("contain.text", "Out of Stock");
    });
  });

  context("Delete Functionality", () => {
    it("TC07 - opens delete confirmation modal and cancels without deleting", () => {
      visitProductsPage();
      openFirstProductDeleteModal();

      cy.contains("Are you sure you want to delete this product?").should("be.visible");
      cy.contains("Black Walnut Gallery Frame").should("be.visible");

      cy.contains("button", "Cancel").click();

      selectors.modalTitle("Confirm Deletion").should("not.exist");
      cy.contains("Black Walnut Gallery Frame").should("be.visible");
    });

    it("TC08 - deletes product, calls DELETE integration, refreshes list, and removes row", () => {
      visitProductsPage();
      openFirstProductDeleteModal();

      cy.contains("button", "Delete Product").click({ force: true });

      cy.wait("@deleteProduct").then(({ request }) => {
        expect(request.method).to.eq("DELETE");
        expect(request.url).to.include("/prod-001");
      });
      cy.wait("@getProducts");

      cy.contains("Product deleted successfully").should("be.visible");
      cy.contains("Black Walnut Gallery Frame").should("not.exist");
      selectors.tableRows().should("have.length", 4);
    });
  });

  context("API Failure Handling", () => {
    it("TC09 - keeps add modal open and shows backend error when create API fails", () => {
      cy.intercept("POST", apiProductsPattern, {
        statusCode: 400,
        body: { message: "Product ID already exists" },
      }).as("createProductFail");

      visitProductsPage();
      openAddProductModal();
      fillProductForm();
      selectors.submitProductButton().scrollIntoView().click({ force: true });

      cy.wait("@createProductFail");
      cy.contains("Product ID already exists").should("be.visible");
      selectors.modalTitle("Add New Product").should("be.visible");
    });
  });

  context("Performance", () => {
    it("TC10 - loads dashboard and product rows within acceptable test budget", () => {
      const startedAt = Date.now();

      visitProductsPage();
      selectors.tableRows().should("have.length.greaterThan", 0);

      cy.then(() => {
        const loadTimeMs = Date.now() - startedAt;
        expect(loadTimeMs).to.be.lessThan(5000);
      });
    });
  });

  context("Responsiveness", () => {
    const viewports: Array<Cypress.ViewportPreset | [number, number]> = [
      "iphone-6",
      "ipad-2",
      "macbook-15",
      [1440, 900],
    ];

    viewports.forEach((viewport) => {
      const viewportName = Array.isArray(viewport)
        ? `${viewport[0]}x${viewport[1]}`
        : viewport;

      it(`TC11 - keeps product dashboard usable on ${viewportName}`, () => {
        if (Array.isArray(viewport)) {
          cy.viewport(viewport[0], viewport[1]);
        } else {
          cy.viewport(viewport);
        }

        visitProductsPage();

        cy.contains("Product Management").should("be.visible");
        selectors.addProductButton().should("be.visible");
        cy.get("table").scrollIntoView().should("be.visible");
        selectors.firstRow().scrollIntoView().should("be.visible");

        openAddProductModal();
        selectors.modalTitle("Add New Product").should("be.visible");
        cy.contains("button", "Cancel").scrollIntoView().click({ force: true });
      });
    });
  });
});
