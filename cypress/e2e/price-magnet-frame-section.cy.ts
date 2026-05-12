describe('FMS-113 - Magnet & Frame Bundle Section', () => {
  beforeEach(() => {
    cy.visit('/price');
  });

  it('should display page title and subtitle', () => {
    cy.contains('MAGNIFY CREATIONS').should('be.visible');
    cy.contains('FRIDGE MAGNET FRAMES').should('be.visible');
  });

  it('should display magnet only pricing', () => {
    cy.contains('Magnets Only').should('be.visible');

    cy.contains('4 pieces').should('be.visible');
    cy.contains('6 pieces').should('be.visible');
    cy.contains('9 pieces').should('be.visible');
    cy.contains('12 pieces').should('be.visible');
    cy.contains('18 pieces').should('be.visible');
  });

  it('should highlight popular badge', () => {
    cy.contains('6 pieces')
      .parent()
      .contains('Popular')
      .should('be.visible');
  });

  it('should display bundle pricing', () => {
    cy.contains('Magnets + Frame Bundle').should('be.visible');

    cy.contains('4 pieces + Frame').should('be.visible');
    cy.contains('6 pieces + Frame').should('be.visible');
  });
});