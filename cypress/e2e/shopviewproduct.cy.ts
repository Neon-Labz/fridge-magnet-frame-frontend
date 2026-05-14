/// <reference types="cypress" />

describe("Product Details Page - Complete UI Testing", () => {
  beforeEach(() => {
    cy.visit("https://fridge-magnet-frame-frontend.vercel.app/shop");
    cy.wait(1000);
  });

  // =========================================================
  // HEADER SECTION
  // =========================================================

  it("should display header correctly", () => {
    cy.get("header").should("be.visible");

    cy.get('header img[alt="Magnify Logo"]').should("be.visible");

    cy.contains("a", "Home").should("be.visible");

    cy.contains("a", "Shop")
      .should("be.visible")
      .and("have.attr", "href", "/shop");

    cy.contains("a", "Contact").should("be.visible");

    cy.contains("a", "Price").should("be.visible");

    cy.contains("button", "Login").should("be.visible");
  });

  it("should validate header navigation links", () => {
    cy.contains("a", "Home").should("have.attr", "href", "/");

    cy.contains("a", "Shop").should("have.attr", "href", "/shop");

    cy.contains("a", "Contact").should("have.attr", "href", "/contact");

    cy.contains("a", "Price").should("have.attr", "href", "/price");
  });

  it("should validate cart icon visibility", () => {
    cy.get("header").contains("🛒").should("be.visible");
  });

  // =========================================================
  // PRODUCT IMAGE SECTION
  // =========================================================

  it("should display main product image", () => {
    cy.get('img[alt="Magnate picture with black frame"]')
      .should("be.visible")
      .and(($img) => {
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
      });
  });

  it("should display all thumbnail images", () => {
    cy.get('img[alt="Black frame thumbnail"]').should("be.visible");

    cy.get('img[alt="White frame thumbnail"]').should("be.visible");

    cy.get('img[alt="Without frame thumbnail"]').should("be.visible");
  });

  it("should validate thumbnail image count", () => {
    cy.get('div[class*="cursor-pointer"] img')
      .filter('[alt*="thumbnail"]')
      .should("have.length", 3);
  });

  it("should validate zoom button visibility", () => {
    cy.get("button").find("svg").first().should("be.visible");
  });

  // =========================================================
  // PRODUCT DETAILS SECTION
  // =========================================================

  it("should display product details correctly", () => {
    cy.contains("Magnate picture with black frame").should("be.visible");

    cy.contains("4.8 (124 reviews)").should("be.visible");

    cy.contains("IN STOCK").should("be.visible");

    cy.contains("Rs2000.00").should("be.visible");

    cy.contains("Preserve your most cherished memories").should("be.visible");
  });

  it("should display 5 rating stars", () => {
    cy.get("svg")
      .filter('[fill="currentColor"]')
      .should("have.length.at.least", 5);
  });

  // =========================================================
  // PERSONALIZATION SECTION
  // =========================================================

  it("should display personalization section", () => {
    cy.contains("Personalization").should("be.visible");

    cy.contains("With Frame").should("be.visible");

    cy.contains("Select Color").should("be.visible");
  });

  it("should display color options", () => {
    cy.contains("Black").should("be.visible");

    cy.contains("White").should("be.visible");
  });

  it("should validate selected color state", () => {
    cy.contains("Black")
      .parent()
      .find("div")
      .first()
      .should("have.class", "border-[#1A2B5E]");
  });

  // =========================================================
  // QUANTITY SECTION
  // =========================================================

  it("should display quantity controls", () => {
    cy.contains("Quantity").should("be.visible");

    cy.get('button[aria-label="Decrease quantity"]').should("be.visible");

    cy.get('button[aria-label="Increase quantity"]').should("be.visible");

    cy.contains("4").should("be.visible");
  });

  it("should click increase quantity button", () => {
    cy.get('button[aria-label="Increase quantity"]').click({ force: true });

    cy.wait(500);
  });

  it("should click decrease quantity button", () => {
    cy.get('button[aria-label="Decrease quantity"]').click({ force: true });

    cy.wait(500);
  });

  // =========================================================
  // CTA BUTTONS
  // =========================================================

  it("should display action buttons", () => {
    cy.contains("button", "Add to Cart").should("be.visible");

    cy.contains("button", "Buy Now").should("be.visible");
  });

  it("should validate Add to Cart button", () => {
    cy.contains("button", "Add to Cart")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    cy.wait(1000);
  });

  it("should validate Buy Now button", () => {
    cy.contains("button", "Buy Now")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    cy.wait(1000);
  });

  // =========================================================
  // FOOTER SECTION
  // =========================================================

  it("should display footer correctly", () => {
    cy.get("footer").should("be.visible");

    cy.contains("Navigation").should("be.visible");

    cy.contains("Connect").should("be.visible");

    cy.contains("Newsletter").should("be.visible");
  });

  it("should validate footer navigation texts", () => {
    cy.contains("Privacy Policy").should("be.visible");

    cy.contains("Terms of Service").should("be.visible");

    cy.contains("Shipping Policy").should("be.visible");
  });

  it("should validate connect section texts", () => {
    cy.contains("Contact Us").should("be.visible");

    cy.contains("About Our Craft").should("be.visible");

    cy.contains("Sustainability").should("be.visible");
  });

  // =========================================================
  // NEWSLETTER SECTION
  // =========================================================

  it("should validate newsletter input field", () => {
    cy.get('input[type="email"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Email address");
  });

  it("should type email in newsletter field", () => {
    cy.get('input[type="email"]').clear().type("test@example.com");

    cy.get('input[type="email"]').should("have.value", "test@example.com");
  });

  it("should validate newsletter submit button", () => {
    cy.get('input[type="email"]').type("user@test.com");

    cy.get("footer button").contains("→").click({ force: true });

    cy.wait(1000);
  });

  // =========================================================
  // RESPONSIVE TESTING
  // =========================================================

  it("should render properly on mobile viewport", () => {
    cy.viewport("iphone-x");

    cy.wait(1000);

    cy.get("header").should("be.visible");

    cy.contains("Magnate picture with black frame").should("be.visible");

    cy.contains("button", "Add to Cart").should("be.visible");
  });

  it("should render properly on tablet viewport", () => {
    cy.viewport("ipad-2");

    cy.wait(1000);

    cy.get("header").should("be.visible");

    cy.contains("Rs2000.00").should("be.visible");
  });

  it("should render properly on desktop viewport", () => {
    cy.viewport(1440, 900);

    cy.wait(1000);

    cy.get("footer").should("be.visible");
  });

  // =========================================================
  // UI & STYLE VALIDATIONS
  // =========================================================

  it("should validate button hover classes exist", () => {
    cy.contains("button", "Buy Now").should("have.class", "hover:bg-red-700");

    cy.contains("button", "Add to Cart").should(
      "have.class",
      "hover:bg-slate-50",
    );
  });

  it("should validate page has proper sections", () => {
    cy.get("header").should("exist");

    cy.get("main").should("exist");

    cy.get("footer").should("exist");
  });

  it("should validate all images are loaded", () => {
    cy.get("img").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(($el) => {
          expect(($el[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(
            0,
          );
        });
    });
  });

  // =========================================================
  // SCROLL TESTING
  // =========================================================

  it("should scroll to footer successfully", () => {
    cy.scrollTo("bottom");

    cy.wait(1000);

    cy.get("footer").should("be.visible");
  });

  it("should scroll back to top successfully", () => {
    cy.scrollTo("bottom");

    cy.wait(500);

    cy.scrollTo("top");

    cy.wait(500);

    cy.get("header").should("be.visible");
  });
});
