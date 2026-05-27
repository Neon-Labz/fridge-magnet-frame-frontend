/// <reference types="cypress" />

type ViewportCase = {
  name: string;
  width: number;
  height: number;
};

type PublicPage = {
  name: string;
  path: string;
  expectedTexts: string[];
  shell?: boolean;
  setup?: (win: Window) => void;
};

const viewports: ViewportCase[] = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const cartItems = [
  {
    id: "magnet-001",
    title: "Magnet",
    price: 1500,
    quantity: 4,
    image: "/product-1.png",
    frameType: "without-frame",
  },
  {
    id: "magnet-black-frame-001",
    title: "Magnet Black Frame",
    price: 2100,
    quantity: 4,
    image: "/product-2.png",
    frameType: "black-frame",
    colorOption: "black",
  },
];

const seedCart = (win: Window) => {
  win.localStorage.setItem("cart", JSON.stringify(cartItems));
};

const seedAuthenticatedCheckout = (win: Window) => {
  seedCart(win);
  win.localStorage.setItem("token", "website-responsive-token");
  win.localStorage.setItem(
    "user",
    JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "0771234567",
      street: "123 Main Street",
      city: "Colombo",
      state: "Western",
      zip: "10001",
    }),
  );
};

const seedOrderConfirmation = (win: Window) => {
  win.localStorage.setItem(
    "latest-order",
    JSON.stringify({
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: 14400,
      shipping: 200,
      orderNumber: "MAG-72908",
      createdAt: new Date().toISOString(),
      customerDetails: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0771234567",
        street: "123 Main Street",
        city: "Colombo",
        state: "Western",
        zip: "10001",
      },
    }),
  );
};

const publicPages: PublicPage[] = [
  {
    name: "Home",
    path: "/",
    expectedTexts: ["Your Memories", "Magnified", "Shop Now"],
  },
  {
    name: "Shop",
    path: "/shop",
    expectedTexts: ["Quantity", "Add to Cart", "Buy Now"],
  },
  {
    name: "Price",
    path: "/price",
    expectedTexts: ["MAGNIFY CREATIONS", "Magnets Only", "Magnets + Frame Bundle"],
  },
  {
    name: "Contact",
    path: "/contact",
    expectedTexts: ["Get in Touch", "help you preserve"],
  },
  {
    name: "Cart",
    path: "/cart",
    expectedTexts: ["Your Gallery Bag", "Review your items before checkout", "Continue Shopping"],
    setup: seedCart,
  },
  {
    name: "Checkout",
    path: "/checkout",
    expectedTexts: ["Secure Checkout", "Customer Details", "Delivery Details", "Order Summary"],
    setup: seedAuthenticatedCheckout,
  },
  {
    name: "Login",
    path: "/login",
    expectedTexts: ["Welcome back", "Sign in", "Forgot password?"],
    shell: false,
  },
  {
    name: "Register",
    path: "/register",
    expectedTexts: ["Create Account", "Register", "Already have an account?"],
    shell: false,
  },
  {
    name: "Forgot Password",
    path: "/forgot-password",
    expectedTexts: ["Forgot Password", "Send Reset Link", "Back to Login"],
    shell: false,
  },
  {
    name: "Order Confirmation",
    path: "/order-confirmation",
    expectedTexts: ["Thank You for Your Order", "Order Details", "Delivery Information"],
    setup: seedOrderConfirmation,
  },
];

const visitPublicPage = (page: PublicPage) => {
  cy.visit(page.path, {
    onBeforeLoad(win) {
      win.localStorage.clear();
      page.setup?.(win);
    },
  });
};

const assertNoHorizontalOverflow = () => {
  cy.window().then((win) => {
    const documentWidth = win.document.documentElement.scrollWidth;
    const viewportWidth = win.innerWidth;
    const allowedOverflow = viewportWidth < 500 ? 80 : 2;

    expect(documentWidth, "page should not overflow horizontally").to.be.lte(
      viewportWidth + allowedOverflow,
    );
  });
};

const assertPageContent = (page: PublicPage) => {
  page.expectedTexts.forEach((text) => {
    cy.contains(text, { timeout: 15000 }).scrollIntoView().should("be.visible");
  });
};

const assertWebsiteShell = (page: PublicPage, viewport: ViewportCase) => {
  if (page.shell === false) return;

  if (page.path === "/contact") {
    cy.contains("Get in Touch").should("be.visible");
  } else {
    cy.get("header").should("be.visible");
  }

  if (viewport.name === "mobile") {
    cy.get('button[aria-label="Menu"]:visible')
      .first()
      .should("be.visible")
      .click({ force: true });
    cy.get('a[href="/shop"]:visible').should("have.length.greaterThan", 0);
    cy.get('a[href="/contact"]:visible').should("have.length.greaterThan", 0);
    cy.get('button[aria-label="Menu"]:visible').first().click({ force: true });
  } else if (page.path !== "/contact") {
    cy.get("header").first().within(() => {
      cy.get('nav a[href="/shop"]').should("be.visible");
      cy.get('nav a[href="/contact"]').should("be.visible");
      cy.get('nav a[href="/price"]').should("be.visible");
    });
  }

  cy.get("footer").scrollIntoView().should("be.visible");
  cy.contains("Newsletter").should("be.visible");
};

describe("Public Website - Full Responsiveness", () => {
  beforeEach(() => {
    cy.intercept("GET", "/_next/image**", { statusCode: 200, body: "" }).as(
      "nextImage",
    );
  });

  viewports.forEach((viewport) => {
    context(`${viewport.name} viewport (${viewport.width}x${viewport.height})`, () => {
      publicPages.forEach((page) => {
        it(`TC - ${page.name} page is responsive on ${viewport.name}`, () => {
          cy.viewport(viewport.width, viewport.height);
          visitPublicPage(page);

          assertPageContent(page);
          assertWebsiteShell(page, viewport);
          assertNoHorizontalOverflow();
        });
      });
    });
  });

  it("TC - public website navigation works on mobile, tablet, and desktop", () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      visitPublicPage(publicPages[0]);

      if (viewport.name === "mobile") {
        cy.get('button[aria-label="Menu"]:visible').first().click({ force: true });
        cy.get('a[href="/shop"]:visible').first().click({ force: true });
      } else {
        cy.get("header").first().find('nav a[href="/shop"]').click({ force: true });
      }
      cy.location("pathname").should("eq", "/shop");
      cy.contains("Add to Cart", { timeout: 15000 }).should("be.visible");

      if (viewport.name === "mobile") {
        cy.get('button[aria-label="Menu"]:visible').first().click({ force: true });
        cy.get('a[href="/price"]:visible').first().click({ force: true });
      } else {
        cy.get("header").first().find('nav a[href="/price"]').click({ force: true });
      }
      cy.location("pathname").should("eq", "/price");
      cy.contains("MAGNIFY CREATIONS").should("be.visible");
    });
  });
});
