/// <reference types="cypress" />

type VisibleProduct = {
  title: string;
  price: number;
};

const minimumQuantityMessage = "You must select a minimum of 4 magnets.";

const selectors = {
  cartIcon: () => cy.get('button[aria-label="Cart"]'),
  addToCartButton: () => cy.contains("button", "Add to Cart"),
  buyNowButton: () => cy.contains("button", "Buy Now"),
  quantitySection: () => cy.contains("label", "Quantity").parent(),
  productTitle: () => cy.get("main h1").first(),
  productPrice: () => cy.contains(/^Rs\s*\d[\d,]*(\.\d{2})?$/).first(),
};

const visitShop = () => {
  cy.visit("/shop", {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });

  cy.contains(/IN STOCK|OUT OF STOCK/, { timeout: 10000 }).should("be.visible");
  cy.get("main").should("be.visible");
};

const parsePrice = (text: string) =>
  Number(text.replace(/[^\d.]/g, ""));

const getVisibleProduct = () => {
  return selectors.productTitle().invoke("text").then((rawTitle) => {
    const title = rawTitle.trim();

    return selectors.productPrice().invoke("text").then((rawPrice) => {
      const price = parsePrice(rawPrice);

      expect(title, "visible product title").to.not.eq("");
      expect(price, "visible product price").to.be.greaterThan(0);

      return cy.wrap({ title, price } satisfies VisibleProduct, { log: false });
    });
  });
};

const getCartItemsFromStorage = () => {
  return cy.window().then((win) => {
    const rawCart = win.localStorage.getItem("cart");
    const parsed = rawCart ? JSON.parse(rawCart) : [];
    const items = Array.isArray(parsed) ? parsed : parsed?.items ?? [];

    return cy.wrap(items, { log: false });
  });
};

const assertCartIsEmpty = () => {
  getCartItemsFromStorage().should((items) => {
    expect(items).to.deep.eq([]);
  });
};

const getQuantityText = () => {
  return selectors
    .quantitySection()
    .children("div")
    .find("div.border-x")
    .should("be.visible");
};

const increaseQuantity = () => {
  selectors
    .quantitySection()
    .children("div")
    .find("button")
    .eq(1)
    .should("be.visible")
    .click({ force: true });
};

const decreaseQuantity = () => {
  selectors
    .quantitySection()
    .children("div")
    .find("button")
    .first()
    .should("be.visible")
    .click({ force: true });
};

const clickAddToCart = () => {
  selectors.addToCartButton().should("be.visible").click({ force: true });
};

const waitForShopToBeInteractive = () => {
  increaseQuantity();
  getQuantityText().should("have.text", "5");
  decreaseQuantity();
  getQuantityText().should("have.text", "4");
};

describe("Shop - Functionality & Responsiveness", () => {
  context("Shop Page - Product Details", () => {
    beforeEach(() => {
      visitShop();
    });

    it("TC01 - displays the selected product image, title, price, stock state, and actions", () => {
      cy.get("main img").first().should("be.visible");
      selectors.productTitle().should("be.visible").and("not.have.text", "");
      selectors.productPrice().should("be.visible");
      cy.contains(/IN STOCK|OUT OF STOCK/).should("be.visible");
      cy.contains("Quantity").should("be.visible");
      selectors.addToCartButton().should("be.visible").and("not.be.disabled");
      selectors.buyNowButton().should("be.visible");
    });

    it("TC02 - keeps the displayed product price as the cart item unit price", () => {
      waitForShopToBeInteractive();

      getVisibleProduct().then((product) => {
        clickAddToCart();

        getCartItemsFromStorage().should((items) => {
          expect(items).to.have.length(1);
          expect(items[0].title).to.eq(product.title);
          expect(items[0].price).to.eq(product.price);
          expect(items[0].quantity).to.eq(4);
        });
      });
    });

    it("TC03 - does not automatically add viewed shop products to the cart", () => {
      selectors.productTitle().should("be.visible");
      assertCartIsEmpty();
    });
  });

  context("Shop Page - Quantity Functionality", () => {
    beforeEach(() => {
      visitShop();
    });

    it("TC04 - shows default quantity as 4", () => {
      getQuantityText().should("be.visible").and("have.text", "4");
    });

    it("TC05 - increases and decreases quantity without going below 4", () => {
      waitForShopToBeInteractive();

      increaseQuantity();
      getQuantityText().should("have.text", "5");

      decreaseQuantity();
      getQuantityText().should("have.text", "4");

      decreaseQuantity();
      getQuantityText().should("have.text", "4");
      cy.contains(minimumQuantityMessage).should("be.visible");
    });

    it("TC06 - shows minimum quantity error when decreasing at 4", () => {
      getQuantityText().should("have.text", "4");

      decreaseQuantity();

      getQuantityText().should("have.text", "4");
      cy.contains(minimumQuantityMessage).should("be.visible");
    });
  });

  context("Shop Page - Cart Navigation", () => {
    beforeEach(() => {
      visitShop();
    });

    it("TC07 - clicking the header cart icon navigates to cart without adding the viewed product", () => {
      getVisibleProduct().then((product) => {
        cy.intercept("GET", "**/cart*").as("cartRoute");

        selectors.cartIcon().click();
        cy.wait("@cartRoute");

        assertCartIsEmpty();
        cy.visit("/cart");
        cy.contains("Your Gallery Bag").should("be.visible");
        cy.contains(product.title).should("not.exist");
      });
    });

    it("TC08 - clicking Add to Cart navigates to cart", () => {
      clickAddToCart();

      cy.visit("/cart");
      cy.contains("Your Gallery Bag").should("be.visible");
    });

    it("TC09 - adds the selected shop product to cart before navigation", () => {
      getVisibleProduct().then((product) => {
        increaseQuantity();
        getQuantityText().should("have.text", "5");

        clickAddToCart();

        getCartItemsFromStorage().should((items) => {
          expect(items).to.have.length(1);
          expect(items[0].title).to.eq(product.title);
          expect(items[0].price).to.eq(product.price);
          expect(items[0].quantity).to.eq(5);
          expect(items[0].image).to.be.a("string").and.not.eq("");
          expect(items[0].frameType).to.be.a("string").and.not.eq("");
        });

        cy.visit("/cart");
        cy.contains(product.title).should("be.visible");
        cy.get('input[type="number"]').should("have.value", "5");
        cy.contains(`Rs ${(product.price * 5).toFixed(2)}`).should("be.visible");
      });
    });
  });

  context("Shop Page - Responsive UI", () => {
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

      it.only(`TC10 - keeps shop product flow usable on ${viewportName}`, () => {
        if (Array.isArray(viewport)) {
          cy.viewport(viewport[0], viewport[1]);
        } else {
          cy.viewport(viewport);
        }

        visitShop();

        selectors.productTitle().should("be.visible");
        selectors.productPrice().should("be.visible");
        cy.contains("Quantity").scrollIntoView().should("be.visible");
        getQuantityText().should("be.visible").and("have.text", "4");
        selectors.addToCartButton().scrollIntoView().should("be.visible");
      });
    });
  });
});
