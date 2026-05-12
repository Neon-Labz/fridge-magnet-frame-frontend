describe('FMS-94 - Contact Us Hero Section', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display hero section with correct content', () => {
    cy.get('section')
      .should('exist')
      .and('be.visible');

    cy.contains('Get in Touch').should('be.visible');

    cy.contains(
      "We\'re here to help you preserve your most cherished memories"
    ).should('be.visible');
  });

  it('should load background image properly', () => {
    cy.get('section')
      .should('have.css', 'background-image')
      .and('include', 'bg.jpg');
  });
});