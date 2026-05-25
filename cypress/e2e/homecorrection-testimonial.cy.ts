describe("Homepage Corrections & Testimonial Section", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1440, 900);
  });

  // =========================
  // HEADER TESTING
  // =========================

  it("should display header navigation correctly", () => {
    cy.contains("a", "Home").should("be.visible");

    cy.contains("a", "Shop").should("be.visible");

    cy.contains("a", "Contact").should("be.visible");

    cy.contains("a", "Price").should("be.visible");

    cy.contains("button", "Login").should("be.visible");
  });

  it("should navigate through navbar links", () => {
    // SHOP
    cy.contains("a", "Shop").should("be.visible").click();

    cy.url().should("include", "/shop");

    cy.go("back");

    // wait until homepage loads again
    cy.url().should("eq", "http://localhost:3000/");

    // CONTACT
    cy.contains("a", "Contact").should("be.visible").click({ force: true });

    cy.url().should("include", "/contact");

    cy.go("back");

    cy.url().should("eq", "http://localhost:3000/");

    // PRICE
    cy.contains("a", "Price").should("be.visible").click({ force: true });
    cy.wait(4000);
    cy.url().should("include", "/price");
  });

  // =========================
  // HERO SECTION
  // =========================

  it("should display hero section content correctly", () => {
    cy.contains("Your Memories").should("be.visible");

    cy.contains("Magnified").should("be.visible");

    cy.contains("Transform your digital memories").should("be.visible");

    cy.contains("button", "Shop Now")
      .should("be.visible")
      .and("not.be.disabled");
  });

  // =========================
  // MAGNET FRAME SECTION
  // =========================

  it("should display magnet frame section correctly", () => {
    cy.contains("What is a Magnet Frame?").should("be.visible");

    cy.contains("Your memories - printed").should("be.visible");

    cy.get('img[alt="Magnet Frame Demo"]').should("be.visible");
  });

  // =========================
  // HOW IT WORKS SECTION
  // =========================

  it("should display how it works section", () => {
    cy.contains("How it works").should("be.visible");

    cy.contains("Send your photos").should("be.visible");

    cy.contains("We print & magnetise").should("be.visible");

    cy.contains("Delivered to your door").should("be.visible");
  });

  // =========================
  // PRICING SECTION
  // =========================

  it("should display pricing section correctly", () => {
    cy.contains("Simple, honest pricing.").should("be.visible");

    cy.contains("Photo Magnets").should("be.visible");

    cy.contains("Magnet Frame Set").should("be.visible");

    cy.contains("Rs. 1,500").should("be.visible");

    cy.contains("Rs. 2,500").should("be.visible");
  });

  // =========================
  // OFFER SECTION
  // =========================

  it("should display limited offer section", () => {
    cy.contains("LIMITED RELEASE").should("be.visible");

    cy.contains("Limited Time Gallery").should("be.visible");

    cy.contains("button", "Claim Offer").should("be.visible");
  });

  // =========================
  // TESTIMONIAL SECTION
  // =========================

  it("should display testimonial section heading", () => {
    cy.contains("Our Customer Say").should("be.visible");

    cy.contains("Join over 50,000 customers").should("be.visible");
  });

  it("should display testimonial customer details", () => {
    cy.contains("Sarah Jenkins").should("be.visible");

    cy.contains("Interior Designer").should("be.visible");

    cy.contains("David Chen").should("be.visible");

    cy.contains("Fine Art Photographer").should("be.visible");
  });

  it("should display testimonial review texts", () => {
    cy.contains("The quality of the wood").should("be.visible");

    cy.contains("Finally a service that treats").should("be.visible");
  });

  it("should display testimonial images", () => {
    cy.get('img[alt="Sarah Jenkins"]').should("be.visible");

    cy.get('img[alt="David Chen"]').should("be.visible");

    cy.get('img[alt="Gallery"]').should("be.visible");
  });

  it("should display testimonial navigation buttons", () => {
    cy.contains("button", "←").should("be.visible");

    cy.contains("button", "→").should("be.visible");
  });

  it("should display testimonial ratings", () => {

  cy.contains("div", "★ ★ ★ ★ ★")
    .should("be.visible");
  });

  // =========================
  // FOOTER SECTION
  // =========================

  it("should display footer sections", () => {
    cy.contains("Navigation").should("be.visible");

    cy.contains("Connect").should("be.visible");

    cy.contains("Newsletter").should("be.visible");
  });

  it("should validate footer links", () => {
    cy.contains("a", "Privacy Policy").should("have.attr", "href", "/privacy");

    cy.contains("a", "Terms of Service").should("have.attr", "href", "/terms");

    cy.contains("a", "Shipping Policy").should(
      "have.attr",
      "href",
      "/shipping",
    );

    cy.contains("a", "Contact Us").should("have.attr", "href", "/contact");

    cy.contains("a", "About Our Craft").should("have.attr", "href", "/about");

    cy.contains("a", "Sustainability").should(
      "have.attr",
      "href",
      "/sustainability",
    );
  });

  it("should validate newsletter input field", () => {
    cy.get('input[placeholder="Email address"]')
      .last()
      .should("be.visible")
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
  });

  // =========================
  // RESPONSIVE TESTING
  // =========================

  it("should display homepage correctly on mobile", () => {
    cy.viewport("iphone-x");

    cy.contains("Your Memories").should("be.visible");

    cy.contains("Curated Classics").should("be.visible");

    cy.contains("Our Customer Say").should("be.visible");
  });
});