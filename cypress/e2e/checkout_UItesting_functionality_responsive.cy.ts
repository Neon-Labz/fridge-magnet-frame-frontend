/// <reference types="cypress" />

type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  zip: string;
  notes: string;
};

const cartItems = [
  {
    id: "magnet-001",
    title: "Magnet",
    price: 500,
    quantity: 1,
    image: "/home-product-1.png",
    frameType: "standard",
    colorOption: "blue",
  },
  {
    id: "magnet-black-frame-001",
    title: "Magnet Black Frame",
    price: 1000,
    quantity: 1,
    image: "/home-product-1.png",
    frameType: "black-frame",
    colorOption: "black",
  },
];

const customer: CheckoutCustomer = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "0771234567",
  street: "123 Main Street",
  city: "Colombo",
  district: "Western",
  zip: "10001",
  notes: "Leave near the front desk",
};

const selectors = {
  placeOrderButton: () => cy.contains("button", "Place Order"),
  input: (placeholder: string) => cy.get(`input[placeholder="${placeholder}"]`),
  notes: () => cy.get('textarea[placeholder="Notes (optional)"]'),
};

const visitCheckout = (options: { authenticated?: boolean; withCart?: boolean } = {}) => {
  const { authenticated = true, withCart = true } = options;

  cy.visit("/checkout", {
    onBeforeLoad(win) {
      win.localStorage.clear();

      if (withCart) {
        win.localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      if (authenticated) {
        win.localStorage.setItem("token", "checkout-cypress-token");
        win.localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zip: "",
          })
        );
      }
    },
  });
};

const fillCheckoutForm = (data: CheckoutCustomer = customer) => {
  selectors.input("First Name").clear().type(data.firstName);
  selectors.input("Last Name").clear().type(data.lastName);
  selectors.input("Email").clear().type(data.email);
  selectors.input("Phone").clear().type(data.phone);
  selectors.input("Street").clear().type(data.street);
  selectors.input("City").clear().type(data.city);
  selectors.input("District").clear().type(data.district);
  selectors.input("ZIP").clear().type(data.zip);
  selectors.notes().clear().type(data.notes);
};

const visitOrderConfirmationWithSavedOrder = () => {
  cy.visit("/order-confirmation", {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "latest-order",
        JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            frameType: item.frameType,
            colorOption: item.colorOption,
          })),
          subtotal: 1500,
          shipping: 200,
          orderNumber: "MAG-72908",
          createdAt: new Date().toISOString(),
          customerDetails: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            street: customer.street,
            city: customer.city,
            state: customer.district,
            zip: customer.zip,
            notes: customer.notes,
          },
        })
      );
    },
  });
};

const assertCheckoutShell = () => {
  cy.contains("h1", "Secure Checkout").should("be.visible");
  cy.contains("Review your curated frames and finalize your order.").should("be.visible");
  cy.contains("h2", "Customer Details").should("be.visible");
  cy.contains("h2", "Delivery Details").should("be.visible");
  cy.contains("h2", "Order Summary").should("be.visible");
  cy.contains("h3", "Payment Method").should("be.visible");
};

describe("Checkout - UI, Functionality & Responsiveness", () => {
  beforeEach(() => {
    cy.intercept("GET", "/_next/image**", { statusCode: 200, body: "" }).as("nextImage");
  });

  context("Checkout - Billing Details Section", () => {
    beforeEach(() => {
      visitCheckout();
    });

    it("TC01 - displays the secure checkout header and main checkout sections", () => {
      assertCheckoutShell();
    });

    it("TC02 - displays all customer and delivery fields", () => {
      ["First Name", "Last Name", "Email", "Phone", "Street", "City", "District", "ZIP"].forEach(
        (placeholder) => {
          selectors.input(placeholder).should("be.visible").and("have.value", "");
        }
      );

      selectors.notes().should("be.visible").and("have.value", "");
    });

    it("TC03 - shows customer field validation messages after values are typed, deleted, and blurred", () => {
      selectors.input("First Name").type("A").clear().blur();
      cy.contains("First name is required").should("be.visible");

      selectors.input("Last Name").type("B").clear().blur();
      cy.contains("Last name is required").should("be.visible");

      selectors.input("Email").type("test@example.com").clear().blur();
      cy.contains("Email is required").should("be.visible");

      selectors.input("Phone").type("0771234567").clear().blur();
      cy.contains("Phone number is required").should("be.visible");
    });

    it("TC04 - validates invalid email format and clears the error after a valid email", () => {
      selectors.input("Email").type("invalid-email").blur();
      cy.contains("Please enter a valid email address").should("be.visible");

      selectors.input("Email").clear().type(customer.email).blur();
      cy.contains("Please enter a valid email address").should("not.exist");
    });

    it("TC05 - keeps Place Order disabled until all required fields are completed", () => {
      selectors.placeOrderButton().should("be.disabled");
      cy.contains("Please fill all required fields to place order").should("be.visible");

      fillCheckoutForm();

      selectors.placeOrderButton().should("not.be.disabled");
      cy.contains("Please fill all required fields to place order").should("not.exist");
    });

    it("TC06 - stores typed billing, delivery, and note values in the form", () => {
      fillCheckoutForm();

      selectors.input("First Name").should("have.value", customer.firstName);
      selectors.input("Last Name").should("have.value", customer.lastName);
      selectors.input("Email").should("have.value", customer.email);
      selectors.input("Phone").should("have.value", customer.phone);
      selectors.input("Street").should("have.value", customer.street);
      selectors.input("City").should("have.value", customer.city);
      selectors.input("District").should("have.value", customer.district);
      selectors.input("ZIP").should("have.value", customer.zip);
      selectors.notes().should("have.value", customer.notes);
    });
  });

  context("Checkout - Placed Order Section", () => {
    beforeEach(() => {
      visitCheckout();
    });

    it("TC07 - displays cart products, prices, subtotal, shipping prompt, total, and secure payment text", () => {
      cy.contains("h3", "Magnet").should("be.visible");
      cy.contains("h3", "Magnet Black Frame").should("be.visible");
      cy.contains("Quantity: 1").should("be.visible");
      cy.contains("Rs500.00").should("be.visible");
      cy.contains("Rs1000.00").should("be.visible");
      cy.contains("Subtotal").should("be.visible");
      cy.contains("Rs1,500").should("be.visible");
      cy.contains("Shipping").should("be.visible");
      cy.contains("Enter your shipping address").should("be.visible");
      cy.contains("Total").should("be.visible");
      cy.contains("SSL Encrypted Checkout").should("be.visible");
    });

    it("TC08 - displays and allows selecting both payment methods", () => {
      cy.contains("Credit or Debit Card").should("be.visible");
      cy.contains("Cash on Delivery").should("be.visible");

      cy.get('input[name="payment"]').should("have.length", 2);
      cy.get('input[name="payment"]').eq(0).should("be.checked");
      cy.get('input[name="payment"]').eq(1).check().should("be.checked");
    });

    it("TC09 - prevents checkout when the cart is empty", () => {
      visitCheckout({ withCart: false });

      cy.contains("Your cart is empty.").should("be.visible");
      cy.contains("Add items to checkout before placing your order.").should("be.visible");
      cy.contains("Add items to cart to place order").should("be.visible");
      selectors.placeOrderButton().should("be.disabled");
    });

    it("TC10 - redirects unauthenticated customers to login when placing an otherwise valid order", () => {
      visitCheckout({ authenticated: false });
      cy.intercept("GET", "**/login*").as("loginRoute");
      fillCheckoutForm();

      selectors.placeOrderButton().should("not.be.disabled").click();
      cy.wait("@loginRoute");
    });

    it("TC11 - submits the order API payload, saves the order, clears cart, and opens confirmation", () => {
      cy.intercept("POST", "**/orders", {
        statusCode: 201,
        body: { message: "Order created successfully" },
      }).as("createOrder");
      cy.intercept("GET", "**/order-confirmation*").as("orderConfirmationRoute");

      fillCheckoutForm();
      selectors.placeOrderButton().click();

      cy.wait("@createOrder").then(({ request }) => {
        expect(request.body.orderId).to.match(/^MAG-\d{5}$/);
        expect(request.body.customerName).to.eq("John Doe");
        expect(request.body.email).to.eq(customer.email);
        expect(request.body.phone).to.eq(customer.phone);
        expect(request.body.qty).to.eq(2);
        expect(request.body.totalValue).to.eq(1700);
        expect(request.body.shippingAddress).to.eq("123 Main Street, Colombo, Western 10001");
        expect(request.body.adminNote).to.eq(customer.notes);
        expect(request.body.items).to.have.length(2);
        expect(request.body.items[0]).to.include({
          productId: "magnet-001",
          name: "Magnet",
          price: 500,
          quantity: 1,
        });
        expect(request.body.items[1]).to.include({
          productId: "magnet-black-frame-001",
          name: "Magnet Black Frame",
          price: 1000,
          quantity: 1,
        });
      });

      cy.wait("@orderConfirmationRoute");
      cy.window().then((win) => {
        expect(JSON.parse(win.localStorage.getItem("cart") || "[]")).to.deep.eq([]);

        const latestOrder = JSON.parse(win.localStorage.getItem("latest-order") || "{}");
        expect(latestOrder.subtotal).to.eq(1500);
        expect(latestOrder.shipping).to.eq(200);
        expect(latestOrder.customerDetails.email).to.eq(customer.email);
      });
    });

    it("TC12 - shows API failure message and remains on checkout", () => {
      cy.intercept("POST", "**/orders", {
        statusCode: 500,
        body: { message: "Server error" },
      }).as("createOrderFail");

      fillCheckoutForm();
      selectors.placeOrderButton().click();

      cy.wait("@createOrderFail");
      cy.contains("Server error").should("be.visible");
      cy.location("pathname").should("eq", "/checkout");
      selectors.placeOrderButton().should("not.be.disabled");
    });
  });

  context("Placed Order - Order Details Section", () => {
    it("TC13 - displays confirmation order details after checkout success", () => {
      visitOrderConfirmationWithSavedOrder();

      cy.contains("Thank You for Your Order").should("be.visible");
      cy.contains("Your memories are in safe hands.").should("be.visible");
      cy.contains("Order Details").should("be.visible");
      cy.contains("Order #MAG-72908").should("be.visible");
      cy.contains("Magnet").should("be.visible");
      cy.contains("Magnet Black Frame").should("be.visible");
      cy.contains("Quantity: 1").should("be.visible");
      cy.contains("Rs500").should("be.visible");
      cy.contains("Rs1,000").should("be.visible");
      cy.contains("Subtotal").should("be.visible");
      cy.contains("Rs1,500").should("be.visible");
      cy.contains("Shipping").should("be.visible");
      cy.contains("Rs200").should("be.visible");
      cy.contains("Total").should("be.visible");
      cy.contains("Rs1,700").should("be.visible");
    });
  });

  context("Placed Order - Customer Details Section", () => {
    it("TC14 - displays placed order customer contact details", () => {
      visitOrderConfirmationWithSavedOrder();

      cy.contains("Delivery Information").should("be.visible");
      cy.contains("Contact").should("be.visible");
      cy.contains(customer.email).should("be.visible");
      cy.contains(customer.phone).should("be.visible");
    });
  });

  context("Placed Order - Delivery Information Section", () => {
    it("TC15 - displays shipping address from checkout form", () => {
      visitOrderConfirmationWithSavedOrder();

      cy.contains("Delivery Information").should("be.visible");
      cy.contains("Shipping Address").should("be.visible");
      cy.contains(`${customer.firstName} ${customer.lastName}`).should("be.visible");
      cy.contains(customer.street).should("be.visible");
      cy.contains(`${customer.city}, ${customer.district} ${customer.zip}`).should("be.visible");
      cy.contains("Continue Shopping").should("be.visible").and("have.attr", "href", "/shop");
    });
  });

  context("Checkout - Responsive UI", () => {
    const viewports: Array<Cypress.ViewportPreset | [number, number]> = [
      "iphone-6",
      "ipad-2",
      "macbook-15",
      [1440, 900],
    ];

    viewports.forEach((viewport) => {
      const viewportName = Array.isArray(viewport) ? `${viewport[0]}x${viewport[1]}` : viewport;

      it(`TC16 - keeps checkout content usable on ${viewportName}`, () => {
        if (Array.isArray(viewport)) {
          cy.viewport(viewport[0], viewport[1]);
        } else {
          cy.viewport(viewport);
        }

        visitCheckout();
        assertCheckoutShell();

        selectors.input("First Name").should("be.visible");
        selectors.input("ZIP").should("be.visible");
        cy.contains("Magnet Black Frame").scrollIntoView().should("be.visible");
        selectors.placeOrderButton().scrollIntoView().should("be.visible");
        cy.contains("SSL Encrypted Checkout").should("be.visible");
      });
    });
  });
});
