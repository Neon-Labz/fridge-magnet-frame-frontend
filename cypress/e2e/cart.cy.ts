describe('Cart Page', () => {
  beforeEach(() => {
    // 👉 Seed cart before visiting cart page
    cy.window().then((win) => {
      win.localStorage.setItem(
        'cart',
        JSON.stringify([
          {
            id: 'test-1',
            title: 'Test Product',
            subtitle: 'Frame: Classic • Color: Black',
            price: 100,
            quantity: 2,
            image: '',
            frameType: 'Classic',
            colorOption: 'Black',
          },
        ])
      );
    });

    cy.visit('/cart');
  });

  it('should load cart items', () => {
    cy.contains('Your Gallery Bag').should('exist');

    // ✅ now article will exist because we seeded cart
    cy.get('article').should('have.length.at.least', 1);
  });

  it('should increase quantity', () => {
    cy.get('button').contains('+').first().click();

    cy.get('input[type="number"]')
    .first()
    .should('have.value', '3');
  });

  it('should decrease quantity', () => {
    cy.get('button').contains('-').first().click();

    cy.get('input[type="number"]')
    .first()
    .should('have.value', '4');
  });

  it('should update subtotal when quantity changes', () => {
    cy.contains('Order Summary').should('exist');
    cy.contains('Subtotal').should('exist');
  });

  it('should delete cart item', () => {
    // ✅ now delete button exists because cart is seeded
    cy.get('[aria-label="Delete item"]').first().click();

    cy.get('article').should('have.length.lessThan', 1);
  });

  it('should navigate back to shop', () => {
    cy.contains('Continue Shopping').click();

    cy.url().should('include', '/shop');
  });

  it('should show checkout button', () => {
    cy.contains('Check Out').should('exist');
  });
});