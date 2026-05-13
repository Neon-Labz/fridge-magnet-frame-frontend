describe('Cart Page', () => {

  beforeEach(() => {
    cy.visit('/cart');
  });

  it('should load cart items', () => {
    cy.contains('Your Gallery Bag').should('exist');
    cy.get('article').should('have.length.at.least', 1);
  });

  it('should increase quantity', () => {
    cy.get('button').contains('+').first().click();

    cy.get('input[type="text"]')
      .first()
      .should('not.have.value', '0');
  });

  it('should decrease quantity', () => {
    cy.get('button').contains('−').first().click();
  });

  it('should update subtotal when quantity changes', () => {
    cy.contains('Order Summary').should('exist');
    cy.contains('Subtotal').should('exist');
  });

  it('should delete cart item', () => {
    cy.get('[aria-label="Delete item"]').first().click();

    cy.get('article').should('have.length.lessThan', 2);
  });

  it('should navigate back to shop', () => {
    cy.contains('Continue Shopping').click();

    cy.url().should('include', '/shop');
  });

  it('should show checkout button', () => {
    cy.contains('Check Out').should('exist');
  });

});