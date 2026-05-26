describe("Cart Page - Functionality & Responsiveness", () => {
  const mockCart = [
    {
      id: "test-1",
      title: "Test Product",
      price: 100,
      quantity: 2,
      image: "/images/test-product.jpg",
      frameType: "Classic",
      colorOption: "Black",
    },
  ];

  const seedCart = () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cart", JSON.stringify(mockCart));
    });
  };

  beforeEach(() => {
    cy.visit("/");

    seedCart();

    cy.visit("/cart");
  });

  // =========================================
  // FUNCTIONALITY TESTING
  // =========================================

  it("should load cart page successfully", () => {
    cy.contains("Your Gallery Bag").should("be.visible");
    cy.contains("Review your items before checkout").should("be.visible");
  });

  it("should display cart item details correctly", () => {
    cy.contains("Test Product").should("be.visible");

    cy.contains("Frame: Classic").should("be.visible");

    cy.contains("Color: Black").should("be.visible");

    cy.contains("Rs 200.00").should("be.visible");
  });

  it("should display product image", () => {
    cy.get("article img").should("exist").and("be.visible");
  });

  it("should increase quantity when clicking plus button", () => {
    cy.get("article")
      .first()
      .within(() => {
        cy.contains("+").click();

        cy.get('input[type="number"]').should("have.value", "3");
      });

    cy.contains("Rs 300.00").should("exist");
  });

  it("should decrease quantity when clicking minus button", () => {
    cy.get("article")
      .first()
      .within(() => {
        cy.contains("-").click();

        // quantity should not go below 1
        cy.get('input[type="number"]')
          .invoke("val")
          .then((value) => {
            expect(Number(value)).to.be.greaterThan(0);
          });
      });
  });

  it("should manually update quantity from input field", () => {
    cy.get('input[type="number"]').first().click().type("{selectall}5");

    cy.get('input[type="number"]').first().should("have.value", "5");

    cy.contains("Rs 500.00").should("exist");
  });

  it("should not allow quantity below 1", () => {
    cy.get('input[type="number"]').first().click().type("{selectall}0");

    cy.get('input[type="number"]')
      .first()
      .should(($input) => {
        const value = Number($input.val());

        expect(value).to.be.greaterThan(0);
      });
  });

  it("should delete cart item successfully", () => {
    cy.get('[aria-label="Delete item"]').first().click();

    cy.contains("Test Product").should("not.exist");
  });

  it("should navigate to shop page when clicking Continue Shopping", () => {
    cy.contains("Continue Shopping").click();

    cy.url().should("include", "/shop");
  });

  it("should display order summary section", () => {
    cy.contains("Order Summary").should("be.visible");

    cy.contains("Subtotal").should("be.visible");

    cy.contains("Quantity").should("be.visible");

    cy.contains("Total").should("be.visible");
  });

  it("should update order summary when quantity changes", () => {
    cy.get("article")
      .first()
      .within(() => {
        cy.contains("+").click();
      });

    cy.contains("Rs. 300.00").should("exist");
    cy.contains("3").should("exist");
  });

  it("should display checkout button", () => {
    cy.contains("Check Out").should("be.visible").and("not.be.disabled");
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/cart", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              id: "test-1",
              title: "Test Product",
              price: 100,
              quantity: 2,
              image: "/images/test-product.jpg",
              frameType: "Classic",
              colorOption: "Black",
            },
          ]),
        );
      },
    });
  });
  it("should navigate to login page when user is not authenticated", () => {
    cy.contains("Check Out").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
  });

  it("should persist cart data in localStorage", () => {
    cy.get("article")
      .first()
      .within(() => {
        cy.contains("+").click();
      });

    cy.window().then((win) => {
      const cart = JSON.parse(win.localStorage.getItem("cart") || "[]");

      expect(cart[0].quantity).to.equal(3);
    });
  });

  it("should show secure checkout text", () => {
    cy.contains("Secure 256-bit SSL checkout").should("be.visible");
  });

  // =========================================
  // RESPONSIVENESS TESTING
  // =========================================

  const viewports = [
    ["iphone-x", 375, 812],
    ["ipad-2", 768, 1024],
    ["macbook-15", 1440, 900],
  ];

  viewports.forEach(([device, width, height]) => {
    it(`should render properly on ${device}`, () => {
      cy.viewport(Number(width), Number(height));

      cy.visit("/cart");

      cy.contains("Your Gallery Bag").should("be.visible");

      cy.get("article").should("be.visible");

      cy.contains("Order Summary").should("be.visible");

      cy.contains("Check Out").should("be.visible");
    });
  });

  it("should stack cart layout vertically on mobile view", () => {
    cy.viewport(375, 812);

    cy.visit("/cart");

    cy.get("article").first().should("be.visible");

    cy.contains("Order Summary").should("be.visible");
  });

  it("should display buttons properly on mobile devices", () => {
    cy.viewport("iphone-x");

    cy.visit("/cart");

    cy.contains("Continue Shopping").should("be.visible");

    cy.contains("Check Out").should("be.visible");

    cy.get('[aria-label="Delete item"]').should("be.visible");
  });

  it("should keep quantity input usable on mobile", () => {
    cy.viewport("iphone-x");

    cy.visit("/cart");

    cy.get('input[type="number"]').first().as("qtyInput");

    cy.get("@qtyInput").focus().type("{selectall}4");

    cy.get("@qtyInput").should("have.value", "4");
  });

  it("should maintain proper spacing and visibility on tablet", () => {
    cy.viewport("ipad-2");

    cy.visit("/cart");

    cy.get("article").should("be.visible");

    cy.contains("Order Summary").should("be.visible");
  });

  it("should render desktop layout correctly", () => {
    cy.viewport(1440, 900);

    cy.visit("/cart");

    cy.get("section").should("be.visible");

    cy.get("aside").should("be.visible");
  });
});
