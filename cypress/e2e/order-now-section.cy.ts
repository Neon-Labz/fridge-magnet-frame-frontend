describe('FMS-115 - Why Choose Us / Order Now Section', () => {
  beforeEach(() => {
    cy.visit('/price');
  });

  it('should display feature cards', () => {
    cy.contains('Island Wide Delivery').should('be.visible');
    cy.contains('Cash on Delivery').should('be.visible');
    cy.contains('Same Day Jaffna').should('be.visible');
    cy.contains('Premium Quality').should('be.visible');
  });

  it('should display contact CTA section', () => {
    cy.contains('Ready to customize?').should('be.visible');
    cy.contains('+94 753 912 534').should('be.visible');
    cy.contains('magnifyofficials@gmail.com').should('be.visible');
  });
});